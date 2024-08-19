<template>
  <el-dialog :visible.sync="dialog.visible" :title="dialog.title" style="height:100%;width:100%">
    <el-row>
      <el-col v-for="(it2,id2) in config" :key="id2" :span="it2.span" :style="it2.style">
        <template v-if="it2.type=='col'">
          <el-col v-for="(it3,id3) in it2.data" :key="id3" :span="it3.span" :style="it3.style">
            <template v-if="it3.type=='col'">
              <el-col v-for="(it4,id4) in it3.data" :key="id4" :span="it4.span" :style="it4.style">
                <modules :data="it4"></modules>
              </el-col>
            </template>
            <modules v-if="it3.type!='col'" :data="it3"></modules>
          </el-col>
        </template>
        <modules v-if="it2.type!='col'" :data="it2"></modules>
      </el-col>
    </el-row>
  </el-dialog >
</template>

<script>
export default {
  name: "TaskList",
  components: {
    modules: () => import('../Modules'),
  },
  props:['config','dialog'],
  data() {
    return {
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    
  },
  destroyed() {
  }
};
</script>

<style scoped>
/deep/ .el-dialog__body{
    padding: 10px 20px !important;
}
/deep/ .el-dialog{
    margin-top: 5vh !important;
    /* height: 90%; */
    overflow: auto;
}
</style>
