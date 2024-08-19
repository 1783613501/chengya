import table from "../Table/table";
import store from "@/store";
import Form from "../Form/index";
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

//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.taskListChooseShopTableData,
  refTable: "chooseSetMealTable",
  pagination: {
    show: true,
    total: 1,
    size: 10,
    pageIndex: 1,
    style:
      "text-align: center; position: absolute; width: 100%; bottom: 5px;right:0;display:flex;justify-content:flex-end"
  }
};

//员工列表
let staffTable = {
  busEmit: CreatedBusOn,
  TableData: table.taskListChooseStaffTableData,
  refTable: "chooseSetMealTable",
  pagination: {
    show: true,
    total: 1,
    size: 10,
    pageIndex: 1,
    style:
      "text-align: center; position: absolute; width: 100%; bottom: 5px;right:0;display:flex;justify-content:flex-end"
  }
};

//查询表单
let shopListData = {
  form: Form.chooseShopListInfo,
  formData: {
    businessCode: "",
    businessName: ""
  },
  busEmit: CreatedBusOn
};

//查询表单
let staffListData = {
  form: Form.chooseStaffListInfo,
  formData: {
    code: "",
    name: ""
  },
  busEmit: CreatedBusOn
};

let closeTaskDialog = {
  form: Form.closeTaskDialogButton,
  formData: {
    businessName: "",
    staffName: ""
  },
  busEmit: CreatedBusOn
};

let chooseShop = {
  num: 0,
  list: []
};
let chooseStaff = {
  num: 0,
  list: []
};

//页面统一获取数据
function uiGetshopList(data, type) {
  console.log(data, type);
  if (type == "保存") {
    if (that.$route.query.type == "查看") {
      that.$message.error("查看页面无法修改！");
      return;
    }
    addOrChangeAreaGroupManage(data);
  }
  if (type == "返回") {
    that.$router.push({ path: "/merchantRebate" });
  }
}


let shopDetailData = {
  form: Form.AreaGroupManageDetail,
  formData: {},
  busEmit: CreatedBusOn
};
let uigetThis = function(data) {
  that = data;
};


let addOrChangeAreaGroupManage = function(data) {

  let parma = {
    adcode: data.adcode,
    adcodeName: data.adcodeName,
    groupName: data.groupName,
    status: data.status,
    qrcodeUrl: data.qrcodeUrlPath?data.qrcodeUrlPath:data.qrcodeUrl[0].url.split('.com')[1]
}
  
  Tool.axios(
    `tbms/b/ads${data.id?'/'+data.id : ""}`,
    "post",
    parma,
    res => {
      console.log(res);
      //   that.$store.dispatch("activeTaskManager", res.data.data);
      if (res.data.msg == "操作成功") {
        that.$message.success(res.data.msg);
        that.$router.push({ path: "/merchantAreaGroup" });
        that.$store.dispatch('tagsView/delView', {path:"/edit/areaGroupEdit"});
      } else {
        that.$message.warning(res.data.msg);
      }
    },
    "2"
  );
};

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
            span: 24, // 宽度
            style: {
              height: "40px",
              overflow: "auto",
              padding: 0,
              fontSize: "14px"
            },
            type: "Text", // 类型
            data: {
              text: "编辑群二维码",
              style: textStyle
            }
          },
          {
            span: 24,
            style: {
              height: "calc(100% - 40px)",
              overflow: "auto"
            },
            type: "col",
            data: [
              {
                span: 24,
                style: {
                  height: "100%",
                  padding: "20px 100px 0 100px"
                },
                type: "Form",
                form: Form.AreaGroupManageDetail,
                formData: shopDetailData.formData,
                data: shopDetailData
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
  uiGetshopList,
  uigetThis,
  shopDetailData
};
