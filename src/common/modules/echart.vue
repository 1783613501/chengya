<template>
  <div style="height:100%;width:100%">
    <div :id="data.id" style="height:100%;width:100%;margin:0;" :style="data.style"></div>
  </div>
</template>

<script>
export default {
  name: "echart",
  props: ["data"],
  data() {
    return {};
  },
  watch: {
    "data.option.yAxis.data"() {
      this.onShowEchart();
    },
    "data.option.xAxis.data"() {
      debugger
      this.onShowEchart();
    }
  },
  mounted() {
    let ins = this;
    setTimeout(() => {
      ins.onShowEchart();
    }, 500);
    setTimeout(() => {
      // $("#" + ins.data.id + "").css("position", "fixed");
    }, 1000);
  },
  methods: {
    onShowEchart() {
      var myChart = echarts.init(document.getElementById(this.data.id));
      myChart.setOption(this.data.option);
      
      myChart.on('dblclick', function (params) {
          //console.log(params);
      });
    }
  }
};
</script>

<style>
</style>
