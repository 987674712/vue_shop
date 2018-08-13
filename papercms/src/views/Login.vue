<template>
    <section>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="account">
                <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>

            <el-form-item prop="captcha" style="margin-bottom: 0px">
                <el-input class="a1" type="text" v-model="ruleForm2.captcha" auto-complete="off" placeholder="验证码">
                    <div slot="append" @click="getCode" style="padding: 0!important;"><img :src="image" alt=""></div>
                </el-input>
            </el-form-item>
            <el-form-item prop="captcha" style="margin:0;padding: 0;line-height: 20px">
                <span style="float:right;cursor:pointer">&nbsp;</span>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">
                    登录
                </el-button>
                <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
            </el-form-item>
        </el-form>
        <!--注册界面-->
        <el-dialog title="注册" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="公司名称" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="addForm.contact" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="companyEmail">
                    <el-input v-model="addForm.companyEmail" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="营业执照" prop="imageUrl">
                    <el-upload
                            class="upload-demo"
                            :action="fileLoadUrl"
                            :on-success="fileSuccess"
                            :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <span>只支持：".jpg",".JPG",".png",".PNG",".bmp",".BMP"等格式</span>
                    </el-upload>
                    <div v-html="fileImg">{{fileImg}}</div>
                </el-form-item>
                <el-form-item label="经营范围" prop="business">
                    <el-input v-model="addForm.business" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公司介绍" prop="instruction">
                    <el-input v-model="addForm.instruction" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">立即注册</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script type="text/ecmascript-6">
  import {$axios, $get, $post, $url} from '../common/js/axios';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: '',
          captcha: '',
          sessionId: ''
        },
        fileLoadUrl: $url + 'center/upload',// 营业执照上传
        addLoading: false,
        addFormVisible: false,//注册界面是否显示
        //注册界面数据
        addForm: {
          name: '',
          contact: '',
          mobile: '',
          companyEmail: '',
          businessLicence: '',
          business: '',
          instruction: ''
        },
        fileImg:'',
        fileList: [],
        //注册界面规则
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          contact: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '请输入电话', trigger: 'blur'}
          ],
          companyEmail: [
            {required: true, message: '请输入邮箱', trigger: 'blur'}
          ],
          businessLicence: [
            {required: true, message: '请上传营业执照', trigger: 'blur'}
          ]
        },
        rules2: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
            //{ validator: validaePass }
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'}
            //{ validator: validaePass2 }
          ],
          captcha: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        image: ''
//        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      // 文件上传
      fileSuccess(res, file, fileList){
        if(res.code == 1000){
          this.fileImg = '';
          this.addForm.businessLicence = res.data;
        }
      },
      //显示注册界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          contact: '',
          mobile: '',
          companyEmail: '',
          businessLicence: '',
          business: '',
          instruction: ''
        };
      },
      //立即注册
      addSubmit: function () {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}, this).then(() => {
              this.addLoading = true;
              let para = Object.assign({}, this.addForm);
              $post('center/add/Manufacturer', para, {}, this).then(res => {
                this.addLoading = false;
                this.$message({
                  message: res.message,
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getUsers();
              })
            })
          }
        });
      },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
              var loginParams = new URLSearchParams();
              loginParams.append('username', this.ruleForm2.account);
              loginParams.append('password', this.ruleForm2.checkPass);
              loginParams.append('captcha', this.ruleForm2.captcha);
              loginParams.append('sessionId', this.ruleForm2.sessionId);
            $axios({
              method: 'post',
              url: $url+'cmsapi/v1/login',
              data: loginParams,
              headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
              .then(response => {
                this.logining = false;
                var data = response.data;
                if (data.code == 1000) {
                  sessionStorage.setItem('token', JSON.stringify(data.data.token));
                  sessionStorage.setItem('refreshToken', JSON.stringify(data.data.refreshToken));
                  sessionStorage.setItem('tokenTime', new Date().getTime());
                    sessionStorage.setItem('user', JSON.stringify({
                        id: 1,
                        username: '管理员',
                        password: '123456',
                        avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1046206763,1731025887&fm=27&gp=0.jpg',
                        name: '管理员'
                    }));
                    window.location.href = './'
                  // $get('user/login/info', '').then(res => {
                  //   if (res.code == 1000) {
                  //
                  //   }
                  // })
                } else {
                  this.logining = false;
                  this.$message({
                    message: data.msg?data.msg:'请求出错，请联系管理员',
                    type: 'error'
                  });
                  this.getCode();
                }
              })
              .catch(err => {
                this.logining = false;
                this.$message({
                    message: '请求出错，请联系管理员',
                    type: 'error'
                });
              });
          } else {
            console.log('登陆失败!!!');
            return false;
          }
        });
      },
      getCode: function () {
        $get('cmsapi/v1/captcha', {}).then(data => {
          this.ruleForm2.sessionId = data.data.sessionId;
          this.image = data.data.image
        })
      }
    },
    mounted() {
      this.getCode();
    }
  }

</script>

<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }

    .a1 img {
        margin-bottom: -3px;
        height: 30px
    }

</style>