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
import config from "../../../../../public/config/ShopManage/ShopList/shopManagerDetail";
export default {
  name: "ShopEdit",
  components: {
    modules: () => import("../../../Modules.vue"),
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
    config.getAddressList(1, 1);
    config.getAddressList(
      2,
      2,
      this.$store.state.shopManager.detail.addressProvince
    );
    config.getAddressList(
      3,
      3,
      this.$store.state.shopManager.detail.addressCity
    );
    config.getShopManagerTypeList();

    this.config = config.config;
    this.config[0].row[0].data[1].data[0].formData =
      this.$store.getters.shopMahagerDetail;
    if (this.$route.query.type == "新增商家") {
      this.config[0].row[0].data[1].data[0].form.forEach((element) => {
        if(element.value == '审核驳回' || element.value == '审核通过'){
          element.style.indexOf("display:none")<0 && (element.style = element.style + "display:none");
        }else if(element.value == '保存'){
          element.style.indexOf("display:none")>0 && (element.style = element.style.replace(/display:none/,""));
        }else if(element.value == '销售员'){
          element.disabled = true;
          element.readonly = true;
        }else if(element.value == '状态'){
          element.style.indexOf("display:none")>0 && (element.style = element.style.replace(/display:none/,""));
        }else{
          element.disabled = false;
          element.readonly = false;
        }
        element.value == '到店分类' && (element.span = 12);
      });
      this.config[0].row[0].data[0].data.text = "新增商家";
    }

    if (this.$route.query.type == "查看") {
      this.config[0].row[0].data[1].data[0].form.forEach((element) => {
        if(element.value == '审核驳回' || element.value == '审核通过'){
          element.style.indexOf("display:none")<0 && (element.style = element.style + "display:none");
        }
        if(element.value == '保存'){
          element.style.indexOf("display:none")<0 && (element.style = element.style + "display:none");
        }
        if(element.value == '状态'){
          element.style.indexOf("display:none")>0 && (element.style = element.style.replace(/display:none/,""));
        }
        element.value == '到店分类' && (element.span = 12);
        element.disabled = true;
        element.readonly = true;
      });
      this.config[0].row[0].data[0].data.text = '查看商家';
    }
    if (this.$route.query.type == "编辑") {
      this.config[0].row[0].data[1].data[0].form.forEach((element) => {
        if(element.value == '审核驳回' || element.value == '审核通过'){
          element.style.indexOf("display:none")<0 && (element.style = element.style + "display:none");
        }
        if(element.value == '保存'){
          element.style.indexOf("display:none")>0 && (element.style = element.style.replace(/display:none/,""));
        }
        if(element.value == '状态'){
          element.style.indexOf("display:none")>0 && (element.style = element.style.replace(/display:none/,""));
        }
        element.value == '到店分类' && (element.span = 12);
        if(element.value == '商家编码' || element.value == '销售员'){
          element.disabled = true;
          element.readonly = true;
        }else{
          element.disabled = false;
          element.readonly = false;
        }
      });
      this.config[0].row[0].data[0].data.text = '编辑商家';
    }

    if (this.$route.query.type == "入驻审核") {
      this.config[0].row[0].data[1].data[0].form.forEach((element) => {
        if(element.value == '审核驳回' || element.value == '审核通过'){
          element.style.indexOf("display:none")>0 && (element.style = element.style.replace(/display:none/,""));
        }
        if(element.value == '保存'){
          element.style.indexOf("display:none")<0 && (element.style = element.style + "display:none");
        }
        if(element.value == '状态'){
          element.style.indexOf("display:none")<0 && (element.style = element.style + "display:none");
        }
        element.value == '到店分类' && (element.span = 24);
        if(element.value == '销售员'){
          element.disabled = true;
          element.readonly = true;
        }else{
          element.disabled = false;
          element.readonly = false;
        }
      });
      this.config[0].row[0].data[0].data.text = '入驻审核';
    }
    config.uigetThis(this);
  },
  computed: {
    detail() {
      return this.$store.state.shopManager.detail;
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
