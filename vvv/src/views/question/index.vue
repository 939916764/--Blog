<template>
  <div class="content">


    <div class="mainbox">

      <div class="left"></div>

      <div class="right">

        <el-timeline>
          <el-timeline-item :timestamp="item.time" placement="top" v-for="(item, index) in list.data" :key="index">
            <el-card>
              <h4>{{ item.title }}</h4>
              <p v-html="item.introduce"></p>

            </el-card>
          </el-timeline-item>

        </el-timeline>

      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, onMounted, reactive } from "vue";
import { BlogListApi } from "../../api/index"
import { useRouter } from 'vue-router';
import { ElMessage, ElTimeline, ElTimelineItem, ElCard } from 'element-plus'



let list = reactive({
  data: [
    {
      time: '2020/6',
      title: '广西五建',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '盈建科自动化测试系统',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '盈建科轻量化',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '盈建科桥梁',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '盈建科学堂',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '盈建科授权管理系统',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '盈建科内部工单',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '冰雪峰会h5',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '移动调查问卷',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '移动账单h5',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '移动账单h5',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '国家博物馆',
      introduce: '简介：1111',
    },
    {
      time: '2020/6',
      title: '国家大剧院管弦乐队',
      introduce: '简介：1111',
    },
    {
      time: '2020/5',
      title: '嘉法帮',
      introduce: '简介：1111',
    },
    {
      time: '2020/5',
      title: '相聚资本',
      introduce: '简介：1111',
    },
    {
      time: '2020/4',
      title: '雅迪官网',
      introduce: '简介：1111',
    },
    {
      time: '2020/2-2020/10',
      title: '国家大剧院edm',
      introduce: '简介：国家大剧院电子邮件营销,表格布局,每月的演出推荐,周边商品链接推荐,门票链接',
    },
    {
      time: '2020/2',
      title: '瑞思英语',
      introduce: '地址：http://www.risecenter.com/</br>简介：jq+h5+css,引入百度地图,实现门店标记,结合省市区实现查询门店地址',
    },
    {
      time: '2019/10',
      title: '奥星官网',
      introduce: '地址：http://www.austar.com.cn/</br>简介：jq+h5+css,20+页面,使用了animation,transform,实现特效',
    },
    {
      time: '2019/7',
      title: '北京国际体育电影周',
      introduce: '地址：http://www.sportsfilm.cn/</br>简介：jq+h5+css,人生中第一个线上项目,有很大的满足感,很开心',
    },

  ]
});
let form = reactive({
  title: '',
})




//生命周期
onMounted(() => {

});

</script>

<style lang="less" scoped>
@import "./index.scss";
</style>