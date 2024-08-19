<template>
  <div style="height:100%;width:100%">
    <el-table
      :data="table_Data.table_data"
      v-loading="table_Data.parameter.vLoading"
      :stripe="table_Data.parameter.stripe || false"
      type="index"
      class="scrollTop"
      :ref="tableData.refTable"
      :default-sort="table_Data.parameter.default"
      :size="table_Data.parameter.size"
      :border="table_Data.parameter.border"
      height="calc(100% - 45px)"
      :show-header="table_Data.parameter.showHeader"
      :highlight-current-row="table_Data.parameter.currentRow ? false : true"
      @row-click="onRowClick"
      @row-dblclick="onRowDblclick"
      @select="handleSelectionChange"
      @select-all="handleSelectionChange"
      :row-class-name="tableRowClassName"
      :row-style="onCellStyle"
      show-overflow-tooltip
      style="width: 100%;"
    >
      <template v-for="(item, index) in table_Data.table_column">
        <el-table-column
          v-if="
            item.type != 'imgTable' && item.label != '操作' && item.type != 'selection' && !item.isEdit && item.label != '状态'
          "
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : ''"
          :show-overflow-tooltip="item.overflow == false ? false : true"
          :sortable="item.sortable"
          :fixed="item.fixed"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="item.type == 'selection'"
          :key="index"
          :selectable="(row)=>selectableFunc(row,item)"
          :fixed="item.fixed"
          type="selection"
          :width="item.width ? item.width : ''"
          :show-overflow-tooltip="item.overflow == false ? false : true"
          :sortable="item.sortable"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="item.isEdit"
          :fixed="item.fixed"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width ? item.width : ''"
          :show-overflow-tooltip="item.overflow == false ? false : true"
          :sortable="item.sortable"
          align="center"
        >
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.isEdit && item.prop.indexOf('Time') == -1"
              v-model="scope.row[item.prop]"
              size="mini"
              style="width: 100%"
            ></el-input>
            <el-date-picker
              v-else-if="
                scope.row.isEdit && item.prop.indexOf('registerTime') >= 0
              "
              v-model="scope.row[item.prop]"
              size="mini"
              type="datetime"
              style="width: 100%"
            ></el-date-picker>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>

        <el-table-column
          v-if="item.label == '操作'"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.width ? item.width : ''"
          show-overflow-tooltip
          :fixed="item.fixed"
          align="center"
        >
          <template slot-scope="scope">
            <template>
              <span
                v-for="(list, i) in scope.row.operation"
                @click.stop="onClick(scope.row, list.name)"
                style="cursor:pointer;color:#40a9ff;margin-right:10px"
                :key="i"
                type="primary"
                plain
                >{{ list.name }}</span
              >
            </template>
          </template>
        </el-table-column>

        <el-table-column
          v-if="item.type == 'imgTable'"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          align="center"
          :width="item.width ? item.width : ''"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <template>
              <el-image 
                style="height: 30px;width:30px"
                :src="scope.row[item.prop]" 
                :preview-src-list="scope.row.imgSrcList?scope.row.imgSrcList:[scope.row[item.prop]]"
                >
              </el-image>
            </template>
          </template>
        </el-table-column>



        <el-table-column
          v-if="item.label == '状态' || item.label == '账单状态'"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.width ? item.width : ''"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <template>
              <el-button
                @click.stop="onClick(scope.row,'changeStatus')"
                :style="scope.row.style"
                type="primary"
                plain
                >{{ scope.row[item.prop] }}</el-button
              >
            </template>
          </template>
        </el-table-column>



      </template>
    </el-table>
    <el-pagination
      v-if="tableData.pagination.show"
      background
      :current-page.sync="tableData.pagination.pageIndex"
      layout="prev, pager, next, sizes, jumper"
      :page-size="tableData.pagination.size"
      :total="tableData.pagination.total"
      @current-change="onCurrentChange"
      @size-change="handleSizeChange"
      :style="tableData.pagination.style"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ["table_Data", "tableData"],
  mounted() {
    console.log(this.table_Data,'this.table_Data')
  },

  watch: {
    "table_Data.table_data"() {
      console.log(this.table_Data,'this.table_Data')
    },
  },
  methods: {
    onClick(data, type) {
      if (this.tableData && this.tableData.busEmit) {
        this.$bus.$emit(this.tableData.busEmit, data, type);
      }
    },
    onRowClick(data) {
      if (this.tableData && this.tableData.busEmit) {
        // this.$bus.$emit(this.tableData.busEmit, data, "tableRow");
      }
    },
    onRowDblclick(data) {
      if (this.tableData && this.tableData.busEmit) {
        // this.$bus.$emit(this.tableData.busEmit, data, "列表双击");
      }
    },
    //返回行背景色
    tableRowClassName(row) {
      if(row.row.orderFlagName == '风险单'){
        return 'redFontColor'
      }
      if (row.row.dataTime) {
        if (row.row.states == "1") {
          return "bagStateRed";
        }
      }
    },
    //单元格样式
    onCellStyle(row, rowIndex) {
      if (row.row.style) {
        return row.row.style;
      } else {
        return "";
      }
    },
    selectableFunc(row,item){
      // console.log('规则',row,item)
      let bl = true;
      if(item.selectionRule){
        for(let i=0;i<item.selectionRule.length;i++){
          if(item.selectionRule[i].value == row[item.selectionRule[i].props]){
              bl = item.selectionRule[i].res;
              break;
            }else{
              bl = !item.selectionRule[i].res
            }
        }
      }
      return bl;
      // if(row.style == "color: #f5222d;background: #fff1f0;border-color: #ffa39e;"){
      //   return false
      // }else{
      //   return true
      // }
    },
    //列表复选框改变
    handleSelectionChange(val) {
      if (this.tableData && this.tableData.busEmit) {
        this.$bus.$emit(this.tableData.busEmit, val, "列表复选框");
        this.$bus.$emit(this.tableData.busEmit, this, "列表That");
      }
    },
    //列表翻页
    onCurrentChange(val){
      if (this.tableData && this.tableData.busEmit) {
        this.$bus.$emit(this.tableData.busEmit, val, '翻页');
      }
    },
    //条数改变
    handleSizeChange(val){
      if (this.tableData && this.tableData.busEmit) {
        this.$bus.$emit(this.tableData.busEmit, val, 'SizeChange');
      }
    },
  },
};
</script>

<style scoped>
.el-pagination__jump{
  margin: 0 !important;
}
.el-image{
  overflow: initial;
}
/deep/ .el-image__error{
  display: none !important;
}
</style>
