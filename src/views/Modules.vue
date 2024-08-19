<template>
  <div style="height: 100%; width: 100%">
    <!-- 运维管理 -->
    <ShopList
      v-if="modules_Data.type == 'maiDevLog'"
      :data="modules_Data.data"
    ></ShopList>
    <maiInsRegister
      v-if="modules_Data.type == 'maiInsRegister'"
      :data="modules_Data.data"
    ></maiInsRegister>
    <maiInsRegisterTable
      v-if="modules_Data.type == 'maiInsRegisterTable'"
      :data="modules_Data.data"
    ></maiInsRegisterTable>
    <maiDataFlowReg
      v-if="modules_Data.type == 'maiDataFlowReg'"
      :data="modules_Data.data"
    ></maiDataFlowReg>
    <!-- 通用 -->
    <modeuleTabs
      v-if="modules_Data.type == 'Tabs'"
      :tabsData="modules_Data.data"
      :busEmit="modules_Data.busEmit"
      :tabActiveName="modules_Data.tabActiveName"
    ></modeuleTabs>
    <template v-if="modules_Data.type == 'Text'">
      <modeuleText :text_data="modules_Data.data"></modeuleText>
    </template>
    <template v-if="modules_Data.type == 'Echart'">
      <modeuleEchart :data="modules_Data.data"></modeuleEchart>
    </template>
    <template v-if="modules_Data.type == 'earth'">
      <earth :data="modules_Data.data"></earth>
    </template>
    <template v-if="modules_Data.type == 'Tree'">
      <modeuleTree :tree_Data="modules_Data.data"></modeuleTree>
    </template>
    <template v-if="modules_Data.type == 'From'">
      <modeuleFrom
        :form_Column="modules_Data.from"
        :form_Data="modules_Data.fromData"
        :formData="modules_Data.data"
      ></modeuleFrom>
    </template>
    <template v-if="modules_Data.type == 'Form'">
      <modeuleFrom
        :form_Column="modules_Data.form"
        :form_Data="modules_Data.formData"
        :formData="modules_Data.data"
      ></modeuleFrom>
    </template>
    <template v-if="modules_Data.type == 'Table'">
      <modeuleTable
        :table_Data="modules_Data.data.TableData"
        :tableData="modules_Data.data"
      ></modeuleTable>
    </template>
    <template v-if="modules_Data.type == 'shopManagerDetail'">
      <ShopManagerEdit :data="modules_Data.data"></ShopManagerEdit>
    </template>
    <template v-if="modules_Data.type == 'textSearch'">
      <ChooseShoper :config="modules_Data.data" :dialog="modules_Data.dialog"></ChooseShoper>
    </template>
    <template v-if="modules_Data.type == 'batchTaskImport'">
      <batchTaskImport :config="modules_Data.data"></batchTaskImport>
    </template>
  </div>
</template>

<script>
//运维管理
import ShopList from "./ShopManage/ShopList/index";
import ShopManagerEdit from "./ShopManage/ShopList/Modules/shopEdit"
import ChooseShoper from "./TaskManage/chooseShoper"

// import maiInsRegister from "./DutyManage/InsRegister/Modules/InsRegister";
// import maiInsRegisterTable from "./DutyManage/InsRegister/Modules/InsRegisterTable";
// import maiDataFlowReg from "./DutyManage/DataFlowReg/Modules/DataFlowReg";
//通用
import modeuleText from "../common/modules/text";
import modeuleTree from "../common/modules/Tree";
import modeuleFrom from "../common/modules/Form";
import modeuleTable from "../common/modules/Table";
import modeuleTabs from "../common/modules/Tabs";

import batchTaskImport from "./TaskManage/batchTaskImport";




export default {
  name: "Modules",
  props: ["data"],
  mounted() {},

  components: {
    ShopList,
    ShopManagerEdit,
    batchTaskImport,
    // maiInsRegister,
    // maiInsRegisterTable,
    // maiDataFlowReg,
    ChooseShoper,
    modeuleText,
    modeuleTree,
    modeuleFrom,
    modeuleTable,
    modeuleTabs
  },
  data() {
    return {
      modules_Data: [],
      menuName: "",
    };
  },
  created() {
    let ins = this;
    this.modules_Data = this.data;
    console.log(this.data)
    // this.menuName = sessionStorage.getItem("menuName");
    // this.$bus.$on("uiGetMenuName", (res) => {
    //   ins.menuName = sessionStorage.getItem("menuName");
    // });
  },
  destroyed() {
    // this.$bus.$off("uiGetMenuName");
  },
};
</script>

<style>
</style>