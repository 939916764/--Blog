<script lang="ts" setup>
</script>

<template>
  <div class="content">
    <div class="mainbox">
      <div class="left">
        <div class="rowbox">
          <div class="top">
            <div class="title">[原创]12321313</div>
            <div class="date">2020/1/1</div>
          </div>
          <div class="bottom">
            <div class="img"><img src="" alt="" /></div>
            <div class="introduce">
              这篇文章是为了介绍自己自学用过的Java视频资料。本套整合教程总共180+G，共450+小时。考虑到绝大部分视频至少要看两遍，而且视频总时长并不代表学习时长，所以零基础初学者总学习时间大约为：600小时视频时长
              + 100小时理解 +
              100小时练习，至少需要800小时。你可能觉得自己能一天学习8小时，实际上平均下来每天能学4小时都算厉害了。总会有各种原因，比如当天内容太难，公司聚会，要出差等等。如果周末你也是坚持学习，那么最理想状况下，6个半月就可以学完，达到工作后能被人带的水平。但我知道那其实基本不可能。
            </div>
          </div>
        </div>

        <div class="rowbox">
          <div class="top">
            <div class="title">[原创]12321313</div>
            <div class="date">2020/1/1</div>
          </div>
          <div class="bottom">
            <div class="img"><img src="" alt="" /></div>
            <div class="introduce">
              这篇文章是为了介绍自己自学用过的Java视频资料。本套整合教程总共180+G，共450+小时。考虑到绝大部分视频至少要看两遍，而且视频总时长并不代表学习时长，所以零基础初学者总学习时间大约为：600小时视频时长
              + 100小时理解 +
              100小时练习，至少需要800小时。你可能觉得自己能一天学习8小时，实际上平均下来每天能学4小时都算厉害了。总会有各种原因，比如当天内容太难，公司聚会，要出差等等。如果周末你也是坚持学习，那么最理想状况下，6个半月就可以学完，达到工作后能被人带的水平。但我知道那其实基本不可能。
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="aside">
          <div class="search">
            <input type="text" />
            <img src="../assets/img/search.png" alt="" />
          </div>
          <div class="type"><span>1</span></div>
          <div class="type"><span>2</span></div>
          <div class="type"><span>3</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.content {
  background-color: #2e2e2e;
  min-height: 100vh;

  .mainbox {
    display: flex;
    justify-content: space-between;
    .left {
      width: calc(100% - 300px - 20px);
      .rowbox {
        background-color: #fff;
        padding: 20px 30px 25px 30px;
        position: relative;

        margin-top: 20px;
        .top {
          border-bottom: 1px solid #909399;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            font-size: 18px;
            padding: 5px 0;
          }
          .date {
            font-size: 12px;
            color: #e8e9e7;
          }
        }
        .bottom {
          display: flex;
          justify-content: space-between;

          margin-top: 20px;
          .img {
            width: 300px;
            height: 180px;
            overflow: hidden;
            background-color: #f7f7f7;
            margin-right: 20px;
          }
          .introduce {
            padding-top: 6px;
            line-height: 24px;

            flex-shrink: 20000;
          }
        }
      }
    }
    .right {
      width: 300px;
      .aside {
        background-color: #fff;
        margin-top: 20px;
        .type {
          height: 40px;
          cursor: pointer;
          span {
            margin: 0 20px;
            padding: 0 20px;
            height: 100%;
            display: block;
            line-height: 40px;
            border-bottom: 1px solid #f7f7f7;
          }
          &:last-child {
            span {
              border-bottom: none;
            }
          }

          &:hover {
            background-color: #f8f9f7;
            border-right: 4px solid #000b23;
          }
        }
        .search {
          padding: 20px;
          background-color: grey;
          position: relative;
          input {
            display: block;
            height: 40px;
            padding: 0 20px;
            background-color: #fff;
            border-radius: 40px;
            position: relative;
            z-index: 5;
            width: 100%;
          }
          img {
            width: 24px;
            position: absolute;
            right: 30px;
            top: 0;
            bottom: 0;
            margin: auto;
            z-index: 222;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>