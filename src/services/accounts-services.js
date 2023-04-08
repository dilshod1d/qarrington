import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getUserAccount = () => {
  const url = `${apiUrl}/api/accounts`;
  return axios.get(url);
};

export const createAccount = async ({ accessKey }) => {
  const url = `${apiUrl}/api/accounts`;
  try {
    const response = await axios.post(url, {
      accessKey
    });

    if (response.status !== 201) return null;
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAccount = (data) => {
  const url = `${apiUrl}accounts/update`;
  return axios.put(url, data);
};
