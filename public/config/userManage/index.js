import table from "../Table/table";
import Form from "../Form/index";
const CreatedBusOn = "shopListBusOn";

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
let uigetThis = function(data) {
  that = data;
};

//查询表单
let shopListData = {
  form: Form.userListInfo,
  formData: {
    userName: "",
    phone: "",
    status: null,
    userCode: "",
    referenceUserCode: "",
    pageIndex: 1,
    pageSize: 10,
    pageType: ""
  },
  busEmit: CreatedBusOn
};
//新增按钮
let addbutton = {
  form: Form.shopListInfo,
  formData: {},
  busEmit: CreatedBusOn
};
//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.userTableData,
  refTable: "chooseTable",
  pagination: {
    show: true,
    total: 1,
    size: 10,
    pageIndex: 1,
    style:
      "text-align: center; position: absolute; width: 100%; bottom: 5px;right:0;display:flex;justify-content:flex-end"
  }
};
let activeTaskList = [];
//页面统一获取数据
function uiGetshopList(data, type) {
  console.log(data, type);
  if (type == "Tab") {
    // 0-全部,1.生效中,2.未开始3.已失效
    switch (data) {
      case "全部":
        shopListData.formData.pageType = "";
        break;
      case "待提交":
        shopListData.formData.pageType = 1;
        break;
      case "待审核":
        shopListData.formData.pageType = 2;
        break;
      case "已驳回":
        shopListData.formData.pageType = "-3";
        break;
      case "已取消":
        shopListData.formData.pageType = "-4";
        break;
      case "已完成":
        shopListData.formData.pageType = 5;
        break;
      default:
        break;
    }
    uiGetshopTableData();
  }
  if (type == "查询") {
    shopTable.pagination.pageIndex = 1;
    shopListData.formData.pageIndex=1;
    uiGetshopTableData();
  }
  if (type == "列表复选框") {
    activeTaskList = data;
    chooseShop.num = data.length;
    console.log(chooseShop.num);
  }
  if (type == "确认修改状态") {
    changeUserState();
  }
  if (type == "重置") {
    shopListData.formData.userName = "";
    shopListData.formData.phone = "";
    shopListData.formData.status = null;
    shopListData.formData.userCode = "";
    shopListData.formData.referenceUserCode = "";
  }
  if (type == "翻页") {
    shopTable.pagination.pageIndex = data;
    shopListData.formData.pageIndex = data;
    uiGetshopTableData();
  }
  if (type == "SizeChange") {
    shopListData.formData.pageSize = data;
    shopTable.pagination.size = data;
    uiGetshopTableData();
  }
  if (type == "编辑") {
    dialog.visible = true;
    dialog.state = data.status;
    dialog.userId = data.id;
  }
  if (type == "调整积分") {
    getPoints(data);
    pointsDialog.visible = true;
    pointsDialog.userId = data.id;
  }
  if (type == "确认调整积分") {
    changePoints(data);
  }
  if (type == "查看") {
    that.$store.dispatch("activeTaskManager", data);
    that.$router.push({ path: "/edit/taskEdit", query: { type } });
  }
  if (type == "清空") {
    if(activeTaskList.length == 0){
      return;
    }
    activeTaskList = [];
    chooseShop.num = 0;
    console.log(that);
    that.$refs.chooseTable.clearSelection();
  }
  if (type == "列表That") {
    that.$refs = { ...data.$refs, ...that.$refs };
    console.log(that.$refs);
  }
  if (type == "批量审核") {
    that.$message("功能研发中");
  }
  if (type == "确认审核") {
    that.$refs["orderForm"].validate(valid => {
      if (valid) {
        Tool.axios(
          `tbms/b/orders/examine`,
          "post",
          {
            ids: [activeTaskList[0].id + ""],
            points: data + "",
            code: activeTaskList[0].id + ""
          },
          res => {
            if (res.data.code == 0) {
              that.$message.error(res.data.msg);
            } else {
              that.$message.success("操作成功");
              uiGetshopTableData();
              dialog.visible = false;
            }
          },
          "2"
        );
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
}

//获取商家列表
let uiGetshopTableData = () => {
  shopTable.TableData.parameter.vLoading = true;
  let {
    userName,
    phone,
    status,
    userCode,
    referenceUserCode,
    pageIndex,
    pageSize
  } = shopListData.formData;
  Tool.axios(
    `tbms/b/cusers?userName=${userName}&phone=${phone}&status=${
      status ? status : ""
    }&userCode=${userCode}&referenceUserCode=${referenceUserCode}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    "get",
    {},
    res => {
      res.data.data.data.forEach(element => {
        console.log(element, "element");
        element.createTime = element.createTime
          ? new Date(element.createTime).formats("yyyy-MM-dd hh:mm:ss")
          : element.createTime;
        element.operation = [{name:'编辑'},{name:'调整积分'}];
        element.invitationCodeUrl = Tool.URL + element.invitationCodeUrl;
      element.style = element.statusDesc =='停用' ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;":"color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";

      });
      shopTable.TableData.table_data = res.data.data.data;
      shopTable.pagination.total = res.data.data.page.allItem;
      shopTable.TableData.parameter.vLoading = false;
    },
    "2"
  );
};

//停止任务
let changeUserState = data => {
  if(dialog.state == 1){

  }
  Tool.axios(
    `tbms/b/cusers/${dialog.userId}/${dialog.state == 1?'enable':'disable'}`,
    "post",
    {},
    res => {
      uiGetshopTableData();
      dialog.visible = false;
    },
    "2"
  );
};
//查询可用积分
let getPoints = data => {
  Tool.axios(
    `tbms/b/cusers/${data.id}?`,
    "get",
    {},
    res => {
      pointsDialog.realPoints = res.data.data.availablePoints;
      pointsDialog.pointsTotal = res.data.data.points;
    },
    "2"
  );
};
//调整积分
let changePoints = data => {
  let bl = false;
  that.$refs['pointsForm'].validate((valid) => {
    if (valid) {
      bl = true;
    } else {
      console.log('error submit!!');
      return false;
    }
  });
  if(!bl) return;
  let parma = {
    points:data.type + data.points,
    reason:data.reason
  }
  Tool.axios(
    `tbms/b/cusers/${data.userId}/adjustPoints`,
    "post",
    parma,
    res => {
      console.log(res)
      if(res.data.code == 0){
        that.$message.warning(res.data.msg)
      }else{
        uiGetshopTableData();
        pointsDialog.visible = false;
        pointsDialog.points = 0;
        pointsDialog.type = '-';
        pointsDialog.userId = null;
        pointsDialog.reason = '';
        that.$message.success('调整成功')
      }
      
    },
    "2"
  );
};


let chooseShop = {
  num: 0,
  list: []
};
let dialog = {
  visible: false,
  title: "编辑用户",
  userId:null,
  state: null,
  busEmit: CreatedBusOn
};
let pointsDialog = {
  visible: false,
  title: "资产管理",
  points:0,
  realPoints:0,
  pointsTotal:0,
  userId:null,
  reason:'',
  type:'-',
  busEmit: CreatedBusOn
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
              text: "用户列表",
              style: textStyle
            }
          },
          {
            span: 24,
            style: {
              height: "150px"
            },
            type: "col",
            data: [
              {
                span: 24,
                style: {
                  height: "100%",
                  padding: "20px 100PX 0 100px"
                },
                type: "Form",
                form: Form.userListInfo,
                formData: shopListData.formData,
                data: shopListData
              }
            ]
          },
          {
            span: 24, // 宽度
            style: {
              height: "32px",
              overflow: "auto",
              padding: 0,
              fontSize: "14px",
              padding: "0 5px"
            },
            type: "Text", // 类型
            data: {
              text: "",
              vHtml: `<i class='el-icon-warning' style='color:#1890ff'></i> 已选择 ${
                chooseShop.num
              } 项`,
              busEmit: CreatedBusOn,
              num: chooseShop,
              style: {
                backgroundColor: "#e6f7ff !important",
                border: "1px solid #91d5ff",
                height: "32px",
                lineHeight: "32px",
                fontWeight: 500,
                fontSize: "12px",
                paddingLeft: "10px",
                borderRadius: "5px"
              }
            }
          },
          {
            span: 24,
            style: {
              height: "calc(100% - 220px)"
            },
            type: "col",
            data: [
              {
                span: 24,
                style: {
                  "margin-top": "5px",
                  height: "calc(100% - 5px)",
                  padding: 0
                },
                type: "Table",
                data: shopTable
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
  dialog,
  pointsDialog
};
