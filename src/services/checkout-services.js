import axios from 'axios'
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const checkoutCardPayment = async (data) => {
  const url = `${apiUrl}/checkout`
  const response = await axios.post(url, data)
  
  if(response.status === 201) {
    return response.data.data
  } else {
    console.log('Something went wrong')
  }
}