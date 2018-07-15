<template lang="html">

  <div class="car">
    <v-header class="header">
      <h1 slot="title">收益列表</h1>
    </v-header>
    <div class="ml_shebei">
      <router-link :to="{ name: ''}" class="section1-banner">
        <div class="shebei">
          <p>推荐人</p>
          <p>+200</p>
        </div>
      </router-link>
      <router-link :to="{ name: ''}" class="section1-banner">
        <div class="shebei">
          <p>机器收入</p>
          <p>+18.5</p>
        </div>
      </router-link>
      <router-link :to="{ name: ''}" class="section1-banner">
        <div class="shebei">
          <p>机器收入</p>
          <p>+18.5</p>
        </div>
      </router-link>
      <router-link :to="{ name: ''}" class="section1-banner">
        <div class="shebei">
          <p>机器收入</p>
          <p>+18.5</p>
        </div>
      </router-link>
      <router-link :to="{ name: ''}" class="section1-banner">
        <div class="shebei">
          <p>机器收入</p>
          <p>+18.5</p>
        </div>
      </router-link>
    </div>
    <!--<v-baseline></v-baseline>-->
    <!--<v-footer></v-footer>-->
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


  .car {
    width: 100%;
    background-color: #F8FCFF;
  }
  .ml_shebei {
    padding: 0 4vw;
    background-color: rgb(242,242,242);
    .shebei {
      position: relative;
      overflow: hidden;
      padding: 5vw 3px 1vw;
      border-bottom: 1px solid rgb(220,220,220);
      p {
        /*line-height: 5em;*/
      }
      p:first-child {
        line-height: 1.8em;
        display: inline;
        float: left;
      }
      p:nth-child(2) {
        display: inline;
        float: right;
        margin-left: 30px;
        color: rgb(236,96,60);
        line-height: 1.8em;
      }
      span {
        position: absolute;
        left: 10px;
        bottom: 1em;
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
