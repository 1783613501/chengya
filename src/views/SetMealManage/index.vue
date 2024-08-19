<template>
  <div style="height:calc(88vh);width:100%">
    <el-row v-for="(it,id) in config" :key="id" :gutter="it.gutter" :style="it.style">
      <el-col v-for="(it2,id2) in it.row" :key="id2" :span="it2.span" :style="it2.style">
        <template v-if="it2.type=='col'">
          <el-col v-for="(it3,id3) in it2.data" :key="id3" :span="it3.span" :style="it3.style">
            <template v-if="it3.type=='col'">
              <el-col v-for="(it4,id4) in it3.data" :key="id4" :span="it4.span" :style="it4.style">
                <modules :data="it4"></modules>
              </el-col>
            </template>
            <modules v-if="it3.type!='col'" :data="it3"></modules>
          </el-col>
        </template>
        <modules v-if="it2.type!='col'" :data="it2"></modules>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Layout from '../../layout/index'
import config from "../../../public/config/SetMealManage/index";
export default {
  name: "TaskList",
  components: {
    modules: () => import('../Modules'),
    Layout
  },
  data() {
    return {
      config: []
    };
  },
  created() {},
  mounted() {
    console.log(6666)
    let name = config.CreatedBusOn;
    this.$bus.$off(name);
    this.$bus.$on(name, config.uiGetshopList);
    config.uigetThis(this);
    config.uiGetshopList('','查询')
    this.config = config.config;
    
  },
  methods: {
    //页面汇总
    uiSetShopList(data, type) {
      config.uiGetshopList(data, type);
    }
  },
  destroyed() {
    if (config.CreatedbusOn) {
      this.$bus.$off(config.CreatedbusOn)
    }
  }
};
</script>

<style>
</style>
