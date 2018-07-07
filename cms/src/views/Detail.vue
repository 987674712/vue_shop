<template lang="html">

  <div class="car">
    <v-header class="header">
      <h1 slot="title">一号纸巾机</h1>
    </v-header>
    <div class="top_yue">
      今日收益（元）<br/>
      38.8元<br/>
      总收益：779元
    </div>
    <div class="top_all">
      <div>工作状态：在线</div>
      <div>纸量：有纸</div>
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
      line-height: 1.8em;
      border-top: 1px solid #999999;
    }

    .top_all {
      display: flex;
      text-align: center;
      border-top: 1px solid #999999;
      border-bottom: 1px solid #999999;
      line-height: 1.8em;
      div {
        flex: 1;
      }
      div:nth-child(2) {
        border-left: 1px solid #999999;
      }
    }
    header h1 {
      margin-right: 30vw !important;
    }
    .btn {
      width: 90%;
      margin-left: 5%;
      margin-top: 6vw
    }
  }
</style>
