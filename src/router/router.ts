/**
  ts版本的路由
  2022年6月30日21:50
 */

import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'

import index from '../views/index.vue'    // 自定义的 登录页
// import LoginOut from '@/views/login/loginOut.vue'  // 自定义的登出页

/**
 * 定义路由模块
  2022年6月30日21:50
 */
const routes: Array<RouteRecordRaw> = [
    {
        path: '/index',
        name: 'index',
        component: index,
    },

]

/**
 * 定义返回模块
 * vite.config.js
    base: '/zh-admin/',
 */
const router = createRouter({
    history: createWebHistory('/zh-admin/'),  // 设置为history模式，就是路径里面没有#,  createWebHashHistory 是默认的，括号里面的就是基础路径，可以理解为项目名称，就是请求路径的基础url
    // 
    routes
})

export default router