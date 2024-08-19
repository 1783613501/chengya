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
// toStoreOrderManageListInfo
// toStoreOrderManageListButton
let shopListData = {
  form: Form.toStoreOrderManageListInfo,
  formData: {
    businessCode: "",
    businessName: "",
    payTime: "",
    cUserName: "",
    cUserPhone: "",
    orderCode: "",
    mediaType: "",
    payChannel: "",
    usedTime: "",
    pageIndex: 1,
    pageSize: 10,
    pageType: 0
  },
  busEmit: CreatedBusOn
};

//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.toStoreOrderManageListTableData,
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
let activeRefundOrder = null;
//页面统一获取数据
function uiGetshopList(data, type) {
  console.log(data, type);
  if (type == "Tab") {
    // 1：待支付
    // 2：待使用
    // 3：已使用
    // 4：待退款
    // 5：已退款
    // 6：已过期
    // 7：已取消
    switch (data) {
      case "全部":
        shopListData.formData.pageType = "0";
        break;
      case "待支付":
        shopListData.formData.pageType = 1;
        break;
      case "待使用":
        shopListData.formData.pageType = 2;
        break;
      case "已完成":
        shopListData.formData.pageType = 3;
        break;
      case "待退款":
        shopListData.formData.pageType = 4;
        break;
      case "已退款":
        shopListData.formData.pageType = 5;
        break;
      case "已过期":
        shopListData.formData.pageType = 6;
        break;
      case "已取消":
        shopListData.formData.pageType = 7;
        break;
      default:
        break;
    }
    chooseShop.num = 0;
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
  if (type == "退款") {
    refundDialog.visible = true;
    activeRefundOrder = data;
  }
  if (type == "审核") {
    refundExamineDialog.visible = true;
    activeRefundOrder = data;
  }
  if (type == "确认退款") {
    that.$refs.refundForm.validate((valid) => {
      if(valid){
        // Tool.axios(
        //   `tbms/b/packages/orders/${activeRefundOrder.orderId}/refund`,
        //   "post",
        //   { 
        //     orderCode:activeRefundOrder.orderCode,
        //     userId:activeRefundOrder.userId,
        //     remarks: data + "" 
        //   },
        //   res => {
        //     console.log(res)
        //   },
        //   "2"
        // );
        refundDialog.visible = false;
        that.$message('功能研发中');
        activeRefundOrder = null;
      }else{
        return false;
      }
    })
  }
  if (type == "确认审核") {
    that.$refs.refundExamineForm.validate((valid) => {
      if(valid){
        // Tool.axios(
        //   `tbms/b/packages/orders/${activeRefundOrder.orderId}/refund`,
        //   "post",
        //   { 
        //     orderCode:activeRefundOrder.orderCode,
        //     userId:activeRefundOrder.userId,
        //     remarks: data + "" 
        //   },
        //   res => {
        //     console.log(res)
        //   },
        //   "2"
        // );
        refundExamineDialog.visible = false;
        that.$message('功能研发中');
        activeRefundOrder = null;
      }else{
        return false;
      }
    })
  }
  if (type == "重置") {
    shopListData.formData.businessCode = "";
    shopListData.formData.businessName = "";
    shopListData.formData.payTime = "";
    shopListData.formData.cUserName = "";
    shopListData.formData.cUserPhone = "";
    shopListData.formData.orderCode = "";
    shopListData.formData.mediaType = "";
    shopListData.formData.payChannel = "";
    shopListData.formData.usedTime = "";
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
  if (type == "订单导出") {
    let {
      businessCode,
      businessName,
      payTime,
      cUserName,
      cUserPhone,
      orderCode,
      mediaType,
      payChannel,
      usedTime,
      pageIndex,
      pageSize,
      pageType
    } = shopListData.formData;
    payTime = payTime ? new Date(payTime).getTime() : payTime;
    usedTime = usedTime ? new Date(usedTime).getTime() : usedTime;
    let a = document.createElement('a')
    a.href = `${Tool.URL}/tbms/b/packages/orders/export?businessCode=${businessCode}&businessName=${businessName}&payTime=${
      payTime}&cUserName=${cUserName}&cUserPhone=${
      cUserPhone
    }&orderCode=${orderCode}&mediaType=${
      mediaType
    }&payChannel=${payChannel}&usedTime=${
      usedTime
    }&status=${pageType}&pageIndex=${pageIndex}&pageSize=${pageSize}` // 这里的请求方式为get，如果需要认证，接口上需要带上token
    a.click()
  }
  if (type == "取消订单") {
    this.$confirm('请确认取消订单，取消后不可恢复', '取消订单？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      that.$message("功能研发中");
    }).catch(() => {
               
    });
  }
  
  if (type == "查看") {
    orderViewDialog.visible = true;
    let viewData = JSON.parse(JSON.stringify(data))
    viewData.businessNames = viewData.packageBusinessList[0].businessName
    viewData.packageBusinessList.forEach((item,ind)=>{
      if(ind>0){
        viewData.businessNames += (' , '+item.businessName);
      }
    });
    console.log(viewData)
    orderViewDialog.data = viewData;
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
  if (type == "批量导入") {
    that.$message("功能研发中")
  }
}

//获取商家列表
let uiGetshopTableData = () => {
  shopTable.TableData.parameter.vLoading = true;
  let {
    businessCode,
    businessName,
    payTime,
    cUserName,
    cUserPhone,
    orderCode,
    mediaType,
    payChannel,
    usedTime,
    pageIndex,
    pageSize,
    pageType
  } = shopListData.formData;
  payTime = payTime ? new Date(payTime).getTime() : payTime;
  usedTime = usedTime ? new Date(usedTime).getTime() : usedTime;

  Tool.axios(
    `tbms/b/packages/orders?${
      businessCode ? "businessCode=" + businessCode : ""
    }${businessName ? "&businessName=" + businessName : ""}${
      payTime ? "&payTime=" + payTime : ""
    }${cUserName ? "&cUserName=" + cUserName : ""}${
      cUserPhone ? "&cUserPhone=" + cUserPhone : ""
    }${orderCode ? "&orderCode=" + orderCode : ""}${
      mediaType ? "&mediaType=" + mediaType : ""
    }${payChannel ? "&payChannel=" + payChannel : ""}${
      usedTime ? "&usedTime=" + usedTime : ""
    }&status=${pageType}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    "get",
    {},
    res => {
      res.data.data.data.forEach(item => {
        if (
          item.statusName == "待退款" ||
          item.statusName == "已退款" ||
          item.statusName == "已取消" ||
          item.statusName == "已过期"
        ) {
          item.style =
            "color: #f5222d;background: #fff1f0;border-color: #ffa39e;";
        } else {
          item.style =
            "color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
        }
        item.createTime &&
          (item.createTime = new Date(item.createTime).formats(
            "yyyy-MM-dd hh:mm:ss"
          ));
        item.payTime &&
          (item.payTime = new Date(item.payTime).formats(
            "yyyy-MM-dd hh:mm:ss"
          ));
        item.usedTime &&
          (item.payTime = new Date(item.usedTime).formats(
            "yyyy-MM-dd hh:mm:ss"
          ));
        item.refundTime &&
          (item.refundTime = new Date(item.refundTime).formats(
            "yyyy-MM-dd hh:mm:ss"
          ));
        item.amountPointsProportion = "1 : " + item.amountPointsProportion;
        if (item.statusName == "待支付") {
          item.operation = [{ name: "取消订单" }, { name: "查看" }];
        }
        if (item.statusName == "待使用" || item.statusName == "已过期") {
          item.operation = [{ name: "退款" }, { name: "查看" }];
        }
        if (
          item.statusName == "已完成" ||
          item.statusName == "已退款" ||
          item.statusName == "已取消"
        ) {
          item.operation = [{ name: "查看" }];
        }
        if (item.statusName == "待退款") {
          item.operation = [{ name: "审核" }, { name: "查看" }];
        }
      });
      shopTable.TableData.table_data = res.data.data.data;
      shopTable.pagination.total = res.data.data.page.allItem;
      shopTable.TableData.parameter.vLoading = false;
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
  if (item.length >= 1) {
    that
      .$confirm(
        "请确认操作审核通过？审核通过后将自动付款至用户微信零钱，用户积分将扣减，单据状态变更为“已完成”并不可继续操作",
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
          `tbms/b/cashes/examine`,
          "post",
          { cashIds: parma },
          res => {
            if (res.data.code == 0) {
              that.$message.warning(res.data.msg);
            } else {
              that.$message.success("操作成功");
              uiGetshopTableData();
              chooseShop.num = 0;
            }
          },
          "2"
        );
      })
      .catch(() => {});
  } else if (item.length == 0) {
    that.$message.warning("请选择订单！");
  }
};

let refundDialog = {
  visible: false,
  title: "订单退款？",
  resMark: "",
  busEmit: CreatedBusOn
};

let refundExamineDialog = {
  visible: false,
  title: "退款审核",
  isExamine:1,
  refundExamineMark: "",
  busEmit: CreatedBusOn
};

let orderViewDialog = {
  visible: false,
  title: "订单查看",
  data:{},
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
                form: Form.toStoreOrderManageListButton,
                formData: shopListData.formData,
                data: shopListData
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "200px"
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
                form: Form.toStoreOrderManageListInfo,
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
            data: [
              {
                label: "全部",
                name: "全部"
              },
              {
                label: "待支付",
                name: "待支付"
              },
              {
                label: "待使用",
                name: "待使用"
              },
              {
                label: "已完成",
                name: "已完成"
              },
              {
                label: "待退款",
                name: "待退款"
              },
              {
                label: "已退款",
                name: "已退款"
              },
              {
                label: "已取消",
                name: "已取消"
              },
              {
                label: "已过期",
                name: "已过期"
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
              height: "calc(100% - 305px)"
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
  refundDialog,
  refundExamineDialog,
  orderViewDialog
};
