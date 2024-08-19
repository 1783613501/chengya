<template>
  <div style="height: calc(88vh); width: 100%">
    <el-row
      v-for="(it, id) in config"
      :key="id"
      :gutter="it.gutter"
      :style="it.style"
    >
      <el-col
        v-for="(it2, id2) in it.row"
        :key="id2"
        :span="it2.span"
        :style="it2.style"
      >
        <template v-if="it2.type == 'col'">
          <el-col
            v-for="(it3, id3) in it2.data"
            :key="id3"
            :span="it3.span"
            :style="it3.style"
          >
            <template v-if="it3.type == 'col'">
              <el-col
                v-for="(it4, id4) in it3.data"
                :key="id4"
                :span="it4.span"
                :style="it4.style"
              >
                <modules :data="it4"></modules>
              </el-col>
            </template>
            <modules v-if="it3.type != 'col'" :data="it3"></modules>
          </el-col>
        </template>
        <modules v-if="it2.type != 'col'" :data="it2"></modules>
      </el-col>
    </el-row>
    <input type="file" ref="file" style="display: none;" @change="handleFileUpload($event)" accept=".xlsx">

  </div>
</template>

<script>
import config from "../../../public/config/TaskManage/batchTaskImport.js";
export default {
  name: "batchTaskImport",
  components: {
    modules: () => import("../Modules"),
  },
  data() {
    return {
      config: [],
      dialog: {},
      rejectDialog:{},
      orderViewDialog:{},
      rules: {
        resMark: [
          { required: true, message: "请输入实返积分", trigger: "blur" },
          { type: "number", message: "请输入数字", trigger: "blur" },
        ],
      },
      rejectDialogRules: {
        reason: [
          { required: true, message: "请输入驳回原因", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    console.log(6666);
    let name = config.CreatedBusOn;
    this.$bus.$off(name);
    this.$bus.$on(name, config.uiGetshopList);
    config.uigetThis(this);
    config.uiGetshopList("", "查询");//
    this.config = config.config;
  },
  methods: {
    //页面汇总
    uiSetShopList(data, type) {
      config.uiGetshopList(data, type);
    },
    handleFileUpload(eve){
      config.uiGetshopList(eve, "解析文件")
    }
    
  },
  destroyed() {
    if (config.CreatedbusOn) {
      this.$bus.$off(config.CreatedbusOn);
    }
  },
};
</script>

<style scoped>
/deep/ .el-dialog__footer{
  border-top: 1px solid #ccc;
}
/deep/ .el-dialog{
  height: auto;
  width:60%;
  margin-top: 2vh !important;
  overflow:hidden
}
/deep/ .el-dialog__header{
  text-align: center;
  border-bottom: 1px solid #ccc;
}
</style>
