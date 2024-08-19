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
  form: Form.taskListInfo,
  formData: {
    businessCode: "",
    businessName: "",
    mediaType: "-1",
    userName: "",
    phone: "",
    orderNo: "",
    orderStatus: "-1",
    beginDate: "",
    endDate: "",
    favourableComment:-1,
    pageIndex: 1,
    pageSize: 10,
    pageType: ''
  },
  busEmit: CreatedBusOn
};

//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.orderListTableData,
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
let activeTask = [];
let orderViewDialog = {
  visible:false,
  title:'订单查看',
  data:{},
  busEmit:CreatedBusOn
}

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
      case "待提交":
        shopListData.formData.pageType = 1;
        break;
      case "待审核":
        shopListData.formData.pageType = 2;
        break;
      case "已驳回":
        shopListData.formData.pageType = '-3';
        break;
      case "已取消":
        shopListData.formData.pageType = '-4';
        break;
      case "已完成":
        shopListData.formData.pageType = 5;
        break;
      default:
        break;
    };
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
  if (type == "取消订单") {
    console.log(data);
    that.$confirm('请确认取消该订单', '取消订单', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      Tool.axios(
        `tbms/b/orders/${data.id}/cancel`,
        "post",
        {id:data.id},
        res => {
          if(res.data.code == 0){
            that.$message.error(res.data.msg);
          }else{
            that.$message.success('操作成功');
            uiGetshopTableData();
          }
        },
        "2"
      );
    }).catch(() => {
               
    });
  }
  if (type == "重置") {
    shopListData.formData.businessCode = "";
    shopListData.formData.businessName = "";
    shopListData.formData.mediaType = '-1';
    shopListData.formData.beginDate = "";
    shopListData.formData.endDate = "";
    shopListData.formData.favourableComment = -1;
    shopListData.formData.userName = ""
    shopListData.formData.phone = "";
    shopListData.formData.orderStatus = "-1";
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
  if (type == "单个审核通过") {
    activeTask = [data];
    passOrder(activeTask);
  }
  if (type == "单个审核驳回") {
    activeTask = [data];
    rejectDialog.visible = true;
  }
  if (type == "审核驳回") {
    // rejectOrder(activeTaskList);
    if(activeTaskList.length == 0){
      that.$message.warning('请选择订单！')
    }else{
      rejectDialog.visible = true;
    };
  }
  if (type == "确认驳回") {
    let ids = [];
    if(orderViewDialog.visible){
      ids = [activeTask[0].id + ''];
    }else{
      activeTaskList.forEach(task => {
        ids.push(task.id + '');
      });
    };
    that.$refs['orderRejectForm'].validate((valid) => {
      if (valid) {
        Tool.axios(
          `tbms/b/orders/reject`,
          "post",
          { ids: ids, reason: data.reason + '' ,notify:data.notify?"Y":"N"},
          res => {
            if (res.data.code == 0) {
              that.$message.error(res.data.msg);
            } else {
              that.$message.success('操作成功');
              if(orderViewDialog.visible){
                orderViewDialog.visible = false;
                activeTask = [];
              }else{
                if (activeTaskList.length != 0) {
                  activeTaskList = [];
                  chooseShop.num = 0;
                  that.$refs.chooseTable.clearSelection();
                };
              };
              rejectDialog.visible = false;
              rejectDialog.reason = "";
              rejectDialog.notify = true;
              uiGetshopTableData();
            }
          },
          "2"
        );
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  if (type == "查看" || type == "审核") {
    if(data.id == orderViewDialog.data.id){
      orderViewDialog.title = type
      orderViewDialog.visible = true
      return;
    }
    Tool.axios(
      `tbms/b/orders/${data.id}`,
      "get",
      {},
      res => {
        if(res.data.code == 0){
          that.$message.error(res.data.msg);
        }else{
          console.log(res)
          orderViewDialog.data = data;
          orderViewDialog.data.riskRemarks = res.data.data.riskRemarks;
          orderViewDialog.data.taskPublishTimeString = res.data.data.taskPublishTime?new Date(res.data.data.taskPublishTime).formats("yyyy-MM-dd hh:mm:ss"):"";
          orderViewDialog.title = type
          orderViewDialog.visible = true
        }
      }
    );
    

  }
  if (type == "清空") {
    if(activeTaskList.length == 0){
      return;
    }
    activeTaskList = [];
    chooseShop.num = 0;
    that.$refs.chooseTable.clearSelection();
  }
  if (type == "列表That") {
    that.$refs = { ...data.$refs, ...that.$refs };
    console.log(that.$refs);
  }
  if (type == "批量审核") {
    that.$message("功能研发中")
  }
  if (type == "订单导出") {

    Tool.axios(
      `tbms/b/orders/exports`,
      "get",
      {},
      res => {
        // if(res.data.code == 1){
        const link = document.createElement("a");
        let blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        }); //类型excel
        console.log(res.data,blob.stream(),"blob----------")
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "订单列表-"+new Date().formats("yyyy-MM-dd"));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        nowStatus = "导入结果下载完成";
        // }
      },
      "blob"
    );
  }
  if (type == '确认审核') {
    let ids = [];
    if(orderViewDialog.visible){
      ids = [activeTask[0].id];
    }else{
      ids = [activeTaskList[0].id];
    };
    that.$refs['orderForm'].validate((valid) => {
      if (valid) {
        Tool.axios(
          `tbms/b/orders/examine`,
          "post",
          { ids, points: data, code: ids },
          res => {
            if (res.data.code == 0) {
              that.$message.error(res.data.msg);
            } else {
              if(orderViewDialog.visible){
                activeTask = [];
                orderViewDialog.visible = false;
              }else{
                if (activeTaskList.length != 0) {
                  activeTaskList = [];
                  chooseShop.num = 0;
                  that.$refs.chooseTable.clearSelection();
                };
              };
              that.$message.success('操作成功');
              uiGetshopTableData();
              dialog.visible = false;
              dialog.resMark = "";
            }
          },
          "2"
        );
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}

//获取订单列表
let uiGetshopTableData = () => {
  shopTable.TableData.parameter.vLoading = true;
  let {
    businessCode,
    businessName,
    mediaType,
    userName,
    phone,
    orderNo,
    orderStatus,
    beginDate,
    endDate,
    favourableComment,
    pageIndex,
    pageSize,
    pageType
  } = shopListData.formData;
  Tool.axios(
    `tbms/b/orders?businessCode=${businessCode}&businessName=${businessName}&mediaType=${mediaType}&userName=${userName}&phone=${phone}&orderNo=${orderNo}&orderFlag=${orderStatus}&signUpTimeStart=${
      beginDate ? new Date(beginDate).getTime() : ""
    }&signUpTimeEnd=${
      endDate ? new Date(endDate).getTime() : ""
    }&favourableComment=${
      favourableComment }&status=${pageType}&dealCode=&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    "get",
    {},
    res => {
      res.data.data.data.forEach(element => {
        element.style =
          (element.statusName == "取消" || element.status == "-3")
            ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;"
            : "color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
        element.statusName == "取消" && (element.statusName = "已取消");
        element.statusName == "待审核" &&
          (element.style =
            "color: #fa8c16;background: #fff7e6;border-color: #ffd591;");
        element.favourableCommentDesc = element.favourableComment == 1 ? "是" :element.favourableComment == 0 ? "否" : "";
        element.imgSrcList = [];
        if(element.orderImageUrl){
          element.orderImageUrl = Tool.URL + element.orderImageUrl;
          element.imgSrcList.push(element.orderImageUrl);
        };
        if(element.commentImageUrl){
          element.commentImageUrl = Tool.URL + element.commentImageUrl;
          element.imgSrcList.push(element.commentImageUrl);
        };
        if(element.amountImageUrl){
          element.amountImageUrl = Tool.URL + element.amountImageUrl;
          element.imgSrcList.push(element.amountImageUrl);
        };
        element.operation = [{name:'查看'}]
        if(element.status == "1" || element.status == "-3"){
          element.operation = [{name:'取消订单'},{name:'查看'}]
        }
        if(element.statusName == "待审核"){
          element.operation = [{name:'审核'},{name:'查看'}]
        };
        element.examineType = element.examineType == 1 ? "平台审核" : element.examineType == 2 ? "商家审核" : "";
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
  if (item.length > 1) {
    that.$confirm('请确认操作审核通过？审核通过后该订单状态变更为“已完成”，将自动发放积分到用户账号', '审核通过？', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      let parma = [];
      item.forEach(ele => {
        parma.push(ele.id+"")
      });
      Tool.axios(
        `tbms/b/orders/examine`,
        "post",
        { ids: parma },
        res => {
          if (res.data.msg == "操作成功") {
            if(orderViewDialog.visible){
              activeTask = [];
              orderViewDialog.visible = false;
            }else{
              if (activeTaskList.length != 0) {
                activeTaskList = [];
                chooseShop.num = 0;
                that.$refs.chooseTable.clearSelection();
              };
            };
            uiGetshopTableData();
            that.$message.success(res.data.msg);
          }else{
            that.$message.error(res.data.msg);
          };
        },
        "2"
      );
    }).catch(() => {

    });
  } else if (item.length == 0) {
    that.$message.warning('请选择订单！')
  } else if (item.length == 1) {
    dialog.visible = true;
    dialog.resMark = item[0].points;
    dialog.taskRuleReturn = item[0].taskRuleReturn;
  }
  // 请确认操作审核通过？审核通过后该订单状态变更为“已完成”，相关积分将自动“实返积分”发放到用户账号
}
//驳回订单
let rejectOrder = item =>{

}
let dialog = {
    visible:false,
    title:'审核通过？',
    resMark:0,
    taskRuleReturn:0,
    busEmit: CreatedBusOn
}

let rejectDialog = {
  visible: false,
  title: '审核驳回？',
  reason: '',
  notify:true,
  busEmit: CreatedBusOn
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
            span: 7,
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
                form: Form.orderListButton,
                formData: shopListData.formData,
                data: shopListData
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "190px"
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
                form: Form.orderListInfo,
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
                label: "待提交",
                name: "待提交"
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
                label: "已驳回",
                name: "已驳回"
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
              height: "calc(100% - 296px)"
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
  rejectDialog,
  orderViewDialog
};
