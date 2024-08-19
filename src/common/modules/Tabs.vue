<template>
  <div style="height:100%;width:100%">
    <el-radio-group v-model="activeName" @tab-click="onHandleClick">
      <!-- <el-tab-pane
        v-for="(item,index) in tabsData"
        :key="index"
        :label="item.label"
        :name="item.name"
      > -->
        <!-- <modulesTree v-if="item.type=='tree'" :tree_Data='item.data'></modulesTree>
        <modulesTable v-if="item.type=='table'" :table_Data='item.data'></modulesTable>-->
        <!-- <Modules v-if="item.data" :data="item.data"></Modules> -->
      <!-- </el-tab-pane> -->

      <el-radio-button
        v-for="(item,index) in tabsData"
        :key="index"
        :label="item.label"
        :name="item.name"></el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import modulesTable from "./Table";
import modulesTree from "./Tree";
export default {
  name: "taps",
  components: {
    modulesTree,
    modulesTable,
    // Modules
  },
  data() {
    return {
      activeName: "",
      data: []
    };
  },
  props: ["tabsData", "busEmit",'tabActiveName'],
  created() {},
  mounted() {
    this.activeName=this.$props.tabActiveName.name
  },
  watch:{
    'tabActiveName.name'(){
      console.log()
      this.activeName=this.$props.tabActiveName.name
    },
    activeName(data){
      console.log(data)
      if (this.busEmit) {
        this.$bus.$emit(this.busEmit, data, "Tab");
      }
    }
  },
  methods: {
    // 切换
    onHandleClick(data) {
      console.log(data)
      if (this.busEmit) {
        this.$bus.$emit(this.busEmit, data, "Tab");
      }
    }
  }
};
</script>

<style>
.custom-blue .el-tabs__item.is-active {
  color: #054962 !important;
}
.custom-blue .el-tabs__item:hover {
  color: #054962 !important;
}
</style>
