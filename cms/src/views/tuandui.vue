<template lang="html">
    <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
    <div class="index">
        <v-header class="header">
            <h1 slot="title">我的团队</h1>
        </v-header>
        <router-link class="my-indent" :to="{ name: '收益页'}">
            <div class="top_yue">
                <p>团队总设备（台）</p>
                <p>38</p>
                <p>我的团队</p>
            </div>
        </router-link>
        <div class="top_all">
            <div>
                <p>团队成员设备(台)</p>
                <p>55</p>
            </div>
            <div>
                <p>每增加一台奖励(元)</p>
                <p>10</p>
            </div>
        </div>
        <div class="title">
            <!--<img src="../image/icon/lb.png" alt="">-->
            <span style="vertical-align: middle">我的团队成员：4人</span>
        </div>
        <div class="ml_shebei">
            <router-link :to="{ name: ''}" class="section1-banner">
                <div class="shebei">
                    <p>张三</p>
                    <p>2台</p>
                </div>
            </router-link>
            <router-link :to="{ name: ''}" class="section1-banner">
                <div class="shebei">
                    <p>马先丰</p>
                    <p>16台</p>
                </div>
            </router-link>
            <router-link :to="{ name: ''}" class="section1-banner">
                <div class="shebei">
                    <p>赵四</p>
                    <p>8台</p>
                </div>
            </router-link>
            <router-link :to="{ name: ''}" class="section1-banner">
                <div class="shebei">
                    <p>林依然</p>
                    <p>168台</p>
                </div>
            </router-link>
        </div>
        <!--<v-footer/>-->
    </div>
</template>

<script>
    import Footer from '@/common/_footer.vue'
    import Header from '@/common/_header.vue'
    import {Toast, Picker} from 'mint-ui'

    export default {
        components: {
            'v-header': Header,
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
            padding: 5vw 3px 1vw;
            border-bottom: 1px solid rgb(220,220,220);
            p {
                /*line-height: 5em;*/
            }
            p:first-child {
                line-height: 1.8em;
                display: inline;
                float: left;
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
        }
    }
</style>
