import table from "../Table/table";
import store from "@/store";
import Form from "../Form/index";
const CreatedBusOn = "shopListEditBusOn";

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

//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.taskListChooseShopTableData,
  refTable: "chooseSetMealTable",
  pagination: {
    show: true,
    total: 1,
    size: 10,
    pageIndex: 1,
    style:
      "text-align: center; position: absolute; width: 100%; bottom: 5px;right:0;display:flex;justify-content:flex-end"
  }
};

//员工列表
let staffTable = {
  busEmit: CreatedBusOn,
  TableData: table.taskListChooseStaffTableData,
  refTable: "chooseSetMealTable",
  pagination: {
    show: true,
    total: 1,
    size: 10,
    pageIndex: 1,
    style:
      "text-align: center; position: absolute; width: 100%; bottom: 5px;right:0;display:flex;justify-content:flex-end"
  }
};

let dialogShop = {
  title: "选择商家",
  visible: false
};

let dialogStaff = {
  title: "选择员工",
  visible: false
};
//查询表单
let shopListData = {
  form: Form.chooseShopListInfo,
  formData: {
    businessCode: "",
    businessName: ""
  },
  busEmit: CreatedBusOn
};

//查询表单
let staffListData = {
  form: Form.chooseStaffListInfo,
  formData: {
    code: "",
    name: ""
  },
  busEmit: CreatedBusOn
};

let closeTaskDialog = {
  form: Form.closeTaskDialogButton,
  formData: {
    businessName: "",
    staffName: ""
  },
  busEmit: CreatedBusOn
};

let chooseShop = {
  num: 0,
  list: []
};
let chooseStaff = {
  num: 0,
  list: []
};

//页面统一获取数据
function uiGetshopList(data, type) {
  console.log(data, type);
  if (type == "保存") {
    if (that.$route.query.type == "查看") {
      that.$message.error("查看页面无法修改！");
      return;
    }
    addOrChangeSetMealManage(data);
  }
  if (type == "返回") {
    that.$router.push({ path: "/merchantPackage" });
  }
  if (type == "适用商家") {
    dialogShop.visible = true;
    uiGetshopTableData();
    console.log(dialogShop);
  }
  if (type == "销售员") {
    dialogStaff.visible = true;
    uiGetStaffTableData();
    console.log(dialogShop);
  }
  if (type == "翻页") {
    shopTable.pagination.pageIndex = data;
    uiGetshopTableData();
    activeList = [];
    chooseShop.num = 0;
    chooseStaff.num = 0;
    console.log(that);
    that.$refs.chooseSetMealTable.clearSelection();
  }
  if (type == "SizeChange") {
    shopTable.pagination.size = data;
    uiGetshopTableData();
    activeList = [];
    chooseShop.num = 0;
    chooseStaff.num = 0;
    console.log(that);
    that.$refs.chooseSetMealTable.clearSelection();
  }
  if (type == "查询商家") {
    shopTable.pagination.pageIndex = 1;
    uiGetshopTableData();
  }
  if (type == "查询员工") {
    staffTable.pagination.pageIndex = 1;
    uiGetStaffTableData();
  }
  if (type == "重置商家") {
    shopListData.formData.businessCode = "";
    shopListData.formData.businessName = "";
  }
  if (type == "重置员工") {
    staffListData.formData.code = "";
    staffListData.formData.name = "";
  }
  if (type == "取消") {
    dialogShop.visible = false;
    dialogStaff.visible = false;
  }
  if (type == "确定") {
    console.log(activeList);
    if (activeList[0].businessName && activeList[0].businessCode) {
      if (activeList.length == 0) {
        that.$message.warning("请选择一条数据！");
      } else if (activeList.length > 50) {
        that.$message.warning("请最多不超过50位商家！");
      } else {
        dialogShop.visible = false;
        let names = "";
        let codes = [];
        activeList.forEach((ele, inde) => {
          codes.push(ele.businessCode);
          if (inde > 0) {
            names = names + "," + ele.businessName;
            // codes += ','+ ele.businessCode;
          } else {
            names += ele.businessName;
            // codes += ele.businessCode;
          }
        });
        console.log(names, codes, "---------------");
        that.$store.commit("SET_SETMEAL_ONEOF", {
          businessName: names
        });
        that.$store.commit("SET_SETMEAL_ONEOF", {
          businessCodes: codes
        });
      }
    } else {
      dialogStaff.visible = false;
      that.$store.commit("SET_SETMEAL_ONEOF", {
        userName: activeList[0].name
      });
      that.$store.commit("SET_SETMEAL_ONEOF", {
        userId: activeList[0].id
      });
    }
    activeList = [];
    chooseShop.num = 0;
    chooseStaff.num = 0;
  }
  if (type == "清空") {
    if(activeTaskList.length == 0){
      return;
    }
    activeList = [];
    chooseShop.num = 0;
    chooseStaff.num = 0;
    console.log(that);
    that.$refs.chooseSetMealTable.clearSelection();
  }
  if (type == "列表复选框") {
    chooseShop.num = data.length;
    activeList = data;
    console.log(chooseShop.num);
  }
  if (type == "列表That") {
    that.$refs = { ...data.$refs, ...that.$refs };
    console.log(that.$refs);
  }
  if (type == "新增详情") {
    let detaillist = JSON.parse(
      JSON.stringify(that.$store.state.SetMealManage.detail.goodsDetailVOList)
    );
    let newDetail = {
      dishName: "",
      num: "",
      unit: "",
      price: "",
      editButton: false
    };
    detaillist.push(newDetail);
    that.$store.commit("SET_SETMEAL_ONEOF", {
      goodsDetailVOList: detaillist
    });
    console.log(that.$refs);
  }
}
let activeList = [];

//获取商家列表
let uiGetshopTableData = () => {
  table.taskListChooseShopTableData.parameter.vLoading = true;
  let { businessCode, businessName } = shopListData.formData;
  let { total, size, pageIndex } = shopTable.pagination;
  shopTable.TableData.table_data = [];
  Tool.axios(
    `tbms/b/business/page?businessCode=${businessCode}&businessName=${businessName}&showSizeChanger=true&showQuickJumper=true&current=${pageIndex}&pageSize=${size}&total=${total}&pageIndex=${pageIndex}`,
    "get",
    {},
    res => {
      shopTable.TableData.table_data = res.data.data.data;
      shopTable.pagination.total = res.data.data.page.allItem;
      table.taskListChooseShopTableData.parameter.vLoading = false;
    }
  );
};

let uiGetStaffTableData = () => {
  table.taskListChooseStaffTableData.parameter.vLoading = true;
  let { code, name } = staffListData.formData;
  let { size, pageIndex } = shopTable.pagination;
  shopTable.TableData.table_data = [];
  Tool.axios(
    `tbms/b/users?code=${code}&name=${name}&pageSize=${size}&pageIndex=${pageIndex}&status=1`,
    "get",
    {},
    res => {
      staffTable.TableData.table_data = res.data.data.data;
      staffTable.pagination.total = res.data.data.page.allItem;
      table.taskListChooseStaffTableData.parameter.vLoading = false;
    }
  );
};

let shopDetailData = {
  form: Form.taskManagerDetail,
  formData: {},
  busEmit: CreatedBusOn
};
let uigetThis = function(data) {
  that = data;
};

let getAddressList = function(num, value, id) {
  Tool.axios(
    `tbms/b/tbms-region/tree?levelNumber=${num}${id ? "&regionId=" + id : ""}`,
    "get",
    {},
    res => {
      Form.shopManagerDetail.forEach(element => {
        element.value == value && (element.options = res.data.data);
      });
      console.log(Form.shopManagerDetail);
    }
  );
};

let getShopManagerTypeList = function() {
  Tool.axios(`tbms/b/category/page`, "get", {}, res => {
    Form.shopManagerDetail.forEach(element => {
      element.value == "分类" && (element.options = res.data.data.data);
    });
    console.log("Form.shopManagerDetail", Form.shopManagerDetail);
  });
  Tool.axios(`tbms/b/storeCategory`, "get", {}, res => {
    Form.shopManagerDetail.forEach(element => {
      element.value == "到店分类" && (element.options = res.data.data.data);
    });
    console.log("Form.shopManagerDetail", Form.shopManagerDetail);
  });
};

let addOrChangeSetMealManage = function(data) {
  let parma = JSON.parse(JSON.stringify(data));
  parma.termValidityStartTime = new Date(parma.termValidityTime[0]).formats(
    "yyyy-MM-dd hh:mm:ss"
  );
  parma.termValidityEndTime = new Date(parma.termValidityTime[1]).formats(
    "yyyy-MM-dd hh:mm:ss"
  );
  parma.productInstructions = parma.productInstructionsId;
  Tool.axios(
    `tbms/b/packages${parma.packageId?'/'+parma.packageId : ""}`,
    "post",
    parma,
    res => {
      console.log(res);
      //   that.$store.dispatch("activeTaskManager", res.data.data);
      if (res.data.msg == "操作成功") {
        that.$message.success(res.data.msg);
        that.$router.push({ path: "/merchantPackage" });
      } else {
        that.$message.warning(res.data.msg);
      }
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
              text: "编辑套餐",
              style: textStyle
            }
          },
          {
            span: 24,
            style: {
              height: "calc(100% - 40px)",
              overflow: "auto"
            },
            type: "col",
            data: [
              {
                span: 24,
                style: {
                  height: "100%",
                  padding: "20px 100px 0 100px"
                },
                type: "Form",
                form: Form.setMealManagerDetail,
                formData: shopDetailData.formData,
                data: shopDetailData
              }
            ]
          },
          {
            span: 24,
            style: {},
            type: "textSearch",
            dialog: dialogShop,
            data: [
              {
                span: 24,
                style: {
                  height: "32px"
                },
                type: "col",
                data: [
                  {
                    span: 24,
                    style: {
                      height: "100%"
                    },
                    type: "Form",
                    form: shopListData.form,
                    formData: shopListData.formData,
                    data: shopListData
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
                  marginTop: "10px"
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
                    paddingLeft: "10px"
                  }
                }
              },
              {
                span: 24,
                style: {
                  height: "450px",
                  position: "relative"
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
              },
              {
                span: 24,
                style: {
                  height: "52px",
                  paddingTop: "5px",
                  borderTop: "1px solid #ccc"
                },
                type: "col",
                data: [
                  {
                    span: 24,
                    style: {
                      height: "100%"
                    },
                    type: "Form",
                    form: Form.closeTaskDialogButton,
                    formData: closeTaskDialog.formData,
                    data: closeTaskDialog
                  }
                ]
              }
            ]
          },
          {
            span: 24,
            style: {},
            type: "textSearch",
            dialog: dialogStaff,
            data: [
              {
                span: 24,
                style: {
                  height: "32px"
                },
                type: "col",
                data: [
                  {
                    span: 24,
                    style: {
                      height: "100%"
                    },
                    type: "Form",
                    form: staffListData.form,
                    formData: staffListData.formData,
                    data: staffListData
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
                  marginTop: "10px"
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
                    paddingLeft: "10px"
                  }
                }
              },
              {
                span: 24,
                style: {
                  height: "450px",
                  position: "relative"
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
                    data: staffTable
                  }
                ]
              },
              {
                span: 24,
                style: {
                  height: "52px",
                  paddingTop: "5px",
                  borderTop: "1px solid #ccc"
                },
                type: "col",
                data: [
                  {
                    span: 24,
                    style: {
                      height: "100%"
                    },
                    type: "Form",
                    form: Form.closeTaskDialogButton,
                    formData: closeTaskDialog.formData,
                    data: closeTaskDialog
                  }
                ]
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
  getAddressList,
  getShopManagerTypeList,
  shopDetailData
};
