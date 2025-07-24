// src/axiosInstance.js
import axios from 'axios';

// إنشاء نسخة من axios
const axiosInstance = axios.create({
  baseURL: 'http://school.test/api/', 
});

// إضافة التوكن تلقائيًا لو موجود
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;