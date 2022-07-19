<template>
  <div>
<!--    <el-button type="primary" class="add-btn" @click="dialogTableVisible_add = true">新增角色</el-button>-->

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain class="add-btn" icon="el-icon-plus" @click="addRoleDialog()" size="mini">增加角色</el-button>
      </el-col>
    </el-row>
  <el-table
      :data="tableData"
      style="width: 100%">
    <el-table-column
        prop="id"
        label="Id"
        width="100">
    </el-table-column>
    <el-table-column
        prop="name"
        label="角色名称"
        width="120">
    </el-table-column>
    <el-table-column
        prop="description"
        label="描述"
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
        prop="order"
        label="顺序"
        width="120">
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
        width="200"
        align="center"
        class-name="small-padding fixed-width">
      <template  slot-scope="scoped">
<!--        <el-button type="danger" icon="el-icon-delete" circle></el-button>-->
        <el-button type="text" size="mini" circle @click="editRoleDialog(scoped.row.id)">修改</el-button>
<!--        <el-button type="text" size="mini" circle @click="getRoleMenu(scoped.row.id)">查看角色菜单</el-button>-->
<!--        <el-button type="text" size="small">编辑</el-button>-->
      </template>
    </el-table-column>
  </el-table>

    <el-dialog title="新增角色" :visible.sync="dialogTableVisible_add" width="500px">
      <el-form :model="form_add" label-width="100px">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form_add.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form_add.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form_add.order" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单权限">
          <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>
          <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>
<!--          <el-checkbox v-model="form.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">父子联动</el-checkbox>-->
          <el-tree
              class="tree-border"
              :data="menuData"
              show-checkbox
              ref="menu"
              node-key="menuId"
              empty-text="加载中，请稍候"
              :props="defaultProps"
          ></el-tree>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form_add.remark" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible_add = false">取 消</el-button>
        <el-button type="primary" @click="addRole()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑角色" :visible.sync="dialogTableVisible_edit" width="500px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input v-model="form.order" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单权限">
          <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>
          <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>
<!--          <el-checkbox v-model="form.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">父子联动</el-checkbox>-->
          <el-tree
              class="tree-border"
              :data="menuData"
              show-checkbox
              ref="menu"
              node-key="menuId"

              empty-text="加载中，请稍候"
              :props="defaultProps"
          ></el-tree>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible_edit = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </div>
    </el-dialog>

  </div>


</template>

<script>
import { getRoleMenu,AllTree,editRole,addRole} from "@/api/system/role";
export default {
  data() {
    return {
      tableData: [],
      form: {
        id:'',
        name:'',
        description: '',
        order: '',
        remark: ''
      },
      form_add: {
        id:'',
        name:'',
        description: '',
        order: '',
        remark: ''
      },
      role_menuData:[],
      menuData:[],
      dialogTableVisible_add: false,
      dialogTableVisible_edit: false,
      formLabelWidth: '120px',
      dialogTableVisible_menu: false,
      select_add_menu_role_id:null,

      dialogTableVisible_menu_add: false,
      form_menu: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [],
      value1: [],

      menuExpand: false,
      menuNodeAll: false,

      defaultProps: {
        children: "children",
        label: "menuName"
      },
    }
  },
  methods: {
    // 表单重置
    reset() {
      if (this.$refs.menu != undefined) {
        this.$refs.menu.setCheckedKeys([]);
      }

    },

    //更新角色
    changeInformationStatus(value, { id }, { property }) {
      let parm=property
      let parms={
        id:id,
        [parm]:value
      }
      capis.editRole(
          parms
      )

    },

   //获取角色列表
    getList(){
      capis.getRole({

      }).then(res=>{
        this.tableData=res.datas
      })
    },

    //增加角色弹窗
    addRoleDialog(){
      this.dialogTableVisible_add = true
      this.reset();
      AllTree({}).then(res=> {
        this.menuData = res.datas

      })

    },

    //编辑角色弹窗
    editRoleDialog(id){
      this.dialogTableVisible_edit = true
      this.reset();
      AllTree({}).then(res=>{
        this.menuData=res.datas

      //获取角色菜单
      getRoleMenu({
        id:id
      }).then(res=>{
        if (res.datas!=null){
          this.form=res.datas
          let checkedKeys = []

          for (let i = 0; i < res.datas.menus.length; i++) {

            checkedKeys.push(res.datas.menus[i].menuId)

            //加已有的数据添加到下拉列表中
            checkedKeys.forEach((v) => {
              this.$nextTick(()=>{
                console.log(v)
                this.$refs.menu.setChecked(v, true ,false);
              })
            })
          }

        }



      })

      })

    },

    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    //增加角色
    addRole(){
      var menus=[];
      this.getMenuAllCheckedKeys().filter(item=>{
        menus.push({"menuId":item})
      })
      addRole({
        name:this.form_add.name,
        description:this.form_add.description,
        order:this.form_add.order,
        remark:this.form_add.remark,
        menus:menus
      }).then(res=>{
        this.getList();
        this.dialogTableVisible_add = false
      })
    },
    //编辑角色
    editRole(){
      console.log(this.getMenuAllCheckedKeys());
      console.log(this.form)
      var menus=[];
      this.getMenuAllCheckedKeys().filter(item=>{
        menus.push({"menuId":item})
      })
      editRole({
        id:this.form.id,
        name:this.form.name,
        description:this.form.description,
        remark:this.form.remark,
        order:this.form.order,
        menus:menus
      }).then(res=>{
        this.dialogTableVisible_edit = false
        this.getList()
      })

    },

// 树权限（展开/折叠）
    handleCheckedTreeExpand(value, type) {
      if (type == 'menu') {
        let treeList = this.menuData;
        console.log(treeList)
        for (let i = 0; i < treeList.length; i++) {
          // console.log(treeList[i].id)
          this.$refs.menu.store.nodesMap[treeList[i].menuId].expanded = value;
        }
      }

    },
    // 树权限（全选/全不选）
    handleCheckedTreeNodeAll(value, type) {
      if (type == 'menu') {
        this.$refs.menu.setCheckedNodes(value ? this.menuData: []);
      } else if (type == 'dept') {
        this.$refs.dept.setCheckedNodes(value ? this.deptOptions: []);
      }
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect(value, type) {
      if (type == 'menu') {
        console.log(value)
        this.form.menuCheckStrictly = value ? true: false;
      } else if (type == 'dept') {
        this.form.deptCheckStrictly = value ? true: false;
      }
    },
  },
  created() {
   this.getList();
  },


}
</script>

<style scoped>

</style>
