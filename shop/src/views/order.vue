<template lang="html">
  <div class="login">
    <v-header>
      <h1 slot="title">我的订单</h1>
    </v-header>
    <section>
      <ul class="shop_list">
        <li>
          <div><p>订单编号：98588865412541</p><p><strong>已付款</strong></p></div>
          <div>
            <img src="//g-search2.alicdn.com/img/bao/uploaded/i4/i4/725677994/TB2VleFC7KWBuNjy1zjXXcOypXa_!!725677994-0-item_pic.jpg_580x580Q90.jpg_.webp" alt="">
            <div>
              <p>纸巾机（公益款）</p>
              <p style="text-align: right">￥1199*2</p>
              <p style="text-align: right">共2件商品&nbsp;合计：2398元</p>
            </div>
          </div>
          <div><mt-button class="btn" size="small">查看详情</mt-button></div>
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
      return {}
    },
    methods: {

    },
    beforeCreate(){
      // /api/v1/user/{userId}/purchase
      this.$api({
        method: 'get',
        url: `/api/v1/user/${this.Local.getLocal('user').id}/purchase`,
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
            font-size: 14px;
            line-height: 1.8em;
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
