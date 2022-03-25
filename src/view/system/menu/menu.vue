<template>
  <div class="root">
    <el-button type="primary" class="add-btn" @click="dialogFormVisible_add = true" plain>增加菜单</el-button>
    <el-table
        :data="tableData"
        border
        style="width: 100%"
        row-key="id"
        :tree-props="{children: 'children'}"
    >
      <el-table-column
          prop="id"
          label="id"
          width="100">
      </el-table-column>
      <el-table-column
          prop="name"
          label="菜单名字"
          width="120">
      </el-table-column>
      <el-table-column
          prop="description"
          label="菜单描述"
          width="120">
      </el-table-column>
      <el-table-column
          prop="path"
          label="路由"
          width="120">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="图标"
          width="120">
      </el-table-column>
      <el-table-column
          prop="enable"
          label="是否启用"
          width="120">
        <template slot-scope="scoped">
          <el-switch
              v-model="scoped.row.enable"
              :active-value="0"
              :inactive-value="1"
              active-color="#13ce66"
              inactive-color="#ff4949"
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
              :active-value="0"
              :inactive-value="1"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeInformationStatus($event, scoped.row, scoped.column)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
          label="操作"
          width="200">
        <template slot-scope="scoped">
          <!--        <el-button type="danger" icon="el-icon-delete" circle></el-button>-->
          <el-button type="primary" icon="el-icon-edit" circle @click="edit_dialog(scoped.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="增加菜单" :visible.sync="dialogFormVisible_add">
      <el-form :model="form_add">

<!--        <el-form-item label="父级菜单">-->
<!--          <el-select v-model="form.region" placeholder="请选择活动区域">-->
<!--            <el-option >-->
<!--              <el-tree id="tree-option" :data="data" :props="defaultProps" @node-click="handleNodeClick">-->

<!--              </el-tree>-->
<!--            </el-option>-->

<!--          </el-select>-->
<!--        </el-form-item>-->

        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form_add.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单描述" :label-width="formLabelWidth">
          <el-input v-model="form_add.description" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="路由" :label-width="formLabelWidth">
          <el-input v-model="form_add.path" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form_add.icon" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单顺序" :label-width="formLabelWidth">
          <el-input v-model="form_add.order" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="父菜单" :label-width="formLabelWidth">
          <el-input v-model="form_add.parentId" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_add = false">取 消</el-button>
        <el-button type="primary" @click="add()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑菜单" :visible.sync="dialogFormVisible_edit">
      <el-form :model="form">

        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="路由" :label-width="formLabelWidth">
          <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="菜单顺序" :label-width="formLabelWidth">
          <el-input v-model="form.order" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_edit = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      dialogFormVisible_add: false,
      dialogFormVisible_edit: false,
      form_add: {
        name: '',
        description: '',
        path: '',
        icon: '',
        order: '',
        parentId:''
      },
      form: {
        name: '',
        description: '',
        path: '',
        icon: '',
        order: '',
        parentId:''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {

    getList() {
      capis.getMenu({}).then(res => {
        console.log(res.datas)
        this.tableData = res.datas
      })
    },

    add() {
      capis.addMenu({
        name: this.form_add.name,
        description: this.form_add.description,
        path: this.form_add.path,
        icon: this.form_add.icon,
        order: this.form_add.order,
        parentId:this.form_add.parentId
      }).then(res => {
        this.dialogFormVisible_add = false
        this.getList();
      })
    },
    //更新菜单
    changeInformationStatus(value, {id}, {property}) {
      let parm = property

      let parms = {
        id: id,
        [parm]: value
      }
      capis.editMenu(
          parms
      )

    },

    edit_dialog(id) {
      this.dialogFormVisible_edit = true
      capis.getMenuDatail({
        id: id
      }).then(res => {
        this.form.id=res.datas.id
        this.form.name=res.datas.name
        this.form.description=res.datas.description
        this.form.path=res.datas.path
        this.form.icon=res.datas.icon
        this.form.order=res.datas.order
          }
      )
    },
    edit(){
      capis.editMenu({
        id:this.form.id,
        name: this.form.name,
        description: this.form.description,
        path: this.form.path,
        icon: this.form.icon,
        order: this.form.order
      }).then(res => {
        this.dialogFormVisible_edit = false
        this.getList();
      })
    }
  },
  created() {
    this.getList();
  },


}
</script>

<style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
  overflow-y: auto;
}

</style>