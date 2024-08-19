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
import config from "../../../public/config/TaskManage/taskEdit";
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
    this.config[0].row[0].data[1].data[0].formData =
      this.$store.getters.taskMahagerDetail;

    if (this.$route.query.type == "新增任务") {
      this.config[0].row[0].data[1].data[0].form.forEach((element) => {
        if(element.value != '销售员' && element.value != '商家'){
            element.disabled = false;
            element.readonly = false;
        }
      });
      this.config[0].row[0].data[0].data.text = "新增任务";
      this.config[0].row[0].data[1].data[0].form[0].disabled = true;
      this.config[0].row[0].data[1].data[0].form[0].readonly = true;
    }
    if (this.$route.query.type == "查看") {
      this.config[0].row[0].data[1].data[0].form.forEach((element) => {
        element.disabled = true;
        element.readonly = true;
      });
      this.config[0].row[0].data[0].data.text = "查看任务";
    }
    if (this.$route.query.type == "编辑") {
      this.config[0].row[0].data[1].data[0].form.forEach((element) => {
        element.disabled = false;
        element.readonly = false;
      });
      this.config[0].row[0].data[0].data.text = "编辑商家";
      this.config[0].row[0].data[1].data[0].form[0].disabled = true;
      this.config[0].row[0].data[1].data[0].form[0].readonly = true;
    }
    console.log(this.config[0].row[0].data[1].data[0].form, this.$route);
    config.uigetThis(this);
  },
  computed: {
    detail() {
      console.log("computer-----------------------------", this.$store.state.taskManage.detail);
      return this.$store.state.taskManage.detail;
    },
  },
  watch: {
    detail(newData, oldData) {
      this.config[0].row[0].data[1].data[0].formData = newData;
      console.log("computerwatch-------------------------", newData, oldData);
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
