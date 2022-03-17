<template>
<div class="root">
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="菜单名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="表名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="类名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
  </el-form>

  <el-table
      :data="tableData"
      style="width: 100%">
    <el-table-column
        prop="date"
        label="日期"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
    </el-table-column>
  </el-table>
  <el-button type="success">新增字段</el-button>
  <el-button type="primary">预览</el-button>
  <el-button type="success">执行</el-button>
</div>
</template>

<script>
export default {
name: "createCode",
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>

<style scoped>

</style>