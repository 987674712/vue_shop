<template lang="html">

  <div class="car">
    <v-header class="header">
      <h1 slot="title">收益列表</h1>
    </v-header>
    <ul
      class="ml_shebei"
      v-infinite-scroll="getPages"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="item in list" class="section1-banner">
        <div class="shebei">
          <p>{{item.profitType == 1?'广告佣金':item.profitType == 3?'团队奖金':'直推奖金'}}<br/><a href="javascript:">{{item.createTime}}</a></p>
          <p>+{{item.amount/100}}</p>
        </div>
      </li>
    </ul>
    <!--<div class="ml_shebei">-->
      <!--<router-link v-for="item in list" :to="{ name: ''}" class="section1-banner">-->
        <!--<div class="shebei">-->
          <!--<p>{{item.profitType == 1?'纸巾收入':item.profitType == 3?'团队奖金':'直推奖金'}}<br/><a href="javascript:">{{item.createTime}}</a></p>-->
          <!--<p>+{{item.amount/100}}</p>-->
        <!--</div>-->
      <!--</router-link>-->
    <!--</div>-->
    <!--<v-baseline></v-baseline>-->
    <!--<v-footer></v-footer>-->
  </div>
</template>

<script>

  import Baseline from '@/common/_baseline.vue'
  import Footer from '@/common/_footer.vue'
  import Header from '@/common/_header.vue'
  export default {
    components: {
      'v-baseline': Baseline,
      'v-footer': Footer,
      'v-header': Header,
    },
    data() {
      return {
        list:[],
        page:1,
        loading:false

      }
    },
    methods:{
      getPages:function (){
        this.loading = true;
        this.$api({
          method: 'get',
          url: `/api/v1/user/${this.Local.getLocal('user').id}/profit`,
          params:{
            page:this.page
          }
        }).then((response) => {
          // this.Local.setLocal('user',response.data.data)
          if(response.data.code = 1000){
            for (var i = 0 ;i < response.data.data.length;i++) {
              response.data.data[i].createTime = this.Local.getTime(response.data.data[i].createTime)
              this.list.push(response.data.data[i]);
              console.log(this.list)
            }
            if(response.data.data.length > 0){
              this.loading = false;
            }
            this.page++;
          }
        })
      }
    },
    beforeCreate() {

    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';
  @import '../assets/user/icon/carstyle.css';


  .car {
    width: 100%;
    background-color: #F8FCFF;
  }
  .ml_shebei {
    padding: 0 4vw;
    background-color: rgb(242,242,242);
    .shebei {
      position: relative;
      overflow: hidden;
      padding: 5vw 3px 6vw;
      background-color: rgb(242,242,242);
      border-bottom: 1px solid rgb(220,220,220);
      p {
        /*line-height: 5em;*/
      }
      p:first-child {
        line-height: 1.8em;
        display: inline;
        float: left;
        color: rgb(51,51,51);
      }
      p:nth-child(2) {
        display: inline;
        float: right;
        margin-left: 30px;
        color: rgb(236,96,60);
        line-height: 1.8em;
      }
      span {
        position: absolute;
        left: 10px;
        bottom: 1em;
      }
      a{
        font-size: 14px;
        position: absolute;
        bottom: 0;
      }
    }
  }
  /*图标大小不一，重新定义*/

  .icon-go {
    .fz(font-size, 36);
    &::before {
      color: #aba8a8;
    }
  }

  [class^="icon2-"],
  [class*=" icon2-"] {
    .fz(font-size, 50);
  }

  .icon2-service {
    .fz(font-size, 34);
  }

</style>
