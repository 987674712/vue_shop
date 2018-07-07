<template lang="html">

  <div class="car">
    <mt-header title="设备管理">
    </mt-header>
    <router-link :to="{ name: '管理页'}"  class="section1-banner">
      <img class="add" src="../image/add.png" alt="">
    </router-link>
    <div class="ml_shebei">
      <router-link :to="{ name: '详情页'}"  class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>今日收益：3元 有纸巾》</p>
          <span>
          地址：北京市东城区崇文门大姐
        </span>
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}"  class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>今日收益：3元 有纸巾》</p>
          <span>
          地址：北京市东城区崇文门大姐
        </span>
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}"  class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>今日收益：3元 有纸巾》</p>
          <span>
          地址：北京市东城区崇文门大姐
        </span>
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}"  class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>今日收益：3元 有纸巾》</p>
          <span>
          地址：北京市东城区崇文门大姐
        </span>
        </div>
      </router-link>
      <router-link :to="{ name: '详情页'}"  class="section1-banner">
        <div class="shebei">
          <p>1号纸巾机</p>
          <p>今日收益：3元 有纸巾》</p>
          <span>
          地址：北京市东城区崇文门大姐
        </span>
        </div>
      </router-link>
    </div>
    <v-footer/>
  </div>
</template>

<script>
  import Footer from '@/common/_footer.vue'

  export default {
    components: {
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
    border-top: 1px solid #999999;
    .shebei {
      position: relative;
      overflow: hidden;
      padding: 0 10px 1em;
      border-bottom: 1px solid #999999;
      p {
        line-height: 5em;
      }
      p:first-child {
        float: left;
      }
      p:nth-child(2) {
        float: right;
      }
      span {
        position: absolute;
        right: 10px;
        bottom: 1em;
      }
    }
  }

  .add {
    position: fixed;
    right: 20px;bottom: 18vw;width: 50px;height: 50px;
  }
</style>
