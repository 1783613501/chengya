<template>
  <el-form ref="form" label-width="80px" :model="form_Data">
    <el-col
      v-for="(item, index) in form_Column"
      :key="index"
      :span="item.span"
      :style="item.style"
    >
      <div v-if="item.type == 'notForm'" style="margin-bottom: 20px">
        <el-link
          href="https://lbs.qq.com/getPoint/"
          target="_blank"
          type="primary"
          >{{ item.value }}</el-link
        >
      </div>

      <el-form-item v-if="item.type == 'formInTable'" :label="item.label" :label-width="item.labelWidth" :rules="item.rules">

        <el-table border :data="form_Data[item.prop]" ref='formInTable' id='formInTable' row-key="id">
                <el-table-column align="center" label="套餐包含商品名">
                  <template slot-scope="scope">
                    <el-form-item prop="dishName" v-if="!scope.row.editButton">
                      <el-input size="mini" v-model.trim="scope.row.dishName" placeholder="请输入" clearable>
                      </el-input>
                    </el-form-item>
                    <span v-if="scope.row.editButton">
                      {{scope.row.dishName}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="数量" width='150'>
                  <template slot-scope="scope">
                    <el-form-item prop="num" v-if="!scope.row.editButton">
                     <el-input size="mini" type="number" v-model.number="scope.row.num" placeholder="请输入" clearable>
                     </el-input>
                    </el-form-item>
                    <span v-if="scope.row.editButton">
                      {{scope.row.num}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="单位" width='150'>
                  <template slot-scope="scope">
                    <el-form-item prop="unit" v-if="!scope.row.editButton">
                      <el-input size="mini" v-model.trim="scope.row.unit" placeholder="请输入" clearable>
                      </el-input>
                    </el-form-item>
                    <span v-if="scope.row.editButton">
                      {{scope.row.unit}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="价格" width='150'>
                  <template slot-scope="scope">
                    <el-form-item prop="price" v-if="!scope.row.editButton">
                      <el-input size="mini" type="number" v-model.number="scope.row.price" placeholder="请输入" clearable>
                      </el-input>
                    </el-form-item>
                    <span v-if="scope.row.editButton">
                      {{scope.row.price}}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="290">
                  <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" v-if="scope.row.editButton" @click="scope.row.editButton=false">
                      编辑
                    </el-button>
                    <el-button type="text" icon="el-icon-check" v-if="!scope.row.editButton" @click="scope.row.editButton=true">
                      保存
                    </el-button>
                    <el-button type="text"  @click="cancel(scope.$index, scope.row)" icon="el-icon-error" v-if="!scope.row.editButton">
                    取消
                    </el-button>
                    <el-button type="text" @click="delRow(scope.$index, form_Data[item.prop])" icon="el-icon-delete" v-if="!scope.row.editButton">
                    删除
                    </el-button>
                </template>
              </el-table-column>
        </el-table>
        <div style="width:100%;height:50px;background: #fafafa;display: flex;align-items: center;justify-content: center;">
          <el-button style="width:95%;height:30px;border:1px dashed #d9d9d9;background:#fff"  @click="callBack(form_Data[item.prop], '新增详情')">新增</el-button>
        </div>
      </el-form-item>

      <el-form-item
        v-if="item.label && item.type != 'notFrom' && item.type != 'button' && item.type != 'formInTable'"
        :rules="item.rules"
        :label-width="item.labelWidth"
        :label="item.label"
        :prop="item.prop"
      >
        <el-upload
          v-if="item.type == 'upload'"
          :disabled="item.disabled"
          :class="item.delable?'':'hiddenDel'"
          action="/tbms/b/appendixes/imgs"
          :on-success="function (response) {return fileUploadSuccess(response, form_Data, item)}"
          :file-list="form_Data[item.prop]"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="function (response) {return handleRemove(response, form_Data, item)}"
          :on-change="
            (file, fileList) => handleChange(file, fileList, item.prop)
          "
        >
          <span
            style="
              font-size: 12px;
              line-height: 30px;
              position: absolute;
              top: 0;
              left: 8px;
            "
            >点击上传</span
          >
        </el-upload>
        <el-dialog :modal="false" :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <el-input
          :maxlength="item.maxlength || 50"
          :size="item.size"
          :style="item.itemStyle"
          v-if="item.type == 'text'"
          :readonly="item.readonly"
          :disabled="item.disabled"
          :clearable="item.clearable"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          :placeholder="item.placeholder"
          @change="$forceUpdate()"
        ></el-input>
        <el-input
          :maxlength="item.maxlength || 50"
          :size="item.size"
          :style="item.itemStyle"
          v-if="item.type == 'textSearch'"
          :readonly="item.readonly"
          :disabled="item.disabled"
          :clearable="item.clearable"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          :placeholder="item.placeholder"
          @change="$forceUpdate()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="callBack(form_Data, item.value)"
          ></el-button>
        </el-input>
        <el-button
          @click="callBack(form_Data, item.value)"
          v-if="item.type == 'button'"
          type="primary"
          :size="item.size"
          :style="item.itemStyle"
          v-html="item.label"
        ></el-button>
        <div
          v-if="item.type == 'formList' && item.isLook != false"
          class="formList"
        >
          <div
            v-if="form_Data[item.prop].length > 0"
            class="formListTitle"
            :style="item.data.style"
          >
            <li
              v-for="(fitem, index) in item.data.title"
              :style="fitem.style"
              :key="index + '1'"
            >
              {{ fitem.name }}
            </li>
          </div>
          <template v-if="form_Data[item.prop]">
            <div
              class="formListTitle"
              v-for="(list, ix) in form_Data[item.prop]"
              :key="ix + '3'"
              :style="item.data.style"
            >
              <li
                v-for="(fitem, index) in item.data.title"
                :style="fitem.style"
                :key="index + '2'"
              >
                <el-input
                  :maxlength="item.maxlength || 50"
                  :size="fitem.size"
                  :style="fitem.itemStyle"
                  :readonly="fitem.readonly"
                  :disabled="fitem.disabled"
                  :clearable="fitem.clearable"
                  v-model="list[fitem.prop]"
                  :placeholder="fitem.placeholder"
                  @change="$forceUpdate()"
                ></el-input>
              </li>
              <i
                v-if="item.icRemove"
                @click="
                  callBack(
                    { type: 'del', data: ix, alldata: item.data.title },
                    item.prop
                  )
                "
                style="
                  float: right;
                  cursor: pointer;
                  line-height: 30px;
                  width: 30px;
                  text-align: center;
                "
                class="el-icon-remove"
              ></i>
            </div>
          </template>
          <div class="formListAdd">
            <i
              @click="callBack(form_Data, item.prop)"
              style="cursor: pointer"
              class="el-icon-circle-plus"
            ></i>
          </div>
        </div>
        <el-input
          :size="item.size"
          :maxlength="item.maxlength || 50"
          :style="item.itemStyle"
          v-if="item.type == 'password'"
          type="password"
          autocomplete="new-password" 
          :readonly="item.readonly"
          :disabled="item.disabled"
          :clearable="item.clearable"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          :placeholder="item.placeholder"
          @change="$forceUpdate()"
        ></el-input>
        <el-radio-group
          v-if="item.type == 'radio'"
          v-model="form_Data[item.prop]"
        >
          <el-radio
            v-for="(list, r) in item.radios"
            :key="r"
            :disabled="item.disabled"
            :label="list.value"
            >{{ list.label }}</el-radio
          >
        </el-radio-group>
        <el-select
          :size="item.size"
          :style="item.itemStyle"
          :multiple="item.multiple"
          :collapse-tags="item.collapseTags"
          :readonly="item.readonly"
          :disabled="item.disabled"
          :filterable="item.filterable"
          v-if="item.type == 'select' && item.isLook != false"
          :clearable="item.clearable"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          :placeholder="item.placeholder"
          @change="callBack(form_Data, item.value)"
        >
          <el-option
            v-for="(list, id) in item.options"
            :key="id"
            :clearable="item.clearable"
            :label="list[item.optionLabel ? item.optionLabel : 'label']"
            :value="list[item.optionValue ? item.optionValue : 'value']"
          ></el-option>
        </el-select>
        <el-input-number
          v-if="item.type == 'number'"
          v-model="form_Data[item.prop]"
          @change="$forceUpdate()"
          :min="item.min"
          :max="item.max"
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
        >
        </el-input-number>
        <el-select
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :multiple="item.multiple"
          :disabled="item.disabled"
          :filterable="item.filterable"
          v-if="item.type == 'optionGroup'"
          :clearable="item.clearable"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          :placeholder="item.placeholder"
          @change="$forceUpdate()"
        >
          <el-option-group
            v-for="(list, id) in item.options"
            :key="id"
            :label="list.label"
          >
            <el-option
              v-for="(json, id2) in list.options"
              :key="id2"
              :label="json.label"
              :value="json.value"
            >
            </el-option>
          </el-option-group>
        </el-select>
        <el-cascader
          :size="item.size"
          v-if="item.type == 'cascader'"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :props="item.props"
          :show-all-levels="item.showAllLevels"
          :disabled="item.disabled"
          v-model="form_Data[item.prop]"
          :clearable="item.clearable"
          :options="item.options"
          style="width: 100%"
          change-on-select
          @change="$forceUpdate()"
        ></el-cascader>
        <el-input
          :maxlength="item.maxlength || 256"
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          v-if="item.type == 'textarea'"
          :show-word-limit="item.showWordLimit"
          :clearable="item.clearable"
          :autosize="{ minRows: item.minRows, maxRows: item.maxRows }"
          type="textarea"
          v-model="form_Data[item.prop]"
          :placeholder="item.placeholder"
          @change="$forceUpdate()"
        ></el-input>
        <el-date-picker
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          v-if="item.type == 'datetimerange'"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-date-picker
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          v-if="item.type == 'daterange'"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-date-picker
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          style="width: 100%"
          v-if="item.type == 'date'"
          v-model="form_Data[item.prop]"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <el-date-picker
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          style="width: 100%"
          v-if="item.type == 'datetime'"
          v-model="form_Data[item.prop]"
          type="datetime"
          placeholder="选择日期"
        ></el-date-picker>

        <el-time-picker
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          style="width: 100%"
          v-if="item.type == 'time'"
          v-model="form_Data[item.prop]"
          :format="item.format ? item.format : 'HH:mm:ss'"
          :value-format="item.valueFormat ? item.valueFormat : 'HH:mm:ss'"
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:59',
          }"
          placeholder="选择时间点"
        >
        </el-time-picker>

        <el-checkbox-group
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          v-if="item.type == 'checkbox_group'"
          v-model="form_Data[item.prop]"
        >
          <el-checkbox
            v-for="(list, index) in item.checkbox_group"
            :key="index"
            :label="list.label"
            :name="list.name"
          ></el-checkbox>
        </el-checkbox-group>
        <el-radio-group
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          v-if="item.type == 'radio_group'"
          v-model="form_Data[item.prop]"
        >
          <el-radio
            v-for="(list, index) in item.radio_group"
            :key="index"
            :label="list.label"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-else>
        <el-input
          :maxlength="item.maxlength || 50"
          :style="item.itemStyle"
          :size="item.size"
          :readonly="item.readonly"
          :disabled="item.disabled"
          :clearable="item.clearable"
          v-if="item.type == 'text'"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          :placeholder="item.placeholder"
          @change="$forceUpdate()"
        ></el-input>
        <el-input
          :maxlength="item.maxlength || 50"
          :style="item.itemStyle"
          :size="item.size"
          :readonly="item.readonly"
          :disabled="item.disabled"
          :clearable="item.clearable"
          v-if="item.type == 'password'"
          type="password"
          autocomplete="new-password" 
          style="width: 100%"
          v-model="form_Data[item.prop]"
          :placeholder="item.placeholder"
          @change="$forceUpdate()"
        ></el-input>
        <el-select
          :style="item.itemStyle"
          :size="item.size"
          :multiple="item.multiple"
          :readonly="item.readonly"
          :disabled="item.disabled"
          :clearable="item.clearable"
          :filterable="item.filterable"
          v-if="item.type == 'select' && item.isLook != false"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          :placeholder="item.placeholder"
          @change="callBack(form_Data, item.value)"
        >
          <el-option
            v-for="(list, index) in item.options"
            :key="index"
            :label="list[item.optionLabel ? item.optionLabel : 'label']"
            :value="list[item.optionValue ? item.optionValue : 'value']"
          ></el-option>
        </el-select>
        <el-select
          :style="item.itemStyle"
          :size="item.size"
          :multiple="item.multiple"
          :readonly="item.readonly"
          :disabled="item.disabled"
          :clearable="item.clearable"
          :filterable="item.filterable"
          v-if="item.type == 'optionGroup'"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          :placeholder="item.placeholder"
          @change="$forceUpdate()"
        >
          <el-option-group
            v-for="(list, id) in item.options"
            :key="id"
            :label="list.label"
          >
            <el-option
              v-for="(json, id2) in list.options"
              :key="id2"
              :label="json.label"
              :value="json.value"
            >
            </el-option>
          </el-option-group>
        </el-select>
        <el-cascader
          v-if="item.type == 'cascader'"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          v-model="form_Data[item.prop]"
          :clearable="item.clearable"
          :options="item.options"
          style="width: 100%"
          change-on-select
        ></el-cascader>
        <el-input
          :maxlength="item.maxLength || 256"
          :style="item.itemStyle"
          :size="item.size"
          :readonly="item.readonly"
          :disabled="item.disabled"
          :clearable="item.clearable"
          v-if="item.type == 'textarea'"
          :autosize="{ minRows: item.minRows, maxRows: item.maxRows }"
          type="textarea"
          v-model="form_Data[item.prop]"
          @change="$forceUpdate()"
        ></el-input>
        <el-date-picker
          :style="item.itemStyle"
          :size="item.size"
          :readonly="item.readonly"
          :disabled="item.disabled"
          v-if="item.type == 'datetimerange'"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          type="datetimerange"
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-date-picker
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          v-if="item.type == 'daterange'"
          style="width: 100%"
          v-model="form_Data[item.prop]"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-time-picker
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          style="width: 100%"
          v-if="item.type == 'time'"
          v-model="form_Data[item.prop]"
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:59',
          }"
          placeholder="选择时间点"
        >
        </el-time-picker>
        <el-date-picker
          :size="item.size"
          :style="item.itemStyle"
          :readonly="item.readonly"
          :disabled="item.disabled"
          style="width: 100%"
          v-if="item.type == 'datetime'"
          v-model="form_Data[item.prop]"
          type="datetime"
          placeholder="选择日期"
        ></el-date-picker>
        <el-date-picker
          :style="item.itemStyle"
          :size="item.size"
          :readonly="item.readonly"
          :disabled="item.disabled"
          style="width: 100%"
          v-if="item.type == 'date'"
          v-model="form_Data[item.prop]"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
        <el-checkbox-group
          :readonly="item.readonly"
          :disabled="item.disabled"
          v-if="item.type == 'checkbox_group'"
          v-model="form_Data[item.prop]"
          :style="item.itemStyle"
        >
          <el-checkbox
            :size="item.size"
            v-for="(list, index) in item.checkbox_group"
            :key="index"
            :label="list.label"
            :name="list.name"
          ></el-checkbox>
        </el-checkbox-group>
        <el-radio-group
          :size="item.size"
          :readonly="item.readonly"
          :disabled="item.disabled"
          v-if="item.type == 'radio_group'"
          v-model="form_Data[item.prop]"
          :style="item.itemStyle"
        >
          <el-radio
            v-for="(list, index) in item.radio_group"
            :key="index"
            :label="list.label"
          ></el-radio>
        </el-radio-group>
        <el-button
          @click="callBack(form_Data, item.value)"
          v-if="item.type == 'button'"
          type="primary"
          :size="item.size"
          :style="item.itemStyle"
          v-html="item.label"
        ></el-button>
      </template>
    </el-col>
    <div style="clear: both"></div>
  </el-form>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  watch: {
    // "form_Data.pid"() {
    //   let ins = this;
    //   setTimeout(() => {
    //     ins.$set(this.form_Data, "pid", this.form_Data.pid);
    //     // this.form_Data.pid = this.form_Data.pid;
    //   }, 500);
    // }
  },
  mounted() {},
  methods: {
    cancel(ind,list) {
      list.dishName = "";
      list.num = null;
      list.unit = "";
      list.price = null;
    },
    delRow(ind,list) {
      list.splice(ind,1)
    },
    handleRemove(res,list,data) {
      let newId = list.productInstructionsId.split(",");
      let newUrls = list.productInstructionsUrls.split(",");
      list.productInstructions.forEach((item,ind)=>{
        if(item.uid == res.uid){
          list.productInstructions.splice(ind,1);
          newId.splice(ind,1);
          newUrls.splice(ind,1);
        };
      });
      //可以优化
      this.$store.commit("SET_SETMEAL_ONEOF", {
        productInstructionsId: newId.join(',')
      });
      this.$store.commit("SET_SETMEAL_ONEOF", {
        productInstructionsUrls: newUrls.join(',')
      });
      console.log(res,list,data);

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleChange(file, fileList, name) {
      console.log(file, fileList, "file, fileList", name);
      if(name!='productInstructions'){
        if (fileList && fileList.length >= 2) {
          fileList.shift();
          console.log("删除了", fileList);
        }
        this.form_Data[name] = fileList;
      }
      
    },
    fileUploadSuccess(res, data, item) {
      console.log(res);
      if(item.value!='productInstructions'){
        data[item.value + "Id"] = res.data.id;
        data[item.value + "Path"] = res.data.url;
        sessionStorage.setItem("SHOP_MANAGER_DETAIL", JSON.stringify(data));
      }else{
        if(data[item.value + "Id"]==''){
          data[item.value + "Id"] = res.data.id;
        }else{
          data[item.value + "Id"] += ','+ res.data.id;
        };
        if(data[item.value + "Path"]==''){
          data[item.value + "Path"] = res.data.url;
        }else{
          data[item.value + "Path"] += ','+ res.data.url;
        };
      }
      
      
      console.log(data, data, item, "uploadData");
    },
    callBack(data, name) {
      console.log(this, data, name);
      console.log(this.$refs);
      if (name == "保存" || name == "新增" || name == "确认重置密码") {
        this.$refs["form"].validate((valid) => {
          if (valid) {
            if (this.formData.busEmit) {
              this.$bus.$emit(this.formData.busEmit, data, name);
            }
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        if (this.formData.busEmit) {
          this.$bus.$emit(this.formData.busEmit, data, name);
        }
      }
    },
  },
  props: ["form_Column", "form_Data", "formData"],
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 10px !important;
}
.formList {
  border: 1px dashed #ababab;
  box-sizing: border-box;
  padding: 5px;
}
.formListTitle {
  display: flex;
}
/deep/ .el-upload--picture-card {
  height: 30px !important;
  width: 65px !important;
  position: relative;
}
/deep/ .el-upload-list__item {
  height: 150px !important;
  width: 150px !important;
}
/deep/ .hiddenDel .el-upload-list__item-delete{
  display: none !important;
}
/deep/ .hiddenDel .el-upload-list__item {
  height: 50px !important;
  width: 50px !important;
}
/deep/ .el-input.is-disabled .el-input__inner{
  /* background: #fff !important; */
  color:inherit !important;
}
</style>
