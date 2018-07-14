<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">订单详情</h1>
    </v-header>
    <section>
      <ul >
          <li v-for="item in list">
            <div><p>单号：{{item.orderNo}}</p></div>
            <div>
              <img :src="item.productImage" alt="">
              <div>
                <p>
                  <!--1, "待支付"，2, "支付成功"，3, "支付失败"-->
                  <span style="float: left">{{item.productName}}*2</span>
                  <strong style="float: right">{{item.status === 1?'待支付':item.status === 2?'支付成功':'支付失败'}}</strong>
                </p>
                <p style="text-align: right">共{{item.number}}件商品</p>
                <p style="text-align: right">合计：{{item.amount}}元</p>
              </div>
            </div>
            <div><mt-button class="btn" size="small"></mt-button></div>
          </li>
      </ul>
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
        list:[],
        page:1,
        loading:false
      }
    },
    methods: {
      getPages:function () {
        this.loading = true;
        this.$api({
          method: 'get',
          url: `/api/v1/user/${this.Local.getLocal('user').id}/deviceOrder/${this.$route.params.id}`
        }).then((response) => {
          if (response.data.code === 1000) {
            for (let i = 0; i < response.data.data.length; i++) {
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
        background-color: #f5f5f5;
        overflow: hidden;
        display: flex;
        img {
          width: 100px;
          height: 100px;
          margin-right: 10px;
          flex: 1;
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
