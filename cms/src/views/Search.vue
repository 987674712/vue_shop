<template lang="html">

  <div class="car">
    <v-header class="header">
      <h1 slot="title">新增纸巾机</h1>
    </v-header>

    <mt-field label="设备编号" v-model="params.deviceCode">
      <mt-button class="btn" type="primary">扫码</mt-button>
    </mt-field>

    <mt-field label="设备IMEI号" v-model="params.imei">
      <mt-button class="btn" type="primary">扫码</mt-button>
    </mt-field>
    <mt-field label="地点名称" v-model="params.building"></mt-field>
    <mt-field label="省" v-model="params.province">
        <mt-button class="btn" @click="provinceshow = true" type="primary">选择</mt-button>
    </mt-field>
    <mt-field label="市" v-model="params.city">
        <mt-button class="btn" @click="getCity" type="primary">选择</mt-button>
    </mt-field>
    <mt-field label="城市区域" v-model="params.region"></mt-field>
    <mt-field label="详细地址" v-model="params.address"></mt-field>
    <iframe src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp"
            frameborder="0"></iframe>
    <div class="toGo">
      <mt-button @click="toPass" plain type="primary" size="large">立即注册</mt-button>
    </div>
    <div style="" class="province my-picker" v-if="provinceshow">
        <div class="btn">
            <mt-button @click="provinceshow = false" style="float: left" size="small">取消</mt-button>
            <mt-button @click="provinceshow = false"  style="float: right" type="primary" size="small">确定</mt-button>
        </div>
        <mt-picker value-key="name" :slots="list" @change="onValuesChange"></mt-picker>
    </div>
      <div class="city my-picker" v-if="cityshow">
          <div class="btn">
              <mt-button @click="cityshow = false" style="float: left" size="small">取消</mt-button>
              <mt-button @click="cityshow = false"  style="float: right" type="primary" size="small">确定</mt-button>
          </div>
          <mt-picker value-key="name" :slots="city" @change="onCity"></mt-picker>
      </div>
  </div>
</template>

<script>
  import Footer from '@/common/_footer.vue'
  import Header from '@/common/_header.vue'

  export default {
    data() {
      return{
          provinceshow:false,
          cityshow:false,
          params:{
              vendorId:this.Local.getLocal('user').id,
              deviceCode:'',
              imei:'',
              longitude:'',
              latitude:'',
              deviceType:1,
              province:'',
              city:'',
              region:'',
              building:'',
              address:''
          },
          provinceId:0,
          pList:[],
          list:[
              {
                  flex: 1,
                  values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                  className: 'slot1',
                  textAlign: 'center'
              }
          ],

          city:[
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
            if(values[0].id&&values[0].id != 'undefined'){
                this.provinceId = values[0].id;
                this.params.province = values[0].name;
            }else{
                this.$api({
                    method: 'get',
                    url: '/api/v1/user/province'
                }).then((response) => {
                    picker.setSlotValues(0, response.data.data)
                }).catch(function (error) {

                });
            }

        },
        onCity(picker, values) {
            this.picker = picker
            if(values[0].id&&values[0].id != 'undefined'){
                this.params.city = values[0].name;
            }
        },
        getCity(){
            this.$api({
                method: 'get',
                url: '/api/v1/user/city/' + this.provinceId
            }).then((response) => {
                this.picker.setSlotValues(0, response.data.data)
            }).catch(function (error) {

            });
            this.cityshow = true
        },
        toPass(){
         console.log(this.params)
        }
    },
    computed: {

    },
    mounted() {
        var that = this;
        window.addEventListener('message', function(event) {
            // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            var loc = event.data;
            if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                console.log('location', loc);
                that.params.longitude = loc.latlng.lng
                that.params.latitude = loc.latlng.lat

                    // longitude:'',
                    // latitude:'',
            }
        }, false);

    }

  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';
  .car{
    padding-bottom: 60px;
  }
  .mint-header {
    padding: 6.8vw 4.8vw;
    background-color: #fff;
    color: #333 !important;
    .fz(font-size, 40) !important;
  }
  iframe{
    width: 100%;
    height: 350px;
    border-top: 1px solid #bfbfbf;
  }
  .toGo{
    position: fixed;
    border-top: 0;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 99;
    background-color: white;
    padding-bottom: 10px;
  }
    .my-picker{
        position: fixed;bottom: 0;left: 0;width: 100%;background-color: white;z-index: 100;
        .btn{
        border-bottom: 1px solid #bfbfbf;padding: 5px 10px;overflow: hidden
    }
    }
</style>
