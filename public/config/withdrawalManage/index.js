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
  form: Form.withdrawalListInfo,
  formData: {
    userName: "",
    submitTimeBegin:"",
    submitTimeEnd:"",
    cashNo:"",
    payStatus:"",
    phone:'',
    ticket:'',
    pageIndex: 1,
    pageSize: 10,
    pageType: ''
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
  TableData: table.withdrawalManageTableData,
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
let tabActiveName = {
  name:"全部"
}
let activeTaskList = [];
//页面统一获取数据
function uiGetshopList(data, type) {
  console.log(data, type);
  if (type == "Tab") {
    tabActiveName.name = data;
    // 0-全部,1.生效中,2.未开始3.已失效
    switch (data) {
      case "全部":
        shopListData.formData.pageType = "-1";
        break;
      case "待审核":
        shopListData.formData.pageType = 1;
        break;
      case "已驳回":
        shopListData.formData.pageType = 2;
        break;
      case "已完成":
        shopListData.formData.pageType = 3;
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
  if (type == "停止任务") {
    // uiGetshopTableData();
    if (activeTaskList.length == 0) {
      that.$message.warning("请选择停止任务！");
    } else {
      stopTsak(activeTaskList);
    }
  }
  if (type == "重置") {
    shopListData.formData.submitTimeBegin = "";
    shopListData.formData.submitTimeEndsubmitTimeEnd = "";
    shopListData.formData.cashNo = '';
    shopListData.formData.payStatus = "";
    shopListData.formData.phone = "";
    shopListData.formData.userName = "";
    shopListData.formData.ticket = ""
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
    if(activeTaskList.length == 0){
      that.$message.warning('请选择订单！')
    }else{
      rejectDialog.visible = true;
    };
  }
  if (type == "确认驳回") {
    that.$refs['orderRejectForm'].validate((valid) => {
      if (valid) {
          Tool.axios(
              `tbms/b/cashes/reject`,
              "post",
              {cashIds:[activeTaskList[0].id],remarks:data+''},
              res => {
                if(res.data.code == 0){
                  that.$message.error(res.data.msg);
                }else{
                  that.$message.success('操作成功');
                  rejectDialog.visible = false;
                  uiGetshopTableData();
                  chooseShop.num = 0;
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
  if (type == "重新支付") {
    console.log(activeTaskList);
    let bl = true;
    activeTaskList.forEach(item=>{
      console.log(item,'已完成' )
      if(item.statusName!='已完成' || item.payStatusName!='失败'){
        bl = false;
      }
    });
    if(!bl){
      that.$message.warning('请选择审核完成但支付失败的订单')
    }else{
      if(activeTaskList.length>0){
        that.$confirm('请确认重新支付!', '重新支付-审核', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let parma = [];
          activeTaskList.forEach(ele=>{
              parma.push(ele.cashNo)
          });
          Tool.axios(
              `tbms/b/cashes/re-pay`,
              "post",
              {cashNo:parma},
              res => {
                if(res.data.code == 0){
                  that.$message.warning(res.data.msg);
                }else{
                  that.$message.success('操作成功');
                  uiGetshopTableData();
                  chooseShop.num = 0;
                }
              },
              "2"
            );
        }).catch(() => {
        });
      }else{
        that.$message.warning('请先选择要操作的订单')
      }
    }
  }
}

//获取商家列表
let uiGetshopTableData = () => {
  shopTable.TableData.parameter.vLoading = true;
  let {
    submitTimeBegin,
    submitTimeEnd,
    cashNo,
    payStatus,
    phone,
    ticket,
    userName,
    pageIndex,
    pageSize,
    pageType
  } = shopListData.formData;
  Tool.axios(
    `tbms/b/cashes?userName=${userName}&cashNo=${cashNo}&phone=${phone}&payStatus=${payStatus}&submitTimeBegin=${submitTimeBegin}&submitTimeEnd=${submitTimeEnd}&ticket=${ticket}&status=${pageType}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
    "get",
    {},
    res => {
      res.data.data.data.forEach(item=>{

        item.style =
        item.statusName == "已驳回"
            ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;"
            : "color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
            item.statusName == "待审核" &&
          (item.style =
            "color: #fa8c16;background: #fff7e6;border-color: #ffd591;");


        item.createTime && (item.createTime = new Date(item.createTime).formats('yyyy-MM-dd hh:mm:ss'));
        item.payTime && (item.payTime = new Date(item.payTime).formats('yyyy-MM-dd hh:mm:ss'));

      })
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
let passOrder = item =>{
    console.log(item);
    if(item.length >= 1){
        that.$confirm('请确认操作审核通过？审核通过后将自动付款至用户微信零钱，用户积分将扣减，单据状态变更为“已完成”并不可继续操作', '审核通过？', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let parma = [];
            item.forEach(ele=>{
                parma.push(ele.id)
            });
            Tool.axios(
                `tbms/b/cashes/examine`,
                "post",
                {cashIds:parma},
                res => {
                  if(res.data.code == 0){
                    that.$message.warning(res.data.msg);
                  }else{
                    that.$message.success('操作成功');
                    uiGetshopTableData();
                    chooseShop.num = 0;
                  }
                },
                "2"
              );
          }).catch(() => {
                      
          });
    }else if(item.length == 0){
        that.$message.warning('请选择订单！')
    }
}

let dialog = {
    visible:false,
    title:'审核通过？',
    resMark:0,
    busEmit: CreatedBusOn
}

let rejectDialog = {
  visible:false,
  title:'审核驳回？',
  reason:'',
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
            span: 5,
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
                form: Form.withdrawalListButton,
                formData: shopListData.formData,
                data: shopListData
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "170px"
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
                form: Form.withdrawalListInfo,
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
                label: "已驳回",
                name: "已驳回"
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
  rejectDialog
};
