import functions from './functions'
import { ApiService } from './ApiService'
import { GetTimeCookie, SetTimeCookie } from './CookieService'
import { MultiFormApiService } from './MultiFormApiService'

const CARGO_DICT = 'CARGO_DICTIONARY'
const DICTIONARY_ACTION = import.meta.env.VITE_DICTIONARY_ACTION || 'gen0070'

const defaultError = () => ({ ...functions.error })

export const getDicts = async ({ dic_code, parentValue, parentDicCode, usecache }) => {
  if (!dic_code) {
    return undefined
  }

  let resp = defaultError()
  const unique_key = `${CARGO_DICT}.${dic_code}${parentValue ? `.${parentValue}${parentDicCode || ''}` : ''}`
  const cached = await GetTimeCookie(unique_key)

  if (cached != null && usecache) {
    return cached
  }

  await ApiService(DICTIONARY_ACTION, { dic_code, parentValue, parentDicCode })
    .then((res) => {
      resp = res
      SetTimeCookie(unique_key, res)
    })
    .catch((err) => {
      resp.message = functions.getInfoRespError(err)
    })

  return resp
}

/**
 * @param {string} action_code
 * @param {object} data
 * @param {Function} showLoading
 */
export const send = async (action_code, data, showLoading) => {
  let resp = defaultError()

  if (showLoading) {
    showLoading(true)
  }

  await ApiService(action_code, data)
    .then((res) => {
      resp = res
    })
    .catch((res) => {
      resp.message = res
    })

  if (showLoading) {
    showLoading(false)
  }

  return resp
}

/**
 * @param {string} action_code
 * @param {object|FormData} data
 * @param {Function} showLoading
 */
export const sendMultiForm = async (action_code, data, showLoading) => {
  let resp = defaultError()

  if (showLoading) {
    showLoading(true)
  }

  await MultiFormApiService(action_code, data)
    .then((res) => {
      resp = res
    })
    .catch((res) => {
      resp.message = res
    })

  if (showLoading) {
    showLoading(false)
  }

  return resp
}
