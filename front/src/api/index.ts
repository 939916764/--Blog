import { get } from '@/utils/http/request';


/**
 * 获取博客列表 - 参数
 */

interface BlogLisData {
  type?: number;
  page?: number;
  pageSize?: number;
}
/**
 * 获取博客列表 - 接口响应数据
 */
interface BlogListResponse {

  code: number;
  data: [{
    author: string,
    content: string,
    createTime: string,
    id: number,
    img: string,
    title: string,
  }];
  msg: string
}


export const BlogListApi = {
  getList: (data: BlogLisData) => get<BlogListResponse>("/blog/list", data),
}

