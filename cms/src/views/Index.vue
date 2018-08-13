<template lang="html">
    <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
    <div class="index">
        <v-header/>
        <router-link class="my-indent" :to="{ name: '收益页'}">
            <div class="top_yue">
                <p>今日收益（元）</p>
                <p>{{data.todayTotal/100}}元</p>
                <p>余额：{{data.wallet/100}}元</p>
              <img src="../image/icon/right.png" alt="">
            </div>
        </router-link>
        <div class="top_all">
            <div>
                <p>累计收益(元)</p>
                <p>{{data.alltotal/100}}</p>
            </div>
            <div>
                <p>纸巾余量</p>
                <p>
                  {{userData.deposit/100 == 0?'无纸巾暂无收益':(userData.deposit/100)+'元 | '+(userData.deposit/100/0.3)+'包'}}
                </p>
            </div>
        </div>
        <div class="title">
            <img src="../image/icon/lb.png" alt="">
            <span style="vertical-align: middle">设备列表（<span class="number">{{data.deviceCount}}台</span>）</span>
        </div>
        <div class="ml_shebei">
            <router-link v-for=" item in list.data" :to="{ path: '/detail/'+ item.id}" class="section1-banner">
                <div class="shebei">
                    <p>{{item.building}}</p>
                    <p>
                      {{
                      item.washStatus === 0?'出货成功':
                      item.washStatus === 1?'出货失败':
                      item.washStatus === 2?'设备异常':
                      item.washStatus === 16?'设备正常':
                      item.washStatus === 17?'设备缺货':
                      '设备异常'
                      }}
                    </p>
                    <span>地址：{{item.address}}</span>
                    <img src="../image/icon/jt.png" alt="">
                </div>
            </router-link>
        </div>
        <v-footer/>
    </div>
</template>

<script>
    import Header from '@/components/index/header.vue'
    import Swiper from '@/components/index/swiper.vue'
    import Service from '@/components/index/service.vue'
    import Section1 from '@/components/index/section1.vue'
    import Section2 from '@/components/index/section2.vue'
    import Section3 from '@/components/index/section3.vue'
    import Section4 from '@/components/index/section4.vue'
    import Baseline from '@/common/_baseline.vue'
    import Footer from '@/common/_footer.vue'
    import {Toast, Picker} from 'mint-ui'

    export default {
        components: {
            'v-header': Header,
            'v-swiper': Swiper,
            'v-service': Service,
            'v-section1': Section1,
            'v-section2': Section2,
            'v-section3': Section3,
            'v-section4': Section4,
            'v-baseline': Baseline,
            'v-footer': Footer
        },
        data() {
            return {
                datas: {
                    section1: {},
                    section2: {},
                    section3: {},
                    section4: {},
                    swiper: []
                },
              list:[],
              data:{
                deviceCount:0,
                alltotal:0,
                todayTotal:0,
                yesterdayTotal:0,
                wallet:0
              },
                loading: true,
              userData:this.Local.getLocal('user')
            }
        },

        beforeCreate() {
            this.$api({
                method: 'get',
                url: '/api/v1/device/userDevice'
            }).then((response) => {
                // this.Local.setLocal('user',response.data.data)
                if(response.data.code = 1000){
                  this.list = response.data
                }
            })
            this.$api({
                method: 'get',
                url: '/api/v1/rptBilling'
            }).then((response) => {
                // this.Local.setLocal('user',response.data.data)
                if(response.data.code = 1000){
                  this.data = response.data.data
                }
            })
        }
    }
</script>


<style lang="less" scoped>
    .index {
        width: 100%;
        padding-bottom: 14vw;
    }

    .top_yue {
        text-align: center;
        padding: 10px 0;
        border-top: 1px solid #999999;
        background-color: rgb(135, 204, 90);
        color: white;
        padding-bottom: 6vw;
      position: relative;
      >img{
        width: 30px;
        height: 30px;
        position: absolute;
        right: 6vw;
        top: 14vw;
      }
        > p:first-child {
            font-size: 14px;
        }
        > p:nth-child(2) {
            font-size: 24px;
            margin-top: 5vw;
        }
        > p:nth-child(3) {
            font-size: 18px;
            margin-top: 5vw;
        }
    }

    .top_all {
        display: flex;
        text-align: center;
        line-height: 1.8em;
        color: white;
        padding: 2vw 0;
        background-color: rgba(135, 204, 90,0.85);
        div {
            flex: 1;
        }
        div:nth-child(2) {

        }
    }

    .title {
        line-height: 2.5em;
        border-bottom: 1px solid rgb(220,220,220);
        background-color: white;
        padding: 0 4vw;
        img{
            width: 20px;height: 20px;
        }
        .number{
            color: rgb(135, 204, 90);
        }
    }

    .ml_shebei {
        padding: 0 4vw;
        background-color: rgb(242,242,242);
        .shebei {
            position: relative;
            overflow: hidden;
            padding: 7vw 10px 10vw;
            border-bottom: 1px solid rgb(220,220,220);
            p {
                /*line-height: 5em;*/
            }
            p:first-child {
                line-height: 1.8em;
display: inline;
            }
            p:nth-child(2) {
                display: inline;
              margin-left: 30px;
                color: rgb(236,96,60);
                font-size: 14px;
            }
            span {
                position: absolute;
                left: 10px;
                bottom: 1em;
            }
            img{
                width: 13px;
                height: 20px;
                position: absolute;
                right: 0;
                top: 40px;
            }
        }
    }
</style>
