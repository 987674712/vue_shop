<template lang="html">

  <div class="car">
    <v-header class="header">
      <h1 slot="title">设备列表</h1>
    </v-header>

    <div class="ml_shebei">
      <router-link v-for=" item in list.data" :to="{ path: '/detail/'+ item.id}" class="section1-banner">
        <div class="shebei">
          <p>{{item.building}}</p>
          <p>
            {{
            item.washStatus === 0?'出货成功':
            item.washStatus === 1?'出货失败':
            item.washStatus === 2?'电源未接通':
            item.washStatus === 16?'设备正常':
            item.washStatus === 17?'设备缺货':
            '设备异常'
            }}
          </p>
          <span>地址：{{item.address}}</span>
          <img src="../image/icon/jt.png" alt="">
        </div>
      </router-link>
      <router-link :to="{ path: '/search/:id'}" class="section1-banner">
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

    data() {
      return {
        list:[],
        data:{},
        loading: true
      }
    },
    computed: {
      count() {
        return this.$store.state.detail.count
      }
    },
    mounted() {
      this.$api({
        method: 'get',
        url: '/api/v1/device/userDevice'
      }).then((response) => {
        // this.Local.setLocal('user',response.data.data)
        if(response.data.code = 1000){
          this.list = response.data
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
