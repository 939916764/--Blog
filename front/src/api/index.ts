import { get, post } from '@/utils/http/request';


/**
 * 获取博客列表 - 参数
 */

interface BlogListData {
  type?: string;
  page?: number;
  pageSize?: number;
  title?: string
}
/**
 * 获取博客列表 - 接口响应数据
 */


export interface UserData {
  author: string,
  content: string,
  createTime: string,
  id: number,
  img: string,
  title: string,
}
interface BlogListResponse {
  [x: string]: number | string | [UserData];
  code: number;
  data: [UserData];
  message: string
}

interface BlogDetailData {
  id: number | string | string[]
}

interface BlogDetailResponse {

  code: number;
  data: [{
    author: string,
    content: string,
    createTime: string,
    id: number,
    img: string,
    title: string,
  }];
  message: string
}

export const BlogListApi = {
  getList: (data: BlogListData) => get<BlogListResponse>("/api/blog/list", data),
  getdetail: (data: BlogDetailData) => get<BlogDetailResponse>("/api/blog/detail", data),
}



/**
 * 登录
 */

interface LoginData {
  account: string;
  password: string;
}
/**
 * 登录 - 接口响应数据
 */
interface LoginResponse {
  code: number;
  tokenStr: string;
  message: string
}


export const LoginApi = {
  login: (params: LoginData) => post<LoginResponse>("/api/user/login", params),
}




/**
 * 登录
 */

interface FormInsertData {
  author: string,
  content: string,
  type: string
  img: string,
  title: string,
}
/**
 * 获取博客列表 - 接口响应数据
 */
interface FormResponse {
  code: number;
  message: string
}

/**
 * 登录
 */

interface FormUpadteData {
  author: string,
  content: string,
  type: string
  img: string,
  title: string,
  id: string
}
/**
 * 获取博客列表 - 接口响应数据
 */
interface FormUpdateResponse {
  code: number;
  message: string
}


interface formDelData {
  id: string
}
/**
 * 获取博客列表 - 接口响应数据
 */
interface formDelResponse {
  code: number;
  message: string
}
export const FormApi = {
  formInsert: (params: FormInsertData) => post<FormResponse>("/api/user/newCreate", params),
  formUpdate: (params: FormUpadteData) => post<FormUpdateResponse>("/api/user/edit", params),
  formDel: (params: formDelData) => post<formDelResponse>("/api/user/del", params),
}



/**
 * 上传文件 - 接口响应数据
 */
interface UploadtResponse {
  code: number;
  message: string;
  img: string

}


export const UploadApi = {
  upload: (data: any) => post<UploadtResponse>("/api/user/upload", data),
}

