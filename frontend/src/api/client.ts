import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

api.interceptors.response.use(
  resp => resp,
  err => {
    console.error('API error', err)
    return Promise.reject(err)
  }
)

export default api
