import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const createCompany = async (data) => {
  const url = `${apiUrl}/companies`
  const response = await axios.post(url, data)
  
  if(response.status === 201) {
    return response.data.data
  } else {
    console.log('Something went wrong')
  }
}

export const getCompanyBy = async ({ id }) => {
  const url = `${apiUrl}/companies?companyId=${id}`
  const response = await axios.get(url)
  return response?.data && response.data
}

export const getCompaniesWithBestCap = async ({ quantity }) => {
  try {
    const url = `${apiUrl}/companies?sortBy=companyCapitalization&limit=${quantity}`
    const responose = await axios.get(url)
    if(responose?.error) return []

    const { data } = responose
    return data?.data || [] 
  } catch (error) {
    return []
  }
}

export const subscribeToCompany = async ({ accountId, companySlug }) => {
  try {
    const url = `${apiUrl}/companies`
    const responose = await axios.put(url, {
      companySubscriberAccountId: accountId,
      companySlug
    })
    if(responose?.error) return response.error

    const { data } = responose
    return data?.data
  } catch (error) {
    return console.log(error)
  }
}