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
let staffListData = {
  form: Form.staffListInfo,
  formData: {
    name: "",
    phone: "",
    status: -1,
    code: "",
    pageIndex: 1,
    pageSize: 10,
    pageType: ""
  },
  busEmit: CreatedBusOn
};

//商家列表
let staffTable = {
  busEmit: CreatedBusOn,
  TableData: table.staffTableData,
  refTable: "staffTable",
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
function uiGetstaffList(data, type) {
  if (type == "搜索") {
    staffTable.pagination.pageIndex=1;
    uiGetstaffTableData();
  }
  if (type == "重置") {
    staffListData.formData.name = "";
    staffListData.formData.phone = "";
    staffListData.formData.status = -1;
    staffListData.formData.code = "";
  }
  if (type == "翻页") {
    staffTable.pagination.pageIndex = data;
    staffListData.formData.pageIndex = data;
    uiGetstaffTableData();
  }
  if (type == "SizeChange") {
    staffListData.formData.pageSize = data;
    staffTable.pagination.size = data;
    uiGetstaffTableData();
  }
  if (type == "编辑") {
    data.pswd = "**********";
    dialog.formData = JSON.parse(JSON.stringify(data));
    dialog.form.forEach(item =>{
      if(item.prop == "code" || item.prop == "phone" || item.prop == "pswd"){
        item.disabled = true;
      }
    });
    // dialog.formData.pass = "*************";
    dialog.title = "编辑员工";
    dialog.visible = true;
    // dialog.state = data.status;
    // dialog.userId = data.id;
  }
  if (type == "新增") {
    dialog.title = "新增员工";
    dialog.form.forEach(item =>{
      item.disabled = false;
    });
    dialog.formData = {
      code:"",
      name:"",
      phone:"",
      email:"",
      sex:"",
      role:"",
      jobStatus:1,
      status:1,
      pswd:""
    };
    dialog.visible = true;
    that.$nextTick(()=>{
      that.$refs.editStaff.$refs.form.clearValidate();
    });
  }
  if (type == "返回") {
    dialog.visible = false;
  }
  if (type == "保存") {
    console.log(data);
    dialog.title == "新增员工" && addStaff(data);
    dialog.title == "编辑员工" && updateStaff(data);
    
  }
  if (type == "重置密码") {
    reloadPswd.formData.pswd = "";
    reloadPswd.formData.pswd1 = "";
    const validatePass = (rule, value, callback) => {
      console.log(value,reloadPswd);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== reloadPswd.formData.pswd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
    reloadPswd.form.forEach(item=>{
      if(item.prop == 'pswd1'){
        item.rules = [
          { 
            required: true, 
            message: '新密码不能为空',
          },
          { validator: validatePass, trigger: "blur" },
        ]
      }
    });
    console.log(reloadPswd);
    reloadPswd.formData.id = data.id;
    reloadPswd.formData.name = data.name;
    reloadPswd.formData.phone = data.phone;
    reloadPswdDialog.visible = true;
    that.$nextTick(()=>{
      that.$refs.reloadPswd.$refs.form.clearValidate();
    });
  };
  if (type == "取消重置") {
    reloadPswd.formData.pswd = "";
    reloadPswd.formData.pswd1 = "";
    reloadPswdDialog.visible = false;
  }
  if (type == "确认重置密码") {
    // debugger;
    resetPswd(data);
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
  if (type == "查询角色") {
    getRoleList();
  }
  if (type == "批量审核") {
    that.$message("功能研发中");
  }
  if (type == "确认审核") {
    that.$refs["orderForm"].validate(valid => {
      if (valid) {
        Tool.axios(
          `tbms/b/orders/examine`,
          "post",
          {
            ids: [activeTaskList[0].id + ""],
            points: data + "",
            code: activeTaskList[0].id + ""
          },
          res => {
            if (res.data.code == 0) {
              that.$message.error(res.data.msg);
            } else {
              that.$message.success("操作成功");
              uiGetstaffTableData();
              dialog.visible = false;
            }
          },
          "2"
        );
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
}

//获取员工列表
let uiGetstaffTableData = () => {
  staffTable.TableData.parameter.vLoading = true;
  let {
    name,
    phone,
    status,
    code
  } = staffListData.formData;
  let { pageIndex, size} = staffTable.pagination;
  Tool.axios(
    `tbms/b/v2/users?name=${name}&phone=${phone}&status=${
      status 
    }&code=${code}&pageIndex=${pageIndex}&pageSize=${size}`,
    "get",
    {},
    res => {
      // debugger;
      staffTable.TableData.parameter.vLoading = false;
      if(res.data && res.data.code == 1){
        res.data.data.data.forEach(element => {
          console.log(element, "element");
          element.operation = [{name:'编辑'},{name:'重置密码'}];
          element.roleDesc = element.roles.length >= 1 ? element.roles[0].roleName : "";
          element.role = element.roles.length >= 1 ? [element.roles[0].id] : [];
          element.roles.length >1 && element.roles.forEach((role,index) =>{
            index > 0 && (element.roleDesc += `，${role.roleName}`);
            index > 0 && (element.role.push(role.id));
          });
          element.sexDesc = element.sex == '1' ? "男":element.sex == '2' ? "女":"未知";
          element.statusDesc = element.status == '0' ? "停用":"启用";
          element.jobStatusDesc = element.jobStatus == '0' ? "离职":"在职";
          element.style = element.status == '0' ? "color: #f5222d;background: #fff1f0;border-color: #ffa39e;":"color: #52c41a;background:#f6ffed;border-color: #b7eb8f;";
  
        });
        staffTable.TableData.table_data = res.data.data.data;
        staffTable.pagination.total = res.data.data.page.allItem;
      }
    },
    "2"
  );
};

//新增员工
let addStaff = (data) => {
  let {name , code , sex , phone , email ,  pswd , role , status , jobStatus} = data;
  let newUser = {
    name , code , sex , phone , email ,  pswd , roleIds:role.join(",") , status , jobStatus 
  };
  Tool.axios(
    `tbms/b/v2/users`,
    "post",
    newUser,
    res => {
      if(res.data.code == 1){
        dialog.visible = false;
        uiGetstaffTableData();
        that.$message.success("操作成功！");
      }else{
        that.$message.error(res.data.msg);
      }
    },
    "2"
  );
};

//编辑员工
let updateStaff = (data) => {
  console.log(data);
  let {name , sex , email , role , status , jobStatus} = data;
  let updateUser = {
    name , sex , email , roleIds:role.join(",") , status , jobStatus 
  };
  // debugger;
  Tool.axios(
    `tbms/b/v2/users/${data.id}`,
    "post",
    updateUser,
    res => {
      if(res.data.code == 1){
        dialog.visible = false;
        uiGetstaffTableData();
        that.$message.success("操作成功！");
      }else{
        that.$message.error(res.data.msg);
      }
    },
    "2"
  );
};

//重置密码
let resetPswd = (data)=>{
  Tool.axios(
    `tbms/b/v2/users/${data.id}/pswd/force`,
    "post",
    {
      userId:data.id,
      pswd:data.pswd
    },
    res => {
      if(res.data.code == 1){
        reloadPswdDialog.visible = false;
        uiGetstaffTableData();
        that.$message.success("操作成功！");
      }else{
        that.$message.error(res.data.msg);
      }
    },
    "2"
  );
};

let getRoleList = () => {
  Tool.axios(
    `tbms/b/v2/users/roles?pageIndex=1&pageSize=99999`,
    "get",
    {},
    res => {
      if(res.data && res.data.code == 1){
        editStaff.form.forEach(item =>{
          item.prop == "role" && (item.options = res.data.data.data);
        });
      }
    },
    "2"
  );
};


let chooseShop = {
  num: 0,
  list: []
};
let editStaff ={
  form:Form.editStaff,
  formData:{
    code:"",
    name:"",
    phone:"",
    email:"",
    sex:"",
    role:"",
    jobStatus:1,
    status:1,
    pswd:""
  },
  busEmit: CreatedBusOn
};
let dialog = {
  visible: false,
  title: "新增用户",
  form:editStaff.form,
  formData:editStaff.formData,
  data:editStaff
};
let reloadPswd ={
  form:Form.reloadPswd,
  formData:{
    name:"",
    phone:"",
    pswd:"",
    pswd1:""
  },
  busEmit: CreatedBusOn
};
let reloadPswdDialog = {
  visible: false,
  title: "重置密码",
  form:reloadPswd.form,
  formData:reloadPswd.formData,
  data:reloadPswd
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
              text: "员工列表",
              style: textStyle
            }
          },
          {
            span: 24,
            style: {
              height: "120px"
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
                form: Form.staffListInfo,
                formData: staffListData.formData,
                data: staffListData
              }
            ]
          },
          {
            span: 24,
            style: {
              height: "calc(100% - 170px)"
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
          }
        ]
      }
    ]
  }
];

export default {
  config,
  CreatedBusOn,
  uiGetstaffList,
  uigetThis,
  dialog,
  reloadPswdDialog
};
