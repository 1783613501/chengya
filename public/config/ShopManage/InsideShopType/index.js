import table from "../../Table/table";
import store from '@/store'
import Form from "../../Form/index";
const CreatedBusOn = "shopListEditBusOn";
let textStyle = `font-size: 14px;
text-align: left;
font-weight: 500;
font-style: normal;
padding-left:15px;
color: rgb(3, 42, 64);
height: 40px;
line-height: 40px;
background:#e4e4e4
box-sizing: border-box;`;

let that = null;
let dialog = {
  dialogBl:false,
  title:'新增',
  form:{
    form: [{
      value: "分类名称", // 值
      prop: "categoryName",
      label: "分类名称 ：", // 名称
      labelWidth:'150px',
      rules:[
        { 
          required: true, 
          message: '分类名称不能为空',
        }
      ],
      type: "text", // 类型
      clearable: false, // 是否可清除
      span: 24, // 宽度
      readonly: false, // 是否只读
      disabled: false, // 是否禁用
      style:"margin-bottom:10px"
    },
    {
      value: "categoryIcon", // 值
      prop: "categoryIconList",
      label: "分类ICON ：", // 名称
      rules:[
        { 
          required: true, 
          message: '分类ICON不能为空',
        }
      ],
      labelWidth:'150px',
      type: "upload", // 类型
      clearable: false, // 是否可清除
      span: 24, // 宽度
      readonly: false, // 是否只读
      disabled: false, // 是否禁用,
    },
    {
      value: "返回", // 值
      label: "返回", // 值
      type: "button", // 类型
      clearable: false, // 是否可清除
      span: 2, // 宽度
      readonly: false, // 是否只读
      disabled: false, // 是否禁用
      style:'margin: 20px 60px 0 135px; '
    },{
      label: "保存", // 值
      value: "保存", // 值
      type: "button", // 类型
      clearable: false, // 是否可清除
      span: 2, // 宽度
      readonly: false, // 是否只读
      disabled: false, // 是否禁用
      style:'margin: 20px 0px 0 0px; '
    }],
    formData: {
      categoryName: "",
      categoryIconList:[],
      categoryIconId: ""
    },
    data: {
      busEmit: CreatedBusOn
    }
  }
};

let activeType = {};
document.querySelector('html').addEventListener('click',()=>{
  activeType = {};
})
//页面统一获取数据
function uiGetshopType(data, type) {
  console.log(data, type);
  if(type.indexOf('新增分类')>0){
    dialog.dialogBl = true;
    dialog.form.formData = {};
    dialog.title = '新增';
  };
  if(type.indexOf('修改分类')>0){
    if(!activeType.id){
      that.$message.warning("请选择目录")
    }else{
    dialog.form.formData = JSON.parse(JSON.stringify(activeType));
    dialog.form.formData.categoryIconList = [{name:activeType.categoryName,url:activeType.categoryIconPath}];
    dialog.dialogBl = true;
    dialog.title = '修改';
  }
  };
  if(type.indexOf('删除分类')>0){
    if(!activeType.id){
      that.$message.warning("请选择目录")
    }else{
      let id = activeType.id;
      that
      .$confirm(
        "是否删除目录?",
        "目录删除确认", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
      .then(res => {
        delTreeData(id);
      })
    }
  };
  if(type.indexOf('保存')>=0){
    dialog.dialogBl = false;
    dialog.form.formData = {};
    addTreeData(data);
    console.log(data,activeType)
  };
  if(type.indexOf('返回')>=0){
    dialog.dialogBl = false;
    dialog.form.formData = {};
  };
  if(type == 'ClickTree'){
    activeType = data;
  }
}



let outShopType = {
  form: Form.outShopForm,
  formData: {},
  busEmit: CreatedBusOn
};
let uigetThis = function(data) {
  that = data;
};
let treeData = {
  data:[],
  defaultExpandAll:true,
  props:{
    children: 'children',
    label: 'categoryName'
  },
  key:'id',
  indent:16,
  busEmit: CreatedBusOn
};

let getTreeData = function(){
  Tool.axios(`tbms/b/storeCategory?pageIndex=1&pageSize=10000`,'get',{},res=>{
    console.log(res);
    treeData.data = null;
    res.data.data.data.forEach(element => {
      element.categoryIconPath = Tool.URL + element.categoryIconPath
    });
    treeData.data = res.data.data.data;
  });
}

let addTreeData = function(data){
  data.id && (data.storeCategoryId = data.id);
  Tool.axios(`tbms/b/storeCategory${data.id?('/storeCategoryId='+data.id):''}`,'post',data,res=>{
    getTreeData();
  },'2');
}

let delTreeData = function(data){
  Tool.axios(`tbms/b/storeCategory/delete`,'post',{ids:[data]},res=>{
    getTreeData();
  },'2');
}




const config = [
  {
    gutter: 10,
    style: {
      height: "100%",
      margin: 0,
      padding: "10px 14px 0 14px"
    },
    row: [
      {
        span: 24,
        style: {
          height: "100%",
          "background-color": "#FFF",
          padding: 0,
          border: "1px solid #ccc",
          position: "relative"
        },
        type: "col",
        data: [
          {
            span: 24,
            style: {},
            type: "col",
            data: [
              {
                span: 24,
                style: {
                  height: "100%",
                  padding: "10px",
                  borderBottom:'1px solid rgb(204, 204, 204)'
                },
                type: "Form",
                form: Form.outShopForm,
                formData: outShopType.formData,
                data: outShopType
              },
              {
                span: 24,
                style: {
                  height: "100%",
                  padding: "10px"
                },
                type: "Tree",
                data: treeData
              }
            ]
          }
        ]
      }
    ]
  }
];

export default {
  config,
  CreatedBusOn,
  uiGetshopType,
  uigetThis,
  getTreeData,
  dialog
  // getShopManagerTypeList,
};
