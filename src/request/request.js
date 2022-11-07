import axios from 'axios'

const instance = axios.create({
    baseURL: '/api',
    // baseURL: 'http://192.168.50.111:8091',
    timeout: 15000,
})

instance.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err)
})

// 重写实例响应后拦截器
instance.interceptors.response.use((result) => {

    return result.data;
}, (err) => {
    return Promise.reject(err);
})

export default instance