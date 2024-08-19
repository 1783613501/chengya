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
    <el-dialog title="提示" :visible.sync="dialog.dialogBl" width="30%">
      <moduleForm 
      v-if="dialog.dialogBl"
       :form_Column="dialog.form.form"
        :form_Data="dialog.form.formData"
        :formData="dialog.form.data"></moduleForm>
    </el-dialog>
  </div>
</template>

<script>
import config from "../../../../public/config/ShopManage/InsideShopType/index";
import moduleForm from "../../../common/modules/Form.vue";
import modules from "../../Modules";
export default {
  name: "outShopType",
  components: {
    modules,
    moduleForm
  },
  data() {
    return {
      config: [],
      dialog: {},
    };
  },
  created() {},
  watch: {
    "config.ConfigLoading"(a, b) {
      this.config = config.config;
    },
  },
  mounted() {
    this.config = config.config;
    this.dialog = config.dialog;
    console.log(this.dialog, "this.dialog");
    let name = config.CreatedBusOn;
    this.$bus.$off(name);
    this.$bus.$on(name, this.uiSetDataFlowReg);
    config.uigetThis(this);
    config.getTreeData(this);
    setInterval(()=>{
      console.log(this.config)
    },2000)
    console.log(this);
  },
  methods: {
    //页面汇总
    uiSetDataFlowReg(data, type) {
      config.uiGetshopType(data, type);
    },
  },
  destroyed() {
    if (config.CreatedbusOn) {
      this.$bus.$off(config.CreatedbusOn);
    }
  },
};
</script>

<style>
</style>
