<template lang="html">
  <!-- 在首页父组件发送http请求,后将数据通过props传递给子组件,可减少请求次数,减少服务器压力 -->
  <div class="index">
    <v-header class="header">
      <h1 slot="title">活动规则</h1>
    </v-header>
    <div class="guize">
      一、推荐及奖励规则<br/>
      1. 用户通过购买一台纸巾机后可以添加邀请功能，参与赚销售奖励的用户可以通过邀请二维码图片邀请其他微信用户。<br/>
      2. 如果被邀请用户购买了机器，发出邀请的用户就可获得260元/台的销售奖励。<br/>
      3. 活动周期内，邀请者在邀请成功的所有用户购买机器的总台数（包括自己的机器）满10台后可获得额外团队奖励400元（即：团队满10台奖励400元团队奖，团队20台奖励800元团队奖，以此类推）<br/>
      4. 为保证活动长期，健康发展，请您在邀请他人购买机器时，避免采用骚扰行为，未经授权不得在推广时使用“优领达”作为推广信息签名，请你在推广活动过程中，请您认真阅读本活动规则并向他人或您的客户就本邀请活动做明确的说明和解释，以便他人或您的客户对活动有明确的感知和充分理解；如您张贴本活动的宣传海报，请遵守涉及广告、物料宣传的法律法规，环境保护法律法规以及相关地方政策规定；如您未遵守上述规定导致被投诉、处罚或造成不良影响的，优领达将采取相关措施直至撤销活动参与资格。<br/>
      5. 优领达如因市场、运营等实际情况，需要对本活动规则变更时，将通过官方微信，网站等方式予以公告公布或通知。<br/>
      6. 本活动只限中国境内用户参与和使用。<br/>
      7. 不得存在根据平台漏洞刷单等非法获利行为，平台一旦发现立即封号，并不排除移交司法机关处理。<br/>
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
        data:{},
        loading: true
      }
    },

    beforeCreate() {
      // this.$api({
      //   method: 'get',
      //   url: `/api/v1/user/team/${this.Local.getLocal('user').id}`
      // }).then((response) => {
      //   if(response.data.code = 1000){
      //     this.data = response.data.data
      //   }
      // })
    }
  }
</script>


<style lang="less" scoped>
  .index {
    width: 100%;
  }
  .toActive{
    position: absolute;
    right: 10px;top: 15.4vw;
    color: white;
  }
  .guize{
    padding: 20px;
    line-height: 1.8em;
    text-align:justify;
  }
</style>
