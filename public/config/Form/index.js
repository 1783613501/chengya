import { validatePhoneTwo } from "@/utils/validate";


// 商家列表管理表单
let shopListInfo = [
  {
    value: "商家编码", // 值
    prop: "businessCode",
    label: "商家编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家编码"
  },
  {
    value: "商家名称", // 值
    prop: "businessName",
    label: "商家名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称"
  },
  {
    value: "联系人", // 值
    prop: "contactsUser",
    label: "联系人:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入联系人"
  },
  {
    value: "联系电话", // 值
    prop: "contactsPhone",
    label: "联系电话:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入联系电话"
  },
  {
    value: "城市", // 值
    prop: "cityName",
    label: "城市:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入城市"
  },
  {
    value: "", // 值
    prop: "status",
    label: "状态:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: -1
      },
      {
        label: "启用",
        value: 1
      },
      {
        label: "停用",
        value: 0
      },
      {
        label: "待审核",
        value: 2
      },
      {
        label: "审核驳回",
        value: 3
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px"
  }
];
let shopListButton = [
  {
    value: "新增商家", // 值
    label: "新增商家", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  }
];
//商家信息
let shopManagerDetail = [
  {
    value: "商家编码", // 值
    rules:[
      { 
        required: true, 
        message: '商家编码不能为空',
      },
      { 
        pattern: /^[\da-zA-Z]+$/, 
        message: '商家编码由大小写字母或数字构成,请勿输入特殊字符！',
        trigger:'blur'
      },
      { 
        pattern: /^.{0,50}$/, 
        message: '商家编码长度不得超过50个字符！',
        trigger:'blur'
      }
    ],
    prop: "businessCode",
    label: "商家编码:", // 名称
    labelWidth:'150px',
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家编码",
    style:"margin-bottom:10px"
  },
  {
    value: "商家名称", // 值
    required: true,
    rules:[
      { 
        required: true, 
        message: '商家名称不能为空',
      }
    ],
    prop: "businessName",
    labelWidth:'150px',
    label: "商家名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称",
    style:"margin-bottom:10px"
  },
  {
    value: "联系人", // 值
    rules:[
      { 
        required: true, 
        message: '联系人不能为空',
      }
    ],
    prop: "contactsUser",
    label: "联系人:", // 名称
    labelWidth:'150px',
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入联系人",
    style:"margin-bottom:10px"
  },
  {
    value: "联系电话", // 值
    rules:[
      { 
        required: true, 
        message: '联系电话不能为空',
      },{
        validator: validatePhoneTwo, 
        trigger:'blur'
      }
    ],
    prop: "contactsPhone",
    label: "联系电话:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    labelWidth:'150px',
    disabled: false, // 是否禁用
    placeholder: "请输入联系电话",
    style:"margin-bottom:10px"
  },
  {
    value: "销售员", // 值
    required: true,
    rules:[
      { 
        required: true, 
        message: '销售员不能为空',
      }
    ],
    prop: "saleUserName",
    label: "销售员:", // 名称
    type: "textSearch", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    labelWidth:'150px',
    readonly: true, // 是否只读
    disabled: true, // 是否禁用
    placeholder: "请输入销售员",
    style:"margin-bottom:10px"
  },
  {
    value: "每单平台服务费", // 值
    rules:[
      { 
        required: true, 
        message: '每单平台服务费不能为空',
      },
      { 
        pattern: /^(?:[0-9]|[12]\d)\d*$/, 
        message: '请输入输入大于等于0的整数',
        trigger:'blur'
      }
    ],
    prop: "platformServiceFee",
    label: "每单平台服务费:", // 名称
    labelWidth:'150px',
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入每单平台服务费",
    style:"margin-bottom:10px"
  },
  {
    value: "分类", // 值
    rules:[
      { 
        required: true, 
        message: '分类不能为空',
      }
    ],
    prop: "categoryIds",
    label: "分类:", // 名称
    type: "select", // 类型
    multiple:"multiple",
    options: [],
    optionLabel:'categoryName',
    optionValue:'id',
    labelWidth:'150px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择分类",
    style:"margin-bottom:10px"
  },
  {
    value: "商圈", // 值
    prop: "businessDistrict",
    label: "商圈:", // 名称
    type: "text", // 类型
    labelWidth:'150px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商圈",
    style:"margin-bottom:10px"
  },
  {
    value: "状态", // 值
    rules:[
      { 
        required: true, 
        message: '状态不能为空',
      }
    ],
    prop: "status",
    label: "状态:", // 名称
    type: "select", // 类型
    options: [{
        label: "启用",
        value: 1
      },
      {
        label: "停用",
        value: 0
      }
    ],
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    labelWidth:'150px',
    placeholder: "请选择状态",
    style:"margin-bottom:10px;"
  },
  {
    value: "到店分类", // 值
    rules:[
      { 
        required: true, 
        message: '到店分类不能为空',
      }
    ],
    prop: "storeCategoryIds",
    label: "到店分类:", // 名称
    type: "select", // 类型
    multiple:"multiple",
    options: [],
    optionLabel:'categoryName',
    optionValue:'id',
    clearable: false, // 是否可清除
    labelWidth:'150px',
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择到店分类",
    style:"margin-bottom:10px"
  },
  {
    value: "1", // 值
    prop: "addressProvince",
    rules:[
      { 
        required: true, 
        message: '省不能为空',
      }
    ],
    label: "商家地址 省:", // 名称
    type: "select", // 类型
    options: [],
    optionLabel:'regionName',
    optionValue:'regionId',
    clearable: false, // 是否可清除
    labelWidth:'150px',
    span: 7, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择省份",
    style:"margin-bottom:10px"
  },
  {
    value: "2", // 值
    prop: "addressCity",
    rules:[
      { 
        required: true, 
        message: '市不能为空',
      }
    ],
    label: "市:", // 名称
    labelWidth:'45px',
    type: "select", // 类型
    options: [],
    optionLabel:'regionName',
    optionValue:'regionId',
    clearable: false, // 是否可清除
    span: 4, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择市",
    style:"margin-bottom:10px"
  },
  {
    value: "3", // 值
    prop: "addressArea",
    rules:[
      { 
        required: true, 
        message: '区县不能为空',
      }
    ],
    label: "区县:", // 名称
    labelWidth:'65px',
    type: "select", // 类型
    options: [],
    optionLabel:'regionName',
    optionValue:'regionId',
    clearable: false, // 是否可清除
    span: 5, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择区县",
    style:"margin-bottom:10px"
  },
  {
    value: "城市", // 值
    prop: "addressDetail",
    label: "", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入地址",
    style:"margin-bottom:10px"
  },
  {
    value: "商家坐标:", // 值
    rules:[
      { 
        required: true, 
        message: '商家坐标不能为空',
      }
    ],
    prop: "coordinate",
    label: "商家坐标:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    labelWidth:'150px',
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家坐标"
  },
  {
    value: "配送半径（公里）:", // 值
    rules:[
      { 
        required: true, 
        message: '配送半径不能为空',
      }
    ],
    prop: "deliveryDistance",
    label: "配送半径（公里）:", // 名称
    type: "text", // 类型
    labelWidth:'150px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入配送半径（公里）"
  },
  {
    value: "去腾讯地图拾取", // 值
    prop: "去腾讯地图拾取",
    style:"padding-left:150px",
    labelWidth:'250px',
    type: "notForm", // 类型
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "饿了么商家URL", // 值
    prop: "elemeLink",
    label: "饿了么商家URL:", // 名称
    labelWidth:'150px',
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入饿了么商家URL",
    style:"margin-bottom:10px"
  },
  {
    value: "美团外卖商家URL:", // 值
    prop: "meituanLink",
    label: "美团外卖商家URL", // 名称
    labelWidth:'150px',
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "美团外卖商家URL",
    style:"margin-bottom:10px"
  },
  {
    value: "eleme", // 值
    prop: "elema",
    label: "饿了么商家码:", // 名称
    labelWidth:'150px',
    type: "upload", // 类型
    delable:false,
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用,
  },
  {
    value: "meituan", // 值
    prop: "mtma",
    label: "美团外卖商家码:", // 名称
    labelWidth:'150px',
    delable:false,
    type: "upload", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用,
  },
  {
    value: "logo", // 值
    prop: "logo",
    label: "商家LOGO:", // 名称
    rules:[
      { 
        required: true, 
        message: '商家LOGO不能为空',
      }
    ],
    delable:false,
    labelWidth:'150px',
    type: "upload", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用,
  },
  {
    value: "搜索关键词:", // 值
    prop: "searchKeywords",
    label: "搜索关键词:", // 名称
    rules:[
      { 
        required: true, 
        message: '搜索关键词不能为空',
      }
    ],
    type: "text", // 类型
    labelWidth:'150px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入搜索关键词",
    style:"margin-bottom:10px"
  },
  {
    value: "美团商家ID:", // 值
    prop: "meituanUId",
    label: "美团商家ID:", // 名称
    type: "text", // 类型
    labelWidth:'150px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入美团商家ID"
  },
  {
    value: "返回", // 值
    label: "返回", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'margin-right: 60px; position: absolute;top: 4px;right: 40px;'
  },
  {
    value: "审核驳回", // 值
    type: "button", // 类型
    label: "审核驳回", // 值
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'position: absolute;top: 4px;right: 140px;display:none'
  },
  {
    value: "审核通过", // 值
    type: "button", // 类型
    label: "审核通过", // 值
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'position: absolute;top: 4px;right: 230px;display:none'
  },
  {
    value: "保存", // 值
    type: "button", // 类型
    label: "保存", // 值
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'position: absolute;top: 4px;right: 30px;'
  }
];

//外卖分类
let outShopForm = [
  {
    label: "<i class='el-icon-plus'> 新增分类</i>", // 值
    value: "<i class='el-icon-plus'> 新增分类</i>", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    label: "<i class='el-icon-delete'> 删除分类</i>", // 值
    value: "<i class='el-icon-delete'> 删除分类</i>", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    label: "<i class='el-icon-edit'> 修改分类</i>", // 值
    value: "<i class='el-icon-edit'> 修改分类</i>", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  }
];


// 任务管理表单
let taskListInfo = [
  {
    value: "商家编码", // 值
    labelWidth:'120px',
    prop: "businessCode",
    label: "商家编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家编码"
  },
  {
    value: "商家名称", // 值
    prop: "businessName",
    label: "商家名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称"
  },
  {
    value: "", // 值
    prop: "media",
    label: "任务渠道:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: null
      },
      {
        label: "美团外卖",
        value: '1'
      },
      {
        label: "饿了么",
        value: '2'
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "任务开始时间", // 值
    prop: "beginDate",
    label: "任务开始时间:", // 名称
    type: "datetime", // 类型
    labelWidth:'120px',
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称"
  },
  {
    value: "任务结束时间", // 值
    prop: "endDate",
    label: "任务结束时间:", // 名称
    labelWidth:'120px',
    type: "datetime", // 类型
    size:"small",
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称"
  },
  {
    value: "", // 值
    prop: "publishSourceType",
    label: "发布来源:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: -1
      },
      {
        label: "平台发布",
        value: 1
      },
      {
        label: "商家发布",
        value: 2
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "是否需要好评", // 值
    prop: "favourableComment",
    label: "是否需要好评:", // 名称
    type: "select", // 类型
    options: [
      {
        label:'全部',
        value:-1
      },
      {
        label:'是',
        value: 1
      },
      {
        label:'否',
        value: 0
      }
    ],
    clearable: false, // 是否可清除
    labelWidth:'120px',
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择是否需要好评",
    style:"margin-bottom:10px"
  },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px"
  }
];
let taskListButton = [
  {
    value: "停止任务", // 值
    label: "停止任务", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "新增任务", // 值
    label: "新增任务", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "批量新增", // 值
    label: "批量新增", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  }
];

//任务信息
let taskManagerDetail = [
  {
    value: "任务编码", // 值
    rules:[
      { 
        required: true, 
        message: '任务编码不能为空',
      }
    ],
    prop: "taskCode",
    label: "任务编码:", // 名称
    labelWidth:'180px',
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: true, // 是否只读
    disabled: true, // 是否禁用
    placeholder: "请输入任务编码",
    // style:"margin-bottom:10px"
  },
  {
    value: "销售员", // 值
    required: true,
    rules:[
      { 
        required: true, 
        message: '销售员不能为空',
      }
    ],
    prop: "userName",
    labelWidth:'180px',
    label: "销售员:", // 名称
    type: "textSearch", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: true, // 是否只读
    disabled: true, // 是否禁用
    placeholder: "请输入销售员",
    style:"margin-bottom:10px"
  },
  {
    value: "商家", // 值
    rules:[
      { 
        required: true, 
        message: '商家不能为空',
      }
    ],
    prop: "businessName",
    label: "商家:", // 名称
    labelWidth:'180px',
    type: "textSearch", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: true, // 是否只读
    disabled: true, // 是否禁用
    placeholder: "请输入商家",
    style:"margin-bottom:10px"
  },
  {
    value: "任务渠道", // 值
    rules:[
      { 
        required: true, 
        message: '任务渠道不能为空',
      }
    ],
    prop: "mediaType",
    label: "任务渠道:", // 名称
    type: "select", // 类型
    options: [
      {
        label:'美团外卖',
        value:1
      },
      {
        label:'饿了么',
        value:2
      },
    ],
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择任务渠道",
    style:"margin-bottom:10px"
  },
  {
    value: "任务规则（实付满）", // 值
    prop: "taskRuleUp",
    rules:[
      { 
        required: true, 
        message: '任务规则（实付满）不能为空',
      },
      { 
        pattern: /^[1-9][0-9]*$/, 
        message: '请输入正确的金额！',
        trigger:'blur'
      }
    ],
    label: "任务规则（实付满）:", // 名称
    type: "text", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入任务规则（实付满）",
    style:"margin-bottom:10px"
  },
  {
    value: "任务规则（返）", // 值
    prop: "taskRuleReturn",
    rules:[
      { 
        required: true, 
        message: '任务规则（返）不能为空',
      },
      { 
        pattern: /^[1-9][0-9]*$/, 
        message: '请输入正确的金额！',
        trigger:'blur'
      }
    ],
    label: "任务规则（返）:", // 名称
    type: "text", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入任务规则（返）",
    style:"margin-bottom:10px"
  },
  {
    value: "任务开始日期", // 值
    rules:[
      { 
        required: true, 
        message: '任务开始日期不能为空',
      }
    ],
    prop: "beginDate",
    label: "任务开始日期:", // 名称
    type: "date", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    labelWidth:'180px',
    placeholder: "请选择任务开始日期",
    style:"margin-bottom:10px"
  },
  {
    value: "任务结束日期", // 值
    rules:[
      { 
        required: true, 
        message: '任务结束日期不能为空',
      }
    ],
    prop: "endDate",
    label: "任务结束日期:", // 名称
    type: "date", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    labelWidth:'180px',
    placeholder: "请选择任务结束日期",
    style:"margin-bottom:10px"
  },
  {
    value: "报名开始时间点", // 值
    rules:[
      { 
        required: true, 
        message: '报名开始时间点不能为空',
      }
    ],
    prop: "signUpBeginDate",
    format: "HH:mm",
    valueFormat: "HH:mm",
    label: "报名开始时间点:", // 名称
    type: "time", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    labelWidth:'180px',
    placeholder: "请选择报名开始时间点",
    style:"margin-bottom:10px"
  },
  {
    value: "报名结束时间点", // 值
    rules:[
      { 
        required: true, 
        message: '报名结束时间点不能为空',
      }
    ],
    prop: "signUpEndDate",
    format: "HH:mm",
    valueFormat: "HH:mm",
    label: "报名结束时间点:", // 名称
    type: "time", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    labelWidth:'180px',
    placeholder: "请选择报名结束时间点",
    style:"margin-bottom:10px"
  },
  {
    value: "名额控制方式", // 值
    rules:[
      { 
        required: true, 
        message: '名额控制方式不能为空',
      }
    ],
    prop: "joinRuleType",
    label: "名额控制方式:", // 名称
    type: "select", // 类型
    options: [
      {
        label:'按天（每天更新名额）',
        value:'1'
      },
      {
        label:'按任务周期（任务固定名额）',
        value:'2'
      }
    ],
    clearable: false, // 是否可清除
    labelWidth:'180px',
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择名额控制方式",
    style:"margin-bottom:10px"
  },
  {
    value: "名额", // 值
    required: true,
    rules:[
      { 
        required: true, 
        message: '名额不能为空',
      },
      { 
        pattern: /^[1-9][0-9]*$/, 
        message: '请输入正确的名额！',
        trigger:'blur'
      }
    ],
    prop: "totalJoinQuota",
    labelWidth:'180px',
    label: "名额:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入名额",
    style:"margin-bottom:10px"
  },
  {
    value: "推荐文案:", // 值
    prop: "recommendedWords",
    // rules:[
    //   { 
    //     required: true, 
    //     message: '推荐文案不能为空',
    //   }
    // ],
    label: "推荐文案:", // 名称
    type: "textarea", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入推荐文案"
  },
  {
    value: "每单应收款(元)", // 值
    prop: "receivables",
    rules:[
      { 
        required: true, 
        message: '每单应收款不能为空',
      },
      { 
        pattern: /^[1-9][0-9]*$/, 
        message: '请输入正确的金额！',
        trigger:'blur'
      }
    ],
    label: "每单应收款(元):", // 名称
    labelWidth:'180px',
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入每单应收款(元)",
    style:"margin-bottom:10px"
  },
  {
    value: "是否需要好评", // 值
    rules:[
      { 
        required: true, 
        message: '请选择是否需要好评',
      }
    ],
    prop: "favourableComment",
    label: "是否需要好评:", // 名称
    type: "select", // 类型
    options: [
      {
        label:'是',
        value:1
      },
      {
        label:'否',
        value:0
      }
    ],
    clearable: false, // 是否可清除
    labelWidth:'180px',
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择是否需要好评",
    style:"margin-bottom:10px"
  },
  {
    value: "taskDetail", // 值
    prop: "taskDetail",
    label: "活动详情:", // 名称
    labelWidth:'180px',
    type: "upload", // 类型
    delable:false,
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用,
  },
  {
    value: "返回", // 值
    label: "返回", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'margin-right: 60px; position: absolute;top: 4px;right: 40px;'
  },{
    value: "保存", // 值
    label: "保存", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'position: absolute;top: 4px;right: 30px;'
  }
];

// 商家列表管理表单
let chooseShopListInfo = [
  {
    value: "商家编码", // 值
    prop: "businessCode",
    label: "商家编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 9, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家编码"
  },
  {
    value: "商家名称", // 值
    prop: "businessName",
    label: "商家名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 9, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称"
  },
  {
    value: "查询商家", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-right:30px"
  },
  {
    value: "重置商家", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:30px"
  }
];


// 员工管理查询表单
let staffListInfo = [
  {
    value: "姓名", // 值
    prop: "name",
    label: "姓名:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入员工姓名"
  },
  {
    value: "工号", // 值
    prop: "code",
    label: "工号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入工号"
  },
  {
    value: "手机号", // 值
    prop: "phone",
    label: "手机号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入员工手机号"
  },
  {
    value: "", // 值
    prop: "status",
    label: "状态:", // 名称
    type: "select", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    options: [
      {
        label: "全部",
        value: -1
      },
      {
        label: "启用",
        value: 1
      },
      {
        label: "停用",
        value: 0
      }
    ],
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择员工状态"
  },
  {
    value: "新增", // 值
    label: "新增", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:10px"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-right:10px"
  },
  {
    value: "搜索", // 值
    label: "搜索", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-right:10px"
  }
];
let reloadPswd = [
  {
    value: "姓名", // 值
    prop: "name",
    labelWidth:"100px",
    label: "姓名:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: true, // 是否禁用
    placeholder: "请输入姓名",
    style:"margin-bottom:15px"
  },
  {
    value: "手机号", // 值
    prop: "phone",
    labelWidth:"100px",
    label: "手机号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: true, // 是否禁用,
    placeholder: "请输入手机号",
    style:"margin-bottom:15px"
  },
  {
    value: "", // 值
    prop: "pswd2",
    rules:[],
    label: "确认密码:", // 名称
    labelWidth:"100px",
    type: "password", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请确认密码",
    style:"display:none"
  },
  {
    value: "密码", // 值
    prop: "pswd",
    rules:[
      { 
        required: true, 
        message: '新密码不能为空',
      },
      // { 
      //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z\\d\\W]$/, 
      //   message: '登录密码格式支持输入大小写英文+数字+任意符号',
      //   trigger:'blur'
      // },
      { 
        pattern: /^.{8,20}$/, 
        message: '登录密码长度应大于8位，小于20位！',
        trigger:'blur'
      }
    ],
    label: "密码:", // 名称
    labelWidth:"100px",
    type: "password", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入登录密码",
    style:"margin-bottom:15px"
  },
  {
    value: "确认密码", // 值
    prop: "pswd1",
    rules:[],
    label: "确认密码:", // 名称
    labelWidth:"100px",
    type: "password", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请确认密码",
    style:"margin-bottom:15px"
  },
  {
    value: "确认重置密码", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-top: 10px;"
  },
  {
    value: "取消重置", // 值
    label: "返回", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-right:50px;margin-top: 10px;"
  }
];
// 编辑员工管理查询表单
let editStaff = [
  {
    value: "工号", // 值
    prop: "code",
    rules:[
      { 
        required: true, 
        message: '工号不能为空',
      },
      { 
        pattern: /^[\da-zA-Z]+$/, 
        message: '工号由大小写字母或数字构成,请勿输入特殊字符！',
        trigger:'blur'
      },
      { 
        pattern: /^.{0,50}$/, 
        message: '商家编码长度不得超过50个字符！',
        trigger:'blur'
      }
    ],
    labelWidth:"100px",
    label: "工号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入工号",
    style:"margin-bottom:15px"
  },
  {
    value: "姓名", // 值
    prop: "name",
    rules:[
      { 
        required: true, 
        message: '姓名不能为空',
      },
      { 
        pattern: /^.{0,50}$/, 
        message: '商家编码长度不得超过50个字符！',
        trigger:'blur'
      }
    ],
    labelWidth:"100px",
    label: "姓名:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用,
    placeholder: "请输入员工姓名",
    style:"margin-bottom:15px"
  },
  {
    value: "手机号", // 值
    prop: "phone",
    rules:[
      { 
        required: true, 
        message: '手机号不能为空',
      },
      { 
        pattern: /^[0-9]{11}$/, 
        message: '手机号格式有误！',
        trigger:'blur'
      },
      { 
        pattern: /^.{0,11}$/, 
        message: '手机号长度不得超过11个字符！',
        trigger:'blur'
      }
    ],
    labelWidth:"100px",
    label: "手机号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入员工手机号",
    style:"margin-bottom:15px"
  },
  {
    value: "邮箱", // 值
    prop: "email",
    rules:[
      { 
        required: true, 
        message: '邮箱不能为空',
      },
      { 
        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, 
        message: '邮箱格式有误！',
        trigger:'blur'
      },
      { 
        pattern: /^.{0,50}$/, 
        message: '邮箱长度不得超过11个字符！',
        trigger:'blur'
      }
    ],
    labelWidth:"100px",
    label: "邮箱:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入员工邮箱",
    style:"margin-bottom:15px"
  },
  {
    value: "性别", // 值
    prop: "sex",
    rules:[
      { 
        required: true, 
        message: '性别不能为空',
      },
    ],
    label: "性别:", // 名称
    type: "select", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    options: [
      {
        label: "男",
        value: 1
      },
      {
        label: "女",
        value: 2
      },
      {
        label: "未知",
        value: 3
      }
    ],
    labelWidth:"100px",
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择员工性别",
    style:"margin-bottom:15px"
  },
  {
    value: "角色权限", // 值
    prop: "role",
    multiple:true,
    label: "角色权限:", // 名称
    type: "select", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    rules:[
      { 
        required: true, 
        message: '角色权限不能为空',
      },
    ],
    options: [],
    optionLabel:'roleName',
    collapseTags:true,
    clearable:true,
    optionValue:'id',
    labelWidth:"100px",
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择角色权限",
    style:"margin-bottom:15px"
  },
  {
    value: "在职情况", // 值
    prop: "jobStatus",
    label: "在职情况:", // 名称
    rules:[
      { 
        required: true, 
        message: '在职情况不能为空',
      },
    ],
    labelWidth:"100px",
    type: "select", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    options: [
      {
        label: "在职",
        value: 1
      },
      {
        label: "离职",
        value: 0
      }
    ],
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择在职情况",
    style:"margin-bottom:15px"
  },
  {
    value: "状态", // 值
    prop: "status",
    labelWidth:"100px",
    rules:[
      { 
        required: true, 
        message: '在职情况不能为空',
      },
    ],
    label: "状态:", // 名称
    type: "select", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    options: [
      {
        label: "启用",
        value: 1
      },
      {
        label: "停用",
        value: 0
      }
    ],
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择员工状态",
    style:"margin-bottom:15px"
  },
  {
    value: "登录密码", // 值
    prop: "pswd",
    rules:[
      { 
        required: true, 
        message: '登录密码不能为空',
      },
      // { 
      //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z\\d\\W]$/, 
      //   message: '登录密码格式支持输入大小写英文+数字+任意符号',
      //   trigger:'blur'
      // },
      { 
        pattern: /^.{8,20}$/, 
        message: '登录密码长度应大于8位，小于20位！',
        trigger:'blur'
      }
    ],
    label: "登录密码:", // 名称
    labelWidth:"100px",
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入登录密码"
  },
  {
    value: "保存", // 值
    label: "保存", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-top: 20px;"
  },
  {
    value: "返回", // 值
    label: "返回", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-right:50px;margin-top: 20px;"
  }
];



// 员工列表管理表单
let chooseStaffListInfo = [
  {
    value: "员工工号", // 值
    prop: "code",
    label: "员工工号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 9, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入员工工号"
  },
  {
    value: "员工姓名", // 值
    prop: "name",
    label: "员工姓名:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 9, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入员工姓名"
  },
  {
    value: "查询员工", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-right:30px"
  },
  {
    value: "重置员工", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:30px"
  }
];


let closeTaskDialogButton = [
  {
    value: "确定", // 值
    label: "确定",
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    style: "float:right;margin-right:30px;margin-top:8px",
    disabled: false // 是否禁用
  },{
    label: "取消", // 值
    value: "取消", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    style: "float:right;margin-right:0px;margin-top:8px",
    disabled: false // 是否禁用
  }
];


// 订单列表管理表单
let orderListInfo = [
  {
    value: "商家编码", // 值
    prop: "businessCode",
    label: "商家编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'110px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家编码"
  },
  {
    value: "商家名称", // 值
    prop: "businessName",
    label: "商家名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'110px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称"
  },
  {
    value: "", // 值
    prop: "mediaType",
    label: "下单渠道:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: '-1'
      },
      {
        label: "美团外卖",
        value: '1'
      },
      {
        label: "饿了么",
        value: '2'
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'110px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "用户姓名", // 值
    prop: "userName",
    label: "用户姓名:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'110px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入用户姓名"
  },
  {
    value: "用户电话", // 值
    prop: "phone",
    label: "用户电话:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'110px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入用户电话"
  },
  {
    value: "渠道单号", // 值
    prop: "orderNo",
    label: "渠道单号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'110px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入渠道单号"
  },
  {
    value: "", // 值
    prop: "orderStatus",
    label: "订单标记:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: '-1'
      },
      {
        label: "风险订单",
        value: '1'
      },
      {
        label: "正常订单",
        value: '0'
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'110px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "报名时间起", // 值
    prop: "beginDate",
    label: "报名时间起:", // 名称
    type: "datetime", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'110px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择报名时间起",
  },
  {
    value: "报名时间止", // 值
    prop: "endDate",
    label: "报名时间止:", // 名称
    type: "datetime", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    labelWidth:'110px',
    placeholder: "请选择报名时间止",
  },
  {
    value: "是否需要好评", // 值
    prop: "favourableComment",
    label: "是否需要好评:", // 名称
    type: "select", // 类型
    options: [
      {
        label:'全部',
        value:-1
      },
      {
        label:'是',
        value:1
      },
      {
        label:'否',
        value:0
      }
    ],
    clearable: false, // 是否可清除
    labelWidth:'110px',
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择是否需要好评",
    style:"margin-bottom:10px"
  },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px"
  }
];

let orderListButton = [
  {
    value: "订单导出", // 值
    label: "订单导出", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 6, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "审核通过", // 值
    label: "审核通过", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 6, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "审核驳回", // 值
    label: "审核驳回", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 6, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "批量审核", // 值
    label: "批量审核", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 6, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  }
];

// 用户列表管理表单
let userListInfo = [
  {
    value: "用户名称", // 值
    prop: "userName",
    label: "用户名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'100px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入用户名称"
  },
  {
    value: "用户电话", // 值
    prop: "phone",
    label: "用户电话:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'100px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入用户电话"
  },
  {
    value: "", // 值
    prop: "status",
    label: "状态:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: null
      },
      {
        label: "启用",
        value: '1'
      },
      {
        label: "停用",
        value: '0'
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'100px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "用户编码", // 值
    prop: "userCode",
    label: "用户编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'100px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入用户编码"
  },
  {
    value: "推荐人编码", // 值
    prop: "referenceUserCode",
    label: "推荐人编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'100px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入推荐人编码"
  },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-top: 20px;"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px;margin-top: 20px;"
  }
];

// 提现管理表单
let withdrawalListInfo = [
  {
    value: "用户名称", // 值
    prop: "userName",
    label: "用户名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入用户名称"
  },
  {
    value: "提现单号", // 值
    prop: "cashNo",
    label: "提现单号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入提现单号"
  },
  {
    value: "手机号", // 值
    prop: "phone",
    label: "手机号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入手机号"
  },
  {
    value: "", // 值
    prop: "payStatus",
    label: "支付状态:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: ''
      },
      {
        label: "成功",
        value: '1'
      },
      {
        label: "失败",
        value: '2'
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "提交开始时间", // 值
    prop: "submitTimeBegin",
    label: "提交开始时间:", // 名称
    type: "date", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入提交开始时间"
  },
  {
    value: "提交结束时间", // 值
    prop: "submitTimeEnd",
    label: "提交结束时间:", // 名称
    type: "date", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入提交结束时间"
  },
  {
    value: "支付票证", // 值
    prop: "ticket",
    label: "支付票证:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入支付票证"
  },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-top: 20px;"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px;margin-top: 20px;"
  }
];

let withdrawalListButton = [
  {
    value: "审核通过", // 值
    label: "审核通过", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "审核驳回", // 值
    label: "审核驳回", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "重新支付", // 值
    label: "重新支付", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
];


// 账单列表管理表单
let billListInfo = [
  {
    value: "门店编码", // 值
    prop: "businessCode",
    label: "门店编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入门店编码"
  },
  {
    value: "门店名称", // 值
    prop: "businessName",
    label: "门店名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入门店名称"
  },
  {
    value: "", // 值
    prop: "paymentType",
    label: "支付渠道:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: '-1'
      },
      {
        label: "支付宝",
        value: '1'
      },
      {
        label: "微信支付",
        value: '2'
      },
      {
        label: "手动支付",
        value: '3'
      },
      {
        label: "余额预付款",
        value: '7'
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "账单号", // 值
    prop: "billNo",
    label: "账单号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入账单号"
  },
  {
    value: "交易单号", // 值
    prop: "paymentOutTransNo",
    label: "交易单号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入交易单号"
  },
  {
    value: "账单起止日期", // 值
    prop: "beginTimeEndTime",
    label: "账单起止日期:", // 名称
    type: "daterange", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入账单起止日期"
  },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px"
  }
];

let billListButton = [
  {
    value: "确认收款", // 值
    label: "确认收款", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "废弃账单", // 值
    label: "废弃账单", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  }
];


// 套餐管理表单
let setMealListInfo = [
  {
    value: "商家编码", // 值
    prop: "businessCode",
    label: "商家编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家编码"
  },
  {
    value: "商家名称", // 值
    prop: "businessName",
    label: "商家名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称"
  },
  {
    value: "套餐名称", // 值
    prop: "packageName",
    label: "套餐名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入套餐名称"
  },
  {
    value: "套餐编码", // 值
    prop: "packageCode",
    label: "套餐编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入套餐编码"
  },
  {
    value: "城市", // 值
    prop: "addressCityName",
    label: "城市:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入城市"
  },
  {
    value: "销售员", // 值
    prop: "userName",
    label: "销售员:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入销售员"
  },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px"
  }
];

let setMealListButton = [
  {
    value: "上架套餐", // 值
    label: "上架套餐", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "下架套餐", // 值
    label: "下架套餐", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "新增套餐", // 值
    label: "新增套餐", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  }
];

//套餐信息-1
let setMealManagerDetail = [
  {
    value: "套餐编码", // 值
    rules:[
      { 
        required: true, 
        message: '套餐编码不能为空',
      }
    ],
    prop: "packageCode",
    label: "套餐编码:", // 名称
    labelWidth:'180px',
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: true, // 是否只读
    disabled: true, // 是否禁用
    placeholder: "请输入套餐编码",
    style:"margin-bottom:10px"
  },
  {
    value: "销售员", // 值
    required: true,
    rules:[
      { 
        required: true, 
        message: '销售员不能为空',
      }
    ],
    prop: "userName",
    labelWidth:'180px',
    label: "销售员:", // 名称
    type: "textSearch", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: true, // 是否只读
    disabled: true, // 是否禁用
    placeholder: "请输入销售员",
    style:"margin-bottom:10px"
  },
  {
    value: "适用商家", // 值
    rules:[
      { 
        required: true, 
        message: '适用商家不能为空',
      }
    ],
    prop: "businessName",
    label: "适用商家:", // 名称
    labelWidth:'180px',
    type: "textSearch", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: true, // 是否只读
    disabled: true, // 是否禁用
    placeholder: "请输入商家",
    style:"margin-bottom:10px"
  },
  {
    value: "套餐名称", // 值
    prop: "packageName",
    rules:[
      { 
        required: true, 
        message: '套餐名称不能为空',
      }
    ],
    label: "套餐名称:", // 名称
    type: "text", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入套餐名称",
    style:"margin-bottom:10px"
  },
  {
    value: "原价", // 值
    prop: "originalPrice",
    rules:[
      { 
        required: true, 
        message: '原价不能为空',
        trigger:'blur'
      },
      { 
        pattern: /^[0-9|.]+$/, 
        message: '请输入数字',
        trigger:'blur'
      }
    ],
    label: "原价:", // 名称
    type: "text", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入原价",
    style:"margin-bottom:10px"
  },
  {
    value: "售价", // 值
    prop: "sellPrice",
    rules:[
      { 
        required: true, 
        message: '售价不能为空',
        trigger:'blur'
      },
      { 
        pattern: /^[0-9|.]+$/, 
        message: '请输入数字',
        trigger:'blur'
      }
    ],
    label: "售价:", // 名称
    type: "text", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入售价",
    style:"margin-bottom:10px"
  },
  {
    value: "会员价", // 值
    prop: "vipPrice",
    rules:[
      { 
        required: true, 
        message: '会员价不能为空',
        trigger:'blur'
      },
      { 
        pattern: /^[0-9|.]+$/, 
        message: '请输入数字',
        trigger:'blur'
      }
    ],
    label: "会员价:", // 名称
    type: "text", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入会员价",
    style:"margin-bottom:10px"
  },
  {
    value: "使用有效期", // 值
    rules:[
      { 
        required: true, 
        message: '使用有效期不能为空',
      }
    ],
    prop: "termValidityTime",
    label: "使用有效期:", // 名称
    type: "datetimerange", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    labelWidth:'180px',
    placeholder: "请选择使用有效期",
    style:"margin-bottom:10px"
  },
  {
    value: "库存", // 值
    required: true,
    rules:[
      { 
        required: true, 
        message: '库存不能为空',
        trigger:'blur'
      },
      { 
        pattern: /^[0-9|.]+$/, 
        message: '请输入数字',
        trigger:'blur'
      }
    ],
    prop: "totalCount",
    labelWidth:'180px',
    label: "库存:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入库存",
    style:"margin-bottom:10px"
  },
  {
    value: "上架状态", // 值
    rules:[
      { 
        required: true, 
        message: '上架状态不能为空',
      }
    ],
    prop: "status",
    label: "上架状态:", // 名称
    type: "select", // 类型
    options: [
      {
        label:'上架',
        value:1
      },
      {
        label:'下架',
        value:3
      },
    ],
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择上架状态",
    style:"margin-bottom:10px"
  },
  {
    value: "退款要求", // 值
    rules:[
      { 
        required: true, 
        message: '退款要求不能为空',
      }
    ],
    prop: "refundRequest",
    label: "退款要求:", // 名称
    type: "select", // 类型
    options: [
      {
        label:'随时退，过期退',
        value:1
      },
      {
        label:'不可退款',
        value:2
      },
    ],
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择退款要求",
    style:"margin-bottom:10px"
  },
  {
    value: "预约要求", // 值
    rules:[
      { 
        required: true, 
        message: '预约要求不能为空',
      }
    ],
    prop: "reservationRequest",
    label: "预约要求:", // 名称
    type: "select", // 类型
    options: [
      {
        label:'无需预约',
        value:1
      },
      {
        label:'当天预约',
        value:2
      },
      {
        label:'提前一天预约',
        value:3
      },
    ],
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择预约要求",
    style:"margin-bottom:10px"
  },
  {
    value: "1积分抵扣金额（元）", // 值
    prop: "amountOfPoints",
    rules:[
      { 
        required: true, 
        message: '1积分抵扣金额（元）不能为空',
        trigger:'blur'
      },
      { 
        pattern: /^[0-9|.]+$/, 
        message: '请输入数字',
        trigger:'blur'
      }
    ],
    label: "1积分抵扣金额（元）:", // 名称
    labelWidth:'180px',
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入1积分抵扣金额（元）",
    style:"margin-bottom:10px"
  },
  {
    value: "商品详情", // 值
    prop: "goodsDetailVOList",
    rules:[
      { 
        required: true, 
        message: '商品详情不能为空',
      }
    ],
    label: "商品详情:", // 名称
    labelWidth:'180px',
    prop: "goodsDetailVOList",
    type: "formInTable", // 类型
    editButton:true,
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商品详情",
    style:"margin-bottom:10px"
  },
  {
    value: "购买须知", // 值
    prop: "purchaseInstructions",
    rules:[
      { 
        required: true, 
        message: '购买须知不能为空',
      }
    ],
    label: "购买须知:", // 名称
    labelWidth:'180px',
    type: "textarea", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入购买须知",
    style:"margin-bottom:10px"
  },
  {
    value: "productInstructions", // 值
    prop: "productInstructions",
    label: "商品介绍:", // 名称
    delable:true,
    labelWidth:'180px',
    type: "upload", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用,
  },
  {
    value: "返回", // 值
    label: "返回", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'margin-right: 60px; position: absolute;top: 4px;right: 40px;'
  },{
    value: "保存", // 值
    label: "保存", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'position: absolute;top: 4px;right: 30px;'
  }
];


// 到店订单管理表单
let toStoreOrderManageListInfo = [
  {
    value: "商家编码", // 值
    prop: "businessCode",
    label: "商家编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家编码"
  },
  {
    value: "商家名称", // 值
    prop: "businessName",
    label: "商家名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称"
  },
  {
    value: "下单时间", // 值
    prop: "payTime",
    label: "下单时间:", // 名称
    type: "datetime", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入下单时间"
  },
  {
    value: "用户姓名", // 值
    prop: "cUserName",
    label: "用户姓名:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入用户姓名"
  },
  {
    value: "用户电话", // 值
    prop: "cUserPhone",
    label: "用户电话:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入用户电话"
  },
  {
    value: "订单号", // 值
    prop: "orderCode",
    label: "订单号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入订单号"
  },
  {
    value: "", // 值
    prop: "mediaType",
    label: "订单渠道:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: ''
      },
      {
        label: "微信小程序",
        value: '1'
      },
      {
        label: "抖音小程序",
        value: '2'
      },
      {
        label: "手动导入",
        value: '3'
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "", // 值
    prop: "payChannel",
    label: "支付渠道:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: ''
      },
      {
        label: "支付宝",
        value: '1'
      },
      {
        label: "微信",
        value: '2'
      },
      {
        label: "手动支付",
        value: '3'
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },

  {
    value: "使用时间", // 值
    prop: "usedTime",
    label: "使用时间:", // 名称
    type: "datetime", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入使用时间"
  },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%;margin-top: 20px;"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px;margin-top: 20px;"
  }
];

let toStoreOrderManageListButton = [
  {
    value: "订单导出", // 值
    label: "订单导出", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "批量导入", // 值
    label: "批量导入", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  }
];

// 返利餐管理表单
let RebateManageListInfo = [
  {
    value: "商家编码", // 值
    prop: "businessCode",
    label: "商家编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家编码"
  },
  {
    value: "商家名称", // 值
    prop: "businessName",
    label: "商家名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称"
  },
  {
    value: "", // 值
    prop: "mediaType",
    label: "活动渠道:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: '-1'
      },
      {
        label: "美团",
        value: '1'
      },
      {
        label: "饿了么",
        value: '2'
      },
      {
        label: "不限渠道",
        value: '3'
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px"
  }
];

let RebateManageButton = [
  {
    value: "停止活动", // 值
    label: "停止活动", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "重启活动", // 值
    label: "重启活动", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "新增活动", // 值
    label: "新增活动", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  }
];

//返利餐信息
let RebateManageDetail = [
  {
    value: "商家", // 值
    rules:[
      { 
        required: true, 
        message: '商家不能为空',
      }
    ],
    prop: "businessName",
    label: "商家:", // 名称
    labelWidth:'180px',
    type: "textSearch", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: true, // 是否只读
    disabled: true, // 是否禁用
    placeholder: "请输入商家",
    style:"margin-bottom:10px"
  },
  {
    value: "销售员", // 值
    required: true,
    rules:[
      { 
        required: true, 
        message: '销售员不能为空',
      }
    ],
    prop: "userName",
    labelWidth:'180px',
    label: "销售员:", // 名称
    type: "textSearch", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: true, // 是否只读
    disabled: true, // 是否禁用
    placeholder: "请输入销售员",
    style:"margin-bottom:10px"
  },
  
  {
    value: "首单返金额", // 值
    prop: "rebate1Money",
    rules:[
      { 
        required: true, 
        message: '首单返金额不能为空',
      },
      { 
        pattern: /^[0-9|.]+$/, 
        message: '请输入数字',
        trigger:'blur'
      },
      { 
        pattern: /^([0-9]+[\d]*(.[0-9]{1,2})?)$/, 
        message: '请保留两位小数',
        trigger:'blur'
      }
    ],
    label: "首单返金额:", // 名称
    type: "text", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入首单返金额",
    style:"margin-bottom:10px"
  },
  {
    value: "每单返金额", // 值
    prop: "rebateMoney",
    rules:[
      { 
        required: true, 
        message: '每单返金额不能为空',
      },
      { 
        pattern: /^[0-9|.]+$/, 
        message: '请输入数字',
        trigger:'blur'
      },
      { 
        pattern: /^([0-9]+[\d]*(.[0-9]{1,2})?)$/, 
        message: '请保留两位小数',
        trigger:'blur'
      }
    ],
    label: "每单返金额:", // 名称
    type: "text", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入每单返金额",
    style:"margin-bottom:10px"
  },
  {
    value: "首单商家承担金额", // 值
    prop: "business1Money",
    rules:[
      { 
        required: true, 
        message: '首单商家承担金额不能为空',
      },
      { 
        pattern: /^[0-9|.]+$/, 
        message: '请输入数字',
        trigger:'blur'
      },
      { 
        pattern: /^([0-9]+[\d]*(.[0-9]{1,2})?)$/, 
        message: '请保留两位小数',
        trigger:'blur'
      }
    ],
    label: "首单商家承担金额:", // 名称
    type: "text", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入首单商家承担金额",
    style:"margin-bottom:10px"
  },
  {
    value: "后续单商家承担金额", // 值
    prop: "businessMoney",
    rules:[
      { 
        required: true, 
        message: '后续单商家承担金额不能为空',
      },
      { 
        pattern: /^[0-9|.]+$/, 
        message: '请输入数字',
        trigger:'blur'
      },
      { 
        pattern: /^([0-9]+[\d]*(.[0-9]{1,2})?)$/, 
        message: '请保留两位小数',
        trigger:'blur'
      }
    ],
    label: "后续单商家承担金额:", // 名称
    type: "text", // 类型
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入后续单商家承担金额",
    style:"margin-bottom:10px"
  },
  
  {
    value: "活动渠道", // 值
    rules:[
      { 
        required: true, 
        message: '活动渠道不能为空',
      }
    ],
    prop: "mediaType",
    label: "活动渠道:", // 名称
    type: "select", // 类型
    options: [
      // {
      //   label:'美团',
      //   value:1
      // },
      // {
      //   label:'饿了么',
      //   value:2
      // },
      {
        label:'不限渠道',
        value:3
      },
    ],
    labelWidth:'180px',
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请选择活动渠道",
    style:"margin-bottom:10px"
  },
  
  {
    value: "推荐文案", // 值
    prop: "comments",
    rules:[
      { 
        required: true, 
        message: '推荐文案不能为空',
      }
    ],
    label: "推荐文案:", // 名称
    labelWidth:'180px',
    type: "textarea", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入推荐文案",
    style:"margin-bottom:10px"
  },
  {
    value: "返回", // 值
    label: "返回", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'margin-right: 60px; position: absolute;top: 4px;right: 40px;'
  },
  {
    value: "保存", // 值
    label: "保存", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'position: absolute;top: 4px;right: 30px;'
  }
];

// 返利餐订单表单
let RebateOrderListInfo = [
  {
    value: "商家编码", // 值
    prop: "businessCode",
    label: "商家编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家编码"
  },
  {
    value: "商家名称", // 值
    prop: "businessName",
    label: "商家名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入商家名称"
  },
  {
    value: "", // 值
    prop: "mediaType",
    label: "活动渠道:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "全部",
        value: '-1'
      },
      {
        label: "美团",
        value: '1'
      },
      {
        label: "饿了么",
        value: '2'
      },
      {
        label: "不限渠道",
        value: '3'
      }
    ],
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "用户姓名", // 值
    prop: "cUserName",
    label: "用户姓名:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入用户姓名"
  },
  {
    value: "用户电话", // 值
    prop: "phone",
    label: "用户电话:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入用户电话"
  },
  {
    value: "订单号", // 值
    prop: "takeOutOrderNo",
    label: "订单号:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入订单号"
  },
  // {
  //   value: "", // 值
  //   prop: "payStatus",
  //   label: "支付状态:", // 名称
  //   type: "select", // 类型
  //   options: [
  //     {
  //       label: "全部",
  //       value: '-1'
  //     },
  //     {
  //       label: "成功",
  //       value: '1'
  //     },
  //     {
  //       label: "失败",
  //       value: '2'
  //     }
  //   ],
  //   clearable: false, // 是否可清除
  //   span: 8, // 宽度
  //   labelWidth:'120px',
  //   readonly: false, // 是否只读
  //   disabled: false // 是否禁用
  // },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px"
  }
];

let RebateOrderButton = [
  {
    value: "审核通过", // 值
    label: "审核通过", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },{
    value: "审核驳回", // 值
    label: "审核驳回", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  // {
  //   value: "重新支付", // 值
  //   label: "重新支付", // 值
  //   type: "button", // 类型
  //   clearable: false, // 是否可清除
  //   span: 8, // 宽度
  //   readonly: false, // 是否只读
  //   disabled: false // 是否禁用
  // }
];

// 群二维码管理表单
let AreaGroupManageListInfo = [
  {
    value: "地区编码", // 值
    prop: "adcode",
    label: "地区编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入地区编码"
  },
  {
    value: "地区名称", // 值
    prop: "adcodeName",
    label: "地区名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入地区名称"
  },
  {
    value: "", // 值
    prop: "status",
    label: "状态:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "停用",
        value: '0'
      },
      {
        label: "启用",
        value: '1'
      }
    ],
    clearable: true, // 是否可清除
    span: 8, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "查询", // 值
    label: "查询", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 2, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;width:6%"
  },
  {
    value: "重置", // 值
    label: "重置", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style: "float:right;margin-right:20px"
  }
];

let AreaGroupManageButton = [
  {
    value: "新增", // 值
    label: "新增", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 8, // 宽度
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  }
];

//群二维码信息
let AreaGroupManageDetail = [
  {
    value: "地区编码", // 值
    prop: "adcode",
    rules:[
      { 
        required: true, 
        message: '地区编码不能为空',
      },
      { 
        pattern: /^[0-9|.]+$/, 
        message: '请输入数字',
        trigger:'blur'
      }
    ],
    label: "地区编码:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入地区编码",
    style:"margin-bottom:10px"
  },
  {
    value: "地区名称", // 值
    prop: "adcodeName",
    rules:[
      { 
        required: true, 
        message: '地区名称不能为空',
      }
    ],
    label: "地区名称:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入地区名称",
    style:"margin-bottom:10px"
  },
  {
    value: "显示群名", // 值
    prop: "groupName",
    rules:[
      { 
        required: true, 
        message: '显示群名不能为空',
      }
    ],
    label: "显示群名:", // 名称
    type: "text", // 类型
    clearable: false, // 是否可清除
    span: 12, // 宽度
    labelWidth:'120px',
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    placeholder: "请输入显示群名",
    style:"margin-bottom:10px"
  },
  {
    value: "", // 值
    prop: "status",
    rules:[
      { 
        required: true, 
        message: '状态不能为空',
      }
    ],
    label: "状态:", // 名称
    type: "select", // 类型
    options: [
      {
        label: "停用",
        value: '0'
      },
      {
        label: "启用",
        value: '1'
      }
    ],
    clearable: true, // 是否可清除
    span: 12, // 宽度
    labelWidth:'120px',
    style:"margin-bottom:10px",
    readonly: false, // 是否只读
    disabled: false // 是否禁用
  },
  {
    value: "qrcodeUrl", // 值
    prop: "qrcodeUrl",
    rules:[
      { 
        required: true, 
        message: '二维码不能为空',
      }
    ],
    label: "二维码:", // 名称
    delable:true,
    labelWidth:'120px',
    type: "upload", // 类型
    clearable: false, // 是否可清除
    span: 24, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用,
  },
  {
    value: "返回", // 值
    label: "返回", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'margin-right: 60px; position: absolute;top: 4px;right: 40px;'
  },
  {
    value: "保存", // 值
    label: "保存", // 值
    type: "button", // 类型
    clearable: false, // 是否可清除
    span: 1, // 宽度
    readonly: false, // 是否只读
    disabled: false, // 是否禁用
    style:'position: absolute;top: 4px;right: 30px;'
  }
];


export default {
  shopListInfo,
  shopListButton,
  shopManagerDetail,
  outShopForm,
  taskListInfo,
  taskListButton,
  taskManagerDetail,
  chooseShopListInfo,
  staffListInfo,
  editStaff,
  reloadPswd,
  closeTaskDialogButton,
  chooseStaffListInfo,
  orderListInfo,
  orderListButton,
  userListInfo,
  withdrawalListInfo,
  withdrawalListButton,
  billListInfo,
  billListButton,
  setMealListInfo,
  setMealListButton,
  setMealManagerDetail,
  toStoreOrderManageListInfo,
  toStoreOrderManageListButton,
  RebateManageListInfo,
  RebateManageButton,
  RebateManageDetail,
  RebateOrderListInfo,
  RebateOrderButton,
  AreaGroupManageListInfo,
  AreaGroupManageButton,
  AreaGroupManageDetail
};
