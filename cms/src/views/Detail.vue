<template lang="html">

  <div class="car">
    <v-header class="header">
      <h1 slot="title">一号纸巾机</h1>
    </v-header>
    <router-link class="my-indent" :to="{ name: '收益页'}">
      <div class="top_yue">
        <p>今日收益（元）</p>
        <p>38.8元</p>
        <p>总收益：4779元</p>
      </div>
    </router-link>
    <div class="top_all">
      <div>工作状态：<span class="prompt-word">在线</span></div>
      <div>纸量：<span class="prompt-word">有纸</span></div>
    </div>
    <!--<v-footer/>-->
    <router-link :to="{ name: '管理页'}"  class="section1-banner">
      <mt-button class="btn" type="primary">管理该设备</mt-button>
    </router-link>
  </div>
</template>

<script>
  import Footer from '@/common/_footer.vue'
  import Header from '@/common/_header.vue'

  export default {
    components: {

      'v-header': Header,
      'v-footer': Footer
    },

    computed: {},
    mounted() {

    }

  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';

  .mint-header {
    padding: 6.8vw 4.8vw;
    background-color: #fff;
    color: #333 !important;
    .fz(font-size, 40) !important;
  }

  .car {
    .top_yue {
      text-align: center;
      padding: 10px 0;
      background-color: rgb(135, 204, 90);
      color: white;
      padding-bottom: 6vw;
      > p:first-child {
        font-size: 14px;
      }
      > p:nth-child(2) {
        font-size: 24px;
        margin-top: 5vw;
      }
      > p:nth-child(3) {
        font-size: 18px;
        margin-top: 5vw;
      }
    }

    .top_all {
      display: flex;
      text-align: center;
      padding: 3vw;

      border-bottom: 1px solid rgb(220,220,220);
      div {
        flex: 1;
      }
      div:nth-child(2) {
        border-left: 1px solid rgb(220,220,220);
      }
    }
    .btn {
      width: 90%;
      margin-left: 5%;
      margin-top: 6vw
    }
    .prompt-word{
      color: #ec603c;
    }
  }
</style>
