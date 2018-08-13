<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">我的订单</h1>
    </v-header>
    <section>
      <ul
        class="shop_list"
        v-infinite-scroll="getPages"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">

        <!--<router-link class="my-indent" :to="{ path: '/orderDetail/'+item.id}" v-for="item in list">-->
        <li v-for="item in list">
          <div><p>单号：{{item.orderNo}}</p></div>
          <div>
            <img :src="item.productImage" alt="">
            <div>
              <p>
                <!--1, "待支付"，2, "支付成功"，3, "支付失败"-->
                <span style="float: left">{{item.productName}}</span>
                <strong style="float: right">
                  {{item.status === 1?'待支付':item.status === 3?'支付成功':item.status === 4?'已收货':'支付失败'}}
                </strong>
              </p>
              <p style="text-align: right">共{{item.number}}件商品</p>
              <p style="text-align: right">合计：{{item.amount/100}}元</p>
            </div>
          </div>
          <div>
            <span style="float: left;font-size:14px;line-height: 27px">{{item.createTime}}</span>
            &nbsp;
            <mt-button @click="orderFrom(item.id)" :style="item.status === 3?'display:inline-block':'display:none'" class="btn" size="small">确认收货</mt-button>
            <mt-button @click="toIndex" :style="item.status === 3?'display:none':'display:inline-block'" class="btn" size="small">再次购买</mt-button>
          </div>
        </li>
        <!--</router-link>-->
      </ul>
    </section>
  </div>
</template>

<script>
  import Header from '@/common/_header.vue'
  import {Toast ,MessageBox} from 'mint-ui'

  export default {
    components: {
      'v-header': Header
    },
    data() {
      return {
        list:[],
        page:1,
        loading:false
      }
    },
    methods: {
      orderFrom:function (id) {
        MessageBox
          .confirm(
            `请确保您已经签收`
          ) .then(action => {
          // api/v1 /user/{userId}/confirmationDevice/{orderId}
          this.$api({
            method: 'get',
            url: `/api/v1/user/${this.Local.getLocal('user').id}/confirmationDevice/${id}`,
          }).then((res) => {
            if(res.data.code === 1000){
              Toast('确认收货成功');
              this.page = 1;
              this.list = [];
              this.getPages()
            }
          })
        }, function (err) {
          console.log(id)
          //点击取消执行这里的函数
        })
      },
      toIndex:function(){
        this.$router.replace({
          path: '/'
        })
      },
      getPages:function () {
        this.loading = true;
        this.$api({
          method: 'get',
          url: `/api/v1/user/${this.Local.getLocal('user').id}/purchase`,
          params:{
            page:this.page
          }
        }).then((response) => {
          if (response.data.code === 1000) {
            for (let i = 0; i < response.data.data.length; i++) {
              response.data.data[i].createTime = this.Local.getTime(response.data.data[i].createTime)
              this.list.push(response.data.data[i]);
            }
            if(response.data.data.length > 0){
              this.loading = false;
            }
            this.page++
            console.log(this.list)
          } else {
            Toast(response.data.message);
          }
        }).catch(function (error) {
          alert(error)
        })
      }
    },
    mounted(){
      // /api/v1/user/{userId}/purchase
      this.getPages()
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

  .shop_list {
    li {
      border-top: 1px solid #e7e7e7;
      > div:first-child {
        background-color: #F2F2F2;
        color: #666666;
        line-height: 2em;
        padding: 0 10px;
        overflow: hidden;
        p:first-child {
          float: left;
        }
        p:nth-child(2) {
          float: right;
        }
      }
      > div:nth-child(2) {
        padding: 10px 10px;
        background-color: white;
        border-bottom: 1px solid #E0E0E0;
        overflow: hidden;
        display: flex;
        img {
          width: 100px;
          height: 100px;
          margin-right: 10px;
        }
        div {
          float: left;
          flex: 2;
          p {
            overflow: hidden;
            font-size: 14px;
            line-height: 1.8em;
          }
          p:not(:first-child) {
            margin-top: 10px;
          }
        }
      }
      > div:nth-child(3) {
        padding: 7px 10px;
        border-bottom: 1px solid #e7e7e7;
        text-align: right;
        .btn {
          padding-top: 0;
          padding-bottom: 0;
          height: 26px;
          background-color: white;
          border: 1px solid #ff5000;
          color:  #ff5000;
        }
      }
    }
  }
</style>
