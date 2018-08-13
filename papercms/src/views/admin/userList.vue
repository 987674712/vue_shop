<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <!--<el-form-item>-->
                <!--<el-input v-model="filters.name" placeholder="姓名"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                <!--<el-button type="primary" v-on:click="getUsers">查询</el-button>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button size="medium" type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <!--<el-table-column type="selection"></el-table-column>-->
            <!--<el-table-column type="index"></el-table-column>-->
            <el-table-column prop="index" label="编号" width="80"></el-table-column>
            <el-table-column prop="name" label="用户姓名" min-width="180"></el-table-column>
            <el-table-column prop="status" label="角色状态" :formatter="formatStatus" width="100"></el-table-column>
            <el-table-column prop="registerDate" label="注册时间" :formatter="getTime" width="180"></el-table-column>
            <el-table-column prop="email" label="电子邮箱" min-width="220"></el-table-column>
            <el-table-column prop="telephone" label="用户电话" min-width="140"></el-table-column>
            <el-table-column prop="desp" label="备注" min-width="240"></el-table-column>
            <el-table-column label="操作" width="286">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="warning" size="mini" @click="permissionsEdit(scope.$index, scope.row)">角色
                    </el-button>
                    <el-button :type="scope.row.enable==='enabled'?'primary':'danger'" size="small"
                               @click="handStar(scope.$index, scope.row)">{{scope.row.enable==='enabled'?'停用':'启用'}}
                    </el-button>
                    <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱" prop="email">
                    <el-input v-model="editForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户电话" prop="telephone">
                    <el-input v-model="editForm.telephone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="desp">
                    <el-input v-model="editForm.desp" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="用户姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="loginName">
                    <el-input v-model="addForm.loginName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱" prop="email">
                    <el-input v-model="addForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户电话" prop="telephone">
                    <el-input v-model="addForm.telephone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="desp">
                    <el-input v-model="addForm.desp" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--权限编辑页面-->
        <el-dialog title="角色编辑" v-model="permissionsVisible" :close-on-click-modal="false">
            <el-form :model="permissionsForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-checkbox-group label="权限管理" v-model="permissionsForm.ids">
                    <el-checkbox style="margin-left: 1em" v-for="item in permissions" :label="item.id" :key="item.id">
                        {{item.name}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="permissionsVisible = false">取消</el-button>
                <el-button type="primary" @click.native="permissionsSubmit" :loading="permissionsLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script type="text/ecmascript-6">
  import util from '../../common/js/util'
  import {$axios, $get, $post} from '../../common/js/axios';
  //import NProgress from 'nprogress'

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        permissionsForm: {
          ids: [],
          roleId: 0
        },
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        permissionsVisible: false,//编辑界面是否显示
        permissionsLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        //编辑界面数据
        editForm: {
          "id": '',
          "name": "",
          "email": "",
          "telephone": '',
          "desp": ''
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入用户密码', trigger: 'blur'}
          ],
          loginName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ]
        },
        //新增界面数据
        addForm: {
          "name": "",
          "loginName": "",
          "password": '',
          "desp": '',
          "rolelist": []
        },
        permissions: [],
        win_heiht: document.documentElement.clientHeight - 72 - 19 - 20 - 60 - 86 - 10
      }
    },
    methods: {
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      // 角色状态转换
      formatStatus: function (row, column) {
        return row.status == 'disabled' ? '无效' : row.status == 'enabled' ? '有效' : '未知';
      },
      // 格式化时间
      getTime: function (row, column) {
        return util.formatDate.format(new Date(row.registerDate), 'yyyy-MM-dd hh:mm:ss')
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      //获取用户列表
      getUsers() {
        let para = {
          pageNumber: this.page,
          pageSize: 20
        };
        this.listLoading = true;
        //NProgress.start();
        $get('user/list', para).then(res => {
          this.total = res.data.total;
          this.users = res.data.list;
          this.listLoading = false;
        })
      },
      //获取角色列表
      getResource() {
        let para = {
          pageNumber: this.page,
          pageSize: 100
        };
        this.listLoading = true;
        $get('role/list', para).then(res => {
          this.permissions = res.data.list
        })
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认要操作该用户吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {id: row.id};
          $post('user/delete', {}, para).then(data => {
            this.listLoading = false;
            this.$message({
              message: data.message,
              type: 'success'
            });
            this.getUsers();
          })
        }).catch(() => {

        });
      },
      // 停用和启用
      handStar: function (index, row) {
        var enable = row.enable === 'enabled' ? '停用' : '启用';
        this.$confirm('您正在操作变更用户“' + row.name + '”的状态为‘' + enable + '’', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = {id: row.id, status: row.enable === 'enabled' ? 0 : 1};
          var that = this;
          $post('user/update/enable', para).then(res => {
            if (res.code !== 1000) {
              that.$message({
                message: res.message,
                type: 'error'
              });
              that.editLoading = false;
              that.addLoading = false;
              this.listLoading = false;
              return false
            }
            that.listLoading = false;
            that.$message({
              message: '操作成功',
              type: 'success'
            });
            that.getUsers();
          })
        }).catch(() => {

        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          "name": "",
          "loginName": "",
          "password": '',
          "desp": '',
          "rolelist": []
        };
      },
      //显示权限编辑界面
      permissionsEdit: function (index, row) {
        this.permissionsVisible = true;
        this.permissionsForm.ids = []
        $get('role/getRoleByAccountId', {}, {accountId: row.id}).then(res => {
          var json = []
          for (var value of res.data) {
            json.push(value.id)
          }
          this.permissionsForm.ids = json
        })
        this.permissionsForm.roleId = row.id;
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
//							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              $post('user/update', {
                name: para.name,
                email: para.email,
                telephone: para.telephone,
                desp: para.desp
              }, {id: para.id}).then(res => {
                if (res.code != 1000) {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  });
                  this.editLoading = false;
                  this.addLoading = false;
                  return false
                }
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: res.message,
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getUsers();
              })
            });
          }
        });
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
//							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              console.log(para)
              $post('user/add', para).then(res => {
                if (res.code !== 1000) {
                  this.$message({
                    message: res.message,
                    type: 'error'
                  });
                  this.editLoading = false;
                  this.addLoading = false;
                  return false
                }
                this.addLoading = false;
                this.$message({
                  message: res.message,
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getUsers();
              })
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {ids: ids};
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        }).catch(() => {

        });
      },
      //权限更新
      permissionsSubmit: function () {
        this.$confirm('确认提交吗？', '提示', {}).then(() => {
          this.permissionsLoading = true;
          //NProgress.start();
          let para = Object.assign({}, this.permissionsForm);
          $post('role/add/user/role', {ids: para.ids}, {accountId: para.roleId}).then(res => {
            this.permissionsLoading = false;
            this.$message({
              message: '提交成功',
              type: 'success'
            });
            this.permissionsVisible = false;
          })
        });
      }
    },
    mounted() {
      this.getUsers();
      this.getResource()
    }
  }

</script>

<style scoped>

</style>