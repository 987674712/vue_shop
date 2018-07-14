<template>
  <div class="address">
    <v-header>
      <h1 slot="title">我的地址</h1>
    </v-header>
    <div style="">
      <mt-picker :slots="slots" @change="onValuesChange" value-key="name"></mt-picker>
    </div>
    <div style="line-height: 2.5em;padding: 0 10px">
      地址：{{province}}&nbsp;{{city}}
    </div>
    <div>
      <mt-field v-model="userAddress" label="" placeholder="请输入详细地址"></mt-field>
    </div>
    <div>
      <mt-field v-model="nickName" label="" placeholder="请输入收货人姓名"></mt-field>
    </div>
    <div>
      <mt-field v-model="mobile" label="" placeholder="请输入手机号码"></mt-field>
    </div>
    <mt-button style="margin-top: 20px" plain type="primary" size="large" @click="pushForm">保存</mt-button>
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
        nickName: ""
      }
    },
    methods: {
      onValuesChange(picker, values) {
        if (picker.getSlotValues(0) == null) {
          this.$api({
            method: 'get',
            url: '/api/v1/user/province'
          }).then((response) => {
            let responseElement = []
            for (let i = 0; i < response.data.data.length; i++) {
              responseElement.push(response.data.data[i])
            }
            picker.setSlotValues(0, responseElement)
          }).catch(function (error) {

          })
        } else {
          this.$api({
            method: 'get',
            url: '/api/v1/user/city/' + values[0].id
          }).then((response) => {
            let responseElement = []
            for (let i = 0; i < response.data.data.length; i++) {
              responseElement.push(response.data.data[i])
            }
            this.province = values[0].name
            this.city = values[1].name
            if (this.firstGet) {
              this.$api({
                method: 'get',
                url: `/api/v1/user/${this.Local.getLocal('user').id}/address`
              }).then((res) => {
                var that = this;
                var timeOut = setInterval(function () {
                  that.province = res.data.data.province
                  that.city = res.data.data.city
                  that.userAddress = res.data.data.address
                  that.mobile = res.data.data.mobile
                  that.nickName = res.data.data.nickName
                  that.firstGet = false
                },100)
                setTimeout(function () {
                  window.clearInterval(timeOut)
                },1000)
              })
            }
            picker.setSlotValues(1, responseElement)
          }).catch(function (error) {

          })
        }
      },
      pushForm: function () {
        // http://zhijin.97reader.com/api/v1/user/profile
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
    },
    mounted() {

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
</style>
