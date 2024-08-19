import table from "../../Table/table";
import Form from "../../Form/index";
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
  form: Form.shopListInfo,
  formData: {
    businessCode: "",
    businessName: "",
    contactsUser: "",
    contactsPhone: "",
    cityName: "",
    status: -1
  },
  busEmit: CreatedBusOn
};
//新增按钮
let addbutton = {
  form: Form.shopListInfo,
  formData: {
  },
  busEmit: CreatedBusOn
};
//商家列表
let shopTable = {
  busEmit: CreatedBusOn,
  TableData: table.shopListTableData,
  pagination: {
    show: true,
    total: 1,
    size: 10,
    pageIndex:1,
    style:
      "text-align: center; position: absolute; width: 100%; bottom: 5px;right:0;display:flex;justify-content:flex-end"
  }
};

//页面统一获取数据
function uiGetshopList(data, type) {
  console.log(data, type);
  if (type == "查询") {
    shopTable.pagination.pageIndex = 1;
    shopListData.formData.pageIndex=1;
    uiGetshopTableData();
  }
  if (type == "重置") {
    shopListData.formData.businessCode = "",
    shopListData.formData.businessName = "",
    shopListData.formData.contactsUser = "",
    shopListData.formData.contactsPhone = "",
    shopListData.formData.cityName = "",
    shopListData.formData.status = -1
  }
  if (type == "翻页") {
    shopTable.pagination.pageIndex = data;
    uiGetshopTableData();
  }
  if (type == "SizeChange") {
    shopTable.pagination.size = data;
    uiGetshopTableData();
  }
  if(type == '编辑'){
    console.log(that.$store)
    getShopDetail(data,type);
  }
  if(type == '入驻审核'){
    console.log(that.$store)
    getShopDetail(data,type);
  }
  if(type == '新增商家'){
    that.$router.push({ path: '/edit/userEdit',query:{type}});
    that.$store.commit("SET_DETAIL",{
      businessCode: "",
      businessName: "",
      contactsUser: "",
      contactsPhone: "",
      saleUserName: "",
      saleUserCode: "",
      platformServiceFee:"",
      status: 1,
      businessDistrict: "",
      categoryId: "",
      storeCategoryId: "",
      categoryIds: [],
      storeCategoryIds: [],
      addressProvince: "",
      addressArea: "",
      addressCity: "",
      addressDetail: "",
      coordinate: "",
      deliveryDistance: "",
      elemeLink: "",
      meituanLink: "",
      elema: [],
      mtma: [],
      logo: [],
      searchKeywords: "",
      meituanUId: ""
    });
    sessionStorage.removeItem("SHOP_MANAGER_DETAIL","")
  }
  if(type == '查看'){
    getShopDetail(data,type);
  }
  if (type == "changeStatus") {
    // changeStatus(data);
  }
}


let changeStatus = (data)=>{
  if(data.status == '启用'){
    Tool.axios(`tbms/b/business/${data.id}/disable`,'post',{id:data.id},res=>{
      uiGetshopTableData();
    },'2')
  }
  if(data.status == '停用'){
    Tool.axios(`tbms/b/business/${data.id}/enable`,'post',{id:data.id},res=>{
      uiGetshopTableData();
    },'2')
  }
}

//获取商家列表
let uiGetshopTableData = () => {
  table.shopListTableData.parameter.vLoading = true;
  let {businessCode,businessName,contactsUser,contactsPhone,cityName,status} = shopListData.formData;
  let {total,size,pageIndex} = shopTable.pagination;
  shopTable.TableData.table_data = [];
  Tool.axios(`tbms/b/business/page?businessCode=${businessCode}&businessName=${businessName}&contactsUser=${contactsUser}&contactsPhone=${contactsPhone}&cityName=${cityName}&status=${status}&showSizeChanger=true&showQuickJumper=true&current=${pageIndex}&pageSize=${size}&total=${total}&pageIndex=${pageIndex}`,'get',{},res=>{
    console.log(res)
    res.data.data.data.forEach(element => {
      element.createTime = new Date(element.createTime).formats('yyyy-MM-dd hh:mm:ss');
      element.status = element.status == 1 ? '启用': element.status == 2 ? '待审核': element.status == 3 ? '审核驳回':'停用';
      element.style = (element.status =='停用'|| element.status =='审核驳回') ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;":"color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
      element.status =='待审核' && (element.style = "color: #fa8c16;background: #fff7e6;border-color: #ffd591;")
      element.operation = element.status =='待审核' ? [
        {name:'入驻审核'},
        {name:'查看'}
      ] : [
        {name:'编辑'},
        {name:'查看'}
      ];
      element.category.length>=1 && (element.typeCH = element.category[0].categoryName);
      element.category.length>1 && element.category.forEach((item,index)=>{
        index > 0 && (element.typeCH += (","+item.categoryName));
      })
    });
    shopTable.TableData.table_data = res.data.data.data;
    shopTable.pagination.total = res.data.data.page.allItem;
    table.shopListTableData.parameter.vLoading = false;
  })
};
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
    that.$store.dispatch('activeManager', res.data.data)
    that.$router.push({ path: '/edit/userEdit',query:{type}})
    sessionStorage.setItem('SHOP_MANAGER_DETAIL',JSON.stringify(res.data.data));
  });
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
              text: "商家列表",
              style: textStyle
            }
          },
          {
            span: 1,
            style: {
              position: "absolute",
              top: "3px",
              right: "50px"
            },
            type: "col",
            data: [
              {
                span: 24,
                style: {},
                type: "Form",
                form: Form.shopListButton,
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
                form: Form.shopListInfo,
                formData: shopListData.formData,
                data: shopListData
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "calc(100% - 190px)"
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
