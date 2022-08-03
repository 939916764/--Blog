
<script lang="ts" setup>
import { ref, onMounted } from "vue";

let active: boolean = ref(false);
function menuClick(): void {
  active.value = !active.value;
}
onMounted(() => {
  var canvas: any = document.getElementById("myCanvas");
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");

  //窗口改变时修改画布大小
  window.onresize = function (): void {
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight;
  };

  //创建小球的构造函数
  function Ball(): void {
    //横纵坐标
    this.x = randomNum(3, canvas.width - 3);
    this.y = randomNum(3, canvas.height - 3);
    //半径
    this.r = randomNum(2, 5);

    //颜色
    // this.color = randomColor();
    this.color = "#88f7fd";
    //平移速度，正负区间是为了移动方向的多样性
    this.speedX = randomNum(-3, 3) * 0.2;
    this.speedY = randomNum(-3, 3) * 0.2;
  }
  Ball.prototype = {
    //绘制小球
    draw: function () {
      ctx.beginPath();
      ctx.globalAlpha = 1;
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    },
    //小球移动
    move: function (): void {
      this.x += this.speedX;
      this.y += this.speedY;
      //为了合理性,设置极限值(判断边界值，让圆球始终保证在画面内)
      if (this.x <= 3 || this.x > canvas.width - 3) {
        this.speedX *= -1;
      }
      if (this.y <= 3 || this.y >= canvas.height - 3) {
        this.speedY *= -1;
      }
    },
  };
  //存储所有的小球
  var balls = [];
  //创建100个小球
  for (var i = 0; i < 100; i++) {
    var ball = new Ball();
    balls.push(ball);
  }
  main();

  function main(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //鼠标移动绘制线
    mouseLine();
    //小球与小球之间自动画线
    drawLine();
    //使用关键帧动画，不断的绘制和清除
    window.requestAnimationFrame(main);
  }
  //添加鼠标移动事件
  //记录鼠标移动时的mouseX坐标
  var mouseX;
  var mouseY;
  canvas.onmousemove = function (e) {
    // var ev = event || e;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  };
  //判断是否划线

  function drawLine(): void {
    for (var i = 0; i < balls.length; i++) {
      balls[i].draw();
      balls[i].move();
      for (var j = 0; j < balls.length; j++) {
        if (i != j) {
          if (
            Math.sqrt(
              Math.pow(balls[i].x - balls[j].x, 2) +
                Math.pow(balls[i].y - balls[j].y, 2)
            ) < 80
          ) {
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.strokeStyle = "white";
            ctx.globalAlpha = 0.2;
            ctx.stroke();
          }
        }
      }
    }
  }
  //使用鼠标移动划线
  function mouseLine(): void {
    for (var i = 0; i < balls.length; i++) {
      if (
        Math.sqrt(
          Math.pow(balls[i].x - mouseX, 2) + Math.pow(balls[i].y - mouseY, 2)
        ) < 80
      ) {
        ctx.beginPath();
        ctx.moveTo(balls[i].x, balls[i].y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = "white";
        ctx.globalAlpha = 0.8;
        ctx.stroke();
      }
    }
  }
  //随机函数
  function randomNum(m, n): number {
    return Math.floor(Math.random() * (n - m + 1) + m);
  }
  //随机颜色
  function randomColor(): string {
    return (
      "rgb(" +
      randomNum(0, 255) +
      "," +
      randomNum(0, 255) +
      "," +
      randomNum(0, 255) +
      ")"
    );
  }
});
</script>
<template>
  <div id="index">
    <div class="section">
      <div class="aside">
        <h3>再度重相逢-Blog</h3>
        <p>白日依山尽,黄河入海流。 欲穷千里目，更上一层楼。</p>
        <router-link to="/home"> Enter Blog</router-link>
      </div>

      <img src="../assets/img/down.png" alt="再度重相逢" class="down" />
      <canvas id="myCanvas"></canvas>
    </div>

    <div class="type mainbox">
      <h3>问题记录</h3>
      <div class="row">
        <dl>
          <dt><img src="../assets/img/1.png" alt="" /></dt>
          <dd>
            <h4>1</h4>
            <div class="date">2020/1/2</div>
            <p>qwdddddddddd</p>
          </dd>
        </dl>
        <dl>
          <dt><img src="../assets/img/1.png" alt="" /></dt>
          <dd>
            <h4>1</h4>
            <div class="date">2020/1/2</div>
            <p>qwdddddddddd</p>
          </dd>
        </dl>
        <dl>
          <dt><img src="../assets/img/1.png" alt="" /></dt>
          <dd>
            <h4>1</h4>
            <div class="date">2020/1/2</div>
            <p>qwdddddddddd</p>
          </dd>
        </dl>
      </div>
    </div>

    <div class="sectionBottom">
      <div class="row">
        <router-link :to="{ path: '/project' }" class="button">
          项目记录</router-link
        >
        <router-link :to="{ path: '/question' }" class="button"
          >问题记录
        </router-link>
      </div>
    </div>

    <div class="indexBottom mainbox">
      <h3>再度重相逢个人博客</h3>
      <p>希望我们每一天都有糖吃</p>
    </div>

    <div class="menu" @click="menuClick" :class="active ? 'active' : ''">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="poper" v-if="active">
      <div class="nav">
        <router-link :to="{ path: '/' }"> 个人首页</router-link>
        <router-link :to="{ path: '/project' }"> 项目记录</router-link>
        <router-link :to="{ path: '/question' }">问题记录 </router-link>
      </div>
    </div>
  </div>
</template>




<style lang="less" scoped>
#index {
  .section {
    width: 100%;
    height: 100vh;
    background-color: #151515;
    background-image: url("../assets/img/section.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;
    .aside {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);

      h3 {
        color: #fff;
        font-size: 28px;
        margin-bottom: 20px;
      }
      p {
        color: #fff;
        font-size: 16px;
        letter-spacing: 10px;
        margin-bottom: 40px;
      }
      a {
        display: block;
        padding: 0 18px;
        border-radius: 4px;
        background-color: #1e9fff;
        height: 38px;
        line-height: 38px;
        color: #fff;
      }
    }
    .down {
      display: block;
      width: 48px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 20px;
      margin: auto;
    }
  }
  .type {
    padding: 100px 0;
    background-color: #fff;
    h3 {
      font-size: 32px;
      padding-bottom: 30px;
      position: relative;
      font-weight: 500;
      text-align: center;

      &:after {
        position: absolute;
        width: 50px;
        height: 2px;
        content: "";
        left: 50%;
        margin-left: -25px;
        bottom: -1px;
        background: #00c2ff;
      }
    }
    .row {
      display: flex;
      justify-content: space-between;
      dl {
        background: #faf9f9;
        width: 32%;
        margin-right: 1%;
        margin-top: 50px;
        &:last-child {
          margin-right: 0;
        }
        dt {
          height: 244px;
          overflow: hidden;
        }

        dd {
          padding: 30px 15px;
          h4 {
            margin-bottom: 10px;
            font-size: 14px;
          }
          .date {
            color: #bbb;
            font-size: 12px;
            margin-bottom: 15px;
          }
          p {
            color: #999;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
    }
  }

  .sectionBottom {
    overflow: hidden;
    width: 100%;
    padding: 200px 0;
    background-image: url("../assets/img/1.png");
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    .row {
      display: flex;
      justify-content: center;
      align-items: center;
      .button {
        width: 200px;
        height: 46px;
        margin: 10px;
        border: 1px solid #f7f7f7;
        text-align: center;
        line-height: 46px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .indexBottom {
    padding: 100px 0;
    text-align: center;
    h3 {
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    p {
    }
  }

  .menu {
    position: fixed;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    right: 55px;
    top: 40px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;

    z-index: 102;
    &:hover {
      background-color: #000b23;
      transition: all 0.5s;
    }
    &.active {
      span:last-child {
        display: none;
      }
      span:first-child {
        transform: rotate(45deg);
        transition: all 0.5s;
        margin-top: 18px;
      }
      span:nth-child(2) {
        transform: rotate(-45deg);
        transition: all 0.5s;
        margin-top: -2px;
      }
    }
    span {
      display: block;
      background: #fff;
      width: 26px;
      height: 2px;
      line-height: 10px;
      margin: 0 auto;
      margin-top: 5px;
      transition: all 0.5s;
      &:first-child {
        margin-top: 12px;
      }
    }
  }
  .poper {
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: all 0.5s;
    &::before {
      content: "";
      width: 60%;
      height: 100%;
      background: #fff;
      position: fixed;
      top: 0;
      z-index: 11;
      background-image: linear-gradient(46deg, #fff, #f1f2f0);
      right: 0;
      transform: skew(-12deg) translateX(40%);
    }

    .nav {
      position: fixed;
      z-index: 222;
      top: 0;
      bottom: 0;
      right: 0;

      display: flex;
      flex-direction: column;
      justify-content: center;
      a {
        padding: 20px;
        font-size: 20px;
        position: relative;
        &:hover {
          color: #000b23;
          &:before {
            background-color: #000b23;
            right: 0;
          }
        }

        &:before {
          -webkit-transition: all 0.3s linear;
          transition: all 0.3s linear;
          content: "";
          height: 1px;
          background-color: transparent;
          position: absolute;
          top: 50%;
          left: 0;
          right: 105px;
        }
      }
    }
  }
}
</style>