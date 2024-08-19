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
    media: null,
    beginDate: "",
    endDate: "",
    publishSourceType:-1,
    favourableComment:-1,
    pageIndex: 1,
    pageSize: 10,
    pageType: 0
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
  TableData: table.taskListTableData,
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
    tabActiveName.name = data;
    // 0-全部,1.生效中,2.未开始3.已失效
    switch (data) {
      case "全部":
        shopListData.formData.pageType = 0;
        break;
      case "生效中":
        shopListData.formData.pageType = 1;
        break;
      case "未开始":
        shopListData.formData.pageType = 2;
        break;
      case "已失效":
        shopListData.formData.pageType = 3;
        break;
      default:
        break;
    };
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
  if (type == "停止任务") {
    // uiGetshopTableData();
    if(activeTaskList.length == 0){
        that.$message.warning('请选择停止任务！')
    }else{
        stopTsak(activeTaskList);
    }
  }
  if (type == "重置") {
      shopListData.formData.businessCode = "";
      shopListData.formData.businessName = "";
      shopListData.formData.media = null;
      shopListData.formData.beginDate = "";
      shopListData.formData.endDate = "";
      shopListData.formData.favourableComment = -1
      shopListData.formData.publishSourceType = -1
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
  if (type == "新增任务") {
    that.$router.push({ path: "/edit/taskEdit", query: { type } });
    that.$store.commit("SET_TASK_DETAIL", {
        beginDate: "",
        businessId: "",
        businessName: "",
        endDate: "",
        joinRuleType: "",
        mediaType: "",
        receivables: "",
        recommendedWords: "",
        signUpBeginDate: "",
        signUpEndDate: "",
        taskCode: "自动生成",
        taskDetailId: 1,
        taskRuleReturn: "",
        taskRuleUp: "",
        totalJoinQuota: "",
        userId: "",
        userName: "",
        taskDetail: [{name:1,url:Tool.URL+'img/other/taskDetail.jpg'}],
        taskDetailList: [{name:1,url:Tool.URL+'img/other/taskDetail.jpg'}],
      });
    sessionStorage.removeItem("TASK_MANAGER_DETAIL");
  }
  if(type == '批量新增') {
    that.$router.push('/edit/batchTaskImport')
  }
  if (type == "查看") {
    that.$store.dispatch("activeTaskManager", data);
    that.$router.push({ path: "/edit/taskEdit", query: { type } });
  }
}

//获取商家列表
let uiGetshopTableData = () => {
  table.taskListTableData.parameter.vLoading = true;
  let parma = Tool.CloneObj(shopListData.formData);
  parma.beginDate = new Date(parma.beginDate).getTime()==0?"":new Date(parma.beginDate).getTime();
  parma.endDate = new Date(parma.endDate).getTime()==0?"":new Date(parma.endDate).getTime();
  shopTable.TableData.table_data = [];
  Tool.axios(
    `tbms/b/tasks/page`,
    "post",
    parma,
    res => {
      res.data.data.data.forEach(element => {
        element.beginDate = new Date(element.beginDate).formats(
          "yyyy-MM-dd"
        );
        element.endDate = new Date(element.endDate).formats(
          "yyyy-MM-dd"
        );
        element.createTime = new Date(element.createTime).formats(
          "yyyy-MM-dd hh:mm:ss"
        );
        element.surplusJoinQuota =
          element.totalJoinQuota - 0 - element.finishedJoinQuota;
        element.joinManage =
          element.joinRuleType == 1
            ? "按天（每天更新名额）"
            : "按任务周期（任务固定名额）";
        element.timeRange =
          element.signUpBeginDate + "~" + element.signUpEndDate;
        element.taskRule = `满${element.taskRuleUp}元返${
          element.taskRuleReturn
        }积分`;
        element.mediaTypeDesc = element.media.mediaTypeDesc;
        element.style = element.status=='已失效'?"color: #f5222d;background: #fff1f0;border-color: #ffa39e;":"color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
        element.status=='未开始'&& (element.style = "color: #fa8c16;background: #fff7e6;border-color: #ffd591;");

        element.operation = [{ name: "查看" }];
        element.publishSourceType = element.publishSourceType === 1 ? "平台发布" : element.publishSourceType === 2 ? "商家发布" : "";
        element.favourableCommentDesc = element.favourableComment == 1 ? "是" : "否"
      });
      shopTable.TableData.table_data = res.data.data.data;
      shopTable.pagination.total = res.data.data.page.allItem;
      table.taskListTableData.parameter.vLoading = false;
    },
    "2"
  );
};

//停止任务
let stopTsak =(data)=>{
    console.log(data,'停止任务了')
    let parma = [];
    data.forEach(item=>{
        parma.push(item.taskCode+'')
    })
    console.log(parma)
    Tool.axios(
        `tbms/b/tasks/closure`,
        "post",
        parma,
        res => {
            uiGetshopTableData();
        },
        '2'
    )
}

let tabActiveName = {
  name:"全部"
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
              text: "任务列表",
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
                form: Form.taskListButton,
                formData: shopListData.formData,
                data: shopListData
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "140px"
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
                form: Form.taskListInfo,
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
                label: "未开始",
                name: "未开始"
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
              height: "calc(100% - 210px)"
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
