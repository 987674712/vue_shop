<template lang="html">
    <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
    <div class="index">
        <v-header class="header">
            <h1 slot="title">余额提现</h1>
        </v-header>
        <div class="top">
            <div class="top-title">
                <div>到账方式</div>
                <div>
                    北京银行（5646）<br/>
                    <span style="color: rgb(128,128,128)">24小时到账</span>
                </div>
                <div><img src="../image/icon/jt.png" alt=""></div>
            </div>
            <div class="ml">
                <div class="min-title">提现金额</div>
                <div class="mi-withdraw-text">
                    ￥<input type="number" class="withdraw-text" placeholder="请输入金额">
                </div>
                <span style="color: rgb(128,128,128);font-size: 14px;line-height: 40px">余额99.99 全部提现</span>
                <mt-button style="width: 100%;margin:0 0 20px" type="primary">确定</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/common/_header.vue'

    export default {
        components: {
            'v-header': Header
        },
        data() {
            return {

            }
        },

        computed: {
            onValuesChange:function () {

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

    .title {
        line-height: 2.5em;
        padding: 0 5px;
        color: rgb(51,51,51);
    }
    .min-title{
        color: rgb(51,51,51);
        font-size: 14px;
        padding: 15px 0;
    }
    .top-title{
        color: rgb(51,51,51);
        font-size: 14px;
        padding: 15px 5vw;
        display: flex;
        img{
            width: 6px;
            height: 10px;
        }
        >div:nth-child(1){
            flex: 4;
        }
        >div:nth-child(2){
            flex: 6;
        }
        >div:nth-child(3){
            flex: 0.1;
        }
    }
    .top{
        padding: 10px;
    }
    .ml{
        border-radius: 10px;
        padding:  0 5vw;
        background: white;
        overflow: hidden;
        .withdraw-text{
            font-size: 24px;
            font-weight: 900;
            color: rgb(51,51,51);
            width: 150px;
        }
        .mi-withdraw-text{
            padding:0 0 15px;
            font-weight: 900;
            font-size: 24px;
            color: rgb(51,51,51);
            border-bottom: 1px solid rgb(220,220,220);
        }
    }
</style>
