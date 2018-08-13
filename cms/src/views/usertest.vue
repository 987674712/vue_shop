<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header class="header">
      <h1 slot="title">设备调试</h1>
    </v-header>
    <div class="top">
      <div class="top-title">
        <img src="../image/logo.png" alt="">
        <span>设备调试</span>
      </div>
      <div class="ml">
        <div class="min-title">IMEI</div>
        <div class="mi-withdraw-text">
          <input v-model="imei" type="number" class="withdraw-text" placeholder="请输入IMEI号">
          <img @click="sao" src="../image/icon/sao.png" alt="">
        </div>
        <mt-button @click="getStatus" style="width: 100%;margin: 10px 0 0" type="primary">查询</mt-button>
        <mt-button @click="outPaper" style="width: 100%;margin: 10px 0 0" type="primary">出纸</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import {Toast, MessageBox,Indicator} from 'mint-ui'

  export default {
    components: {
      'v-header': Header
    },
    data() {
      return {
        imei: ''
      }
    },
    methods:{
      sao:function(){
        Indicator.open({
          text: 'Loading...'
        });
        setTimeout(function () {
          Indicator.close()
        },2000)
        var that = this;
        this.$api({
          method: 'get',
          url: '/api/v1/weixin/msg?url='+window.location.origin+location.pathname
        }).then((response) => {
          response.data = response.data.data
          wx.config({
            debug: false,
            appId: response.data.appId,
            timestamp: response.data.timestamp,
            nonceStr: response.data.nonceStr,
            signature: response.data.signature,
            jsApiList: ['checkJsApi', 'scanQRCode']
          });
          wx.error(function (res) {
            alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          });

          wx.ready(function () {
            wx.checkJsApi({
              jsApiList: ['scanQRCode'],
              success: function (res) {

              }
            });
            wx.scanQRCode({
              needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
              scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
              success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                that.imei = result
                // window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
              }
            });

          });
        }).catch(function (error) {

        });
      },
      getStatus: function () {
        // http://zhijin.97reader.com/api/v1/deviceStatus/query/2?imei=868575027141003
        this.$api({
          method: 'get',
          url: '/api/v1/deviceStatus/2?cmd=22&imei=' + this.imei
        }).then((response) => {
          if (response.data.code === 1000) {
            this.$api({
              method: 'get',
              url: '/api/v1/deviceStatus/query/2?imei=' + this.imei
            }).then((response) => {
              if (response.data.code === 1000) {
                var alertWord = "设备正常";
                var res = response.data;
                if (res.data == -1) {
                  alertWord = "设备离线"
                } else if (res.data == 0) {
                  alertWord = "待机中"
                } else if (res.data == 1) {
                  alertWord = "预约中"
                } else if (res.data == 2) {
                  alertWord = "消毒清洁中	不可使用"
                } else if (res.data == 3) {
                  alertWord = "洗衣工作中	不可使用"
                } else if (res.data == 4) {
                  alertWord = "洗衣机洗涤结束	持续3秒钟左右"
                } else if (res.data == 5) {
                  alertWord = "洗衣机自检中"
                } else if (res.data == 6) {
                  alertWord = "进水超时	检查进水阀或者水龙头"
                } else if (res.data == 7) {
                  alertWord = "排水超时	检查排水系统"
                } else if (res.data == 8) {
                  alertWord = "脱水时撞桶	脱水不平衡"
                } else if (res.data == 9) {
                  alertWord = "脱水开盖	关好门盖"
                } else if (res.data == 10) {
                  alertWord = "水位传感器异常";
                } else if (res.data == 11) {
                  alertWord = "溢水报警";
                }
                MessageBox(alertWord)
              } else {
                MessageBox(response.data.message)
              }
            }).catch(function (error) {

            });
          } else {
            MessageBox('未找到设备')
          }
        }).catch(function (error) {

        });
      },
      outPaper(){
        this.$api({
          method: 'get',
          url: `/api/v1/deviceStatus/2?imei=${this.imei}&cmd=21&sum=1`
        }).then((response) => {
          if (response.data.code === 1000) {
            this.$api({
              method: 'get',
              //     /api/v1/deviceStatus/query/2?imei=868575027141003
              url: '/api/v1/deviceStatus/query/2?imei=' + this.imei
            }).then((response) => {
              if (response.data.code === 1000) {
                MessageBox(response.data.message)
              } else {
                MessageBox(response.data.message)
              }
            }).catch(function (error) {

            });
          } else {
            MessageBox('未找到设备')
          }
        }).catch(function (error) {

        });
        this.cityshow = true
      }
    },
    computed: {

    },
    beforeCreate() {

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

  .top-title {
    color: rgb(51, 51, 51);
    font-size: 18px;
    text-align: center;
    padding: 30px 0;
    img {
      width: 40px;
      height: 40px;
    }
  }

  .top {
    padding: 10px 20px;
  }

  .ml {
    border-radius: 10px;
    box-shadow: 0 0 15px 5px rgba(135, 204, 90, 0.85);
    padding: 40px;
    background: white;
    overflow: hidden;
    .min-title {
      color: rgb(51, 51, 51);
      font-size: 16px;
      font-weight: 600;
      padding: 10px 0;
    }
    .withdraw-text {
      font-size: 24px;
      color: rgb(51, 51, 51);
      width: 100%;
    }
    .mi-withdraw-text {
      padding: 1px 5px 5px;
      font-size: 24px;
      line-height: 24px;
      color: rgb(51, 51, 51);
      border: 1px solid rgb(220, 220, 220);
      border-radius: 5px;
      position: relative;
      img{
        position: absolute;
        right: 5px;
        top:2px;
        width: 30px;
        height: 30px;
      }
    }
  }
</style>
