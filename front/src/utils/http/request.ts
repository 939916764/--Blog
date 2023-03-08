import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

// 配置新建一个 axios 实例
const service = axios.create({
  timeout: 15000,
});

// 添加请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 例如追加token
  let token = sessionStorage.getItem('token');
  if (token) {    // token存放到请求头中
    config.headers.Authorization = 'Bearer ' + token;
  }


  // post请求参数在 config.data里,get请求在config.params里面
  let type: 'params' | 'data' = config.method == 'post' ? 'data' : 'params'

  // 可以在里面追参数，例如添加一个时间戳time
  // config[type] = {
  //     ...config[type],
  //     time: Date.now()
  // }

  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response) => {
  // 对响应数据做点什么

  // 例如登录失效的操作
  const res = response.data;
  if (res.code && res.code == 403) {
    // `token` 过期或者账号已在别处登录
    sessionStorage.clear(); // 清除浏览器全部临时缓存
    window.location.href = '/'; // 去登录页
    ElMessageBox.alert('账号已过期，请重新登录', '提示', {})
      .then(() => { })
      .catch(() => { });
    return Promise.reject(service.interceptors.response);
  } else if (response.data.code !== 200) {
    ElMessage.error(res.message);
    return Promise.reject(service.interceptors.response);
  } else {
    return response.data;
  }
  return response.data;      // 这里返回 response.data,默认返回整个axios对象，后端返回的在response.data包起来了
}, (error) => {

  // // 对响应错误做点什么
  // console.log(error)
  if (error.message.indexOf('timeout') != -1) {
    ElMessage.error('网络超时');
  } else if (error.message == 'Network Error') {
    ElMessage.error('网络连接错误');
  } else {
    ElMessage.error(error.response.code + ',' + error.response.statusText);
    //    if (error.response.data)  else ElMessage.error('接口路径找不到');
  }
  return Promise.reject(error);
});


/**
 * 跟后端约定返回的数据格式
 */
interface ResponseData<T> {
  token(arg0: string, token: any): unknown;
  token(arg0: string, token: any): unknown;
  [x: string]: any;
  code: number;   //  状态码，示例：-  200 : 成功
  msg: string;    // 返回文字描述，示例：-  提交成功
  data: T;    // 泛型数据，定义接口时传过来类型
}

/*** 方法封装 **********************************/
/**
 * @method post请求
 * @param {string} url 请求接口路由地址
 * @param {any} [data] 接口参数
 * @param {any} [config] 请求头部配置信息
 * @returns {Promise<ResponseData<T>>}
 */
const post = <T = any>(url: string, data?: any, config?: any): Promise<ResponseData<T>> => {
  return service.post(url, data, { ...config })
}

/**
 * @method get请求
 * @param {string} url 请求接口路由地址
 * @param {any} [data] 接口参数
 * @param {any} [config] 请求头部配置信息
 * @returns {Promise<ResponseData<T>>}
 */
const get = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> => {
  return service.get(url, {
    params: data,
    ...config
  })
}

/**
 * @method del删除
 * @param {string} url 请求接口路由地址
 * @param {any} [data] 接口参数
 * @param {any} [config] 请求头部配置信息
 * @returns {Promise<ResponseData<T>>}
 */
const del = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> => {
  return service.delete(url, {
    params: data,
    ...config
  })
}
/**
 * @method put请求
 * @param {string} url 请求接口路由地址
 * @param {any} [data] 接口参数
 * @param {any} [config] 请求头部配置信息
 * @returns {Promise<ResponseData<T>>}
 */
const put = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResponseData<T>> => {
  return service.put(url, data, { ...config })
}

// 导出 axios 实例
export { post, get, del, put, service as request }
// export default service;
