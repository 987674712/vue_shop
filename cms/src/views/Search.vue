<template lang="html">

  <div class="car">
    <v-header class="header">
      <h1 slot="title">新增纸巾机</h1>
    </v-header>
    <mt-field label="Mac" v-model="captcha">
      <mt-button class="btn" type="primary">扫码</mt-button>
    </mt-field>

    <mt-field label="机身外" v-model="captcha">
      <mt-button class="btn" type="primary">扫码</mt-button>
    </mt-field>
    <mt-field label="店铺" v-model="captcha"></mt-field>
    <mt-field label="省" v-model="captcha"></mt-field>
    <mt-field label="市" v-model="captcha"></mt-field>
    <mt-field label="详细地址" v-model="captcha"></mt-field>
    <mt-field label="手机" v-model="captcha"></mt-field>
  </div>
</template>

<script>
  import Footer from '@/common/_footer.vue'
  import Header from '@/common/_header.vue'

  export default {
    data() {
      return{
        captcha:''
      }
    },
    components: {

      'v-header': Header,
      'v-footer': Footer
    },

    computed: {},
    mounted() {

    }

  }
</script>

<style lang="less" scoped>
  @import '../assets/fz.less';
  @import '../assets/index/style.css';

  .mint-header {
    padding: 6.8vw 4.8vw;
    background-color: #fff;
    color: #333 !important;
    .fz(font-size, 40) !important;
  }
</style>
