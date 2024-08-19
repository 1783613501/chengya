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
  form: Form.billListInfo,
  formData: {
    businessCode: "",
    businessName: "",
    paymentType: "-1",
    billNo: "",
    paymentOutTransNo: "",
    beginTimeEndTime: [],
    pageIndex: 1,
    pageSize: 10,
    pageType: ""
  },
  busEmit: CreatedBusOn
};
//新增按钮
let addbutton = {
  form: Form.billListInfo,
  formData: {},
  busEmit: CreatedBusOn
};
//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.billListTableData,
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
let tabActiveName = {
  name:"全部"
}
//页面统一获取数据
function uiGetshopList(data, type) {
  console.log(data, type);
  if (type == "Tab") {
    tabActiveName.name = data;
    //     -1:全部（默认）
    // 1:待生成
    // 2:待支付
    // 3:已支付
    // 4:已废弃
    switch (data) {
      case "全部":
        shopListData.formData.pageType = "-1";
        break;
      case "待生成":
        shopListData.formData.pageType = 1;
        break;
      case "待支付":
        shopListData.formData.pageType = 2;
        break;
      case "已支付":
        shopListData.formData.pageType = 3;
        break;
      case "已废弃":
        shopListData.formData.pageType = 4;
        break;
      default:
        break;
    }
    chooseShop.num = 0;
    uiGetshopTableData();
  }
  if (type == "查询") {
    shopTable.pagination.pageIndex = 1;
    shopListData.formData.pageIndex = 1;
    uiGetshopTableData();
  }
  if (type == "列表复选框") {
    activeTaskList = data;
    chooseShop.num = data.length;
    console.log(chooseShop.num);
  }
  if (type == "确认收款") {
    // uiGetshopTableData();
    if (activeTaskList.length == 0) {
      that.$message.warning("请先选择要操作的订单！");
    } else {
      let bl = false;
      activeTaskList.forEach(item=>{
        if(item.billStatusName != '待支付'){
          bl = true;
        }
      });
      if(bl){
        this.$message.warning('请选择待支付的订单！');
        return;
      }else{
        dialog.visible = true;
      }
    }
  }
  if (type == "重置") {
    shopListData.formData.businessCode = "";
    shopListData.formData.businessName = "";
    shopListData.formData.paymentType = "-1";
    shopListData.formData.billNo = "";
    shopListData.formData.paymentOutTransNo = "";
    shopListData.formData.beginTimeEndTime = [];
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
  if (type == "废弃账单") {
    // uiGetshopTableData();
    if (activeTaskList.length == 0) {
      that.$message.warning("请先选择要操作的订单！");
    } else {
      let bl = false;
      activeTaskList.forEach(item=>{
        if(item.billStatusName != '待支付'){
          bl = true;
        }
      });
      if(bl){
        this.$message.warning('请选择待支付的订单！');
        return;
      }else{
        rejectDialog.visible = true;
      }
    }
  }
  if (type == "确认驳回") {
    that.$refs["orderRejectForm"].validate(valid => {
      if (valid) {
        Tool.axios(
          `tbms/b/orders/reject`,
          "post",
          {
            ids: [activeTaskList[0].id + ""],
            reason: data + "",
            code: [activeTaskList[0].id + ""]
          },
          res => {
            if (res.data.code == 0) {
              that.$message.error(res.data.msg);
            } else {
              that.$message.success("操作成功");
              rejectDialog.visible = false;
              uiGetshopTableData();
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
  if (type == "复制") {
    let oInput = document.createElement("textarea");
	  //这边为链接地址this.liveLink='www.baidu.com'
    let value = `商家名称：${data.businessName};\n账单日：${data.billDate};\n账单地址: ${data.billAccessUrl}`
	  oInput.value = value;
	  document.body.appendChild(oInput);
	  oInput.select();
	  console.log(oInput.value);
	  document.execCommand("Copy");
	  oInput.remove();
	  this.$message({
		  message: "复制成功",
		  type: "success",
	  });
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
  if (type == "确认废弃") {
    that.$refs["rejectForm"].validate(valid => {
      if (valid) {
        let ids = [];
        activeTaskList.forEach(item=>{
          ids.push(item.id)
        })
        Tool.axios(
          `tbms/b/bills/abandoned`,
          "post",
          { ids, billRemarks: data },
          res => {
            if (res.data.code == 0) {
              that.$message.error(res.data.msg);
            } else {
              that.$message.success("操作成功");
              uiGetshopTableData();
              rejectDialog.visible = false;
              chooseShop.num = 0;
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
  if (type == "手动确认收款") {
    that.$refs["payForm"].validate(valid => {
      if (valid) {
        let ids = [];
        activeTaskList.forEach(item=>{
          ids.push(item.id)
        })
        Tool.axios(
          `tbms/b/bills/collection`,
          "post",
          { ids, billRemarks: data },
          res => {
            if (res.data.code == 0) {
              that.$message.error(res.data.msg);
            } else {
              that.$message.success("操作成功");
              uiGetshopTableData();
              dialog.visible = false;
              chooseShop.num = 0;
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
    businessCode,
    businessName,
    paymentType,
    billNo,
    paymentOutTransNo,
    beginTimeEndTime,
    pageIndex,
    pageSize,
    pageType
  } = shopListData.formData;
  Tool.axios(
    `tbms/b/bills?businessCode=${businessCode}&businessName=${businessName}&paymentType=${paymentType}&billNo=${billNo}&paymentOutTransNo=${paymentOutTransNo}&beginTimeEndTime=&beginTime=${
      beginTimeEndTime[0] ? new Date(beginTimeEndTime[0]).getTime() : ""
    }&endTime=${
      beginTimeEndTime[1] ? new Date(beginTimeEndTime[1]).getTime() : ""
    }&billStatus=${pageType}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    "get",
    {},
    res => {
      res.data.data.data.forEach(element => {
        element.billDate = new Date(element.billDate).formats("yyyy-MM-dd");
        element.paymentTime &&
          (element.paymentTime = new Date(element.paymentTime).formats(
            "yyyy-MM-dd hh:mm:ss"
          ));
        element.paymentTypeName = element.paymentTypeName == "无效类型"?"":element.paymentTypeName;
        element.operation = [{ name: "复制" }];
        element.style =
          element.billStatusName == "已废弃"
            ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;"
            : "color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
        (element.billStatusName == "待生成" ||
          element.billStatusName == "待支付") &&
          (element.style =
            "color: #fa8c16;background: #fff7e6;border-color: #ffd591;");
      });
      shopTable.TableData.table_data = res.data.data.data;
      shopTable.pagination.total = res.data.data.page.allItem;
      shopTable.TableData.parameter.vLoading = false;
    },
    "2"
  );
};

//停止任务
let stopTsak = data => {
  console.log(data, "停止任务了");
  let parma = [];
  data.forEach(item => {
    parma.push(item.taskCode + "");
  });
  console.log(parma);
  Tool.axios(
    `tbms/b/tasks/closure`,
    "post",
    parma,
    res => {
      uiGetshopTableData();
    },
    "2"
  );
};
let chooseShop = {
  num: 0,
  list: []
};
//审核订单
let passOrder = item => {
  console.log(item);
  if (item.length > 1) {
    that
      .$confirm(
        "请确认操作审核通过？审核通过后该订单状态变更为“已完成”，将自动发放积分到用户账号",
        "审核通过？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
      .then(() => {
        let parma = [];
        item.forEach(ele => {
          parma.push(ele.id);
        });
        Tool.axios(
          `tbms/b/orders/examine`,
          "post",
          { ids: parma },
          res => {
            uiGetshopTableData();
          },
          "2"
        );
      })
      .catch(() => {});
  } else if (item.length == 0) {
    that.$message.warning("请选择订单！");
  } else if (item.length == 1) {
    dialog.visible = true;
  }
  // 请确认操作审核通过？审核通过后该订单状态变更为“已完成”，相关积分将自动“实返积分”发放到用户账号
};
let dialog = {
  visible: false,
  title: "手动确认收款？",
  resMark: "",
  busEmit: CreatedBusOn
};

let rejectDialog = {
  visible: false,
  title: "废弃账单？",
  reason: "",
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
              text: "账单列表",
              style: textStyle
            }
          },
          {
            span: 4,
            style: {
              position: "absolute",
              top: "3px",
              right: "0px"
            },
            type: "col",
            data: [
              {
                span: 24,
                style: {},
                type: "Form",
                form: Form.billListButton,
                formData: shopListData.formData,
                data: shopListData
              }
            ]
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
                form: Form.billListInfo,
                formData: shopListData.formData,
                data: shopListData
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "35px",
              "background-color": "#FFF"
            },
            type: "Tabs",
            busEmit: CreatedBusOn,
            tabActiveName,
            data: [
              {
                label: "全部",
                name: "全部"
              },
              {
                label: "待生成",
                name: "待生成"
              },
              {
                label: "待支付",
                name: "待支付"
              },
              {
                label: "已支付",
                name: "已支付"
              },
              {
                label: "已废弃",
                name: "已废弃"
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
              height: "calc(100% - 260px)"
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
  rejectDialog
};
