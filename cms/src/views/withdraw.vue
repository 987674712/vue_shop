<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header class="header">
      <h1 slot="title">余额提现</h1>
    </v-header>
    <div class="top">
      <router-link class="my-indent" :to="{ name: '财务页'}">
      <div class="top-title">
        <div>到账方式</div>
        <div>
            {{params.bankCode === '请设置银行卡信息'?params.bankCode:params.bankCode+'（'}}
            {{params.payAccount.substring(params.payAccount.length-4,params.payAccount.length)}}
            {{params.bankCode === '请设置银行卡信息'?"":')'}}
            <br/>
          <!--<span style="color: rgb(128,128,128)">24小时到账</span>-->
        </div>
        <div>
            <img src="../image/icon/jt.png" alt="">
        </div>
      </div>
      </router-link>
      <div class="ml">
        <div class="min-title">提现金额</div>
        <div class="mi-withdraw-text">
          ￥<input type="number" v-model="money" class="withdraw-text" placeholder="请输入金额">
        </div>
        <span style="color: rgb(128,128,128);font-size: 14px;line-height: 40px">余额{{data.wallet/100}} <span
          @click="allTi" style="color: rgb(138,168,230);">全部提现</span></span>
        <mt-button @click="pass" style="width: 100%;margin:  0 0 20px" type="primary">确定</mt-button>
      </div>
    </div>
    <router-link :to="{ name: '提现记录页'}">
      <div class="memo">
        提现记录
      </div>
    </router-link>
    <div style="font-size: 14px;color: #999999;padding: 20px;line-height: 25px">
      提现到银行卡手续费：<br/>
      1.余额足100元后可提现；<br/>
      2.按单笔金额收取，T+1到账，每笔收取5%，最低10元。<br/>
    </div>
  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import {Toast, MessageBox} from 'mint-ui'

  export default {
    components: {
      'v-header': Header
    },
    data() {
      return {
        data: this.Local.getLocal('user'),
        money: '',
        params: {
          payAccount: ""
        }
      }
    },

    methods: {
      onValuesChange: function () {

      },
      allTi: function () {
        this.money = this.data.wallet / 100
      },
      pass: function () {
        if (this.money === "") {
          Toast('请输入提现金额')
          return true
        }
        if (this.money < 0.1) {
          Toast('大于100元才可提现')
          return true
        } else {
          MessageBox.prompt('请输入提现密码', {
            inputType: 'number'
          }).then(({value, action}) => {
            this.$api({
              method: 'post',
              url: '/api/v1/user/transfer',
              data: {
                password: value,
                amount: this.money * 100
              }
            }).then((response) => {
              if (response.data.code === 1000) {
                // 获取用户资料
                this.$api({
                  method: 'get',
                  url: '/api/v1/user/profile'
                }).then((response) => {
                  Toast('提现成功');
                  this.Local.setLocal('user', response.data.data);
                  this.$router.go(-1)
                })
              } else {
                Toast(response.data.message);
              }
            }).catch(function (error) {
              alert(error)
            })
          });
        }
      }
    },
    beforeCreate() {
      this.$api({
        method: 'get',
        url: '/api/v1/user/transfer/' + this.Local.getLocal('user').id
      }).then((response) => {
        if (response.data.code === 1000) {
          switch (Number(response.data.data.bankCode)) {
            case 1002:
              response.data.data.bankCode = '工商银行';
              break;
            case 1005:
              response.data.data.bankCode = '农业银行';
              break;
            case 1026:
              response.data.data.bankCode = '中国银行';
              break;
            case 1003:
              response.data.data.bankCode = '建设银行';
              break;
            case 1001:
              response.data.data.bankCode = `招商银行`;
              break;
            case 1066:
              response.data.data.bankCode = `邮储银行`;
              break;
            case 1020:
              response.data.data.bankCode = `交通银行`;
              break;
            case 1004:
              response.data.data.bankCode = `浦发银行`;
              break;
            case 1006:
              response.data.data.bankCode = `民生银行`;
              break;
            case 1009:
              response.data.data.bankCode = `兴业银行`;
              break;
            case 1010:
              response.data.data.bankCode = `平安银行`;
              break;
            case 1021:
              response.data.data.bankCode = `中信银行`;
              break;
            case 1025:
              response.data.data.bankCode = `华夏银行`;
              break;
            case 1027:
              response.data.data.bankCode = `广发银行`;
              break;
            case 1022:
              response.data.data.bankCode = `光大银行`;
              break;
            case 1032:
              response.data.data.bankCode = `北京银行`;
              break;
            case 1056:
              response.data.data.bankCode = `宁波银行`;
              break;
            case 0:
              response.data.data.bankCode = `请设置银行卡信息`;
              break;
          }
          this.params = response.data.data
        } else {
          this.params = {
            bankCode: `请设置银行卡信息`,
            payAccount: ``
          }
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

  .min-title {
    color: rgb(51, 51, 51);
    font-size: 14px;
    padding: 15px 0;
  }

  .top-title {
    color: rgb(51, 51, 51);
    font-size: 14px;
    padding: 15px 5vw;
    display: flex;
    img {
      width: 6px;
      height: 10px;
    }
    > div:nth-child(1) {
      flex: 4;
    }
    > div:nth-child(2) {
      flex: 6;
    }
    > div:nth-child(3) {
      flex: 0.1;
    }
  }

  .top {
    padding: 10px;
  }

  .ml {
    border-radius: 10px;
    padding: 0 5vw;
    background: white;
    overflow: hidden;
    .withdraw-text {
      font-size: 24px;
      font-weight: 900;
      color: rgb(51, 51, 51);
      width: 150px;
    }
    .mi-withdraw-text {
      padding: 0 0 15px;
      font-weight: 900;
      font-size: 24px;
      color: rgb(51, 51, 51);
      border-bottom: 1px solid rgb(220, 220, 220);
    }
  }

  .memo {
    text-align: center;
    color: rgb(138, 168, 230);
    font-size: 12px
  }
</style>
