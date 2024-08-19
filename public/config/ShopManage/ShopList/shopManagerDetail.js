import table from "../../Table/table";
import store from '@/store'
import Form from "../../Form/index";
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


//查询表单
let staffListData = {
  form: Form.chooseStaffListInfo,
  formData: {
    code: "",
    name: ""
  },
  busEmit: CreatedBusOn
};

//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.taskListChooseShopTableData,
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

//员工列表
let staffTable = {
  busEmit: CreatedBusOn,
  TableData: table.taskListChooseStaffTableData,
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
//页面统一获取数据
function uiGetshopList(data, type) {
  console.log(data, type);
  if (type == "保存") {
    addOrChangeShopManger(data);
  }
  if (type == "审核驳回") {
    that.$confirm('是否确认驳回 ? 驳回后商家状态变更为“审核驳回”，不可继续做审核操作!', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      data.status = 3;
      addOrChangeShopManger(data,type)
    })
  }
  if (type == "审核通过") {
    that.$confirm('是否确认审核通过？通过就商家状态变更为“启用”，不可继续做审核操作！', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      data.status = 1;
      addOrChangeShopManger(data,type);
    })
  }
  if(type == '返回'){
    that.$router.push({ path: '/'});
  }
  if(type == 1){
    getAddressList(1,1);
    getAddressList(2,2,data.addressProvince);
    data.addressCity = '';
    data.addressArea = '';
  }
  if(type == 2){
    getAddressList(3,3,data.addressCity)
    data.addressArea = '';
  }
  if(type == 3){
  }
  if (type == "销售员") {
    dialogStaff.visible = true;
    uiGetStaffTableData();
  }
  if (type == "翻页") {
    staffTable.pagination.pageIndex = data;
    uiGetStaffTableData();
    activeList = [];
    chooseStaff.num = 0;
    console.log(that);
    that.$refs.chooseTable && that.$refs.chooseTable.clearSelection();
  }
  if (type == "SizeChange") {
    staffTable.pagination.size = data;
    uiGetStaffTableData();
    activeList = [];
    chooseStaff.num = 0;
    console.log(that);
    that.$refs.chooseTable && that.$refs.chooseTable.clearSelection();
  }
  if (type == "查询员工") {
    staffTable.pagination.pageIndex = 1;
    uiGetStaffTableData();
  }
  
  if (type == "重置员工") {
    staffListData.formData.code = "";
    staffListData.formData.name = "";
  }
  if (type == "取消") {
    dialogStaff.visible = false;
  }
  if (type == "确定") {
    console.log(activeList[0])
    if (activeList.length == 0 || activeList.length > 1) {
      that.$message.warning("请选择一条数据！");
    } else {
      dialogStaff.visible = false;
      
      console.log('设置员工')

      that.$store.commit("SET_SHOP_ONEOF", {
        saleUserName: activeList[0].name
      });
      that.$store.commit("SET_SHOP_ONEOF", {
        saleUserCode: activeList[0].code
      });
    }
    activeList = [];
    chooseStaff.num = 0;
  }
  if (type == "清空") {
    if(activeList.length == 0){
      return;
    }
    activeList = [];
    chooseStaff.num = 0;
    that.$refs.chooseTable.clearSelection();
  }
  if (type == "列表复选框") {
    chooseStaff.num = data.length;
    activeList = data;
  }
  if (type == "列表That") {
    that.$refs = { ...data.$refs, ...that.$refs };
    console.log(that.$refs);
  }
}
let activeList = [];

let dialogStaff = {
  title: "选择员工",
  visible: false
};

let shopDetailData = {
  form: Form.shopManagerDetail,
  formData: {},
  busEmit: CreatedBusOn
};
let uigetThis = function(data) {
  that = data;
};


let uiGetStaffTableData = () => {
  table.taskListChooseStaffTableData.parameter.vLoading = true;
  let { code, name } = staffListData.formData;
  let { size, pageIndex } = staffTable.pagination;
  staffTable.TableData.table_data = [];
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


let getAddressList = function(num , value,id){
  Tool.axios(`tbms/b/tbms-region/tree?levelNumber=${num}${id?('&regionId='+id):""}`,'get',{},res=>{
    Form.shopManagerDetail.forEach(element => {
      (element.value == value) && (element.options = res.data.data);
    })
    console.log(Form.shopManagerDetail)
  });
}

let getShopManagerTypeList = function(){
  Tool.axios(`tbms/b/category/page?pageIndex=1&pageSize=10000`,'get',{},res=>{
    Form.shopManagerDetail.forEach(element => {
      (element.value == '分类') && (element.options = res.data.data.data);
    })
    console.log('Form.shopManagerDetail',Form.shopManagerDetail)
  });
  Tool.axios(`tbms/b/storeCategory?pageIndex=1&pageSize=10000`,'get',{},res=>{
    Form.shopManagerDetail.forEach(element => {
      (element.value == '到店分类') && (element.options = res.data.data.data);
    })
    console.log('Form.shopManagerDetail',Form.shopManagerDetail)
  });
}
//获取商家详细信息
let getShopDetail = (detail,type) => {
  Tool.axios(`tbms/b/business/detail?businessId=${detail.id}`,'get',{},res=>{
    res.data.data.elema = res.data.data.elemePath ? [{name:res.data.data.elemeId,url:Tool.URL+res.data.data.elemePath}] :[];
    res.data.data.mtma = res.data.data.meituanPath ? [{name:res.data.data.meituanId,url:Tool.URL+res.data.data.meituanPath}]:[];
    res.data.data.logo = res.data.data.logoPath ? [{name:res.data.data.logoId,url:Tool.URL+res.data.data.logoPath}] :[];
    res.data.data.coordinate = res.data.data.latitude + "," + res.data.data.longitude;
    res.data.data.status == 3 && (res.data.data.status = res.data.data.statusMeaning);
    res.data.data.status == 2 && (res.data.data.status = res.data.data.statusMeaning);
    res.data.data.categoryIds = [];
    res.data.data.storeCategoryIds = [];
    res.data.data.category.forEach(category=>{
      res.data.data.categoryIds.push(category.id);
    });
    res.data.data.storeCategory.forEach(storeCategory=>{
      res.data.data.storeCategoryIds.push(storeCategory.id);
    });
    console.log(res.data,"res.data------");
    that.$store.dispatch('activeManager', res.data.data)
    sessionStorage.setItem('SHOP_MANAGER_DETAIL',JSON.stringify(res.data.data));
  });
}
let addOrChangeShopManger = function(data,type){
  data.longitude = data.coordinate.split(',')[1];
  data.latitude = data.coordinate.split(',')[0];
  data.status == "已拒绝" && (data.status = 3);
  data.status == "待审核" && (data.status = 2);
  console.log(data,"data---");
  data.categoryIds = data.categoryIds.join();
  data.storeCategoryIds = data.storeCategoryIds.join();
  Tool.axios(`tbms/b/business/add`,'post',data,res=>{
    if(res.data.code == 0){
      that.$message.warning(res.data.msg);
    }else{
      // that.$store.dispatch('activeManager', res.data.data);
      getShopDetail(res.data.data,type);
      that.$message.success('操作成功');
      that.$router.push({ path: '/shopManage/shopList'});
      // if(type){
      that.$store.dispatch('tagsView/delView', {path:"/edit/userEdit"});
      // }
    }
  },'2');
}

let chooseStaff = {
  num: 0,
  list: []
};
let closeTaskDialog = {
  form: Form.closeTaskDialogButton,
  formData: {
    businessName: "",
    staffName: ""
  },
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
              text: "编辑商家",
              style: textStyle
            }
          },
          
          {
            span: 24,
            style: {
              height: "calc(100% - 40px)",
              overflow:"auto"
            },
            type: "col",
            data: [
              {
                span: 24,
                style: {
                  padding: "20px 100PX 0 100px"
                },
                type: "Form",
                form: Form.shopManagerDetail,
                formData: shopDetailData.formData,
                data: shopDetailData
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
                    chooseStaff.num
                  } 项`,
                  busEmit: CreatedBusOn,
                  num: chooseStaff,
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
