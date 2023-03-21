import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const getUserAccount = () => {
  const url = `${apiUrl}/accounts`
  return axios.get(url)
}

export const createAccount = ({ accessKey }) => {
  const url = `${apiUrl}/accounts`
  return axios.post(url, {
    accessKey
  })
}

export const updateAccount = (data) => {
  const url = `${apiUrl}/accounts/update`
  return axios.put(url, data)
}