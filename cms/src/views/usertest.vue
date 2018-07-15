<template lang="html">
    <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
    <div class="index">
        <v-header class="header">
            <h1 slot="title">设备调试</h1>
        </v-header>
        <div class="top">
            <div class="top-title">
                <img src="../image/logo.png" alt="">
                <span>设备调试</span>
            </div>
            <div class="ml">
                <div class="min-title">MAC</div>
                <div class="mi-withdraw-text">
                    <input type="number" class="withdraw-text" placeholder="请输入MAC号">
                </div>
                <mt-button style="width: 100%;margin: 10px 0 0" type="primary">查询</mt-button>
                <mt-button style="width: 100%;margin: 10px 0 0" type="primary">出纸</mt-button>
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
    .top-title{
        color: rgb(51,51,51);
        font-size: 18px;
        text-align: center;
        padding: 30px 0;
        img{
            width: 40px;
            height: 40px;
        }
    }
    .top{
        padding: 10px 20px;
    }
    .ml{
        border-radius: 10px;
        box-shadow: 0 0 15px 5px rgba(135, 204, 90, 0.85);
        padding:  40px;
        background: white;
        overflow: hidden;
        .min-title{
            color: rgb(51,51,51);
            font-size: 16px;
            font-weight: 600;
            padding: 10px 0;
        }
        .withdraw-text{
            font-size: 24px;
            color: rgb(51,51,51);
            width: 150px;
        }
        .mi-withdraw-text{
            padding:1px 5px 5px;
            font-size: 24px;
            color: rgb(51,51,51);
            border: 1px solid rgb(220,220,220);
            border-radius: 5px;
        }
    }
</style>
