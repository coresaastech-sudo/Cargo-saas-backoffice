import axios from 'axios'
import { GetCookie, RemoveCookie, SetCookie } from './CookieService'
import functions from './functions'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME || 'CARGO_SAAS_BACKOFFICE_TOKEN'
const NOT_AUTH = import.meta.env.VITE_NOT_AUTH || 'CARGO_SAAS_NOT_AUTH'
const EXPIRY_PASS = import.meta.env.VITE_EXPIRY_PASS || 'CARGO_SAAS_EXPIRY_PASS'
const CACHE_ROUTE = import.meta.env.VITE_CACHE_ROUTE || 'CARGO_SAAS_CACHE_ROUTE'
const LANGUAGE_KEY = import.meta.env.VITE_LANGUAGE_KEY || 'cargo_saas_language'
const BOOTSTRAP_ACTION = import.meta.env.VITE_BOOTSTRAP_ACTION || 'app0020'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

const normalizePaginationTotal = (data) => {
  if (!data || !data.data) {
    return data
  }

  if (data.total || data.total === 0) {
    return data
  }

  if (data.next_page_url) {
    data.total = data.to + 1
  } else if (data.prev_page_url) {
    data.total = data.to
  } else {
    data.total = data.data?.length
  }

  return data
}

export const getCargoToken = () => GetCookie(TOKEN_NAME)
export const saveCargoToken = (token) => SetCookie(TOKEN_NAME, token)
export const clearCargoToken = () => RemoveCookie(TOKEN_NAME)

export const ApiService = (action_code, data) => {
  return sendApiService('POST', '/api/v1/back/action', data, action_code)
}

export const sendApiService = (method, url, data, action_code, serviceOptions = {}) => {
  const token = GetCookie(TOKEN_NAME)
  const isMultipart = serviceOptions.multipart || data instanceof FormData

  const options = {
    method,
    url,
    ...(data?._download && { responseType: 'blob' }),
    ...(isMultipart && { transformRequest: [(value) => value] }),
    headers: {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: token ? `Bearer ${token}` : '',
      posting_code: action_code,
      language: localStorage.getItem(LANGUAGE_KEY) || 'mn',
    },
    data,
  }

  if (action_code !== BOOTSTRAP_ACTION) {
    localStorage.setItem('sessionTimer', new Date())
  }

  const onSuccess = (response) => {
    RemoveCookie(NOT_AUTH)

    if (data?._download) {
      return response.data
    }

    if (response?.data?.response_code === 'RC000000' || response?.data?.response_code === 'RC000110') {
      const responseData = response.data.response

      if (responseData) {
        normalizePaginationTotal(responseData)

        if (responseData.custmsg && responseData.custmsg.length > 0) {
          localStorage.setItem('CARGO_CUSTMSGDATA', JSON.stringify({ show: true, data: responseData.custmsg }))
        }
      }

      return responseData
    }

    return Promise.reject(response)
  }

  const onError = (error) => {
    const errorData = error?.response?.data || error?.data

    if (errorData?.response) {
      if (errorData.response_code === 'RC000006' || errorData.response_code === 'RC000265') {
        if (!GetCookie(NOT_AUTH)) {
          const path = window.location.pathname

          if (path !== '/login' && !path.includes('resetPassword') && !path.includes('forgotpassword')) {
            SetCookie(CACHE_ROUTE, path)
            window.location = '/login'
          }
        }

        SetCookie(NOT_AUTH, 401)
      } else if (errorData.response_code === 'RC000169') {
        const path = window.location.pathname

        if (path !== '/changePassword') {
          window.location.replace('/changePassword')
          SetCookie(EXPIRY_PASS, 303)
        }
      }

      return Promise.reject(errorData.response)
    }

    if (data?._download) {
      error.response = { data: 'File download failed.' }
    }

    return Promise.reject(functions.getInfoRespError(error.response || error))
  }

  return axiosInstance(options).then(onSuccess).catch(onError)
}
