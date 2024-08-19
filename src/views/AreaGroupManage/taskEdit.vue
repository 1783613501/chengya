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
  </div>
</template>

<script>
import config from "../../../public/config/AreaGroupManage/taskEdit";
export default {
  name: "ShopEdit",
  components: {
    modules: () => import("../Modules.vue"),
  },
  data() {
    return {
      config: [],
    };
  },
  created() {},
  mounted() {
    let name = config.CreatedBusOn;
    this.$bus.$off(name);
    this.$bus.$on(name, config.uiGetshopList);
    this.config = config.config;
    console.log(this);
    this.config[0].row[0].data[1].data[0].formData = this.detail;

    if (this.$route.query.type == "新增群二维码") {
      this.config[0].row[0].data[0].data.text = "新增群二维码";
    }
    if (this.$route.query.type == "编辑") {
      this.config[0].row[0].data[0].data.text = "编辑群二维码";
    }
    config.uigetThis(this);
  },
  computed: {
    detail() {
      return this.$store.state.AreaGroupManage.detail;
    },
  },
  watch: {
    detail(newData, oldData) {
      this.config[0].row[0].data[1].data[0].formData = newData;
    },
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

<style>
</style>
