<template>

  <el-card>

    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="basic">
        <basic-info-form ref="basicInfo" :info="info" />

        <gen-info-form ref="genInfo" :info="info" :tables="tables" :menus="menus"/>
      </el-tab-pane>
<!--      <el-tab-pane label="生成信息" name="genInfo">-->
<!--      -->
<!--      </el-tab-pane>-->
      <el-tab-pane label="字段信息" name="columnInfo">

        <el-table ref="dragTable" :data="columns" row-key="columnId" :max-height="tableHeight">
          <el-table-column label="序号" type="index" min-width="5%" class-name="allowDrag" />
          <el-table-column
            label="字段列名"
            prop="columnName"
            min-width="10%"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.columnName"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="字段描述" min-width="10%">
            <template slot-scope="scope">
              <el-input v-model="scope.row.columnComment"></el-input>
            </template>
          </el-table-column>

<!--          <el-table-column-->
<!--            label="物理类型"-->

<!--            min-width="10%"-->
<!--            :show-overflow-tooltip="true"-->
<!--          >-->
<!--            <template slot-scope="scope">-->
<!--              <el-select v-model="scope.row.columnType">-->
<!--                <el-option label="tinyint(4)" value="tinyint(4)" />-->
<!--                <el-option label="bigint(20)" value="bigint(20)" />-->
<!--                <el-option label="int" value="int" />-->
<!--                <el-option label="varchar(64)" value="varchar(64)" />-->
<!--                <el-option label="varchar(255)" value="varchar(255)" />-->
<!--                <el-option label="char(1)" value="char(1)" />-->
<!--                <el-option label="datetime" value="datetime" />-->
<!--                <el-option label="longblob" value="longblob" />-->
<!--              </el-select>-->
<!--            </template>-->
<!--          </el-table-column>-->

          <el-table-column label="字段类型" min-width="11%">
            <template slot-scope="scope">
              <el-select v-model="scope.row.javaType">
                <el-option label="String" value="String" />
                <el-option label="Integer" value="Integer" />
                <el-option label="Double" value="Double" />
                <el-option label="Date" value="Date" />
                <el-option label="Datetime" value="Datetime" />
                <el-option label="BigDecimal" value="BigDecimal" />
                <el-option label="Text" value="Text" />
                <el-option label="Blod" value="Blod" />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
              label="字段长度"
              prop="fieldNum"
              min-width="10%"
              :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.fieldNum"></el-input>
            </template>
          </el-table-column>

          <el-table-column
              label="小数点"
              prop="pointNum"
              min-width="10%"
              :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.pointNum"></el-input>
            </template>
          </el-table-column>

          <el-table-column
              label="默认值"
              prop="defaultValue"
              min-width="10%"
              :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.defaultValue"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="插入" min-width="5%">
            <template slot-scope="scope">
              <el-checkbox true-label="1" v-model="scope.row.isInsert"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="编辑" min-width="5%">
            <template slot-scope="scope">
              <el-checkbox true-label="1" v-model="scope.row.isEdit"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="列表" min-width="5%">
            <template slot-scope="scope">
              <el-checkbox true-label="1" v-model="scope.row.isList"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="查询" min-width="5%">
            <template slot-scope="scope">
              <el-checkbox true-label="1" v-model="scope.row.isQuery"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="查询方式" min-width="10%">
            <template slot-scope="scope">
              <el-select v-model="scope.row.queryType">
                <el-option label="=" value="EQ" />
                <el-option label="!=" value="NE" />
                <el-option label=">" value="GT" />
                <el-option label=">=" value="GTE" />
                <el-option label="<" value="LT" />
                <el-option label="<=" value="LTE" />
                <el-option label="LIKE" value="LIKE" />
                <el-option label="BETWEEN" value="BETWEEN" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="必填" min-width="5%">
            <template slot-scope="scope">
              <el-checkbox true-label="1" v-model="scope.row.isRequired"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="显示类型" min-width="12%">
            <template slot-scope="scope">
              <el-select v-model="scope.row.htmlType">
                <el-option label="文本框" value="input" />
                <el-option label="文本域" value="textarea" />
                <el-option label="下拉框" value="select" />
                <el-option label="单选框" value="radio" />
                <el-option label="复选框" value="checkbox" />
                <el-option label="日期控件" value="datetime" />
                <el-option label="图片上传" value="imageUpload" />
                <el-option label="文件上传" value="fileUpload" />
                <el-option label="富文本控件" value="editor" />
              </el-select>
            </template>
          </el-table-column>
<!--          <el-table-column label="字典类型" min-width="12%">-->
<!--            <template slot-scope="scope">-->
<!--              <el-select v-model="scope.row.dictType" clearable filterable placeholder="请选择">-->
<!--                <el-option-->
<!--                  v-for="dict in dictOptions"-->
<!--                  :key="dict.dictType"-->
<!--                  :label="dict.dictName"-->
<!--                  :value="dict.dictType">-->
<!--                  <span style="float: left">{{ dict.dictName }}</span>-->
<!--                  <span style="float: right; color: #8492a6; font-size: 13px">{{ dict.dictType }}</span>-->
<!--              </el-option>-->
<!--              </el-select>-->
<!--            </template>-->
<!--          </el-table-column>-->

          <el-table-column
              label="字典table"
              prop="dictTable"
              min-width="10%"
              :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.dictTable"></el-input>
            </template>
          </el-table-column>
          <el-table-column
              label="字典code"
              prop="dictCode"
              min-width="10%"
              :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.dictCode"></el-input>
            </template>
          </el-table-column>
          <el-table-column
              label="字典text"
              prop="dictText"
              min-width="10%"
              :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.dictText"></el-input>
            </template>
          </el-table-column>

        </el-table>
        <el-button size="mini" plain type="primary" @click="add()">新增字段</el-button>
      </el-tab-pane>


    </el-tabs>
    <el-form label-width="100px">
      <el-form-item style="text-align: center;margin-left:-100px;margin-top:10px;">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="close()">返回</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getGenTable, updateGenTable } from "@/api/tool/gen";
import { optionselect as getDictOptionselect } from "@/api/system/dict/type";
 import { listMenu as getMenuTreeselect } from "@/api/system/menu";
import basicInfoForm from "./basicInfoForm";
import genInfoForm from "./genInfoForm";
import Sortable from 'sortablejs'

export default {
  name: "GenEdit",
  components: {
    basicInfoForm,
    genInfoForm
  },
  data() {
    return {
      // 选中选项卡的 name
      activeName: "basic",
      // 表格的高度
      tableHeight: document.documentElement.scrollHeight - 245 + "px",
      // 表信息
      tables: [],
      // 表列信息
      columns: [],
      // 字典信息
      dictOptions: [],
      // 菜单信息
      menus: [],
      // 表详细信息
      info: {}
    };
  },
  created() {
    const tableId = this.$route.query.id;
    if (tableId) {
      // 获取表详细信息
      getGenTable(tableId).then(res => {
        this.columns = res.datas.rows;
        this.info = res.datas.info;
        this.tables = res.datas.tables;
      });
      /** 查询字典下拉列表 */
      getDictOptionselect().then(response => {
        this.dictOptions = response.datas;
      });
      /** 查询菜单下拉列表 */
      getMenuTreeselect().then(response => {
        this.menus = this.handleTree(response.datas, "menuId");
      });
    }
  },
  methods: {
    //新增
    add() {
      if (this.tables[0]==null){
        this.columns.push({
          "columnId": '',
          "tableId": '',
          "columnName": "",
          "columnComment": "",
          "columnType": "",
          "javaType": "String",
          "javaField": "",
          "isPk": "0",
          "isIncrement": "0",
          "isRequired": null,
          "isInsert": "1",
          "isEdit": "1",
          "isList": "1",
          "isQuery": null,
          "queryType": "EQ",
          "htmlType": "input",
          "dictType": "",
          "sort":  '',
          "required": false,
          "list": true,
          "pk": false,
          "insert": true,
          "edit": true,
          "query": false,
          "superColumn": true,
          "increment": false,
          "capJavaField": "",
          "usableColumn": true
        })
      }else {
        this.columns.push({
          "columnId": '',
          "tableId": this.tables[0].tableId,
          "columnName": "",
          "columnComment": "",
          "columnType": "",
          "javaType": "String",
          "javaField": "",
          "isPk": "0",
          "isIncrement": "0",
          "isRequired": null,
          "isInsert": "1",
          "isEdit": "1",
          "isList": "1",
          "isQuery": null,
          "queryType": "EQ",
          "htmlType": "input",
          "dictType": "",
          "sort":  this.columns[this.columns.length-1].sort+1,
          "required": false,
          "list": true,
          "pk": false,
          "insert": true,
          "edit": true,
          "query": false,
          "superColumn": true,
          "increment": false,
          "capJavaField": "",
          "usableColumn": true
        })
      }

      console.log(this.columns)
    },
    /** 提交按钮 */
    submitForm() {
      const basicForm = this.$refs.basicInfo.$refs.basicInfoForm;
      const genForm = this.$refs.genInfo.$refs.genInfoForm;
      Promise.all([basicForm, genForm].map(this.getFormPromise)).then(res => {
        const validateResult = res.every(item => !!item);
        if (validateResult) {
          const genTable = Object.assign({}, basicForm.model, genForm.model);
          genTable.columns = this.columns;
          genTable.params = {
            treeCode: genTable.treeCode,
            treeName: genTable.treeName,
            treeParentCode: genTable.treeParentCode,
            parentMenuId: genTable.parentMenuId
          };
          updateGenTable(genTable).then(res => {
            this.$modal.msgSuccess(res.msg);
            if (res.code === 200) {
              this.close();
            }
          });
        } else {
          this.$modal.msgError("表单校验未通过，请重新检查提交内容");
        }
      });
    },
    getFormPromise(form) {
      return new Promise(resolve => {
        form.validate(res => {
          resolve(res);
        });
      });
    },
    /** 关闭按钮 */
    close() {
      const obj = { path: "/pages/createCode", query: { t: Date.now(), pageNum: this.$route.query.pageNum } };
      this.$tab.closeOpenPage(obj);
    }
  },
  mounted() {
    const el = this.$refs.dragTable.$el.querySelectorAll(".el-table__body-wrapper > table > tbody")[0];
    const sortable = Sortable.create(el, {
      handle: ".allowDrag",
      onEnd: evt => {
        const targetRow = this.columns.splice(evt.oldIndex, 1)[0];
        this.columns.splice(evt.newIndex, 0, targetRow);
        for (let index in this.columns) {
          this.columns[index].sort = parseInt(index) + 1;
        }
      }
    });
  }
};
</script>
