<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header/>
    <div class="top_yue">
      今日收益（元）<br/>
      38.8元<br/>
      余额：4779元
    </div>
    <div class="top_all">
      <div>累计收益：17892元</div>
      <div>昨日收益：123元</div>
    </div>
    <div class="title">设备列表（12台）</div>
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
  import Header from '@/components/index/header.vue'
  import Swiper from '@/components/index/swiper.vue'
  import Service from '@/components/index/service.vue'
  import Section1 from '@/components/index/section1.vue'
  import Section2 from '@/components/index/section2.vue'
  import Section3 from '@/components/index/section3.vue'
  import Section4 from '@/components/index/section4.vue'
  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import index from '@/http/mock.js' //模拟数据
  export default {
    components: {
      'v-header': Header,
      'v-swiper': Swiper,
      'v-service': Service,
      'v-section1': Section1,
      'v-section2': Section2,
      'v-section3': Section3,
      'v-section4': Section4,
      'v-baseline': Baseline,
      'v-footer': Footer
    },
    data() {
      return {
        datas: {
          section1: {},
          section2: {},
          section3: {},
          section4: {},
          swiper: []
        },
        loading: true
      }
    },

    beforeCreate() {
      this.$api({
        method: 'post',
        url: '/index'
      }).then((response) => {
        this.datas = response.data;
        console.log(JSON.stringify(response.data.section4))
      }).catch(function (error) {
        alert(error)
      })
    }
  }
</script>


<style lang="less" scoped>
  .index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
  }

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

  .title{
    line-height: 2.5em;
    border-bottom: 1px solid #999999;
  }
  .ml_shebei{
    .shebei{
      position: relative;
      overflow: hidden;
      padding: 0 10px 1em;
      border-bottom: 1px solid #999999;
      p{
        line-height: 5em;
      }
      p:first-child{
        float: left;
      }
      p:nth-child(2){
        float: right;
      }
      span{
        position: absolute;
        right: 10px;
        bottom: 1em;
      }
    }
  }
</style>
