<template lang="html">
  <section class="section4">
    <div style="padding: 0 10px 20px">
      <p class="section4-title">
        商品列表
      </p>
      <ul class="section4-list">
        <li v-for="k in list" :key='k.id'>
          <router-link :to="{path:'/detail/'+k.id}">
            <img v-lazy="k.icon">
            <p>{{k.name}}<span>￥{{k.amount/100}}</span></p>
          </router-link>
        </li>
      </ul>
    </div>
    <!--<router-link :to="{name:'分类页'}" class="section4-banner">-->
      <!--<img v-lazy="banner">-->
    <!--</router-link>-->
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';
export default {
  props: {
    // banner: {
    //   type: String,
    //   default: ''
    // },
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/fz.less";
@import "../../assets/index/style.css";
.section4 {
  width: 100%;
  overflow: hidden;
  .pt();
  .section4-title {
    .bt();
    text-align: center;
    .fz(font-size, 34);
    color: #333333;
    padding: 2vw 0;
    position: relative;
    background-color: #ffffff;
    border-bottom: 1px solid #EEEEEE;
    i {
      position: absolute;
      right: 6vw;
      top: 50%;
      .fz(font-size, 36);
      .fz(margin-top,-16);
      &::before {
        color: #9f9f9f;
      }
    }
  }

  .section4-list {
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    overflow: hidden;
    padding: 10px 0 10px 10px;
    li {
      width: 50%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      float: left;
      padding: 0 3vw 0 0;
      > a {
        display: block;
        border-radius: 5px;
        overflow: hidden;
        width: 100%;
        position: relative;
        img {
          display: block;
          width: 100%;
        }
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          position: absolute;
          color: white;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: black;
          opacity: 0.6;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          padding: 1.2vw 2vw;
          > span {
          display: inline-block;
          color: #EB5F3C;
            margin-left: .5em;
        }
        }
      }

      > h3 {
        padding-top: 3vw;
        .fz(font-size,40);
      }

    }
  }

  .section4-banner {
    width: 100%;
    display: block;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
