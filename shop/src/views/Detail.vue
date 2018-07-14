<template lang="html">
  <div class="detail">
    <div class="swiper">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="k in swiper" :key="k">
          <img :src="k">
        </mt-swipe-item>
      </mt-swipe>
      <div class="back" @click="$router.go(-1)">
        <span class="icon-go"></span>
      </div>
    </div>
    <section class="chose" v-if="datas">
      <div class="chose-view">
        <h1 class="chose-view-title">
          {{datas.name}}
          <span>(已选 公益款)</span>
        </h1>
        <span>{{datas.amount/100}}元</span>
        <p class="chose-view-intro">{{datas.intro}}</p>
      </div>
      <!-- 添加空函数 解决Safari浏览器 :active无效 -->
      <div class="chose-mychosed" ontouchstart="">
        <div class="colChose">
        <span class="active">公益款</span>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="img-wrap" v-for="k in swiper">
        <img :src="k">
      </div>
    </section>
    <v-baseline/>
    <footer class="footer">
      <router-link :to="{name:'首页'}" class="footer-index">
        <i class="icon-index"></i>
      </router-link>
      <!--<router-link  :to="{name:'购物车页'}" class="footer-gocar">-->
      <!--<i class="icon-car"></i>-->
      <!--<span v-if="count">{{count}}</span>-->
      <!--</router-link>-->
      <span class="footer-addcar" @click="addIntoCar">
      立即购买
    </span>
    </footer>
  </div>
</template>

<script>
import Baseline from '@/common/_baseline.vue'
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      datas: {

      },
      swiper:[],
      loading: true
    }
  },
  components:{
    'v-baseline':Baseline
  },

  methods: {
    addIntoCar () {
      //  mint-ui的弹出式提示框
      const product = [{
        title: this.datas.name,
        price: this.datas.amount,
        // size: this.datas.chose.size[this.sizeSelected],
        // col: this.datas.chose.col[this.colSelected],
        id: this.datas.id,
        imgPath: this.swiper[0].imgSrc,
        choseBool: false
      }];


      if (this.Local.getLocal('user').mobile !== ''){
      MessageBox
        .confirm
        (
          `商品名称:${product[0].title}</br>` +
          `价格:${product[0].price/100}元</br>` +
          // `款式:${product[0].size}</br>` +
          `规格:公益款</br>` +
          `商品ID:${product[0].id}</br>`
        )
        .then(action => {      //点击成功执行这里的函数
          this.$router.push({ path: '/car/pay/'+ this.$route.params.id})
        }, function (err) {
        });
      }else {
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
    }
  },
  beforeCreate(){
    // this.$store.dispatch('setDatas',this.$route.params.id);
    this.$api({
      method: 'get',
      url: '/api/v1/product/'+this.$route.params.id
    }).then((response) => {
      this.datas = response.data.data
      this.swiper = [response.data.data.icon]
      // console.log(JSON.stringify(response.data.section4))
    }).catch(function(error) {
      // alert(error)
    })
  }
}
</script>

<style lang="less" scoped>
  @import "../assets/fz.less";
  @import "../assets/index/style.css";
  .swiper {
    width: 100%;
    position: relative;

    .mint-swipe {
      width: 100%;
      height: 100vw;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    .back {
      width: 7vw;
      height: 7vw;
      position: absolute;
      left: 4vw;
      top: 2vw;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      text-align: center;
      span {
        display: inline-block;
        line-height: 7vw;
        .fz(font-size,40);
        transform: rotate(-180deg);
        &::before {
          color: #fff;
        }
      }

      &:active {
        transform: scale(1.3);
      }
    }
  }.chose {
     padding: 3vw;

     .chose-view {
       > h1 {
         .fz(font-size,36);
         color: #2c3e50;
         > span {
           color: rgb(238, 113, 80);
         }
       }
       > span {
         line-height: 10vw;
         color: @cl;
         .fz(font-size,34);
         font-weight: 600;
       }

     }

     .chose-mychosed {

       background-color: #fff;
       > div {
         padding-top: 20px;
         display: -ms-flex;
         display: -webkit-box;
         display: -ms-flexbox;
         display: flex;

         span {
           .fz(font-size,26);
           padding: 6px 10px;
           border: 1px solid rgb(111, 111,111);
           margin-right: 6vw;
           color: rgb(111, 111, 111);
           &.active,
           &:active {
             color: @cl;
             border-color: @cl;
             -webkit-transform: scale(1.1);
             transform: scale(1.1);
           }

         }
       }
     }

     .footer {
       width: 100%;
       display: -webkit-flex;
       display: -ms-flex;
       display: flex;
       height: 14vw;
       position: fixed;
       bottom: 0;
       left: 0;
       background-color: #ffffff;
       -moz-user-select: none;
       -webkit-user-select: none;
       .bt();
       .footer-addcar,
       .footer-gocar,
       .footer-index {
         text-align: center;
       }

       .footer-index {
         -webkit-flex: 3;
         -ms-flex: 3;
         flex: 3;
         line-height: 14vw;
         height: 14vw;
         padding-top: 1.5vw;
         border-right-color: #f7f7f7;
         border-right-style: solid;
         .fz(border-right-width,1);

         i {
           .fz(font-size,45);
         }
         &:active {
           background-color: #f1f1f1;
         }
       }

       .footer-gocar {
         position: relative;
         -webkit-flex: 3;
         -ms-flex: 3;
         flex: 3;
         height: 14vw;
         line-height: 14vw;
         padding-top: 1.6vw;
         span {
           height: 5.5vw;
           width: 5.5vw;
           line-height: 5.5vw;
           position: absolute;
           top: 0.5vw;
           right: 5.5vw;
           background-color: @cl;
           border-radius: 50%;
           color: #fff;
           .fz(font-size,24);
         }
         &:active {
           background-color: #f1f1f1;
         }
         i {
           .fz(font-size,48);
         }
       }

       .footer-addcar {
         -webkit-flex: 6;
         -ms-flex: 6;
         flex: 6;
         line-height: 14vw;
         height: 14vw;

         color: #fff;
         background-color: @cl;
         letter-spacing: 0.2vw;
         &:active {
           background-color: #ff7d00;
         }
       }
     }
   }
  .footer {
    width: 100%;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    height: 14vw;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    -moz-user-select: none;
    -webkit-user-select: none;
    .bt();
    .footer-index,
    .footer-gocar,
    .footer-addcar {
      text-align: center;
    }

    .footer-index {
      -webkit-flex: 3;
      -ms-flex: 3;
      flex: 3;
      line-height: 14vw;
      height: 14vw;
      padding-top: 1.5vw;
      border-right-color: #f7f7f7;
      border-right-style: solid;
      .fz(border-right-width,1);

      i {
        .fz(font-size,45);
      }
      &:active {
        background-color: #f1f1f1;
      }
    }

    .footer-gocar {
      position: relative;
      -webkit-flex: 3;
      -ms-flex: 3;
      flex: 3;
      height: 14vw;
      line-height: 14vw;
      padding-top: 1.6vw;
      span {
        height: 5.5vw;
        width: 5.5vw;
        line-height: 5.5vw;
        position: absolute;
        top: 0.5vw;
        right: 5.5vw;
        background-color: @cl;
        border-radius: 50%;
        color: #fff;
        .fz(font-size,24);
      }

      &:active {
        background-color: #f1f1f1;
      }
      i {
        .fz(font-size,48);
      }
    }

    .footer-addcar {
      -webkit-flex: 6;
      -ms-flex: 6;
      flex: 6;
      line-height: 14vw;
      height: 14vw;

      color: #fff;
      background-color: @cl;
      letter-spacing: 0.2vw;
      &:active {
        background-color: #ff7d00;
      }
    }
  }
.detail {
  width: 100%;
  padding-bottom: 14vw;
}
</style>
