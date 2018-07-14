<template lang="html">
  <div class="login">
    <v-header>
    <h1 slot="title">绑定手机</h1>
    </v-header>
    <section v-if="re">
      <div class="input-cell">
        <mt-field
          label="手机"
          placeholder="请输入手机号码"
          type="text"
          v-model="reData.accountName"
          :readonly='!toggle'
          :disableClear='!toggle'
        ></mt-field>
      </div>
      <div class="input-cell">
        <mt-field
          label="验证码"
          placeholder="请输入验证码"
          type="text"
          v-model="reData.authCode"
          :readonly='!toggle'
          :disableClear='!toggle'
        >
          <p @click="getCode" style="width: 80px;text-align: center">
            {{string}}
          </p>
        </mt-field>
      </div>
      <mt-button
        plain
        style="margin-top: 20px"
        type="primary"
        size="large"
        @click="login"
        v-if='toggle'>立即绑定
      </mt-button>
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
  .login {
    > section {
      .tip {
        padding: 6vw 3vw;
        color: rgb(224, 145, 71);
        letter-spacing: 2px;
        font-size: 16px;
        text-align: right;
      }
    }
  }

  .input-cell {
    border-bottom: 1px solid #999999;
  }
</style>
