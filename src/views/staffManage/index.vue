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
    <el-dialog
      :visible.sync="dialog.visible"
      :title="dialog.title"
      style="height: 100%; width: 100%"
      top="3vh"
    >
      <div style="width:70%;margin: 0 auto;">
        <modeuleFrom
          :form_Column="dialog.form"
          :form_Data="dialog.formData"
          :formData="dialog.data"
          ref="editStaff"
        ></modeuleFrom>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="reloadPswdDialog.visible"
      :title="reloadPswdDialog.title"
      style="height: 100%; width: 100%"
      top="3vh"
    >
      <div style="width:70%;margin: 0 auto;">
        <modeuleFrom
          :form_Column="reloadPswdDialog.form"
          :form_Data="reloadPswdDialog.formData"
          :formData="reloadPswdDialog.data"
          ref="reloadPswd"
        ></modeuleFrom>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import modeuleFrom from "../../common/modules/Form";
import config from "../../../public/config/staffManage/index";
export default {
  name: "staffList",
  components: {
    modules: () => import("../Modules"),
    modeuleFrom
  },
  data() {
    return {
      config: [],
      dialog: {},
      reloadPswdDialog:{}
    };
  },
  created() {},
  mounted() {
    console.log(this.$refs,6666);
    let name = config.CreatedBusOn;
    this.dialog = config.dialog;
    this.reloadPswdDialog = config.reloadPswdDialog;
    this.$bus.$off(name);
    this.$bus.$on(name, config.uiGetstaffList);
    config.uigetThis(this);
    config.uiGetstaffList("", "搜索");
    config.uiGetstaffList("", "查询角色");
    this.config = config.config;
  },
  methods: {
    //页面汇总
    uiSetShopList(data, type) {
      config.uiGetstaffList(data, type);
    },
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
  margin-top:10px;
  padding-bottom: 10px;
}
/deep/ .el-dialog{
  height: auto;
  width:40%;
  overflow:hidden
}
/deep/ .el-dialog__header{
  text-align: center;
  border-bottom: 1px solid #ccc;
}
</style>
