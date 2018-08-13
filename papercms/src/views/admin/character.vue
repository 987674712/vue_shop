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
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
            <el-table-column prop="index" label="编号" width="80"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="140"></el-table-column>
            <el-table-column prop="nameDesc" label="角色描述" min-width="180"></el-table-column>
            <el-table-column prop="status" label="角色状态" :formatter="formatStatus" min-width="100"></el-table-column>
            <el-table-column label="操作" width="216" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="primary" size="mini" @click="permissionsEdit(scope.$index, scope.row)">权限</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">{{scope.row.status == "1"?"停用":"启用"}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="角色姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="nameDesc">
                    <el-input v-model="editForm.nameDesc" auto-complete="off"></el-input>
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
                <el-form-item label="角色姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="nameDesc">
                    <el-input v-model="addForm.nameDesc" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item label="性别">-->
                <!--<el-radio-group v-model="addForm.sex">-->
                <!--<el-radio class="radio" :label="1">男</el-radio>-->
                <!--<el-radio class="radio" :label="0">女</el-radio>-->
                <!--</el-radio-group>-->
                <!--</el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--权限编辑页面-->
        <el-dialog title="权限编辑" v-model="permissionsVisible" :close-on-click-modal="false">
            <el-form :model="permissionsForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-checkbox-group label="权限管理" v-model="permissionsForm.ids">
                    <el-checkbox style="margin-left: 1em" v-for="item in permissions" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
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

        editFormVisible: false,//编辑界面是否显示
        permissionsVisible: false,//编辑界面是否显示
        permissionsLoading: false,
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          nameDesc: [
            { required: true, message: '请输入角色描述', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          nameDesc: ''
        },
        permissionsForm:{
          ids:[],
          roleId:0
        },
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          nameDesc: [
            { required: true, message: '请输入角色描述', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          name: '',
          nameDesc: ''
        },
        permissions:[

        ],
        win_heiht:document.documentElement.clientHeight-72-19-20-60-86-10
      }
    },
    methods: {
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      // 角色状态转换
      formatStatus: function (row, column) {
        return row.status == 0 ? '停用' : row.status == 1 ? '启用' : '未知';
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
        var that = this
        //NProgress.start();
        $get('role/list', para).then(res => {
          that.total = res.data.total;
          that.users = res.data.list;
          that.listLoading = false;
        })
      },
      //获取权限列表
      getResource() {
        let para = {
          pageNumber: this.page,
          pageSize: 100
        };
        this.listLoading = true;
        var that = this;
        $get('menu/list', para).then(res => {
          that.permissions = res.data.list
        })
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认要操作该用户吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = {id: row.id,type: row.status == 0?1:0};
          var that = this;
          $post('role/awaken',{},para).then(data => {
            that.listLoading = false;
            that.$message({
              message: data.msg,
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
      //显示权限编辑界面
      permissionsEdit: function (index, row) {
        this.permissionsVisible = true;
        this.permissionsForm.ids = []
        var that = this
        $get('menu/role/selected', {},{roleId:row.id}).then(res => {
          var json = []
          for (var value of res.data) {
            json.push(value.id)
          }
          that.permissionsForm.ids = json
        })
        this.permissionsForm.roleId = row.id;
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          nameDesc: ''
        };
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
              var that = this;
              $post('role/update',para,{id:para.id}).then(res => {
                if(res.code != 1000){
                  that.$message({
                    message: res.msg,
                    type: 'error'
                  });
                  that.editLoading = false;
                  that.addLoading = false;
                  return false
                }
                that.editLoading = false;
                //NProgress.done();
                that.$message({
                  message: res.msg,
                  type: 'success'
                });
                that.$refs['editForm'].resetFields();
                that.editFormVisible = false;
                that.getUsers();
              })
            });
          }
        });
      },
      //权限更新
      permissionsSubmit: function () {
        this.$confirm('确认提交吗？', '提示', {}).then(() => {
          this.permissionsLoading = true;
          //NProgress.start();
          let para = Object.assign({}, this.permissionsForm);
          var that = this;
          $post('role/add/role/SysMenu',{ids:para.ids},{roleId:para.roleId}).then(res => {
            if(res.code != 1000){
              that.$message({
                message: res.msg,
                type: 'error'
              });
              that.editLoading = false;
              that.addLoading = false;
              return false
            }
            that.permissionsLoading = false;
            that.$message({
              message: res.msg,
              type: 'success'
            });
            that.permissionsVisible = false;
          })
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
              var that = this;
              $post('role/add',para).then(res => {
                that.addLoading = false;
                that.$message({
                  message: '提交成功',
                  type: 'success'
                });
                that.$refs['addForm'].resetFields();
                that.addFormVisible = false;
                that.getUsers();
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
          let para = { ids: ids };
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