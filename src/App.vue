<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    Tool.uiGetThis(this);
    this.getInfo();
  },
  methods: {
    getInfo() {
      let that = this;
      Tool.axios("tbms/system/info", "get", {}, (res) => {
        console.log(res.data.data);
        document.title =
          res.data.data.bSystemName + " - " + document.title.split("-")[1];
        sessionStorage.setItem("navTitle", res.data.data.bSystemName);
        that.title = res.data.data.bSystemName;
        console.log(that.$store);
        that.$store.dispatch("settings/changeSetting", {
          key: "footerTxt",
          value: res.data.data.authorizationInfo,
        });
      });
    },
  },
};
</script>
<style>
.redFontColor {
  color: red;
}
</style>
