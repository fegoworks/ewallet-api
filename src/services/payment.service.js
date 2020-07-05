import axios from 'axios';

const BASE_URL = 'https://api.paystack.co/charge';

const initiatePayment = async (email, request) => {
  const data = {
    method: 'post',
    url: BASE_URL,
    headers: {
      Authorization: `BEARER ${process.env.PAYSTACK_API_KEY}`
    },
    data: {
      email,
      amount: request.amount,
      card: {
        number: request.number,
        cvv: request.cvv,
        expiry_month: request.expiry_month,
        expiry_year: request.expiry_year
      },
      pin: request.pin
    }
  };
  try {
    const response = await axios(data);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
};

export default initiatePayment;