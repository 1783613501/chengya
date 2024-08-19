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
      :visible.sync="refundExamineDialog.visible"
      :title="refundExamineDialog.title"
      style="height: 100%; width: 100%"
    >
      <div style="padding-left: 20px">
        请审核用户退款申请并输入审核备注，同意退款将原路退回用户支付金额，操作不可逆，退款请保持退款账户余额充足
      </div>
      <el-form
        :model="refundExamineDialog"
        class="demo-form-inline"
        label-width="200px"
        :rules="refundExamineRules"
        ref="refundExamineForm"
      >
        <el-form-item label="审核">
          <el-radio-group v-model="refundExamineDialog.isExamine">
            <el-radio label="1">同意审核</el-radio>
            <el-radio label="2">拒绝退款</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="审核备注："
          style="width: 70%"
          prop="refundExamineMark"
        >
          <el-input v-model="refundExamineDialog.refundExamineMark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button
          type="primary"
          @click="
            () =>
              this.$bus.$emit(
                refundExamineDialog.busEmit,
                refundExamineDialog,
                '确认审核'
              )
          "
          >确定</el-button
        >
        <el-button @click="() => (refundExamineDialog.visible = false)"
          >返回</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="refundDialog.visible"
      :title="refundDialog.title"
      style="height: 100%; width: 100%"
    >
      <div style="padding-left: 20px">
        请确认进行订单退款？操作后，订单不可继续使用，相关支付金额将原路退回用户账户，请保证退款账户余额充足
      </div>
      <el-form
        :model="refundDialog"
        class="demo-form-inline"
        label-width="200px"
        :rules="refundDialogRules"
        ref="refundForm"
      >
        <el-form-item label="退款备注：" style="width: 70%" prop="resMark">
          <el-input v-model.number="refundDialog.resMark"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button
          type="primary"
          @click="
            () =>
              this.$bus.$emit(
                refundDialog.busEmit,
                refundDialog.resMark,
                '确认退款'
              )
          "
          >确定</el-button
        >
        <el-button @click="() => (refundDialog.visible = false)"
          >返回</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="orderViewDialog.visible"
      :title="orderViewDialog.title"
      style="height: 100%; width: 100%"
      class="orderViewDialog"
    >
      <div style="padding-left: 20px; display: flex; flex-wrap: wrap" v-if="orderViewDialog.data">
        <div style="width: 100%; padding: 10px 0 10px 50px">
          适用商家：{{ orderViewDialog.data.businessNames?orderViewDialog.data.businessNames:orderViewDialog.data.businessName }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          用户：{{ orderViewDialog.data.cUserName }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          用户电话：{{ orderViewDialog.data.cUserPhone }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          套餐名称：{{ orderViewDialog.data.packageName }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          原价(元)：{{ orderViewDialog.data.originalPrice }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          售价(元)：{{ orderViewDialog.data.sellPrice }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          会员价(元)：{{ orderViewDialog.data.vipPrice }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          用户购买价格(元)：{{ orderViewDialog.data.actualPayment }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          在线支付(元)：{{ orderViewDialog.data.actualPayment }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          下单时间：{{ orderViewDialog.data.createTime }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          使用时间：{{ orderViewDialog.data.usedTime }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          支付渠道：{{ orderViewDialog.data.payChannelName }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          支付时间：{{ orderViewDialog.data.payTime }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          订单号：{{ orderViewDialog.data.orderCode }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          支付交易单号：{{ orderViewDialog.data.payCode }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          退款时间：{{ orderViewDialog.data.refundTime }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          订单渠道：{{ orderViewDialog.data.mediaTypeName }}
        </div>
        <div style="width: 50%; padding: 10px 0 10px 50px">
          备注：{{ orderViewDialog.data.remarks }}
        </div>
      </div>
      <span slot="footer">
        <el-button @click="() => (orderViewDialog.visible = false)"
          >返回</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import config from "../../../public/config/toStoreOrderManage/index";
export default {
  name: "orderList",
  components: {
    modules: () => import("../Modules"),
  },
  data() {
    return {
      config: [],
      refundDialog: {},
      refundExamineDialog: {},
      orderViewDialog: {},
      refundDialogRules: {
        resMark: [
          { required: true, message: "请输入退款备注", trigger: "blur" },
        ],
      },
      refundExamineRules: {
        isExamine: [{ required: true, message: "请选择审核", trigger: "blur" }],
        refundExamineMark: [
          { required: true, message: "请输入审核备注", trigger: "blur" },
        ],
      },
    };
  },
  created() {},
  mounted() {
    console.log(6666);
    let name = config.CreatedBusOn;
    this.refundDialog = config.refundDialog;
    this.refundExamineDialog = config.refundExamineDialog;
    this.orderViewDialog = config.orderViewDialog;
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
/deep/ .el-dialog__footer {
  border-top: 1px solid #ccc;
  margin-top: 10px;
}
/deep/ .el-dialog {
  height: auto;
  width: 40%;
  overflow: hidden;
}
/deep/ .orderViewDialog .el-dialog {
  height: auto;
  width: 70%;
  overflow: hidden;
}
/deep/ .el-dialog__header {
  text-align: center;
  border-bottom: 1px solid #ccc;
}
</style>
