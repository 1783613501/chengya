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
      <el-form
        :model="dialog"
        class="demo-form-inline"
        label-width="250px"
        :rules="rules"
        ref="orderForm"
      >
        <el-form-item label="状态" style="width: 70%" prop="state" :rules="[{ required: true, message: '请选择状态', trigger: 'change' }]">
          <el-select v-model="dialog.state">
            <el-option :value="1" label="启用"></el-option>
            <el-option :value="0" label="停用"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button
          type="primary"
          @click="
            () => this.$bus.$emit(dialog.busEmit, dialog.state, '确认修改状态')
          "
          >确定</el-button
        >
        <el-button @click="() => (dialog.visible = false)">返回</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="pointsDialog.visible"
      :title="pointsDialog.title"
      style="height: 100%; width: 100%"
    >
      <el-form
        :model="pointsDialog"
        class="demo-form-inline"
        label-width="200px"
        :rules="pointsDialogRules"
        ref="pointsForm"
      > 
        <div style="margin-bottom:15px">
          积分余额：{{pointsDialog.pointsTotal}}
          （可用：{{pointsDialog.realPoints}}）
        </div>
        <el-form-item label="调整" style="width: 70%" :required="true">
          <el-select v-model="pointsDialog.type">
            <el-option value="-" label="减少"></el-option>
            <!-- <el-option value="+" label="增加"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="积分" style="width: 70%"  prop="points">
          <el-input-number v-model="pointsDialog.points" :min="1" :max="9999"></el-input-number>
        </el-form-item>
        <el-form-item label="原因" style="width: 70%" prop="reason">
          <el-input type="textarea" v-model="pointsDialog.reason"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button
          type="primary"
          @click="
            () => this.$bus.$emit(pointsDialog.busEmit, pointsDialog, '确认调整积分')
          "
          >确定</el-button
        >
        <el-button @click="() => (pointsDialog.visible = false)">返回</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import config from "../../../public/config/userManage/index";
export default {
  name: "orderList",
  components: {
    modules: () => import("../Modules"),
  },
  data() {
    return {
      config: [],
      dialog: {},
      pointsDialog:{},
      rules: {
        resMark: [
          { required: true, message: "请输入实返积分", trigger: "blur" },
          { type: "number", message: "请输入数字", trigger: "blur" },
        ],
      },
      pointsDialogRules: {
        reason: [
          { required: true, message: "请输入调整原因", trigger: "blur" },
        ],
        points: [
          { required: true, message: "请输入调整积分", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    console.log(6666);
    let name = config.CreatedBusOn;
    this.dialog = config.dialog;
    this.pointsDialog = config.pointsDialog;
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
