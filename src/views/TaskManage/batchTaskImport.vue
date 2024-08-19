<template>
  <div style="width: 100%">
    <h3 style="height: 30px; line-height: 30px; display: flex; margin: 10px">
      <img src="../../../public/images/jz.png" alt="" srcset="" />
      <span style="margin-left: 10px"
        >此功能为批量导入任务信息，请下载excel表模板按照表格格式导入。导入过程中时请勿离开此页面。</span
      >
    </h3>
    <ul>
      <li>
        <img src="../../../public/images/one.png" alt="" srcset="" />
        下载导入模板
        <el-button @click="buttonClick('下载导入模板')"
          class="el-icon-download"
          type="primary"
          style="margin-left: 10px"
          >下载模板</el-button
        >
      </li>
      <li>
        <img src="../../../public/images/two.png" alt="" srcset="" />
        上传填写好的任务列表(单次不超过10000行)
        <el-button @click="buttonClick('上传')" class="el-icon-upload2" style="margin-left: 10px"
          >上传</el-button
        >
        <el-button @click="buttonClick('重置')" class="el-icon-refresh-right" style="margin-left: 10px"
          >重置</el-button
        >
      </li>
      <li>
        <img src="../../../public/images/three.png" alt="" srcset="" />
        上传成功后请刷新数据，数据刷新完毕可执行数据校验
        <el-button @click="buttonClick('数据校验')" class="el-icon-circle-check" style="margin-left: 10px"
          >数据校验</el-button
        >
      </li>
      <li>
        <img src="../../../public/images/four.png" alt="" srcset="" />
        校验通过后
        <el-button @click="buttonClick('开始导入')" style="margin-left: 10px">开始导入</el-button>
      </li>
      <li>
        <img src="../../../public/images/five.png" alt="" srcset="" />
        查看和刷新导入结果，导入完毕后可下载执行结果
        <el-button @click="buttonClick('下载结果')" class="el-icon-download" style="margin-left: 10px"
          >下载结果</el-button
        >
      </li>
    </ul>
    <el-button @click="buttonClick('刷新')" class="el-icon-refresh-right" style="margin-left: 10px"
      >刷新</el-button
    >
  </div>
</template>

<script>
export default {
  name: "batchTaskImport",
  components: {},
  props: ["config"],
  data() {
    return {};
  },
  created() {},
  mounted() {
    console.log(this.config);
  },
  methods: {
    buttonClick(name){
        this.$bus.$emit(this.config.busEmit, {}, name);
    },
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
}
/deep/ .el-dialog {
  height: auto;
  width: 60%;
  margin-top: 2vh !important;
  overflow: hidden;
}
/deep/ .el-dialog__header {
  text-align: center;
  border-bottom: 1px solid #ccc;
}
ul {
  list-style: none;
}
li {
  height: 30px;
  margin: 5px 0;
  display: flex;
  align-items: center;
}
li img {
  height: 100%;
  margin-right: 10px;
}
</style>
