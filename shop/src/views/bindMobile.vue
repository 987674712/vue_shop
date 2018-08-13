<template lang="html">
  <div class="login">
    <v-header>
    <h1 slot="title">绑定手机</h1>
    </v-header>
    <div style="padding: 0 3vw;"  v-if="re">
      <mt-field label="手机：" v-model="reData.accountName" :readonly='!toggle'
                :disableClear='!toggle' placeholder="请输入手机号码">
        <!--<span class="btn-sao">扫码</span>-->
      </mt-field>

      <mt-field label="验证码："
                placeholder="请输入验证码"
                type="text"
                v-model="reData.authCode"
                :readonly='!toggle'
                :disableClear='!toggle'>
        <span @click="getCode"  class="btn-sao">{{string}}</span>
      </mt-field>
    </div>
    <section style="margin-top: 20px;text-align: center">
      <mt-button style='height:30px;width: 70%;margin: auto' @click="login" type="primary" size="large">立即绑定</mt-button>
    </section>
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
        re: true,
        reData: {
          accountName: '',
          authCode: ''
        },
        toggle: !this.$store.state.login.token,
        string:'立即获取'
      }
    },
    methods: {
      // 立即绑定
      login() {
        if (this.reData.accountName !== "" && this.reData.authCode) {
          if (this.reData.accountName !== '') {
            var data = {
              mobile: this.reData.accountName,
              authCode: this.reData.authCode
            }
            this.$api({
              method: 'post',
              url: '/api/v1/user/bindMobile',
              data: data
            }).then((response) => {
              if (response.data.code === 1000) {
                // 获取用户资料
                this.$api({
                  method: 'get',
                  url: '/api/v1/user/profile'
                }).then((response) => {
                  Toast('绑定成功');
                  this.Local.setLocal('user',response.data.data);
                  this.$router.go(-1)
                })
              } else {
                Toast(response.data.message);
              }
            }).catch(function (error) {
              alert(error)
            })
          }
        } else {
          Toast('请输入正确的手机号和验证码');
        }
      },
      getCode() {
        var that = this;
        if (this.reData.accountName !== ''&&this.string === '立即获取') {
          that.string = 60;
          this.$api({
            method: 'get',
            url: `/api/v1/user/code?type=4&debug=false&m=` + this.reData.accountName
          }).then((response) => {
            if(response.data.code === 1000){
              var i = 59;
              var getCodeTime = setInterval(function () {
                that.string = i--;
                if(i === 0){
                  that.string = '立即获取';
                  window.clearTimeout(getCodeTime);
                }
              },1000);
              if(response.data.authCode){
                this.reData.authCode = response.data.authCode;
              }
            }else{
              Toast(response.data.message);
              that.string = '立即获取';
            }
          }).catch(function (error) {
            alert(error)
          })
        }
      }
    },
    mounted(){

    },
    beforeCreate(){
      // this.$store.dispatch('setDatas',this.$route.params.id);
      // if(localStorage.getItem('token')){
      //   this.$router.replace({
      //     path: 'user'
      //   })
      // }
    }
  }

</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';

  .car {
    background-color: rgb(242, 242, 242);
    padding-bottom: 60px;
  }

  .mint-header {
    padding: 6.8vw 4.8vw;
    background-color: #fff;
    color: #333 !important;
    .fz(font-size, 40) !important;
  }

  iframe {
    width: 100%;
    height: 350px;
    border-top: 1px solid #bfbfbf;
  }

  .toGo {
    position: fixed;
    border-top: 0;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 99;
    background-color: white;
    padding-bottom: 10px;
  }

  .my-picker {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 100;
    .btn {
      border-bottom: 1px solid #bfbfbf;
      padding: 5px 10px;
      overflow: hidden
    }
  }

  .mint-cell {
    border-bottom: 1px solid rgb(220, 220, 220) !important;
    background-color: rgb(242, 242, 242);

  }

  .btn-sao {
    color: rgb(236, 96, 60);
  }
</style>
<style>
  .mint-field-core {
    background-color: rgb(242, 242, 242) !important;
  }
</style>
<style>
  .mint-cell {
    background-color: #f2f2f2;
  }

  .mint-field-core {
    background-color: #f2f2f2;
  }

  .mint-field .mint-cell-title {
    width: 5em;
    color: #333333;
    text-align: justify;
    text-justify: distribute-all-lines; /*ie6-8*/
    text-align-last: justify; /* ie9*/
    -moz-text-align-last: justify; /*ff*/
    -webkit-text-align-last: justify; /*chrome 20+*/
  }
</style>
