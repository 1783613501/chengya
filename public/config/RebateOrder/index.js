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
  form: Form.RebateOrderListInfo,
  formData: {
    businessCode: "",
    businessName: "",
    mediaType: "-1",
    takeOutOrderNo: "",
    cUserName: "",
    phone: "",
    payStatus: "-1",
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
  TableData: table.RebateOrderTableData,
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
    // 0-全部,1.生效中,2.未开始3.已失效
    switch (data) {
      case "全部":
        shopListData.formData.pageType = "";
        break;
      case "待审核":
        shopListData.formData.pageType = 2;
        break;
      case "已完成":
        shopListData.formData.pageType = 5;
        break;
      case "审核驳回":
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
  if (type == "停止任务") {
    // uiGetshopTableData();
    if (activeTaskList.length == 0) {
      that.$message.warning("请选择停止任务！");
    } else {
      stopTsak(activeTaskList);
    }
  }
  if (type == "重置") {
    shopListData.formData.businessCode = "";
    shopListData.formData.businessName = "";
    shopListData.formData.mediaType = "-1";
    shopListData.formData.beginDate = "";
    shopListData.formData.endDate = "";
    shopListData.formData.cUserName = "";
    shopListData.formData.phone = "";
    shopListData.formData.orderStatus = "-1";
    shopListData.formData.takeOutOrderNo = "";
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
    console.log(that.$store);
    that.$store.dispatch("activeManager", data);
    that.$router.push({ path: "/edit/userEdit", query: { type } });
  }
  if (type == "审核通过") {
    passOrder(activeTaskList);
  }
  if (type == "审核驳回") {
    // rejectOrder(activeTaskList);
    if (activeTaskList.length == 0) {
      that.$message.warning("请选择订单！");
    } else {
      rejectDialog.visible = true;
    }
  }
  if (type == "确认驳回") {
    that.$refs["orderRejectForm"].validate(valid => {
      if (valid) {
        let ids = activeTaskList[0].id;
        activeTaskList.forEach((item, ind) => {
          if (ind > 0) ids += "," + item.id;
        });
        Tool.axios(
          `tbms/b/rebateOrders/reject`,
          "post",
          { ids, marks: data + "" },
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
  if (type == "查看") {
    that.$store.dispatch("activeTaskManager", data);
    that.$router.push({ path: "/edit/taskEdit", query: { type } });
  }
  if (type == "清空") {
    if (activeTaskList.length == 0) {
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
  if (type == "重新支付") {
    let bl = false;
    if (activeTaskList.length == 0) {
      that.$message.warning("请选择要重新支付的订单！");
    } else {
      activeTaskList.forEach(item => {
        if (item.statusName != "已完成" && item.payStatusName != "失败") {
          that.$message.warning("请选择审核完成但是支付失败的订单！");
          bl = true;
          throw new Error();
        }
      });
    }
    if (bl) return;
    let ids = activeTaskList[0].id;
    activeTaskList.forEach((item, ind) => {
      if (ind > 0) ids += "," + item.id;
    });
    that
      .$confirm("请确认重新支付!", "重新支付-审核", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        Tool.axios(
          `tbms/b/rebateOrders/repay`,
          "post",
          { ids },
          res => {
            if (res.data.code == 0) {
              that.$message.error(res.data.msg);
            } else {
              that.$message.success(res.data.data);
              uiGetshopTableData();
              dialog.visible = false;
            }
          },
          "2"
        );
      })
      .catch(() => {
        that.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  }
  if (type == "确认审核") {
    console.log(activeTaskList);
    let ids = activeTaskList[0].id;
    activeTaskList.forEach((item, ind) => {
      if (ind > 0) ids += "," + item.id;
    });
    Tool.axios(
      `tbms/b/rebateOrders/examine/v2`,
      "post",
      { ids },
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
  }
}

//获取商家列表
let uiGetshopTableData = () => {
  shopTable.TableData.parameter.vLoading = true;
  let {
    businessCode,
    businessName,
    mediaType,
    cUserName,
    phone,
    takeOutOrderNo,
    payStatus,
    pageIndex,
    pageSize,
    pageType
  } = shopListData.formData;
  Tool.axios(
    `tbms/b/rebateOrders/v2?businessCode=${businessCode}&businessName=${businessName}&mediaType=${mediaType}&cUserName=${cUserName}&phone=${phone}&takeOutOrderNo=${takeOutOrderNo}&status=${pageType}&dealCode=&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    "get",
    {},
    res => {
      res.data.data.data.forEach(element => {
        element.style =
          element.statusName == "取消" || element.statusName == "驳回"
            ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;"
            : "color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
        element.statusName == "待审核" &&
          (element.style =
            "color: #fa8c16;background: #fff7e6;border-color: #ffd591;");
        element.screenshotImgUrl &&
          (element.screenshotImgUrl = Tool.URL + element.screenshotImgUrl);
        element.createTime = element.createTime
          ? new Date(element.createTime).formats("yyyy-MM-dd hh:mm:ss")
          : element.createTime;
        element.payTime = element.payTime
          ? new Date(element.payTime).formats("yyyy-MM-dd hh:mm:ss")
          : element.payTime;
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
  if (item.length != 0) {
    dialog.visible = true;
  } else if (item.length == 0) {
    that.$message.warning("请选择订单！");
  }
  // 请确认操作审核通过？审核通过后该订单状态变更为“已完成”，相关积分将自动“实返积分”发放到用户账号
};
//驳回订单
let rejectOrder = item => {};
let dialog = {
  visible: false,
  title: "审核通过？",
  resMark: 0,
  busEmit: CreatedBusOn
};

let rejectDialog = {
  visible: false,
  title: "审核驳回？",
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
              text: "订单列表",
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
                form: Form.RebateOrderButton,
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
                form: Form.RebateOrderListInfo,
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
                label: "待审核",
                name: "待审核"
              },
              {
                label: "已完成",
                name: "已完成"
              },
              {
                label: "审核驳回",
                name: "审核驳回"
              },
              {
                label: "已取消",
                name: "已取消"
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
              height: "calc(100% - 256px)"
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
