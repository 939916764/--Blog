// 引入默认/出错时显示的图片
import noImg from '@/assets/img/imgLazy.svg'

//  指令的功能：实现图片的懒加载
const defineDirective = (app: { directive: (arg0: string, arg1: { mounted(el: HTMLImageElement, bindings: any): void }) => void }) => {
  // mylazy指令名称
  app.directive('imgLazy', {
    mounted(el: HTMLImageElement, bindings: { value: string }) {
      // el表示使用指令的DOM元素
      // bindings表示指令相关的信息是一个对象 如v-lazy="xxx",bindlings即是xxx对应的内容
      // 监听图片是否进入可视区
      const oberver = new IntersectionObserver(([{ isIntersecting }]) => {
        // true；进入可视区域，false：未进入可视区域
        if (isIntersecting) {
          // 1、给图片的src属性赋值图片的地址
          el.src = bindings.value
          // 2、取消图片的监听，默认是会一直监听的，如果不取消。就会一直执行
          oberver.unobserve(el)
          // 3、加载的图片失败了，显示默认的图片地址
          el.onerror = () => {
            el.src = noImg
          }
        }
      })
      // 监听dom元素
      oberver.observe(el)
    },
  })
}
export default {
  install(app: any) {
    // 自定义指令
    defineDirective(app)
  },
}