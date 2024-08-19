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
    >
      <div style="padding-left: 20px;margin:0 0 20px 0">
        请确认操作收款？此操作表示商家无法正常进行线上支付，通过线下渠道已收款，操作后所勾选的账单支付状态将变更为“已支付”，商家无法继续线上支付，请谨慎操作！
      </div>
      <el-form
        :model="dialog"
        class="demo-form-inline"
        label-width="200px"
        :rules="rules"
        ref="payForm"
      >
        <el-form-item label="收款备注" style="width: 80%" prop="resMark">
          <el-input v-model="dialog.resMark"></el-input>
        </el-form-item>
      </el-form>
      
      <span slot="footer">
        <el-button
          type="primary"
          @click="
            () => this.$bus.$emit(dialog.busEmit, dialog.resMark, '手动确认收款')
          "
          >确定</el-button
        >
        <el-button @click="() => (dialog.visible = false)">返回</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="rejectDialog.visible"
      :title="rejectDialog.title"
      style="height: 100%; width: 100%"
    >
      <div style="padding-left: 20px;margin:0 0 20px 0">
        谨慎操作，请确认废弃当前已选账单？废弃后表示账单作废，将无法继续浏览账单和支付操作等。
      </div>
      <el-form
        :model="rejectDialog"
        class="demo-form-inline"
        label-width="200px"
        :rules="rejectDialogRules"
        ref="rejectForm"
      >
        <el-form-item label="废弃备注" style="width: 70%" prop="reason">
          <el-input v-model="rejectDialog.reason"></el-input>
        </el-form-item>
      </el-form>
      
      <span slot="footer">
        <el-button
          type="primary"
          @click="
            () => this.$bus.$emit(rejectDialog.busEmit, rejectDialog.reason, '确认废弃')
          "
          >确定</el-button
        >
        <el-button @click="() => (rejectDialog.visible = false)">返回</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import config from "../../../public/config/billManage/index";
export default {
  name: "orderList",
  components: {
    modules: () => import("../Modules"),
  },
  data() {
    return {
      config: [],
      dialog: {},
      rejectDialog:{},
      rules: {
        resMark: [
          { required: true, message: "请输入收款备注", trigger: "blur" },
        ],
      },
      rejectDialogRules: {
        reason: [
          { required: true, message: "请输入废弃备注", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    console.log(6666);
    let name = config.CreatedBusOn;
    this.dialog = config.dialog;
    this.rejectDialog = config.rejectDialog;
    this.$bus.$off(name);
    this.$bus.$on(name, config.uiGetshopList);
    config.uigetThis(this);
    config.uiGetshopList("", "查询");
    this.config = config.config;
  },
  methods: {
    //页面汇总
    uiSetShopList(data, type) {
      config.uiGetshopList(data, type);
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
