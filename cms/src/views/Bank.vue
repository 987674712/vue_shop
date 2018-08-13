<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header class="header">
      <h1 slot="title">提现管理</h1>
    </v-header>
    <div class="top">
      <div class="title">绑定银行卡</div>
      <div class="ml">
        <a class="mint-cell mint-field">
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title"><!----> <span class="mint-cell-text">请选择银行：</span> <!----></div>
            <div class="mint-cell-value" style="position: relative">
              <!--<span style="position: absolute">{{city}}</span>-->
              <select name="options" class="mint-field-core" v-model="params.bankCode" @change="setBank" style="position: absolute">
                <!--<option v-bind:value="">{{item.name}}</option>-->
                <option v-for="item in bankList" v-bind:value="item.id">{{item.name}}</option>
              </select>
              <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
              <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span>
              <div class="mint-field-other"></div>
            </div></div>
          <div class="mint-cell-right"></div>
        </a>
        <mt-field v-model="params.realName" label="银行开户名" placeholder="请输入银行开户名"></mt-field>
        <mt-field v-model="params.payAccount" label="银行卡账号" placeholder="请输入银行卡账号"></mt-field>
      </div>

      <section style="margin-top: 20px;text-align: center">
        <mt-button style='height:30px;width: 70%;margin: auto' @click="push" type="primary" size="large">确定</mt-button>
      </section>
      <!--<div class="title">绑定支付宝</div>-->
      <!--<div class="ml">-->
        <!--<mt-field label="支付宝账号"></mt-field>-->
        <!--<mt-field label="支付宝姓名"></mt-field>-->
      <!--</div>-->
      <!--<mt-button style="width: 100%;margin-top: 20px" type="primary">确定</mt-button>-->
    </div>

  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      'v-header': Header
    },
    data() {
      return {
        captcha: '',
        params:{
          bankCode: 1002,
          payAccount: '',
          realName: '',
          payChannelType:3
        },
        bankList:[
          {name:'工商银行',id:1002},
          {name:'农业银行',id:1005},
          {name:'中国银行',id:1026},
          {name:'建设银行',id:1003},
          {name:`招商银行`,id:1001},
          {name:`邮储银行`,id:1066},
          {name:`交通银行`,id:1020},
          {name:`浦发银行`,id:1004},
          {name:`民生银行`,id:1006},
          {name:`兴业银行`,id:1009},
          {name:`平安银行`,id:1010},
          {name:`中信银行`,id:1021},
          {name:`华夏银行`,id:1025},
          {name:`广发银行`,id:1027},
          {name:`光大银行`,id:1022},
          {name:`北京银行`,id:1032},
          {name:`宁波银行`,id:1056}
        ]
      }
    },

    methods: {
      onValuesChange: function () {

      },
      setBank:function(ele){
        this.bankId = ele.target.value
      },
      push:function () {
        this.$api({
          method: 'post',
          url: '/api/v1/user/editTransfer',
          data:this.params
        }).then((response) => {
          var that = this
          if(response.data.code === 1000){
            Toast('修改成功')
            setTimeout(function () {
              that.$router.go(-1)
            }, 1000)
          }else {
            Toast(response.data.message)
          }
        }).catch(function (error) {

        });
      }
    },
    beforeCreate() {
      this.$api({
        method: 'get',
        url: '/api/v1/user/transfer/'+this.Local.getLocal('user').id
      }).then((response) => {
        if(response.data.code === 1000){
          this.params = response.data.data
        }
      }).catch(function (error) {

      });
    }
  }
</script>


<style lang="less" scoped>
  .index {
    width: 100%;
    padding-bottom: 14vw;
  }

  .title {
    line-height: 2.5em;
    padding: 0 5px;
    color: rgb(51, 51, 51);
  }

  .top {
    padding: 10px;
  }

  .ml {
    border-radius: 10px;
    overflow: hidden;
  }
</style>
<style>
  .mint-cell:not(:last-child) {
    border-bottom: 1px solid rgb(220, 220, 220);
  }
</style>
