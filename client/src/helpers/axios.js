//just you can import this file as axios and don't write the link on every request 
const  axiosReq = require('axios');

var tmp;
if (process.env.NODE_ENV === "production")
    tmp = '';
    else 
    tmp = `http://localhost:5000/api/`;
export const link = tmp;

export const axios = axiosReq.create({
  baseURL: tmp,
  headers: {
    'Authorization': localStorage.getItem('Recipe-Manager-Token')
    }
});

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('Recipe-Manager-Token');
    if (token) {
      config.headers.Authorization = `${token}`;
      
    }
    return config;
  },
  error => Promise.reject(error)
)