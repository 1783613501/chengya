import table from "../Table/table";
import Form from "../Form/index";
import { get } from "sortablejs";
const CreatedBusOn = "batchTaskBusOn";

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

let nowStatus = false;

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
let step = 1;
let markId = "";
//页面统一获取数据
function uiGetshopList(data, type) {
  console.log(data, type);

  if (type == "查询") {
    shopTable.pagination.pageIndex = 1;
    uiGetshopTableData();
  }

  if (type == "重置") {
    uiGetshopTableData();
    that.$refs.file.value = ""; 
    step = 1;
    shopTable.TableData.table_data = [];
    shopTable.TableData.parameter.vLoading = true;
    shopTable.TableData.parameter.vLoading = false;
    that.$message.success("重置成功")
  }

  if (type == "数据校验") {
    if(step != 2){
      that.$message.warning("请先上传文件！");
      return;
    }
    getImportData();
  }

  if (type == "开始导入") {
    if(step < 3){
      that.$message.warning("请完成上一步校验数据！");
      return;
    }
    if(step > 3){
      that.$message.success("导入已完成，请选择下载执行结果或者点击重置继续上传");
      return;
    }
    Tool.axios(
      `tbms/b/tasks/taskImport/${markId}`,
      "get",
      {},
      res => {
        if (res.data.code == 1) {
          that.$message.success("导入成功");
          step = 4
        } else {
          that.$message.error(res.data.msg);
        }
      },
      "2"
    );
  }
  if (type == "下载结果") {
    if(step != 4){
      that.$message.warning("请导入完毕后再下载结果！");
      return;
    }
    Tool.axios(
      `tbms/b/tasks/taskImport/${markId}`,
      "get",
      {},
      res => {
        if (res.data.code == 1) {
          if (type == "下载结果") {
            Tool.axios(
              `tbms/b/tasks/exportResult?path=${markId}`,
              "get",
              {},
              res => {
                // if(res.data.code == 1){
                const link = document.createElement("a");
                let blob = new Blob([res.data], {
                  type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
                }); //类型excel
                link.style.display = "none";
                link.href = URL.createObjectURL(blob);
                link.setAttribute("download", "导入结果");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                nowStatus = "导入结果下载完成";
                // }
              },
              "blob"
            );
          }
        }
      },
      "2"
    );
  }

  if (type == "下载导入模板") {
    Tool.axios(
      `tbms/b/base/template/task`,
      "post",
      {},
      res => {
        const link = document.createElement("a");
        let blob = new Blob([res.data], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        }); //类型excel
        link.style.display = "none";
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "task");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        nowStatus = "模板下载完成";
      },
      "blob"
    );
    // let a = document.createElement('a')
    // a.href = `${Tool.URL}/tbms/b/base/template/task` // 这里的请求方式为get，如果需要认证，接口上需要带上token
    // a.click();
  }
  if (type == "上传") {
    if(step != 1){
      that.$message.warning("请点击重置或者继续下一步骤！");
      return ;
    }
    // if(nowStatus != '模板下载完成'){
    //   that.$message.warning('请进行第1步操作！')
    // }else{
    getFile();
    // }
  }
  if (type == "刷新") {
    if(step == 1){
      that.$message.warning("请先上传文件！");
      return;
    }
    Tool.axios(
      `tbms/b/tasks/importPage`,
      "post",
      {
        pageIndex: 1,
        pageSize: 10,
        path: markId
      },
      res => {
        if (res.data.code != 1) {
          that.$message.error(res.data.msg);
          return;
        }
        shopTable.TableData.parameter.vLoading = true;
        console.log(res, "importPage");
        
        res.data.data.data.forEach(element => {
          element.favourableCommentDesc = element.favourableComment == 1 ? "是" : "否"
        });
        shopTable.TableData.table_data = res.data.data.data;
        shopTable.pagination.total = res.data.data.page.allItem;
        shopTable.TableData.parameter.vLoading = false;
      },
      "2"
    );
  }
  if (type == "解析文件") {
    console.log("解析文件")
    handleFileUpload(data);
  }
  if (type == "翻页") {
    shopTable.pagination.pageIndex = data;
    getImportData();
  }
  if (type == "SizeChange") {
    shopTable.pagination.size = data;
    getImportData();
  }
}
// 打开文件
let getFile = () => {
  console.log(that);
  that.$refs.file.click();
};
// 获取文件
let handleFileUpload = event => {
  // 阻止发生默认行为
  event.preventDefault();
  let formData = new FormData();
  let file = that.$refs.file.files[0];
  formData.append("file", file);
  // console.log(formData.get('file'))
  onUpload(formData);
};
// 上传文件
let onUpload = formData => {
  Tool.axios(
    `tbms/b/tasks/upload/${markId}`,
    "post",
    formData,
    res => {
      console.log(res, "upload");
      if (res.data.code != 1) {
        that.$message.error(res.data.msg);
        return;
      }
      that.$message.success("上传成功");
      step = 2;
      Tool.axios(
        `tbms/b/tasks/importPage`,
        "post",
        {
          pageIndex: 1,
          pageSize: 10,
          path: markId
        },
        res => {
          if (res.data.code != 1) {
            that.$message.error(res.data.msg);
            return;
          }
          shopTable.TableData.parameter.vLoading = true;
          console.log(res, "importPage");
          shopTable.TableData.table_data = res.data.data.data;
          shopTable.pagination.total = res.data.data.page.allItem;
          shopTable.TableData.parameter.vLoading = false;
        },
        "2"
      );
    },
    "formData"
  );
};

let getImportData = ()=>{
  Tool.axios(
    `tbms/b/tasks/dataCheck/${markId}`,
    "get",
    {},
    res => {
      if (res.data.code == 1) {
        that.$message.success("校验成功");
        Tool.axios(
          `tbms/b/tasks/importPage`,
          "post",
          {
            pageIndex: shopTable.pagination.pageIndex,
            pageSize: shopTable.pagination.size,
            path: markId
          },
          res => {
            if (res.data.code != 1) {
              that.$message.error(res.data.msg);
              return;
            }
            shopTable.TableData.parameter.vLoading = true;
            shopTable.TableData.table_data = [];
            shopTable.TableData.table_data = res.data.data.data;
            shopTable.pagination.total = res.data.data.page.allItem;
            shopTable.TableData.parameter.vLoading = false;
            step = 3;
          },
          "2"
        );
      }else{
        that.$message.error(res.data.msg)
      }
    },
    "2"
  );
}

//获取商家列表
let uiGetshopTableData = () => {
  Tool.axios(
    `tbms/b/base/getMarkId?`,
    "get",
    {},
    res => {
      markId = res.data.data;
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
              text: "任务列表-批量新增",
              style: textStyle
            }
          },

          {
            span: 24, // 宽度
            style: {
              height: "280px",
              overflow: "hidden",
              padding: 0,
              fontSize: "14px",
              padding: "0 5px"
            },
            type: "batchTaskImport", // 类型
            data: {
              busEmit: CreatedBusOn,
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
              height: "calc(100% - 260px)"
            },
            type: "col",
            data: [
              {
                span: 24,
                style: {
                  "margin-top": "5px",
                  height: "calc(100% - 65px)",
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
