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
  form: Form.setMealListInfo,
  formData: {
    businessCode: "",
    businessName: "",
    packageName: "",
    packageCode: "",
    addressCityName: "",
    userName: "",
    pageIndex: 1,
    pageSize: 10,
    pageType: 0
  },
  busEmit: CreatedBusOn
};
//新增按钮
let addbutton = {
  form: Form.setMealListButton,
  formData: {},
  busEmit: CreatedBusOn
};
//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.setMealListTableData,
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
        shopListData.formData.pageType = 0;
        break;
      case "上架中":
        shopListData.formData.pageType = 1;
        break;
      case "已失效":
        shopListData.formData.pageType = 2;
        break;
      case "已下架":
        shopListData.formData.pageType = 3;
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
  if (type == "上架套餐") {
    console.log(activeTaskList);
    let parma = [];
    if(activeTaskList.length==0){
      that.$message.warning('请选择要上架的套餐！');
      return ;
    }else{
      activeTaskList.forEach(item=>{
        parma.push(item.packageId)
      });
      Tool.axios(
        `tbms/b/packages/on`,
        "post",
        {
          packageIds:parma,
          status:1
        },
        res => {
          console.log(res);
          if(res.data.msg=='操作成功'){
            that.$message.success('上架成功');
          }else{
            that.$message.error(res.data.msg);
          };
          uiGetshopTableData();
        },
        '2')
    }
  }
  if (type == "下架套餐") {
    console.log(activeTaskList);
    let parma = [];
    if(activeTaskList.length==0){
      that.$message.warning('请选择要上架的套餐！');
      return ;
    }else{
      activeTaskList.forEach(item=>{
        parma.push(item.packageId)
      });
      Tool.axios(
        `tbms/b/packages/down`,
        "post",
        {
          packageIds:parma,
          status:1
        },
        res => {
          console.log(res);
          if(res.data.msg=='操作成功'){
            that.$message.success('下架成功');
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
    shopListData.formData.packageName = "";
    shopListData.formData.packageCode = "";
    shopListData.formData.addressCityName = "";
    shopListData.formData.userName = "";
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
    that.$store.dispatch("activeSetMealManager", data);
    that.$router.push({ path: "/edit/setMealEdit", query: { type } });
  }
  if (type == "新增套餐") {
    
    that.$store.commit("SET_SETMEAL_DETAIL", {
      userName:"",
      userId:null,
      businessName:"",
      businessCodes:"",
      packageName:"",
      packageCode:"自动生成",
      onChannel:"全渠道",
      originalPrice:null,
      sellPrice:null,
      vipPrice:null,
      termValidityStartTime:"",
      termValidityEndTime:"",
      totalCount:null,
      status:null,
      purchaseInstructions:"",
      productInstructionsId:"",
      refundRequest:null,
      reservationRequest:null,
      amountOfPoints:null,
      goodsDetailVOList:[],
      productInstructions: [],
      productInstructionsList: [],
    });
    that.$router.push({ path: "/edit/setMealEdit", query: { type } });
    
    sessionStorage.removeItem("SETMEAL_MANAGER_DETAIL");
  }
  if (type == "查看") {
    that.$store.dispatch("activeSetMealManager", data);
    that.$router.push({ path: "/edit/setMealEdit", query: { type } });
  }
}

//获取商家列表
let uiGetshopTableData = () => {
  table.setMealListTableData.parameter.vLoading = true;
  let {
    pageSize,
    pageIndex,
    businessCode,
    businessName,
    packageName,
    packageCode,
    addressCityName,
    userName,
    pageType
  } = shopListData.formData;
  shopTable.TableData.table_data = [];
  Tool.axios(
    `tbms/b/packages?pageSize=${pageSize}&pageIndex=${pageIndex}&businessCode=${businessCode}&businessName=${businessName}&packageName=${packageName}&packageCode=${packageCode}&addressCityName=${addressCityName}&userName=${userName}&status=${pageType}`,
    "get",
    {},
    res => {
      res.data.data.data.forEach(element => {
        element.termValidityTime =
          new Date(element.termValidityStartTime).formats("yyyy-MM-dd") +
          "~" +
          new Date(element.termValidityEndTime).formats("yyyy-MM-dd");

        element.createTime = new Date(
          element.createTime ? element.createTime : new Date()
        ).formats("yyyy-MM-dd hh:mm:ss");
        element.businessCode = element.packageBusinessList[0].businessCode;
        element.businessName = element.packageBusinessList[0].businessName;
        element.amountOfPoints = "1:" + element.amountOfPoints;

        element.status == "1" && (element.status = "上架中");
        element.status == "2" && (element.status = "已失效");
        element.status == "3" && (element.status = "已下架");

        element.style =
          element.status == "已下架"
            ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;"
            : "color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
        element.status == "已失效" &&
          (element.style =
            "color: #fa8c16;background: #fff7e6;border-color: #ffd591;");

        element.operation = element.status != "已失效" ? [{ name: "查看" }, { name: "编辑" }]:[{ name: "查看" }];
      });
      console.log(res.data.data.data);
      shopTable.TableData.table_data = res.data.data.data;
      console.log(shopTable.TableData.table_data);
      shopTable.pagination.total = res.data.data.page.allItem;
      table.setMealListTableData.parameter.vLoading = false;
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
              text: "套餐列表",
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
                form: Form.setMealListButton,
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
                form: Form.setMealListInfo,
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
                label: "上架中",
                name: "上架中"
              },
              {
                label: "已下架",
                name: "已下架"
              },
              {
                label: "已失效",
                name: "已失效"
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "calc(100% - 225px)"
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
