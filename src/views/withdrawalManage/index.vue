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
      :visible.sync="rejectDialog.visible"
      :title="rejectDialog.title"
      style="height: 100%; width: 100%"
    >
      <el-form
        :model="rejectDialog"
        class="demo-form-inline"
        label-width="300px"
        :rules="rejectDialogRules"
        ref="orderRejectForm"
      >
        <el-form-item label="驳回原因" style="width: 70%" prop="reason">
          <el-input v-model.number="rejectDialog.reason"></el-input>
        </el-form-item>
      </el-form>
      <div style="padding-left: 20px">
        请确认操作审核驳回？审核驳回表示提现金额未成功支付到用户账户，用户积分将退还，单据状态变更为“已驳回”并不可继续操作
      </div>
      <span slot="footer">
        <el-button
          type="primary"
          @click="
            () => this.$bus.$emit(rejectDialog.busEmit, rejectDialog.reason, '确认驳回')
          "
          >确定</el-button
        >
        <el-button @click="() => (rejectDialog.visible = false)">返回</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import config from "../../../public/config/withdrawalManage/index";
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
}
/deep/ .el-dialog{
  height: 30%;
  width:40%;
  overflow:hidden
}
/deep/ .el-dialog__header{
  text-align: center;
  border-bottom: 1px solid #ccc;
}
</style>
