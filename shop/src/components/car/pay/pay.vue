<template lang="html">

  <div class="pay">
    <v-header>
      <h1 slot="title">支付订单</h1>
    </v-header>

    <div class="pay_html">
      <div class="pay-address" @click="setAddress">
        <!--<div>-->
        <!--<p class="main-address-per"></p>-->
        <!--<p class="main-address-tel"></p>-->
        <!--</div>-->
        <!--<p>收货地址:<span><span v-if="toAddress">立即设置地址</span></span></p>-->
        <div>收&nbsp;&nbsp;货&nbsp;&nbsp;人：<span>{{nickName}}&nbsp;&nbsp;</span><span>&nbsp;&nbsp;&nbsp;&nbsp;{{mobile}}</span></div>
        <div>收货地址：{{province}}&nbsp;{{city}}&nbsp;{{userAddress}}</div>
          <img src="../../../image/icon/jt.png" alt="">
      </div>
      <div class="pay-product">
        <ul v-if="!confirm">
          <li>
            <!--<li v-for="k in carList">-->
            <a>
              <img :src="datas.icon" alt="">
              <div>
                <h2><span style="color:#ee7150">{{datas.name}} * {{count}}</span></h2>
                <span style="font-size: 10px;color: darkgrey">{{datas.desp}}</span>
                <p>
                  <mt-button style="background-color: #DBDBDB" size="small" @click="_Count">-</mt-button>
                  <input type="tel" v-model="count" maxlength="3" style="width: 2em;background-color: #F2F2F2;text-align: center"/>&nbsp;
                  <mt-button style="background-color: #DBDBDB"  size="small" @click="addCount">+</mt-button>
                </p>
                <p>{{datas.amount/100}} 元</p>
              </div>
            </a>
          </li>
        </ul>
        <!-- 支付成功后的提示 -->
        <div class="pay-confirm" v-else>
          支付成功!!!<br/>
          正在等待商家发货<br/>
          稍后可到我的订单查看状态
        </div>
      </div>
    </div>

    <div class="bottom-div">
      <div>
        <span v-if="!confirm">
        总需要支付 : <i>￥</i><span>{{allpay/100}}</span>
        </span>
      </div>
      <footer class="pay-footer" v-if="!confirm" ontouchstrat="" @click="payConfirm">
        <span>支付</span>
      </footer>

      <footer class="pay-footer" v-else ontouchstrat="" @click="">

        <router-link :to="{name:'首页'}" class="goIndex">
      <span>
        回首页
      </span>
        </router-link>
      </footer>
    </div>

    <!--<h3 class="pay-allpay" v-if="!confirm">总需要支付 : <i>￥</i><span>{{allpay/100}}</span></h3>-->



  </div>
</template>

<script>
  import Util from '../../../util/common'
  import Header from '@/common/_header.vue'
  import {
    MessageBox, Toast
  } from 'mint-ui';

  export default {
    components: {
      'v-header': Header
    },
    data() {
      return {
        confirm: false,
        count: 1,
        datas: {},
        province:'',
        city:'',
        userAddress:'',
        mobile:'',
        nickName:'',
        id:'',
        toAddress: false
      }
    },

    computed: {
      //所有商品列表
      carList() {
        // return this.$store.state.detail.payShop
      },

      // 商品价格总和
      allpay() {
        // let allpay = 0, selectedList = this.carList
        // for (let i = 0; i < selectedList.length; i++) {
        //   allpay += selectedList[i].price
        // }
        return this.datas.amount * this.count
      }
    },
    mounted() {
      // 防止页面刷新后数据丢失
      if (this.$store.state.detail.payShop === '') {
        this.$store.commit('PAY_SHOP')
      }
      this.$api({
        method: 'get',
        url: `/api/v1/user/${this.Local.getLocal('user').id}/address`
      }).then((res) => {
        if(res.data.code === 1000){
          this.province = res.data.data.province;
          this.city = res.data.data.city;
          this.userAddress = res.data.data.address;
          this.mobile = res.data.data.mobile;
          this.nickName = res.data.data.nickName;
          this.id = res.data.data.id;
          if(!this.province||!this.city||!this.userAddress||!this.mobile||!this.nickName){
            this.toAddress = true
          }
        }else {
          this.toAddress = true
        }
      })
    },

    methods: {
      // 增加数量
      addCount() {
        this.count++
      },
      setAddress() {
        this.$router.push({path: '/address'})
      },
      _Count() {
        if (this.count !== 1) {
          this.count--
        }
      },
      payConfirm() {
        if (!this.toAddress){
          if (this.Local.getLocal('user').mobile !== '') {
            MessageBox
              .confirm(
                `支付${this.allpay/100}元<br/>`+
                `收货人：${this.nickName}<br/>`+
                `联系电话：${this.mobile}<br/>`+
                `收货地址：${this.province} ${this.city} ${this.userAddress}<br/>`
              )
              .then(action => { //点击成功执行这里的函数
                // 判断是否已经设置了手机号码
                var param = {
                  productId: this.$route.params.id,
                  payType: 1,
                  addressId: this.id,
                  // memo:"",
                  orderFrom: 1,
                  number: this.count
                }
                this.confirm = false;
                var that = this;
                // 判断是否已经设置了收货地址
                if (!this.toAddress) {
                  this.$store.commit('SET_LOADING', true);
                  this.$api({
                    method: 'post',
                    url: '/api/v1/user/recharge',
                    data: param
                  }).then((response) => {
                    var json = {
                      appId: response.data.appId,
                      orderSn: response.data.rechargeNo,
                      amount: this.allpay,
                      body: this.datas.desp,
                      subject: this.datas.name,
                      openId: response.data.openId,
                      channel: 'wx_pub'
                    }
                    this.$api({
                      method: 'post',
                      url: 'pay/v1/charge/order',
                      data: json
                    }).then((res) => {
                      console.log('开始调用了')
                      var data = res.data.data
                      console.log({
                        "appId": data.appId,     //公众号名称，由商户传入
                        "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数
                        "nonceStr": data.nonceStr, //随机串
                        "package": data.package,
                        "signType": "MD5",         //微信签名方式：
                        "paySign": data.paySign //微信签名
                      })
                      WeixinJSBridge.invoke(
                        'getBrandWCPayRequest', {
                          "appId": data.appId,     //公众号名称，由商户传入
                          "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数
                          "nonceStr": data.nonceStr, //随机串
                          "package": data.package,
                          "signType": "MD5",         //微信签名方式：
                          "paySign": data.paySign //微信签名
                        },
                        function (res) {
                          if (res.err_msg == "get_brand_wcpay_request:ok") {
                            that.$store.commit('SET_LOADING', false); //关闭loading
                            that.confirm = true; //支付完成后切换视图
                          }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                        }
                      );
                    })
                  })
                } else {
                  Toast('请先设置收货地址')
                }
                // setTimeout(() => {
                //   this.$store.commit('SET_LOADING', false); //关闭loading
                //   this.confirm = true; //支付完成后切换视图
                // }, 300)
              }, function (err) {
                //点击取消执行这里的函数
              });
          } else {
            MessageBox
              .confirm(
                `请先绑定手机号码`
              ) .then(action => {
              this.$router.push({
                path:'/bindMobile'
              })
            }, function (err) {

              console.log('用户点击取消')
              //点击取消执行这里的函数
            })
          }
        } else {
          Toast('请先设置收货地址')
        }
      }
    },

    beforeCreate() {
      // this.$store.dispatch('setDatas',this.$route.params.id)
      this.$api({
        method: 'get',
        url: '/api/v1/product/' + this.$route.params.id
      }).then((response) => {
        this.datas = response.data.data
        this.swiper = [response.data.data.icon]
        // console.log(JSON.stringify(response.data.section4))
      }).catch(function (error) {
        // alert(error)
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "../../../assets/fz.less";

  .pay {
    width: 100%;
    background-color: white;
    height: 100%;

    .pay_html{
      padding: 10px;
      background-color: #F2F2F2;
      .pay-address{
        border-bottom: 1px solid #E1E1E1;
        padding:  0 0 10px;
        position: relative;
        img{
        position: absolute;right: 5px;top: 22px;
      }
        >div{
          color: #5C5C5C;
          padding-top: 10px;
        }
      }
    }
    .pay-product {
      background-color: #F2F2F2;
      overflow: auto;

      li {
        background-color: #F2F2F2;
        a {
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          box-sizing: border-box;
          padding: 20 * 10vw/75 0;
          color: #4d4d4d;
          .fz(font-size, 30px);
          border-bottom: 1 * 10vw/75 solid #dedede;

          > img {
            display: block;
            width: 2.5 * 10vw;
            height: 2.5 * 10vw;
            border-radius: 5px;
          }

          > div {
            box-sizing: border-box;
            padding-left: 10px;
            width: 70%;
            h2 {
              padding-top: 0.09 * 10vw;
              overflow: hidden;
              word-break: keep-all;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            p {
              text-align: right;
              .fz(font-size, 24px);
              padding-top: 0.3 * 10vw;
            }
          }
        }
      }
    }

.bottom-div{
  padding: 0 15vw;
  >div{
    padding: 10px 0;
    text-align: right;
    font-size: 14px;
    color: #868686;
  }
}
    .pay-footer {
      width: 100%;
      padding-bottom: 4vw;
      span {
        display: block;
        background-color: #EC603C;
        border-radius: 1.3vw;
        color: #fff;
        padding: 1vw 0;
        margin: 0 auto;
        text-align: center;
        &:active {
          background-color: @cl;
        }
        .goIndex {
          color: white;
        }
      }
    }

    .pay-confirm {
      padding: 20px 0;
      text-align: center;
      color: #333333;
      line-height: 30px;
      .fz(font-size, 40);
    }
  }
</style>
