<template>
  <div class="address">
    <v-header>
      <h1 slot="title">我的邀请码</h1>
    </v-header>
    <div class="top">
      <router-link class="my-indent" :to="{ name: '活动页'}">
        <span class="toActive">
          活动规则
        </span>
      </router-link>

      <div>
        <div>
          <img :src="data.portrait?data.portrait:'http://zhijin.97reader.com/images/photo.jpg'" alt="">
          <span>
            {{data.nickName?data.nickName:'优领达'}}<br/>
            <a href="javascript:">
            {{data.mobile?data.mobile:'暂无'}}
            </a>
          </span>
        </div>
        <div class="qrcode">
          <img :src="data.qrCode?data.qrCode:'http://zhijin.97reader.com/images/qrcode.png'" alt="">
          <p style="font-size: 14px">
            长按二维码加入团队
          </p>
        </div>
      </div>
    </div>


    <!--<div style="">-->
    <!--<mt-picker :slots="slots" @change="onValuesChange" value-key="name"></mt-picker>-->
    <!--</div>-->
    <!--<div style="line-height: 2.5em;padding: 0 10px">-->
    <!--地址：{{province}}&nbsp;{{city}}-->
    <!--</div>-->
    <!--<div>-->
    <!--<mt-field v-model="userAddress" label="" placeholder="请输入详细地址"></mt-field>-->
    <!--</div>-->
    <!--<div>-->
    <!--<mt-field v-model="nickName" label="" placeholder="请输入收货人姓名"></mt-field>-->
    <!--</div>-->
    <!--<div>-->
    <!--<mt-field v-model="mobile" label="" placeholder="请输入手机号码"></mt-field>-->
    <!--</div>-->

  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import {Toast, Picker} from 'mint-ui'

  export default {
    components: {
      'v-header': Header
    },
    data() {
      return {
        data:this.Local.getLocal('user')
      }
    },
    methods: {

    },
    mounted() {

    },
    beforeCreate() {
      this.$api({
        method: 'get',
        url: '/api/v1/user/profile?userId=' + this.Local.getLocal('user').id
      }).then((response) => {
        this.Local.setLocal('user',response.data.data)
      })
    }
  }
</script>

<style lang="less" scoped>
  .top{
    background-color: #333333;
    width: 90%;
    position: absolute;
    padding: 20vw 5vw;
    .toActive{
      position: absolute;
      right: 5vw;top: 10.4vw;
      color: white;
      z-index: 999;
    }
    >div{
      background: white;
      padding: 20px;
      >div:first-child{
        overflow: hidden;
        img{
          width: 60px;
          height: 60px;
          float: left;
        }
        span{
          font-weight: 600;
          float: left;
          margin-left: 15px;
          color: #333333;
          font-size: 20px;
          margin-top: 3px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width: 63%;
          display: inline-block;
          >a{
            font-size: 16px;
            line-height: 33px;
            font-weight: 100;
          }
        }
      }
    }
  }
  .qrcode{
    padding-top: 8vw;
    text-align: center;
    >img{
    width: 100%;
    margin: auto;
  }
  }
</style>
<style>

</style>
