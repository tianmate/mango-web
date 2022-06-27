<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="用户名称" prop="username">
        <el-input
          v-model="queryParams.username"
          placeholder="请输入用户名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务key" prop="workKey">
        <el-input
          v-model="queryParams.workKey"
          placeholder="请输入业务key"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="业务value" prop="workValue">
        <el-input
          v-model="queryParams.workValue"
          placeholder="请输入业务value"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="请求路径" prop="requestUrl">
        <el-input
          v-model="queryParams.requestUrl"
          placeholder="请输入请求路径"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="sysLogList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
<!--      <el-table-column label="日志类型" align="center" prop="logType" />-->
      <el-table-column label="日志内容" align="center" prop="logContent" />
<!--      <el-table-column label="操作类型(增删改查)" align="center" prop="operateType" />-->
      <el-table-column label="用户名称" align="center" prop="username" />
      <el-table-column label="ip" align="center" prop="ip" />
      <el-table-column label="业务key" align="center" prop="workKey" />
      <el-table-column label="业务value" align="center" prop="workValue" />
      <el-table-column label="请求接口" align="center" prop="requestUrl" />
<!--      <el-table-column label="请求参数" align="center" prop="requestParam" />-->
<!--      <el-table-column label="请求java方法" align="center" prop="method" />-->
      <el-table-column label="创建时间" align="center" prop="createTime" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改日志管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="日志类型" prop="logType">
          <el-input v-model="form.logType" placeholder="请输入日志类型" />
        </el-form-item>
        <el-form-item label="日志内容" prop="logContent">
          <el-input v-model="form.logContent" placeholder="请输入日志内容" />
        </el-form-item>
        <el-form-item label="操作类型(增删改查)" prop="operateType">
          <el-input v-model="form.operateType" placeholder="请输入操作类型(增删改查)" />
        </el-form-item>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="ip" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入ip" />
        </el-form-item>
        <el-form-item label="业务key" prop="workKey">
          <el-input v-model="form.workKey" placeholder="请输入业务key" />
        </el-form-item>
        <el-form-item label="业务value" prop="workValue">
          <el-input v-model="form.workValue" placeholder="请输入业务value" />
        </el-form-item>
        <el-form-item label="请求路径" prop="requestUrl">
          <el-input v-model="form.requestUrl" placeholder="请输入请求路径" />
        </el-form-item>
        <el-form-item label="请求参数" prop="requestParam">
          <el-input v-model="form.requestParam" placeholder="请输入请求参数" />
        </el-form-item>
        <el-form-item label="请求java方法" prop="method">
          <el-input v-model="form.method" placeholder="请输入请求java方法" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listSysLog, getSysLog, delSysLog, addSysLog, updateSysLog, exportSysLog } from "@/api/system/sysLog";

export default {
  name: "SysLog",
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 日志管理表格数据
      sysLogList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 主键字典
      idOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        logType: null,
        operateType: null,
        username: null,
        workKey: null,
        workValue: null,
        requestUrl: null,
        method: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getDicts("${column.dictType}").then(response => {
      this.idOptions = response.data;
    });
  },
  methods: {
    /** 查询日志管理列表 */
    getList() {
      this.loading = true;
      listSysLog(this.queryParams).then(response => {
        this.sysLogList = response.datas;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 主键字典翻译
    idFormat(row, column) {
      return this.selectDictLabel(this.idOptions, row.id);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        logType: null,
        logContent: null,
        operateType: null,
        username: null,
        ip: null,
        workKey: null,
        workValue: null,
        requestUrl: null,
        requestParam: null,
        method: null,
        createTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加日志管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSysLog(id).then(response => {
        this.form = response.datas;
        this.open = true;
        this.title = "修改日志管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSysLog(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSysLog(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除日志管理编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delSysLog(ids);
        }).then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有日志管理数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportSysLog(queryParams);
        }).then(response => {
          this.download(response.msg);
        })
    }
  }
};
</script>
