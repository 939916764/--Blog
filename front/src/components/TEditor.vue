<template>
  <editor v-model="myValue" :init="init" :disabled="disabled" :id="tinymceId"></editor>
</template>


<script setup lang="ts">
//JS部分
//在js中引入所需的主题和组件
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'; //引入编辑器图标icon，不引入则不显示对应图标
import 'tinymce/models/dom' // 这里是个坑 一定要引入

//在TinyMce.vue中接着引入相关插件
import "tinymce/icons/default/icons"
// import "tinymce/plugins/image" // 插入上传图片插件
// import "tinymce/plugins/media" // 插入视频插件
// import "tinymce/plugins/table" // 插入表格插件
// import "tinymce/plugins/lists" // 列表插件
// import "tinymce/plugins/wordcount" // 字数统计插件
import "tinymce/plugins/code" // 源码
// import "tinymce/plugins/fullscreen" //全屏

//接下来定义编辑器所需要的插件数据
import { reactive, ref } from "vue"
import { onMounted, defineEmits, watch } from "@vue/runtime-core"
import axios from 'axios'
// import { updateImg } from '@/api/order/order'
const emits = defineEmits(["getContent"])
//这里我选择将数据定义在props里面，方便在不同的页面也可以配置出不同的编辑器，当然也可以直接在组件中直接定义
const props = defineProps({
  value: {
    type: String,
    default: () => {
      return ""
    },
  },
  baseUrl: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // plugins: {
  //   type: [String, Array],
  //   default: "lists  table",
  // },//必填
  toolbar: {
    type: [String, Array],
    default:
      "codesample bold italic underline alignleft aligncenter alignright alignjustify | undo redo ",
  },//必填
})



//用于接收外部传递进来的富文本
const myValue = ref(props.value)
const tinymceId = ref("vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""))
//定义一个对象 init初始化
const init = reactive({
  selector: '#' + tinymceId.value, //富文本编辑器的id,
  skin_url: "/skins/ui/oxide", // skin路径，具体路径看自己的项目
  height: 400, //编辑器高度
  branding: false, //是否禁用“Powered by TinyMCE”
  menubar: false, //顶部菜单栏显示

  image_dimensions: false, //去除宽高属性
  // plugins: props.plugins,  //这里的数据是在props里面就定义好了的
  toolbar: props.toolbar, //这里的数据是在props里面就定义好了的
  font_formats:
    "宋体=宋体;仿宋=仿宋;楷体-GB2312=楷体-GB2312;黑体=黑体;微软雅黑=微软雅黑;隶书=隶书;幼圆=幼圆;Andale Mono=andale mono, monospace;Arial=arial,helvetica,sans-serif;Arial Black=arial black;Book Antiqua=book antiqua, palatino;Comic Sans MS=comic sans ms, sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia, palatino;Helvetica=helvetica;Impact=impact, sans-serif;Symbol=symbol;Tahoma=tahoma, arial, helvetica, sans-serif;Terminal=terminal, monaco, monospace;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms, geneva;Verdana=verdana, geneva;Webdings=webdings;Wingdings=wingdings;sans-serif=sans-serif",
  fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px', //文字大小
  // paste_convert_word_fake_lists: false, // 插入word文档需要该属性
  external_plugins: {
    powerpaste: "/tinymce/plugin.min.js",
  },
  powerpaste_word_import: "merge", // 参数可以是propmt, merge, clear，效果自行切换对比
  powerpaste_html_import: "merge", // propmt, merge, clear
  powerpaste_allow_local_images: true,
  paste_data_images: true,


  paste_webkit_styles: "all",
  paste_merge_formats: true,
  nonbreaking_force_tab: false,
  paste_auto_cleanup_on_paste: false,
  file_picker_types: 'file',
  content_css: '/skins/content/default/content.css', //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
  //图片上传
  // images_upload_handler: (blobInfo: any, progress: any) => new Promise((resolve, reject) => {

  //   if (blobInfo.blob().size / 1024 / 1024 > 2) {
  //     reject({ message: '上传失败，图片大小请控制在 2M 以内', remove: true })
  //     return
  //   } else {
  //     const ph = import.meta.env.VITE_BASE_PATH + ":" + import.meta.env.VITE_SERVER_PORT + "/"
  //     let params = new FormData()
  //     params.append('file', blobInfo.blob())

  //     let config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",

  //       }
  //     }

  //     axios.post('xxxx', params, config).then(res => {
  //       if (res.data.code == 200) {
  //         resolve(ph + res.data.msg)  //上传成功，在成功函数里填入图片路径
  //       } else {
  //         reject('HTTP Error: 上传失败' + res.data.code);
  //         return
  //       }
  //     }).catch(() => {
  //       reject('上传出错，服务器开小差了呢')
  //       return
  //     })
  //   }
  // }),

  // 文件上传
  file_picker_callback: (callback: any, value: any, meta: any) => {
    // Provide file and text for the link dialog
    if (meta.filetype == 'file') {
      callback('mypage.html', { text: 'My text' });
    }

    // Provide image and alt text for the image dialog
    if (meta.filetype == 'image') {
      callback('myimage.jpg', { alt: 'My alt text' });
    }

    // Provide alternative source and posted for the media dialog
    if (meta.filetype == 'media') {
      callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
    }
  }
})

//监听外部传递进来的的数据变化
watch(
  () => props.value,
  () => {
    myValue.value = props.value
    emits("getContent", myValue.value)
  }
)
//监听富文本中的数据变化
watch(
  () => myValue.value,
  () => {
    emits("getContent", myValue.value)
  }
)
//在onMounted中初始化编辑器
onMounted(() => {
  tinymce.init({})
})
</script>

