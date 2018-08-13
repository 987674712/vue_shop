<template lang="html">

  <div class="car">
    <v-header class="header">
      <h1 slot="title">{{data.building}}</h1>
    </v-header>
    <!--<router-link class="my-indent" :to="{ name: '收益页'}">-->
      <!--<div class="top_yue">-->
        <!--<p>今日收益（元）</p>-->
        <!--<p>38.8元</p>-->
        <!--<p>总收益：4779元</p>-->
      <!--</div>-->
    <!--</router-link>-->
    <div class="top_all">
      <div>工作状态：<span class="prompt-word">
        {{
                      data.washStatus === 0?'出货成功':
                      data.washStatus === 1?'出货失败':
                      data.washStatus === 2?'设备异常':
                      data.washStatus === 16?'设备正常':
                      data.washStatus === 17?'设备缺货':
                      '设备异常'
                      }}
      </span></div>
      <div>纸量：<span class="prompt-word">
        {{data.washStatus === 17?'缺纸':'有纸'}}
      </span></div>
    </div>
    <div class="ml-detail">
      <div><p>设备名称：</p>{{data.name}}</div>
      <div><p>设备编号：</p>{{data.imei}}</div>
      <div><p>设备号：</p>{{data.deviceCode}}</div>
      <div><p>经度：</p>{{data.longitude}}</div>
      <div><p>维纬度：</p>{{data.latitude}}</div>
      <div><p>设备类型：</p>{{data.deviceType === 1?'纸巾机':''}}</div>
      <div><p>省：</p>{{data.province}}</div>
      <div><p>城市：</p>{{data.city}}</div>
      <div><p>区域：</p>{{data.region}}</div>
      <div><p>店铺名称：</p>{{data.building}}</div>
      <div><p>具体地址：</p>{{data.address}}</div>
      <!--<div><p>购买金额：</p>{{data.amount}}</div>-->
    </div>

    <!--<v-footer/>-->
    <router-link :to="{ path: '/search/'+id}"  class="section1-banner">
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
    data() {
      return {
        data:{},
        list:[],
        loading: true,
        id:this.$route.params.id
      }
    },
    computed: {},
    mounted() {
      this.$api({
        method: 'get',
        url: `/api/v1/device/${this.$route.params.id}`
      }).then((response) => {
        // this.Local.setLocal('user',response.data.data)
        if(response.data.code = 1000){
          this.data = response.data.data

        }
      })
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
    .ml-detail>div{
      display: flex;
      text-align: right;
      padding: 3vw;
      border-bottom: 1px solid rgb(220,220,220);
      p{
        width: 5em;
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
