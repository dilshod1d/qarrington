import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const createCompany = (data) => {
  const url = `${apiUrl}/companies`
  return axios.post(url, data)
}

export const getCompanyBy = async ({ id }) => {
  const url = `${apiUrl}/companies?companyId=${id}`
  const data = await axios.get(url)
  return data?.data && data.data
}