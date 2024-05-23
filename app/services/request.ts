import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {baseUrl} from '../configs/servicesConfig.ts';

// 创建一个 axios 实例
const service = axios.create({
  baseURL: baseUrl, // 默认请求地址
  timeout: 10000, // 请求超时（10秒）
});

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // 在请求发送之前可以进行一些操作，比如添加 token
    // config.headers['Authorization'] = 'Bearer your_token';
    return config;
  },
  error => {
    // 请求错误处理
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 处理响应数据，只返回 response.data
    return response.data;
  },
  error => {
    // 响应错误处理
    if (error.response) {
      console.error('Response Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

// 统一发起请求的函数
export function request<T>(options: AxiosRequestConfig) {
  return service.request<T>(options);
}
