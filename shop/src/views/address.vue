<template>
  <div class="address">
    <v-header>
      <h1 slot="title">我的地址</h1>
    </v-header>
    <div class="top">
      <mt-field v-model="nickName" label="收货人：" placeholder="请输入收货人姓名"></mt-field>
      <mt-field v-model="mobile" label="手机号码：" placeholder="请输入手机号码"></mt-field>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><!----> <span class="mint-cell-text">省份：</span> <!----></div>
          <div class="mint-cell-value" style="position: relative">
            <!--<span style="position: absolute;">{{province}}</span>-->
            <select name="options" class="mint-field-core" v-model="province" @change="getCity" style="position: absolute;z-index: 2">
              <option v-for="item in list.province" v-bind:value="item.name">{{item.name}}</option>
            </select>
            <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
            <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span>
            <div class="mint-field-other"></div>
          </div></div>
        <div class="mint-cell-right"></div>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"></div>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><!----> <span class="mint-cell-text">城市：</span> <!----></div>
          <div class="mint-cell-value" style="position: relative">
            <!--<span style="position: absolute">{{city}}</span>-->
            <select name="options" class="mint-field-core" v-model="city" @change="setCity" style="position: absolute">
              <!--<option v-bind:value="">{{item.name}}</option>-->
              <option v-for="item in list.city" v-bind:value="item.name">{{item.name}}</option>
            </select>
            <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>
            <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span>
            <div class="mint-field-other"></div>
          </div></div>
        <div class="mint-cell-right"></div>
      </a>
      <mt-field label="详细地址：" v-model="userAddress" placeholder="请输入详细地址" rows="2"></mt-field>
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
    <mt-button style='height:30px;width: 70%;margin: 20px auto 0' @click="pushForm" type="primary" size="large">保存</mt-button>
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
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [''],
            className: 'slot3',
            textAlign: 'left'
          }
        ],
        address: '',
        userAddress: '',
        province: '',
        city: '',
        firstGet: true,
        mobile: "",
        nickName: "",
        list:{
          province:[],
          provinceId:110000,
          city:[

          ],
          cityId:110100
        }
      }
    },
    methods: {
      setCity:function(ele){
        this.city = this.list.city[ele.target.selectedIndex].name
      },
      getCity:function(ele){
        this.province = this.list.province[ele.target.selectedIndex].name
        this.$api({
          method: 'get',
          url: '/api/v1/user/city?province=' + ele.target.value
        }).then((response) => {
          if(response.data.data.length === 1){
            this.city = response.data.data[0].name
          }
          if(response.data.data.length === 0){
            this.city = ""
          }
          this.list.city = response.data.data
        })
      },
      pushForm: function () {
        if (this.province == "") {
          Toast('请选择省')
          return true
        }
        if (this.city == "") {
          Toast('请选择省市')
          return true
        }
        if (this.userAddress == "") {
          Toast('请输入详细地址')
          return true
        }
        if (this.mobile == "") {
          Toast('请输入手机号')
          return true
        }
        if (this.nickName == "") {
          Toast('请输入收件人姓名')
          return true
        }else{
          this.$api({
            method: 'post',
            url: `/api/v1/user/address`,
            data: {
              province: this.province,
              city: this.city,
              address: this.userAddress,
              mobile: this.mobile,
              userId: this.Local.getLocal('user').id,
              nickName: this.nickName,
            }
          }).then((response) => {
            var that = this;
            if (response.data.code === 1000) {
              // this.Local.setLocal('user',response.data.data)
              Toast('修改成功')
              setTimeout(function () {
                that.$router.go(-1)
              }, 1000)
            } else {
              Toast(response.data.message)
            }
          })
        }


      }
    },
    mounted() {
      var that = this;

      this.$api({
        method: 'get',
        url: `/api/v1/user/${this.Local.getLocal('user').id}/address`
      }).then((res) => {
        if(res.data.code === 1000){
          that.province = res.data.data.province
          that.city = res.data.data.city
          that.userAddress = res.data.data.address
          that.mobile = res.data.data.mobile
          that.nickName = res.data.data.nickName
          that.firstGet = false
          this.$api({
            method: 'get',
            url: '/api/v1/user/province'
          }).then((response) => {
            this.list.province = response.data.data
            this.$api({
              method: 'get',
              url: '/api/v1/user/city?province=' + that.province
            }).then((response) => {
              if(response.data.data.length === 1){
                this.city = response.data.data[0].name
              }
              if(response.data.data.length === 0){
                this.city = ""
              }
              this.list.city = response.data.data
            })
          }).catch(function (error) {

          })
        }else{
          this.$api({
            method: 'get',
            url: '/api/v1/user/province'
          }).then((response) => {
            if(response.data.code === 1000){
              this.list.province = response.data.data
            }
          }).catch(function (error) {

          })
        }
      })
    },
    beforeCreate() {

    }
  }
</script>

<style lang="less" scoped>
  .address {
    > div {
      border-bottom: 1px solid #e7e7e7
    }
  }

  .top {
    padding: 10px;
  }
</style>
<style>
  .mint-cell {
    background-color: #f2f2f2!important;
  }

  .mint-field-core {
    background-color: #f2f2f2!important;
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
