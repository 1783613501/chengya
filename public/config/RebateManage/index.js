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
  form: Form.RebateManageListInfo,
  formData: {
    businessCode: "",
    businessName: "",
    mediaType: "",
    pageIndex: 1,
    pageSize: 10,
    pageType: -1
  },
  busEmit: CreatedBusOn
};
//新增按钮
let addbutton = {
  form: Form.RebateManageButton,
  formData: {},
  busEmit: CreatedBusOn
};
//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.rebateTableData,
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
    // 0-全部,1.生效中,2.未开始3.已失效
    
    tabActiveName.name = data;

    switch (data) {
      case "全部":
        shopListData.formData.pageType = -1;
        break;
      case "生效中":
        shopListData.formData.pageType = 1;
        break;
      case "已停止":
        shopListData.formData.pageType = 2;
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
  }
  if (type == "重启活动") {
    console.log(activeTaskList);
    if(activeTaskList.length==0){
      that.$message.warning('请选择要重启的活动！');
      return ;
    }else{
      let ids = activeTaskList[0].id;
      activeTaskList.forEach((item,ind)=>{
        if(ind>0){
          ids+=(','+item.id)
        }
      });
      Tool.axios(
        `tbms/b/rebates/enable`,
        "post",
        {
          ids,
        },
        res => {
          console.log(res);
          if(res.data.msg=='操作成功'){
            that.$message.success('重启成功');
          }else{
            that.$message.error(res.data.msg);
          };
          uiGetshopTableData();
        },
        '2')
    }
  }
  if (type == "停止活动") {
    console.log(activeTaskList);
    if(activeTaskList.length==0){
      that.$message.warning('请选择要停止的活动！');
      return ;
    }else{
      let ids = activeTaskList[0].id;
      activeTaskList.forEach((item,ind)=>{
        if(ind>0){
          ids+=(','+item.id)
        }
      });
      Tool.axios(
        `tbms/b/rebates/stop`,
        "post",
        {
          ids,
        },
        res => {
          console.log(res);
          if(res.data.msg=='操作成功'){
            that.$message.success('停止成功');
          }else{
            that.$message.error(res.data.msg);
          };
          uiGetshopTableData();
        },
        '2')
    }
  }
  
  if (type == "重置") {
    shopListData.formData.businessCode = "";
    shopListData.formData.businessName = "";
    shopListData.formData.mediaType = "";
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
    data.userName = data.salesPersonName;
    that.$store.dispatch("activeRebateManager", data);
    that.$router.push({ path: "/edit/rebateEdit", query: { type } });
  }
  if (type == "新增活动") {
    that.$store.commit("SET_REBATE_DETAIL", {
      userName:"",
      salesPersonId:null,
      businessName:"",
      businessId:"",
      rebate1Money:"",
      rebateMoney:"",
      business1Money:"",
      businessMoney:"",
      mediaType:"",
      comments:""
    });
    that.$router.push({ path: "/edit/rebateEdit", query: { type } });
    
    sessionStorage.removeItem("SETMEAL_MANAGER_DETAIL");
  }
  if (type == "查看") {
    data.userName = data.salesPersonName;
    that.$store.dispatch("activeRebateManager", data);
    that.$router.push({ path: "/edit/rebateEdit", query: { type } });
  }
}

//获取商家列表
let uiGetshopTableData = () => {
  table.rebateTableData.parameter.vLoading = true;
  let {
    pageSize,
    pageIndex,
    businessCode,
    businessName,
    mediaType,
    pageType
  } = shopListData.formData;
  shopTable.TableData.table_data = [];
  Tool.axios(
    `tbms/b/rebates/v2?pageSize=${pageSize}&pageIndex=${pageIndex}${businessCode?'&businessCode='+businessCode:""}${businessName?'&businessName='+businessName:''}${mediaType?'&mediaType='+mediaType:''}&status=${pageType}`,
    "get",
    {},
    res => {
      res.data.data.data.forEach(element => {
        element.createTime = new Date(
          element.createTime ? element.createTime : new Date()
        ).formats("yyyy-MM-dd hh:mm:ss");

        element.style =
          element.statusName == "已停止"
            ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;"
            : "color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";

        element.operation =  [{ name: "查看" }, { name: "编辑" }];
        element.mediaType = element.mediaType == 1 ? '美团' :element.mediaType == 2 ? '饿了么' : '不限渠道';
      });
      console.log(res.data.data.data);
      shopTable.TableData.table_data = res.data.data.data;
      console.log(shopTable.TableData.table_data);
      shopTable.pagination.total = res.data.data.page.allItem;
      table.rebateTableData.parameter.vLoading = false;
    },
    "D"
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
              text: "返利餐列表",
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
                form: Form.RebateManageButton,
                formData: shopListData.formData,
                data: shopListData
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "100px"
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
                form: Form.RebateManageListInfo,
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
                label: "生效中",
                name: "生效中"
              },
              {
                label: "已停止",
                name: "已停止"
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "calc(100% - 175px)"
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
  uigetThis
};
