<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header/>
    <v-swiper :swiperData="swiper"/>
    <v-service/>
    <!--<v-section1 :list="datas.section1.list" :banner='datas.section1.banner'/>-->
    <!--<v-section2 :list="datas.section2.list" :banner='datas.section2.banner'/>-->
    <!--<v-section3/>-->
    <v-section4 :list="datas.data" :banner='datas.data'/>
    <!--<v-baseline/>-->
    <v-footer/>
  </div>
</template>

<script>
import Header from '@/components/index/header.vue'
import Swiper from '@/components/index/swiper.vue'
import Service from '@/components/index/service.vue'
import Section4 from '@/components/index/section4.vue'
import Footer from '@/common/_footer.vue'
export default {
  components: {
    'v-header': Header,
    'v-swiper': Swiper,
    'v-service': Service,
    'v-section4': Section4,
    'v-footer': Footer
  },
  data() {
    return {
      datas: {
        section1:{},
        section2:{},
        section3:{},
        section4:{},
        swiper:[]
      },
      swiper:['http://zhijin.97reader.com/static/lunbo.jpg'],
      loading: true
    }
  },

  beforeCreate() {
    this.$api({
      method: 'get',
      url: '/api/v1/product'
    }).then((response) => {
      this.datas = response.data;
      // console.log(JSON.stringify(response.data.section4))
    }).catch(function(error) {
      // alert(error)
    })
  }
}
</script>



<style lang="less" scoped>
.index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F2F2F2;
}
</style>
