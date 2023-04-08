import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const checkoutCardPayment = async (data) => {
  const url = `${apiUrl}/api/checkout`;
  const response = await axios.post(url, data);

  if (response.status === 201) {
    return response.data.data;
  } else {
    console.log('Something went wrong');
  }
};

export const cancelPullOf = async (id) => {
  const url = `${apiUrl}/api/pulls?pullId=${id}`;
  const response = await axios.delete(url);
  if (response.status === 204) {
    return response;
  } else {
    console.log('Something went wrong');
  }
};

export const cancelPushOf = async (id) => {
  const url = `${apiUrl}/api/pushes?pushId=${id}`;
  const response = await axios.delete(url);
  if (response.status === 204) {
    return response;
  } else {
    console.log('Something went wrong');
  }
};
