<template>
  <div style="height: 100%">
    <el-tree
      v-if="treeData"
      ref="tree"
      @node-click="onClickTree"
      @check="onCheckTree"
      :data="treeData"
      :default-expand-all="tree_Data.defaultExpandAll"
      :props="tree_Data.props"
      :node-key="tree_Data.key"
      style="height: 100%"
      :show-checkbox="tree_Data.show_checkbox"
      :indent="tree_Data.indent"
      @check-change="checkChange"
    >
    
    <div class="custom-tree-node" slot-scope="{ node, data }" style="width:30px;height:30px;display: flex;">
       <img :src="data.categoryIconPath" alt="" style="width: 100%;">                         
       <span style="line-height: 30px;margin-left: 10px;">{{ data[tree_Data.props.label] }}</span>
   </div>

    </el-tree>
  </div>
</template>

<script>
export default {
  name: "moduTree",
  props: ["tree_Data"],
  data(){
    return{
      treeData:[]
    }
  },
  watch:{
    'tree_Data':{
      handler(a,b){
        this.treeData=a.data;
      },
      deep:true
    }
  },
  mounted() {
    
    let that=this;
    setTimeout(() => {
      this.treeData=this.tree_Data.data;
    }, 500);
    if (this.tree_Data.CreatedbusOn) {
      this.$bus.$on(this.tree_Data.CreatedbusOn, data => {
        this.$refs.tree.setCheckedKeys(data);
      });
    }
    console.log(that.tree_Data,'tree')
  },
  methods: {
    getCurrentNo(a){
      console.log(a,'currentNode')
    },
    checkChange(a){
      console.log(a,'checkChange')
    },
    //点击树
    onClickTree(data,b,c) {
      console.log(data,this.tree_Data,b,c)
      if (this.tree_Data.busEmit) {
        this.$bus.$emit(this.tree_Data.busEmit, data, "ClickTree");
      }
    },
    //复选框选中
    onCheckTree(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      console.log(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys,'checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys')
      let data = {
        checkedNodes: checkedNodes,
        checkedKeys: checkedKeys,
        halfCheckedNodes: halfCheckedNodes,
        halfCheckedKeys: halfCheckedKeys
      };
      if (this.tree_Data.busEmit) {
        this.$bus.$emit(this.tree_Data.busEmit, data, "CheckTree");
      }
    }
  },
};
</script>

<style >
.el-tree-node__label {
    font-size: 13px !important;
    color: #5E6E77!important;
}
.el-tree-node__content{
  height: auto !important;;
}
</style>
