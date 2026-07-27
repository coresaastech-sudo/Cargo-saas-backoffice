import { sendApiService } from './ApiService'

const isFileLike = (value) => {
  return typeof File !== 'undefined' && value instanceof File
}

const isBlobLike = (value) => {
  return typeof Blob !== 'undefined' && value instanceof Blob
}

const appendFormValue = (formData, key, value) => {
  if (value === undefined || value === null) {
    return
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => appendFormValue(formData, `${key}[${index}]`, item))
    return
  }

  if (isFileLike(value) || isBlobLike(value)) {
    formData.append(key, value)
    return
  }

  if (typeof value === 'object') {
    formData.append(key, JSON.stringify(value))
    return
  }

  formData.append(key, value)
}

export const createFormData = (data) => {
  if (data instanceof FormData) {
    return data
  }

  const formData = new FormData()

  Object.entries(data || {}).forEach(([key, value]) => {
    appendFormValue(formData, key, value)
  })

  return formData
}

export const MultiFormApiService = (action_code, data) => {
  return sendApiService('POST', '/api/v1/back/action', createFormData(data), action_code, { multipart: true })
}
