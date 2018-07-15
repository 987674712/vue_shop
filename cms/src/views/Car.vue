<template lang="html">

  <div class="car">
    <v-header class="header">
      <h1 slot="title">设备列表</h1>
    </v-header>

    <div class="ml_shebei">
      <router-link :to="{ name: '详情页'}" class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>有纸巾</p>
          <span>地址：北京市东城区崇文门大街</span>
          <img src="../image/icon/jt.png" alt="">
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}" class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>有纸巾</p>
          <span>地址：北京市东城区崇文门大街</span>
          <img src="../image/icon/jt.png" alt="">
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}" class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>有纸巾</p>
          <span>地址：北京市东城区崇文门大街</span>
          <img src="../image/icon/jt.png" alt="">
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}" class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>有纸巾</p>
          <span>地址：北京市东城区崇文门大街</span>
          <img src="../image/icon/jt.png" alt="">
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}" class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>有纸巾</p>
          <span>地址：北京市东城区崇文门大街</span>
          <img src="../image/icon/jt.png" alt="">
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}" class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>有纸巾</p>
          <span>地址：北京市东城区崇文门大街</span>
          <img src="../image/icon/jt.png" alt="">
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}" class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>有纸巾</p>
          <span>地址：北京市东城区崇文门大街</span>
          <img src="../image/icon/jt.png" alt="">
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}" class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>有纸巾</p>
          <span>地址：北京市东城区崇文门大街</span>
          <img src="../image/icon/jt.png" alt="">
        </div>
      </router-link>
      <router-link :to="{ name: '管理页'}" class="section1-banner">
        <mt-button style="width: 100%;margin-top: 10px" class="btn" type="primary">新增设备</mt-button>
      </router-link>
    </div>


    <!--<v-footer/>-->
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

    computed: {
      count() {
        return this.$store.state.detail.count
      }
    },
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
    width: 100%;
    padding-bottom: 14vw;
  }

  .ml_shebei {
    padding: 0 4vw;
    background-color: rgb(242,242,242);
    .shebei {
      position: relative;
      overflow: hidden;
      padding: 7vw 10px 10vw;
      border-bottom: 1px solid rgb(220,220,220);
      p {
        /*line-height: 5em;*/
      }
      p:first-child {
        line-height: 1.8em;
        display: inline;
      }
      p:nth-child(2) {
        display: inline;
        margin-left: 30px;
        color: rgb(236,96,60);
        font-size: 14px;
      }
      span {
        position: absolute;
        left: 10px;
        bottom: 1em;
      }
      img{
        width: 13px;
        height: 20px;
        position: absolute;
        right: 0;
        top: 40px;
      }
    }
  }

  .add {
    position: fixed;
    right: 20px;bottom: 18vw;width: 50px;height: 50px;
    background-color: white;z-index: 9999;border-radius: 50%;
  }
</style>
<style>

  .btn-1{
    width: 100%;
  }
</style>
