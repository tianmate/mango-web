<template>

  <div class="root">
<!--    顶部搜索-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline"  size="small">
      <el-form-item >
        <el-select v-model="formInline.region" placeholder="搜索类型">
          <el-option label="账户" value="username"></el-option>
          <el-option label="电话" value="tel"></el-option>
          <el-option label="用户类型" value="userType"></el-option>
          <el-option label="用户名" value="nickName"></el-option>
          <el-option label="是否启用" value="enable"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-input
            v-model="search_value"
            class="search"
            placeholder="请输入内容"
            prefix-icon="el-icon-search">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" @click="search()" size="mini">搜索</el-button>


      </el-form-item>
    </el-form>

<!--    新增用户按钮-->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain class="add-btn" icon="el-icon-plus" @click="dialogTableVisible_add = true" size="mini">增加用户</el-button>
      </el-col>
    </el-row>

<!--    用户列表-->
    <el-table
        :data="userData"
        style="width: 100%">
      <el-table-column
          type="index"
          label="id"
          width="80">
      </el-table-column>
      <el-table-column
          prop="username"
          label="账户"
          width="120">
      </el-table-column>
      <el-table-column
          prop="tel"
          label="电话"
          width="120">
      </el-table-column>
<!--      <el-table-column-->
<!--          prop="userType"-->
<!--          label="用户类型"-->
<!--          width="120">-->
<!--      </el-table-column>-->
      <el-table-column
          prop="nickName"
          label="用户名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="remark"
          label="备注"
          width="120">
      </el-table-column>

      <el-table-column
          prop="enable"
          label="是否启用"
          width="120">
        <template slot-scope="scoped">
                <el-switch
                    v-model="scoped.row.enable"

                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0"
                    @change="changeInformationStatus($event, scoped.row, scoped.column)">
                </el-switch>

        </template>
      </el-table-column>

      <el-table-column
          prop="del"
          label="是否删除"
          width="120">
        <template slot-scope="scoped">
          <el-switch
              v-model="scoped.row.del"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              @change="changeInformationStatus($event, scoped.row, scoped.column)">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column
          label="操作"
          width="260"
          align="center"
          class-name="small-padding fixed-width">
        <template slot-scope="scoped" >

<!--          <el-button type="danger" icon="el-icon-delete" circle @click="removeUserDialog(scoped.row.id)"></el-button>-->
          <el-button type="text" size="mini" circle @click="editUserDialog(scoped.row.id)">修改</el-button>
<!--          <el-button type="text" size="mini" circle @click="getUserRole(scoped.row.id)">查看用户角色</el-button>-->
          <el-button type="text" size="mini" circle @click="getUserMenu(scoped.row.id)">查看用户菜单</el-button>

        </template>
      </el-table-column>

    </el-table>


<!--    角色管理弹窗-->
    <el-dialog title="查看菜单" :visible.sync="dialogTableVisible_menu">
<!--      <el-button type="primary" class="add-role-btn" plain size="mini" @click="addRoleDialog()">增加角色</el-button>-->
      <el-table
          :data="user_menuData"
          row-key="menuId"
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

        <el-table-column property="menuId" label="id" width="150"></el-table-column>
        <el-table-column property="menuName" label="菜单名称" width="200"></el-table-column>


      </el-table>

    </el-dialog>

<!--    新增用户弹窗-->
    <el-dialog title="新增用户" :visible.sync="dialogTableVisible_add">
      <el-form :model="form_add">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="form_add.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form_add.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible_add = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

<!--    编辑用户弹窗-->
    <el-dialog title="编辑用户" :visible.sync="dialogTableVisible_edit">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="role in roles" :label="role.id" :key="role.id">{{role.description}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible_edit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

<!--    删除用户确认框-->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible_remove"
        width="30%"
        >
      <span>确认删除吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible_remove = false">取 消</el-button>
    <el-button type="primary" @click="removeUser()">确 定</el-button>
  </span>
    </el-dialog>

<!--    删除角色确认框-->
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible_remove_role"
        width="30%"
    >
      <span>确认删除吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible_remove_role = false">取 消</el-button>
    <el-button type="primary" @click="removeUser()">确 定</el-button>
  </span>
    </el-dialog>

<!--    增加用户角色弹出框-->
<!--    <el-dialog title="添加角色" :visible.sync="dialogFormVisible_add_role_diablog">-->
<!--      <el-form :model="form">-->
<!--        <el-select-->
<!--            v-model="value_role"-->
<!--            multiple-->
<!--            filterable-->
<!--            allow-create-->
<!--            default-first-option-->
<!--            placeholder="请选择角色">-->
<!--          <el-option-->
<!--              v-for="item in options_role"-->
<!--              :key="item.id"-->
<!--              :label="item.description"-->
<!--              :value="item.id">-->
<!--          </el-option>-->
<!--        </el-select>-->

<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button @click="dialogFormVisible_add_role_diablog = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="addRole()">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->

  </div>

</template>

<script>
import { updateUser } from "@/api/system/user";

export default {
  data() {
    return {

      //用户数据
      userData: [],
      //角色数据
      user_roleData: [],
      //菜单数据
      user_menuData: [],

      dialogVisible_remove_role:false,
      dialogTableVisible_menu: false,
      dialogTableVisible_role: false,
      dialogTableVisible_add: false,
      dialogTableVisible_edit: false,
      dialogVisible_remove: false,
      dialogFormVisible_add_role_diablog: false,


      //编辑数据
      form: {
        id:'',
        username: '',
        password: '',
        tel:'',
        nickName:'',
        remark:''
      },

      //新增数据
      form_add: {
        id:'',
        username: '',
        password: '',
        tel:'',
        nickName:'',
        remark:''
      },

      //搜索
      formInline: {
        user: '',
        region: ''
      },
      //搜索值
      search_value:'',
      formLabelWidth: '120px',

      //角色管理
      options_role: [],
      value_role: [],
      select_add_role_account_id:"",

      //角色复选框
      checkAll: false,
      checkedRoles: [],
      roles: [],
      isIndeterminate: true
    }


  },
  methods: {

    search:function (){

      let parm=this.formInline.region

      let parms={[parm]:this.search_value}

        capis.getUser(
          parms
        ).then(res=>{
          this.userData = res.datas
        })

    },

    getUserList: function () {
      capis.getUser({}).then(res => {
        this.userData = res.datas
      })
    },

    getUserMenu: function (id) {
      this.dialogTableVisible_menu = true
      capis.getUserMenu({
        id: id
      }).then(res => {
        this.user_menuData = res.datas
      })
    },

    getUserRole: function (id) {
      this.select_add_role_account_id=id
      this.dialogTableVisible_role = true
      this.user_roleData=null
      capis.getUserRole({
        id: id
      }).then(res => {
       // this.cities = res.datas
     // this.checkedCities=res.datas.roles
        this.checkedRoles=[];
        if (res.datas.roles!='undefined'){
          for (let i = 0; i < res.datas.roles.length; i++) {
            //console.log(res.datas.roles[i].id)
            this.checkedRoles.push(res.datas.roles[i].id)
          }
        }

      })

    },

    getRoleList:function (){
      capis.getRole({

      }).then(res => {
        this.roles=res.datas
      })
    },

    addUser: function () {
      capis.addUser({
        "username": this.form_add.name,
        "password": this.form_add.password
      }).then(res => {
        if (res.code == 200) {
          this.$message.success("保存成功");
          this.dialogTableVisible_add = false
          this.getUserList();
        }
      })
      this.dialogTableVisible_add = true

    },
    editUser: function () {

      var roles=[];

      for (let i = 0; i < this.checkedRoles.length; i++) {
        roles.push({"id":this.checkedRoles[i]})
      }

      updateUser({
        id:this.form.id,
        username: this.form.username,
        password: this.form.password,
        tel:this.form.tel,
        nickName:this.form.nickName,
        remark:this.form.remark,
        roles:roles
      }).then(res=>{
        if (res.code==200){
          this.dialogTableVisible_edit = false
          this.$message.success("操作成功");
          this.getUserList();
        }
      })
    },

    editUserDialog: function (id) {
      this.dialogTableVisible_edit = true

      this.getRoleList();
      this.getUserRole(id);

      capis.getUser({
        id:id
      }).then(res=>{

        this.form.id=res.datas[0].id
        this.form.username=res.datas[0].username
        this.form.password=res.datas[0].password
        this.form.tel=res.datas[0].tel
        this.form.nickName=res.datas[0].nickName
        this.form.remark=res.datas[0].remark
      })
    },

    removeUser:function (value, { id }, { property }){
      capis.removeUser({
        id:id
      }).then(res=>{
        if (res.code==200){
          this.$message.success("删除成功");
          this.dialogVisible_remove=false
          this.getUserList();
        }
      })
    },



    addRole:function (){
      const account={

          "id":this.select_add_role_account_id
      };

      let rolelist=[];
      let role='';
      for (let i = 0; i < this.value_role.length; i++) {
        role={
          "id": this.value_role[i]
        }
        rolelist.push(role)
      }

      let roles={
        account,
        "roles": rolelist
      }

      capis.addUserRole(roles).then(res=>{
        if (res.code==200){
          this.$message.success("操作成功");
          this.dialogFormVisible_add_role_diablog = false
        }
      })
    },
    //更新用户
    changeInformationStatus(value, { id }, { property }) {
      let parm=property

      let parms={
        id:id,
        [parm]:value
      }
      capis.editUser(
        parms
      )

    },

    removeUserRole(  id ){

      capis.removeUserRole({
        voId:id,
        del:1
      })
    },

    //选中复选框
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;

      console.log(this.checkedCities)
    }
  },
  created() {
    this.getUserList();

  },


}
</script>

<style scoped>
.search{
  width: 200px;
  margin-right: 5px;
}
.demo-form-inline{
  width: 100px;
  display: inline;
}
.search-btn{
  margin: 1px 30px 20px 0px;
  border-radius: 10px;
  height: 40px;
}

.add-role-btn{
  margin-bottom: 10px;
}
.page{
  margin-top: 20px;
}

el-checkbox{
  display: inline;
  width: 50px;
}
</style>