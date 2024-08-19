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


//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.batchtaskListTableData,
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
  
  if (type == "查询") {
    shopTable.pagination.pageIndex = 1;
    uiGetshopTableData();
  }
  
  
  if (type == "重置") {
  }
  
  
  
  
  if (type == "查看") {

  }
  
  if (type == "订单导出") {
    let a = document.createElement('a')
    a.href = `${Tool.URL}/tbms/b/orders/exports` // 这里的请求方式为get，如果需要认证，接口上需要带上token
    a.click()
  }
  
}

//获取商家列表
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
    pageIndex,
    pageSize,
    pageType
  } = shopListData.formData;
  Tool.axios(
    `tbms/b/orders?businessCode=${businessCode}&businessName=${businessName}&mediaType=${mediaType}&userName=${userName}&phone=${phone}&orderNo=${orderNo}&orderFlag=${orderStatus}&signUpTimeStart=${
      beginDate ? new Date(beginDate).getTime() : ""
    }&signUpTimeEnd=${
      endDate ? new Date(endDate).getTime() : ""
    }&status=${pageType}&dealCode=&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    "get",
    {},
    res => {
      res.data.data.data.forEach(element => {
        element.style =
          element.statusName == "取消"
            ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;"
            : "color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
        element.statusName == "取消" && (element.statusName = "已取消");
        element.statusName == "待审核" &&
          (element.style =
            "color: #fa8c16;background: #fff7e6;border-color: #ffd591;");
        element.orderImageUrl &&(element.orderImageUrl = Tool.URL + element.orderImageUrl);
        element.commentImageUrl &&(element.commentImageUrl = Tool.URL + element.commentImageUrl);
        element.amountImageUrl &&(element.amountImageUrl = Tool.URL + element.amountImageUrl);
        element.operation = [{name:'查看'}]
        if(element.statusName == "待提交" || element.statusName == "已驳回"){
          element.operation = [{name:'取消订单'},{name:'查看'}]
        }
        if(element.statusName == "待审核"){
          element.operation = [{name:'审核'},{name:'查看'}]
        }
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
let passOrder = item =>{
    console.log(item);
    if(item.length > 1){
        that.$confirm('请确认操作审核通过？审核通过后该订单状态变更为“已完成”，将自动发放积分到用户账号', '审核通过？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let parma = [];
            item.forEach(ele=>{
                parma.push(ele.id)
            });
            Tool.axios(
                `tbms/b/orders/examine`,
                "post",
                {ids:parma},
                res => {
                  uiGetshopTableData();
                },
                "2"
              );
          }).catch(() => {
                      
          });
    }else if(item.length == 0){
        that.$message.warning('请选择订单！')
    }else if(item.length == 1){
        dialog.visible = true;
    }
    // 请确认操作审核通过？审核通过后该订单状态变更为“已完成”，相关积分将自动“实返积分”发放到用户账号
}
//驳回订单
let rejectOrder = item =>{

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
              text: "任务列表-批量新增",
              style: textStyle
            }
          },
          
          {
            span: 24, // 宽度
            style: {
              height: "320px",
              overflow: "auto",
              padding: 0,
              fontSize: "14px",
              padding: "0 5px"
            },
            type: "batchOrderImport", // 类型
            data: {
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
};
