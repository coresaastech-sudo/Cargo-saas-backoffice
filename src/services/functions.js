const functions = {
  error: {
    status: 'error',
    message: null,
  },

  getInfoRespError(error) {
    if (!error) {
      return { message: 'Request failed' }
    }

    if (typeof error === 'string') {
      return { message: error }
    }

    if (error.data?.response) {
      return error.data.response
    }

    if (error.data?.message) {
      return { message: error.data.message }
    }

    if (error.response?.data?.response) {
      return error.response.data.response
    }

    if (error.response?.data?.message) {
      return { message: error.response.data.message }
    }

    if (error.message) {
      return { message: error.message }
    }

    return error
  },
}

export default functions
