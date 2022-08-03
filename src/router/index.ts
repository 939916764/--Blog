/**
  ts版本的路由
  2022年6月30日21:50
 */

import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'


/**
 * 定义路由模块
  2022年6月30日21:50
 */
const routes: Array<RouteRecordRaw> = [
    // vue3 重定向
    {
        path: "/:catchAll(.*)",
        redirect: "/index"
    },

    {
        path: '/index',
        meta: {
            title: '再度重相逢的个人博客-个人主页',
            show: false,

        },
        component: () => import('../views/index.vue'),

    },
    {
        path: '/project',
        meta: {
            title: '再度重相逢的个人博客-项目记录',
            show: true,

        },
        component: () => import('../views/project.vue'),

    },
    {
        path: '/question',
        meta: {
            title: '再度重相逢的个人博客-问题记录',
            show: true,

        },
        component: () => import('../views/question.vue'),

    },
]

/**
 * 定义返回模块
 * vite.config.js
    base: '/zh-admin/',
 */
const router = createRouter({
    history: createWebHistory(),  // 设置为history模式，就是路径里面没有#,  createWebHashHistory 是默认的，括号里面的就是基础路径，可以理解为项目名称，就是请求路径的基础url
    // 
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    let title: any = to.meta.title;
    window.document.title = title;
    // 让页面回到顶部
    document.documentElement.scrollTop = 0

    next()
})
// 全局后置守卫
router.afterEach((to, from) => {


})
export default router