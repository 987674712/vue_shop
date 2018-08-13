<template lang="html">

  <div class="car">
    <header>
      <h1>功能列表</h1>
    </header>
    <div class="main">
      <router-link class="my-indent" :to="{ name: '购物车页'}">
        <span class="my-indent-left">设备管理</span>
        <div class="my-indent-right">
          <!--<span>4985元</span>-->
          <i class="icon-go"></i>
        </div>
      </router-link>
      <router-link class="my-indent" :to="{ name: '团队页'}">
        <span class="my-indent-left">我的团队</span>
        <div class="my-indent-right">
          <span></span>
          <i class="icon-go"></i>
        </div>
      </router-link>
      <router-link class="my-indent" :to="{ name: '调试页'}">
        <span class="my-indent-left">测试工具</span>
        <div class="my-indent-right">
          <span></span>
          <i class="icon-go"></i>
        </div>
      </router-link>
    </div>
    <!--<v-baseline></v-baseline>-->
    <v-footer></v-footer>
  </div>
</template>

<script>

  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import Header from '@/common/_header.vue'
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer,
      'v-header': Header,
    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';
  @import '../assets/user/icon/carstyle.css';
  header {
    text-align: center;
    position: relative;
    height: 12vw;
    display: flex;
    align-items: center;
    background-color: white;
    h1 {
      .fz(font-size,34);
      letter-spacing: .2vw;
      float: left;
      color: #4caf50;
      margin-left: 5vw;
    }
    span,a {
      display: inline-block;
      .fz(font-size,46);
      transform: rotate(-180deg);
      &::before {
        color:#333;
      }
    }
  }

  .car {
    width: 100%;

    .main {
      padding: 0 3vw;
      background-color: rgb(242,242,242);
      .my-indent {
        border-bottom: 1px solid rgb(220,220,220);
        width: 100%;
        display: block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #333;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0 5vw;
        height: 15vw;
        line-height: 15vw;
        background-color: rgb(242,242,242);
        .bd();
        &:active {
          background-color: rgb(224, 227, 230)
        }

        .my-indent-right {
          span {
            display: inline-block;
            .fz(font-size, 28);
            color: rgba(0, 0, 0, .4);
            position: relative;
          }
          i {
            position: relative;
            top: .8vw;
          }
        }
      }

    }
  }
  /*图标大小不一，重新定义*/

  .icon-go {
    .fz(font-size, 36);
    &::before {
      color: #aba8a8;
    }
  }

  [class^="icon2-"],
  [class*=" icon2-"] {
    .fz(font-size, 50);
  }

  .icon2-service {
    .fz(font-size, 34);
  }

</style>
<style>
  .my-indent {
    border-bottom: 1px solid rgb(220,220,220)!important;}
</style>
