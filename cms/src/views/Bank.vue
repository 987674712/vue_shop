<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header class="header">
      <h1 slot="title">提现管理</h1>
    </v-header>
    <div class="title">绑定银行卡</div>
    <div>
      <mt-field label="请输入银行" >
        <!--<mt-picker style="width: 100%" :slots="slots" @change="onValuesChange"></mt-picker>-->
      </mt-field>
      <mt-field label="银行开户名" ></mt-field>
      <mt-field label="银行卡账号" ></mt-field>
    </div>
    <div class="title">绑定支付宝</div>
    <div>
      <mt-field label="支付宝账号" ></mt-field>
      <mt-field label="支付宝姓名" ></mt-field>
    </div>
    <div class="title">密码管理</div>
    <div>
      <mt-field label="提现密码" v-model="captcha"></mt-field>
    </div>
    <!--<v-footer/>-->
  </div>
</template>

<script>
  import Header from '@/common/_header.vue'

  export default {
    components: {
      'v-header': Header
    },
    data() {
      return {
        captcha:'',
        slots: [
          {
            flex: 1,
            values: ['2015-0155555555555', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1'
          }
        ]
      }
    },

    computed: {
      onValuesChange:function () {

      }
    },
    beforeCreate() {
    }
  }
</script>


<style lang="less" scoped>
  .index {
    width: 100%;
    padding-bottom: 14vw;
    background-color: #F8FCFF;
  }

  .title {
    line-height: 2.5em;
    padding: 0 3vw;
    border-bottom: 1px solid #999999;
  }
</style>
