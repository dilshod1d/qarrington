import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const createAccount = ({ accessKey }) => {
  console.log(apiUrl)
  const url = `${apiUrl}/accounts`
  return axios.post(url, {
    accessKey
  })
}