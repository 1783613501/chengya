<script>
export default {
  created() {
    console.log(this.$store.state.permission.addRouters[0].path,this.$router);
    // debugger;
    let path = this.$store.state.permission.addRouters[0].path == "/shopManage" ? "/shopManage/shopList" : this.$store.state.permission.addRouters[0].children[0].path
    this.$router.push({ path })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
