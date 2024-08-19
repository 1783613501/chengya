<template>
  <div>
    <div
      v-if="text_data.text != ''"
      :style="text_data.style"
      style="cursor: pointer; color: #032a40 !important; font-weight: 700"
      :num="text_data.num"
    >
      {{ text_data.text }}
    </div>
    <div
      v-if="text_data.vHtml"
      :style="text_data.style"
      style="cursor: pointer; color: #032a40 !important; font-weight: 700"
    >
      <i class="el-icon-warning" style="color: #1890ff"></i> 已选择
      {{ text_data.num.num }} 项 
      <span @click="()=>{this.$bus.$emit(text_data.busEmit, {}, '清空');}" style="color:#1890ff"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;清空</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "texts",
  props: ["text_data"],
  data() {
    return {};
  },
  mounted() {},
  watch: {
    text_data(a, b) {
      console.log("wenzibianhuale", a);
    },
  },
  methods: {},
};
</script>

<style scoped>
</style>
