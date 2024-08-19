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
  form: Form.AreaGroupManageListInfo,
  formData: {
    adcode:"",
    adcodeName:"",
    status:"",
    pageIndex: 1,
    pageSize: 10,
    pageType: 0
  },
  busEmit: CreatedBusOn
};
//新增按钮
let addbutton = {
  form: Form.AreaGroupManageButton,
  formData: {},
  busEmit: CreatedBusOn
};
//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.AreaGroupManageTableData,
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
        shopListData.formData.pageType = -1;
        break;
      case "生效中":
        shopListData.formData.pageType = 1;
        break;
      case "已停止":
        shopListData.formData.pageType = 0;
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
  
  if (type == "重置") {
    shopListData.formData.adcode = "";
    shopListData.formData.adcodeName = "";
    shopListData.formData.status = "";
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
    that.$store.dispatch("activeAreagroupManager", data);
    that.$router.push({ path: "/edit/areaGroupEdit", query: { type } });
  }
  if (type == "新增") {
    that.$store.commit("SET_AREAGROUP_DETAIL", {
      adcode:"",
      adcodeName:"",
      groupName:"",
      qrcodeUrl:"",
      status:"",
    });
    that.$router.push({ path: "/edit/areaGroupEdit", query: { type } });
    sessionStorage.removeItem("AREAGROUP_DETAIL");
  }
  // if (type == "查看") {
  //   data.userName = data.salesPersonName;
  //   that.$store.dispatch("activeRebateManager", data);
  //   that.$router.push({ path: "/edit/areaGroupEdit", query: { type } });
  // }
  if (type == "删除") {
    this.$confirm('请确认删除该群二维码？删除后不可恢复', '删除群二维码', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      Tool.axios(
        `tbms/b/ads/${data.id}?`,
        "DELETE",
        {},
        res => {
          console.log(res)
          if(res.data.code == 1){
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            uiGetshopTableData();
          }
        })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
  }
}

//获取商家列表
let uiGetshopTableData = () => {
  table.AreaGroupManageTableData.parameter.vLoading = true;
  let {
    pageSize,
    pageIndex,
    adcode,
    adcodeName,
    status,
  } = shopListData.formData;
  shopTable.TableData.table_data = [];
  Tool.axios(
    `tbms/b/ads?pageSize=${pageSize}&pageIndex=${pageIndex}&adcode=${adcode}&adcodeName=${adcodeName}&status=${status}`,
    "get",
    {},
    res => {
      res.data.data.data.forEach(element => {
        element.createTime = new Date(
          element.createTime ? element.createTime : new Date()
        ).formats("yyyy-MM-dd hh:mm:ss");
        element.updateTime = new Date(
          element.updateTime ? element.updateTime : new Date()
        ).formats("yyyy-MM-dd hh:mm:ss");

        element.style =
          element.status == 0
            ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;"
            : "color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
            element.status =
            element.status == 0
              ? "已停用"
              : "已启用";
        element.qrcodeUrl = Tool.URL + element.qrcodeUrl;
        element.operation =  [{ name: "编辑" }, { name: "删除" }];
      });
      console.log(res.data.data.data,'群二维码1');
      shopTable.TableData.table_data = res.data.data.data;
      console.log(shopTable.TableData.table_data,'群二维码2');
      shopTable.pagination.total = res.data.data.page.allItem;
      table.AreaGroupManageTableData.parameter.vLoading = false;
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
              text: "群二维码列表",
              style: textStyle
            }
          },
          {
            span: 2,
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
                form: Form.AreaGroupManageButton,
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
                form: Form.AreaGroupManageListInfo,
                formData: shopListData.formData,
                data: shopListData
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "calc(100% - 140px)"
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
