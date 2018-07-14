<template lang="html">
  <div class="login">
    <!--<v-header>-->
    <!--<h1 slot="title">登录页</h1>-->
    <!--</v-header>-->
    <section v-if="re">
      <div class="input-cell">
        <mt-field
          label="手机号码"
          placeholder="请输入手机号码"
          type="text"
          v-model="reData.accountName"
          :readonly='!toggle'
          :disableClear='!toggle'
        ></mt-field>
      </div>
      <div class="input-cell">
        <mt-field
          label="密码"
          placeholder="请输入密码"
          type="password"
          v-model="reData.password"
          :readonly='!toggle'
          :disableClear='!toggle'
        ></mt-field>
      </div>
      <p class="tip" @click="toRe">立即注册</p>
      <mt-button
        plain
        size="large"
        @click="login"
        type="primary"
        v-if='toggle'>登录
      </mt-button>
      <mt-button
        plain
        size="large"
        @click="logout"
        v-else>退出登录
      </mt-button>
    </section>
    <section v-if="re">
      <div class="input-cell">
        <mt-field
          label="账号"
          placeholder="请输入账号"
          type="text"
          v-model="reData.accountName"
          :readonly='!toggle'
          :disableClear='!toggle'
        ></mt-field>
      </div>
      <div class="input-cell">
        <mt-field
          label="密码"
          placeholder="请输入密码"
          type="password"
          v-model="reData.password"
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
          <p @click="getCode">
            立即获取
          </p>
        </mt-field>
      </div>
      <p class="tip" @click="tologin">已有账号？立即登录</p>
      <mt-button
        plain
        type="primary"
        size="large"
        @click="regist"
        v-if='toggle'>立即注册
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
        re: false,
        reData: {
          accountName: '',
          password: '',
          authCode: '',
        },
        toggle: !this.$store.state.login.token,
      }
    },
    methods: {
      GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var string = '?'+window.location.hash.split('?')[1]
        var r = string.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      // 登录按钮
      login() {
        if (this.reData.accountName !== "" && this.reData.password) {
          if (this.reData.accountName !== '') {
            var data = {
              accountName: this.reData.accountName,
              password: this.reData.password
            }
            this.$api({
              method: 'post',
              url: '/api/v1/user/login?code='+this.GetQueryString('code'),
              data: data
            }).then((response) => {
              if (response.data.code === 1000) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('phone', this.reData.accountName)
                localStorage.setItem('userId', response.data.userId)
                // 获取用户资料
                this.$api({
                  method: 'get',
                  url: '/api/v1/user/profile?userId=' + response.data.userId
                }).then((response) => {
                  this.datas = response.data.data
                  localStorage.setItem('nickName', response.data.data.nickName)
                  localStorage.setItem('address', response.data.data.address)
                  this.$router.replace({
                    path: '/'
                  })
                })
              } else {
                Toast(response.data.message);
              }
            }).catch(function (error) {
              alert(error)
            })
          }
        } else {
          Toast('登录信息不能为空');
        }

        // 登录成
      },
      toRe() {
        this.re = true;
      },
      tologin() {
        this.re = false;
      },
      getCode() {
        if (this.reData.accountName !== '') {
          this.$api({
            method: 'get',
            url: '/api/v1/user/code?m=' + this.reData.accountName
          }).then((response) => {
            this.reData.authCode = response.data.authCode;
          }).catch(function (error) {
            alert(error)
          })
        }
      },

      regist() {
        if (this.reData.accountName !== "" && this.reData.password !== "" && this.reData.authCode !== "") {
          if (this.reData.accountName !== '') {
            this.$api({
              method: 'post',
              url: '/api/v1/user/regist',
              data: this.reData
            }).then((response) => {
              if (response.data.code === 1000) {
                this.re = false
              } else {
                Toast(response.data.message);
              }
            }).catch(function (error) {
              alert(error)
            })
          }
        } else {
          Toast('注册信息不能为空');
        }
        // setTimeout(()=>{
        //   this.$router.replace({
        //     path: 'user'
        //   })
        // },1000);
      },
      //退出登录按钮
      logout() {
        Toast('退出登录成功,清除token');
        this.$store.commit('CHANGE_TOKEN', 0);
        this.toggle = true;
        this.account = '';
        this.password = '';

      }
    },
    mounted(){
      if(this.GetQueryString('userId')){
        this.$api({
          method: 'get',
          url: '/api/v1/user/profile?userId=' + this.GetQueryString('userId')
        }).then((response) => {
          this.Local.setLocal('user',response.data.data)
          this.$router.replace({
            path: '/'
          })
        })
      }else{
        Toast('登录失败，请正确登录，或联系管理员处理');
      }
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
