<template lang="html">

  <div class="car">
    <v-header class="header">
      <h1 slot="title">纸巾机</h1>
    </v-header>
    <div style="padding: 0 3vw;">
      <mt-field label="设备编号" :disabled="!change" v-model="params.deviceCode" placeholder="请输入设备编号">
        <span v-if="change" class="btn-sao" @click="saoDeviceCode">扫码</span>
      </mt-field>
      <mt-field label="设备IMEI号" :disabled="!change" v-model="params.imei" placeholder="请输入设备IMEI号">
        <span v-if="change" @click="saoImei" class="btn-sao">扫码</span>
      </mt-field>
      <mt-field label="地点名称" v-model="params.building" placeholder="请输入地点名称"></mt-field>
      <div @click="provinceshow = true">
        <mt-field label="省" :disabled="hide" v-model="params.province">
          <!--<span class="btn-sao" @click="provinceshow = true">选择</span>-->
        </mt-field>
      </div>
      <div @click="getCity">
        <mt-field label="市" v-model="params.city" :disabled="hide">
          <!--<span class="btn-sao" >选择</span>-->
        </mt-field>
      </div>
      <mt-field label="城市区域" v-model="params.region" placeholder="请输入城市区域"></mt-field>
      <mt-field label="详细地址" v-model="params.address" placeholder="请输入详细地址"></mt-field>
      <iframe
        src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
        frameborder="0"></iframe>
      <div class="toGo">
        <mt-button @click="toPass" plain type="primary" size="large">确定</mt-button>
      </div>
      <div style="" class="province my-picker" v-if="provinceshow">
        <div class="btn">
          <mt-button @click="provinceshow = false" style="float: left" size="small">取消</mt-button>
          <mt-button @click="provinceshow = false" style="float: right" type="primary" size="small">确定</mt-button>
        </div>
        <mt-picker value-key="name" :slots="list" @change="onValuesChange"></mt-picker>
      </div>
      <div class="city my-picker" v-if="cityshow">
        <div class="btn">
          <mt-button @click="cityshow = false" style="float: left" size="small">取消</mt-button>
          <mt-button @click="cityshow = false" style="float: right" type="primary" size="small">确定</mt-button>
        </div>
        <mt-picker value-key="name" :slots="city" @change="onCity"></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
  import Footer from '@/common/_footer.vue'
  import Header from '@/common/_header.vue'
  import {Toast, Picker,Indicator} from 'mint-ui'

  export default {
    data() {
      return {
        provinceshow: false,
        cityshow: false,
        hide:true,
        params: {
          vendorId: this.Local.getLocal('user').id,
          deviceCode: '',
          imei: '',
          longitude: '',
          latitude: '',
          deviceType: 1,
          province: '',
          city: '',
          region: '',
          building: '',
          address: ''
        },
        provinceId: 0,
        pList: [],
        change:true,
        list: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'center'
          }
        ],

        city: [
          {
            flex: 1,
            values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    },
    components: {
      'v-header': Header,
      'v-footer': Footer
    },
    methods: {
      onValuesChange(picker, values) {

        if (values[0].id && values[0].id != 'undefined') {
          this.provinceId = values[0].id;
          this.params.province = values[0].name;
        } else {
          this.$api({
            method: 'get',
            url: '/api/v1/user/province'
          }).then((response) => {
            picker.setSlotValues(0, response.data.data)
          }).catch(function (error) {

          });
        }

      },
      saoImei:function(){
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
                // alert("扫描结果："+result);
                that.params.imei = result
                // window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
              }
            });

          });
        }).catch(function (error) {

        });
      },
      saoDeviceCode:function(){
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
                // alert("扫描结果："+result);
                that.params.deviceCode = result.split('api/d/')[1]
                // window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
              }
            });

          });
        }).catch(function (error) {

        });
      },
      onCity(picker, values) {
        this.picker = picker
        if (values[0].id && values[0].id != 'undefined') {
          this.params.city = values[0].name;
        }
      },
      getCity() {
        this.$api({
          method: 'get',
          url: '/api/v1/user/city/' + this.provinceId
        }).then((response) => {
          this.picker.setSlotValues(0, response.data.data)
        }).catch(function (error) {

        });
        this.cityshow = true
      },
      toPass() {
        if(this.params.deviceCode === ""){
          Toast('请输入设备编号')
          return true
        }
        if(this.params.imei === ""){
          Toast('请输入设备imei号')
          return true
        }
        if(this.params.longitude === ""){
          Toast('请输入经度')
          return true
        }
        if(this.params.latitude === ""){
          Toast('请输入纬度')
          return true
        }
        if(this.params.deviceType === ""){
          Toast('请输入设备类型')
          return true
        }
        if(this.params.province === ""){
          Toast('请输入省')
          return true
        }
        if(this.params.city === ""){
          Toast('请输入城市名称')
          return true
        }
        if(this.params.region === ""){
          Toast('请输入城市区域')
          return true
        }
        if(this.params.building === ""){
          Toast('请输入店铺名称')
          return true
        }
        if(this.params.address === ""){
          Toast('请输入具体地址')
          return true
        }else{
          this.$api({
            method: 'post',
            url: '/api/v1/device/addDevice',
            data: this.params
          }).then((response) => {
            if(response.data.code === 1000){
              this.params = {}
              Toast('添加成功')
              var that = this
              setTimeout(function () {
                that.$router.go(-1)
              },2000)
            }else{
              Toast(response.data.message)
            }
          }).catch(function (error) {

          });
        }
        // 查询设备是否存在
        // this.$api({
        //   method: 'get',
        //   url: `/api/v1/device/device/${this.params.deviceCode}/${this.params.imei}`
        // }).then((response) => {
        //   if(response.data.code === 1000){
        //
        //   }else{
        //     Toast(response.data.message)
        //   }
        // }).catch(function (error) {
        //
        // });
      }
    },
    computed: {},
    mounted() {
      var that = this;
      window.addEventListener('message', function (event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          console.log('location', loc);
          that.params.longitude = loc.latlng.lng
          that.params.latitude = loc.latlng.lat
        }
      }, false);
      if(this.$route.params.id !== ':id'){
        this.change = false
        this.$api({
          method: 'get',
          url: `/api/v1/device/${this.$route.params.id}`
        }).then((response) => {
          // this.Local.setLocal('user',response.data.data)
          if(response.data.code = 1000){
            this.params = response.data.data;
          }
        })
      }
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
