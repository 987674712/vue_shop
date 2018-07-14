<template lang="html">
    <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
    <div class="index">
        <v-header/>
        <router-link class="my-indent" :to="{ name: '收益页'}">
            <div class="top_yue">
                <p>今日收益（元）</p>
                <p>38.8元</p>
                <p>余额：4779元</p>
            </div>
        </router-link>
        <div class="top_all">
            <div>
                <p>累计收益(元)</p>
                <p>17892</p>
            </div>
            <div>
                <p>昨日收益(元)</p>
                <p>123</p>
            </div>
        </div>
        <div class="title">
            <img src="../image/icon/lb.png" alt="">
            <span style="vertical-align: middle">设备列表（<span class="number">12台</span>）</span>
        </div>
        <div class="ml_shebei">
            <router-link :to="{ name: '详情页'}" class="section1-banner">
                <div class="shebei">
                    <p>1号纸巾机</p>
                    <p>有纸巾</p>
                    <span>地址：北京市东城区崇文门大街</span>
                </div>
            </router-link>
            <router-link :to="{ name: '详情页'}" class="section1-banner">
                <div class="shebei">
                    <p>1号纸巾机</p>
                    <p>有纸巾</p>
                    <span>地址：北京市东城区崇文门大街</span>
                </div>
            </router-link>
            <router-link :to="{ name: '详情页'}" class="section1-banner">
                <div class="shebei">
                    <p>1号纸巾机</p>
                    <p>有纸巾</p>
                    <span>地址：北京市东城区崇文门大街</span>
                </div>
            </router-link>
            <router-link :to="{ name: '详情页'}" class="section1-banner">
                <div class="shebei">
                    <p>1号纸巾机</p>
                    <p>有纸巾</p>
                    <span>地址：北京市东城区崇文门大街</span>
                </div>
            </router-link>
            <router-link :to="{ name: '详情页'}" class="section1-banner">
                <div class="shebei">
                    <p>1号纸巾机</p>
                    <p>有纸巾</p>
                    <span>地址：北京市东城区崇文门大街</span>
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
                loading: true
            }
        },

        beforeCreate() {
            this.$api({
                method: 'get',
                url: '/api/v1/device/userDevice'
            }).then((response) => {
                // this.Local.setLocal('user',response.data.data)
                this.$router.replace({
                    path: '/'
                })
            })
        }
    }
</script>


<style lang="less" scoped>
    .index {
        width: 100%;
        padding-bottom: 14vw;
        background-color: #F8FCFF;
    }

    .top_yue {
        text-align: center;
        padding: 10px 0;
        border-top: 1px solid #999999;
        background-color: rgb(135, 204, 90);
        color: white;
        padding-bottom: 6vw;
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
        }
    }
</style>
