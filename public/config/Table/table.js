//商家列表
let shopListTableData = {
  table_column: [
    {
      label: "商家编码",
      prop: "businessCode"
    },
    {
      label: "商家名称",
      prop: "businessName"
    },
    {
      label: "联系人",
      prop: "contactsUser"
    },
    {
      label: "联系电话",
      prop: "contactsPhone"
    },
    {
      label: "分类",
      prop: "typeCH"
    },
    {
      label: "城市",
      prop: "addressCityName"
    },
    {
      label: "详细地址",
      prop: "addressDetail"
    },
    {
      label: "创建时间",
      prop: "createTime"
    },
    {
      label: "状态",
      prop: "status",
      width: "120px"
    },
    {
      label: "操作",
      prop: "operation",
      width: "150px",
      fixed:'right'
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

//任务列表
let taskListTableData = {
  table_column: [
    {
      label: "",
      type: "selection",
      selectionRule: [
        { value: "生效中", props: "status", res: true },
        { value: "未开始", props: "status", res: true }
      ],
      fixed: true
    },
    {
      label: "商家编码",
      prop: "businessCode"
    },
    {
      label: "商家名称",
      prop: "businessDesc",
      width: "180px"
    },
    {
      label: "任务渠道",
      prop: "mediaTypeDesc"
    },
    {
      label: "任务规则",
      prop: "taskRule",
      width: "150px"
    },
    {
      label: "任务开始日期(含)",
      prop: "beginDate",
      width: "120px"
    },
    {
      label: "任务结束日期(含)",
      prop: "endDate",
      width: "120px"
    },
    {
      label: "报名时间段",
      prop: "timeRange",
      width: "100px"
    },
    {
      label: "名额控制方式",
      prop: "joinManage",
      width: "150px"
    },
    {
      label: "发布来源",
      prop: "publishSourceType",
      width: "150px"
    },
    {
      label: "是否需要好评",
      prop: "favourableCommentDesc",
      width: "120px"
    },
    {
      label: "总名额",
      prop: "totalJoinQuota",
      width: "60px"
    },
    {
      label: "剩余名额",
      prop: "surplusJoinQuota",
      width: "80px"
    },
    {
      label: "已完成名额",
      prop: "finishedJoinQuota",
      width: "100px"
    },
    {
      label: "每单应收款(元)",
      prop: "receivables",
      width: "120px"
    },
    {
      label: "销售员",
      prop: "staffName",
      width: "100px"
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: "100px"
    },
    {
      label: "状态",
      prop: "status",
      width: "100px"
    },
    {
      label: "操作",
      prop: "operation",
      width: "100px",
      operation2: [{ name: "查看" }],
      fixed:'right'
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

//选商家的表
let taskListChooseShopTableData = {
  table_column: [
    {
      label: "",
      type: "selection"
    },
    {
      label: "商家编码",
      prop: "businessCode"
    },
    {
      label: "商家名称",
      prop: "businessName"
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};
//选员工的表
let taskListChooseStaffTableData = {
  table_column: [
    {
      label: "",
      type: "selection"
    },
    {
      label: "员工工号",
      prop: "code"
    },
    {
      label: "员工姓名",
      prop: "name"
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

//员工列表
let staffTableData = {
  table_column: [
    {
      label: "工号",
      prop: "code"
    },
    {
      label: "姓名",
      prop: "name"
    },
    {
      label: "手机号",
      prop: "phone"
    },
    {
      label: "邮箱",
      prop: "email"
    },
    {
      label: "角色权限",
      prop: "roleDesc"
    },
    {
      label: "性别",
      prop: "sexDesc",
      width: "80px"
    },
    {
      label: "在职情况",
      prop: "jobStatusDesc",
      width: "80px"
    },
    {
      label: "状态",
      prop: "statusDesc",
      width: "80px"
    },
    {
      label: "创建时间",
      prop: "createTime"
    },
    {
      label: "操作",
      prop: "operation",
      width: "150px",
      // operation2: [{ name: "编辑" },{name: "重置密码"}],
      fixed:'right'
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

//订单列表
let orderListTableData = {
  table_column: [
    {
      label: "",
      type: "selection",
      selectionRule: [{ value: "待审核", props: "statusName", res: true }],
      fixed: true
    },
    {
      label: "商家编码",
      prop: "businessCode",
      width: "100px"
    },
    {
      label: "商家名称",
      prop: "businessName",
      width: "180px"
    },
    {
      label: "用户",
      prop: "userName"
    },
    {
      label: "用户电话",
      prop: "phone",
      width: "150px"
    },
    {
      label: "任务规则",
      prop: "activityDescription",
      width: "120px"
    },
    {
      label: "下单渠道",
      prop: "mediaTypeName",
      width: "120px"
    },
    {
      label: "渠道单号",
      prop: "orderNo",
      width: "100px"
    },
    {
      label: "实付金额(元)",
      prop: "amount",
      width: "150px"
    },
    {
      label: "应返积分",
      prop: "points",
      width: "70px"
    },
    {
      label: "是否需要好评",
      prop: "favourableCommentDesc",
      width: "100px"
    },
    {
      label: "店名和实付金额截图",
      prop: "amountImageUrl",
      type: "imgTable",
      width: "180px"
    },
    {
      label: "订单编号截图",
      prop: "orderImageUrl",
      type: "imgTable",
      width: "180px"
    },
    {
      label: "评价截图",
      prop: "commentImageUrl",
      type: "imgTable",
      width: "120px"
    },
    {
      label: "提交时间",
      prop: "submitTimeString",
      width: "100px"
    },
    {
      label: "状态",
      prop: "statusName",
      width: "100px"
    },
    {
      label: "订单标记",
      prop: "orderFlagName",
      width: "100px"
    },
    {
      label: "风险备注",
      prop: "riskRemarks",
      width: "300px"
    },
    {
      label: "任务要求",
      prop: "taskRecommendedWords",
      width: "300px"
    },
    {
      label: "审核方",
      prop: "examineType",
    },
    {
      label: "操作",
      prop: "operation",
      width: "120px",
      fixed:'right'
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

//批量任务列表
let batchtaskListTableData = {
  table_column: [
    {
      label: "商家编码",
      prop: "businessId"
    },
    {
      label: "商家名称",
      prop: "businessName",
      width: "180px"
    },
    {
      label: "任务渠道",
      prop: "mediaType"
    },
    {
      label: "任务满金额（元）",
      prop: "taskRuleUp",
      width: "120px"
    },
    {
      label: "任务返积分",
      prop: "taskRuleReturn",
      width: "120px"
    },
    {
      label: "任务开始日期(含)",
      prop: "beginDate",
      width: "120px"
    },
    {
      label: "任务结束日期(含)",
      prop: "endDate",
      width: "120px"
    },
    {
      label: "报名开始时间",
      prop: "signUpBeginDate",
      width: "120px"
    },
    {
      label: "报名结束时间",
      prop: "signUpEndDate",
      width: "120px"
    },
    {
      label: "名额控制方式",
      prop: "joinRuleType",
      width: "150px"
    },
    {
      label: "名额",
      prop: "totalJoinQuota",
      width: "60px"
    },
    {
      label: "销售员工号",
      prop: "userId",
      width: "120px"
    },
    {
      label: "销售员姓名",
      prop: "userName",
      width: "100px"
    },
    {
      label: "活动详情",
      prop: "taskDetail",
      width: "120px"
    },
    {
      label: "是否需要好评",
      prop: "favourableCommentDesc",
      width: "120px"
    },
    {
      label: "校验结果",
      prop: "checkResult",
      width: "100px"
    },
    {
      label: "导入结果",
      prop: "importResult",
      width: "100px"
    },
    {
      label: "信息",
      prop: "importInfo",
      width: "100px"
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: false
  }
};

//用户管理表
let userTableData = {
  table_column: [
    {
      label: "",
      type: "selection"
      // selectionRule:{value:'待审核',props:'statusName',res:true},
      // fixed:true
    },
    {
      label: "用户名称",
      prop: "userName"
    },
    {
      label: "用户电话",
      prop: "phone",
      width: "100px"
    },
    {
      label: "真实姓名",
      prop: "trueName",
      width: "80px"
    },
    {
      label: "用户编码",
      prop: "userCode",
      width: "200px"
    },
    {
      label: "推荐人编码",
      prop: "referenceUserCode",
      width: "120px"
    },
    {
      label: "用户积分",
      prop: "points",
      width: "80px"
    },
    {
      label: "推广码",
      prop: "invitationCodeUrl",
      type: "imgTable",
      width: "80px"
    },
    {
      label: "注册时间",
      prop: "createTime",
      width: "150px"
    },
    {
      label: "状态",
      prop: "statusDesc",
      width: "80px"
    },
    {
      label: "操作",
      prop: "operation",
      width: "130px",
      operation2: [{ name: "查看" }],
      fixed:'right'
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

//提现管理表
let withdrawalManageTableData = {
  table_column: [
    {
      label: "",
      type: "selection",
      selectionRule: [
        { value: "待审核", props: "statusName", res: true },
        { value: "失败", props: "payStatusName", res: true }
      ]
      // fixed:true
    },
    {
      label: "用户名称",
      prop: "userName"
    },
    {
      label: "用户电话",
      prop: "phone",
      width: "100px"
    },
    {
      label: "提现积分",
      prop: "points",
      width: "80px"
    },
    {
      label: "提现金额(元)",
      prop: "amount",
      width: "150px"
    },
    {
      label: "支付渠道",
      prop: "paymentTypeName",
      width: "100px"
    },
    {
      label: "提现单号",
      prop: "cashNo",
      width: "180px"
    },
    {
      label: "支付ticket",
      prop: "ticket",
      width: "150px"
    },
    {
      label: "提交开始时间",
      prop: "createTime",
      width: "150px"
    },
    {
      label: "支付时间",
      prop: "payTime",
      width: "150px"
    },
    {
      label: "状态",
      prop: "statusName",
      width: "100px"
    },
    {
      label: "支付状态",
      prop: "payStatusName",
      width: "100px"
    },
    {
      label: "支付信息",
      prop: "payResultInfo",
      width: "100px"
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

//账单管理表
let billListTableData = {
  table_column: [
    {
      label: "",
      type: "selection",
      selectionRule: [{ value: "待支付", props: "billStatusName", res: true }],
      fixed: true
    },
    {
      label: "商家编码",
      prop: "businessCode",
      width: "100px"
    },
    {
      label: "商家名称",
      prop: "businessName",
      width: "180px"
    },
    {
      label: "账单日",
      prop: "billDate",
      width: "100px"
    },
    {
      label: "完成单量",
      prop: "finishedOrderNum",
      width: "100px"
    },
    {
      label: "发放积分",
      prop: "outPoints",
      width: "80px"
    },
    {
      label: "应收款(元)",
      prop: "receivables",
      width: "100px"
    },
    {
      label: "支付渠道",
      prop: "paymentTypeName",
      width: "100px"
    },
    {
      label: "支付时间",
      prop: "paymentTime",
      width: "120px"
    },
    {
      label: "账单号",
      prop: "billNo",
      width: "180px"
    },
    {
      label: "支付交易单号",
      prop: "paymentOutTransNo",
      width: "180px"
    },
    {
      label: "备注",
      prop: "billRemarks",
      width: "180px"
    },
    {
      label: "账单地址",
      prop: "billAccessUrl",
      width: "180px"
    },
    {
      label: "账单 状态",
      prop: "billStatusName",
      width: "100px"
    },

    {
      label: "操作",
      prop: "operation",
      fixed:'right'
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

//套餐管理表
let setMealListTableData = {
  table_column: [
    {
      label: "",
      type: "selection",
      selectionRule: [
        { value: "上架中", props: "status", res: true },
        { value: "已下架", props: "status", res: true }
      ],
      fixed: true
    },
    //     商家编码

    {
      label: "商家编码",
      prop: "businessCode"
    },
    // 商家名称

    {
      label: "商家名称",
      prop: "businessName",
      width: "180px"
    },
    // 套餐编码

    {
      label: "套餐编码",
      prop: "packageCode"
    },
    // 套餐名称
    {
      label: "套餐名称",
      prop: "packageName",
      width: "150px"
    },
    // 原价(元)
    {
      label: "原价(元)",
      prop: "originalPrice",
      width: "120px"
    },
    // 售价(元)
    {
      label: "售价(元)",
      prop: "sellPrice",
      width: "120px"
    },
    // 会员价(元)
    {
      label: "会员价(元)",
      prop: "vipPrice",
      width: "100px"
    },
    // 有效期
    {
      label: "有效期",
      prop: "termValidityTime",
      width: "150px"
    },
    // 总库存
    {
      label: "总库存",
      prop: "totalCount",
      width: "60px"
    },
    // 已售库存
    {
      label: "已售库存",
      prop: "sellCount",
      width: "80px"
    },
    // 剩余库存
    {
      label: "剩余库存",
      prop: "surplusCount",
      width: "100px"
    },
    // 已核销量
    {
      label: "已核销量",
      prop: "alreadySlodCount",
      width: "120px"
    },
    // 销售员
    {
      label: "销售员",
      prop: "userName",
      width: "100px"
    },
    // 积分抵扣比列

    {
      label: "积分抵扣比列",
      prop: "amountOfPoints",
      width: "100px"
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: "100px"
    },
    // 状态
    // 操作
    {
      label: "状态",
      prop: "status",
      width: "100px"
    },
    {
      label: "操作",
      prop: "operation",
      width: "100px",
      fixed:'right'
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

//套餐详情商品详情
let commodityTableData = {
  table_column: [
    {
      label: "套餐包含商品名",
      prop: "name",
      width: "100px"
    },
    {
      label: "数量",
      prop: "num",
      width: "100px"
    },
    {
      label: "单位",
      prop: "unit",
      width: "100px"
    },
    {
      label: "价格",
      prop: "price",
      width: "100px"
    },
    {
      label: "操作",
      prop: "operation",
      width: "100px",
      fixed:'right'
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: false
  }
};

//套餐列表
let toStoreOrderManageListTableData = {
  table_column: [
    {
      label: "",
      type: "selection",
      selectionRule: [
        // {value:'上架中',props:'status',res:true},
        // {value:'已下架',props:'status',res:true},
      ],
      fixed: true
    },
    // 商家编码
    {
      label: "适用商家",
      prop: "businessName",
      width: "180px"
    },
    // 商家名称
    {
      label: "用户",
      prop: "cUserName",
      width: "120px"
    },
    // 套餐编码

    {
      label: "用户电话",
      prop: "cUserPhone",
      width: "150px"
    },
    // 套餐名称
    {
      label: "套餐名称",
      prop: "packageName",
      width: "150px"
    },
    // 原价(元)
    {
      label: "原价(元)",
      prop: "originalPrice",
      width: "120px"
    },
    // 售价(元)
    {
      label: "售价(元)",
      prop: "sellPrice",
      width: "120px"
    },
    // 会员价(元)
    {
      label: "会员价(元)",
      prop: "vipPrice",
      width: "100px"
    },
    {
      label: "用户购买价格(元)",
      prop: "buyPrice",
      width: "150px"
    },
    // 有效期
    {
      label: "积分抵扣比列",
      prop: "amountPointsProportion",
      width: "150px"
    },
    // 总库存
    {
      label: "积分抵扣金额",
      prop: "pointPaymentAmount",
      width: "150px"
    },
    // 已售库存
    {
      label: "在线支付(元)",
      prop: "actualPayment",
      width: "150px"
    },
    // 剩余库存
    {
      label: "下单时间",
      prop: "createTime",
      width: "180px"
    },
    // 已核销量
    {
      label: "使用时间",
      prop: "usedTime",
      width: "120px"
    },
    // 销售员
    {
      label: "订单号",
      prop: "orderCode",
      width: "100px"
    },
    // 积分抵扣比列

    {
      label: "订单渠道",
      prop: "mediaTypeName",
      width: "100px"
    },
    {
      label: "支付渠道",
      prop: "payChannelName",
      width: "100px"
    },
    // 状态
    // 操作
    {
      label: "支付时间",
      prop: "payTime",
      width: "180px"
    },
    {
      label: "使用门店",
      prop: "usedBusinessName",
      width: "100px"
    },
    {
      label: "状态",
      prop: "statusName",
      width: "100px"
    },
    {
      label: "操作",
      prop: "operation",
      fixed: "right",
      width: "100px"
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

//返利餐管理表
let rebateTableData = {
  table_column: [
    {
      label: "",
      type: "selection",
      // selectionRule: [{ value: "待支付", props: "billStatusName", res: true }],
      fixed: true
    },
    {
      label: "商家编码",
      prop: "businessCode",
      width: "100px"
    },
    {
      label: "商家名称",
      prop: "businessName",
      width: "180px"
    },
    {
      label: "活动渠道",
      prop: "mediaType",
      width: "100px"
    },
    {
      label: "首单返金额",
      prop: "rebate1Money",
      width: "100px"
    },
    {
      label: "每单返金额",
      prop: "rebateMoney",
      width: "100px"
    },
    {
      label: "首单商家承担金额",
      prop: "business1Money",
      width: "100px"
    },
    {
      label: "后续单商家承担金额",
      prop: "businessMoney",
      width: "100px"
    },
    {
      label: "已发放名额",
      prop: "signupQuota",
      width: "100px"
    },
    {
      label: "销售员",
      prop: "salesPersonName",
      width: "100px"
    },
    {
      label: "创建人",
      prop: "salesPersonName",
      width: "100px"
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: "180px"
    },
    {
      label: "状态",
      prop: "statusName",
      width: "100px"
    },
    {
      label: "操作",
      prop: "operation",
      width: "100px",
      fixed:'right'
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: false
  }
};

//返利餐订单表
let RebateOrderTableData = {
  table_column: [
    {
      label: "",
      type: "selection",
      selectionRule: [{ value: "待审核", props: "statusName", res: true },{ value: "失败", props: "payStatusName", res: true }],
      fixed: true
    },
    {
      label: "商家编码",
      prop: "businessCode",
      width: "100px"
    },
    {
      label: "商家名称",
      prop: "businessName",
      width: "180px"
    },
    {
      label: "用户姓名",
      prop: "cUserName"
    },
    {
      label: "用户电话",
      prop: "phone",
      width: "150px"
    },
    {
      label: "订单号",
      prop: "takeOutOrderNo",
      width: "150px"
    },
    {
      label: "活动渠道",
      prop: "mediaTypeName",
      width: "120px"
    },
    {
      label: "商家承担金额",
      prop: "businessMoney",
      width: "120px"
    },
    {
      label: "返金额",
      prop: "rebateMoney",
      width: "120px"
    },
    {
      label: "评价截图",
      prop: "screenshotImgUrl",
      type: "imgTable",
      width: "100px"
    },
    {
      label: "状态",
      prop: "statusName",
      width: "100px"
    },
    {
      label: "提交时间",
      prop: "createTime",
      width: "180px"
    },
    // {
    //   label: "支付宝账号",
    //   prop: "payAccount",
    //   width: "120px"
    // },
    // {
    //   label: "支付宝姓名",
    //   prop: "payName",
    //   width: "100px"
    // },
    // {
    //   label: "支付状态",
    //   prop: "payStatusName",
    //   width: "100px"
    // },
    // {
    //   label: "支付时间",
    //   prop: "payTime",
    //   width: "100px"
    // },
    // {
    //   label: "支付单号",
    //   prop: "payNo",
    //   width: "300px"
    // },
    // {
    //   label: "支付信息",
    //   prop: "payResultInfo",
    //   width: "150px"
    // }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};


//群二维码表
let AreaGroupManageTableData = {
  table_column: [
    {
      label: "",
      type: "selection",
      fixed: true
    },
    {
      label: "地区编码",
      prop: "adcode",
      width: "100px"
    },
    {
      label: "地区名称",
      prop: "adcodeName",
      width: "150px"
    },
    {
      label: "显示群名",
      prop: "groupName"
    },
    {
      label: "二维码",
      prop: "qrcodeUrl",
      type: "imgTable",
      width: "80px"
    },
    {
      label: "创建人",
      prop: "createUser",
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: "150px"
    },
    {
      label: "修改人",
      prop: "updateUser",
    },
    {
      label: "修改时间",
      prop: "updateTime",
      width: "150px"
    },
    {
      label: "状态",
      prop: "status",
      width: "90px"
    },
    {
      label: "操作",
      prop: "operation",
      width: "120px",
      fixed:'right'
    }
  ],
  parameter: {
    showHeader: true,
    border: true,
    stripe: false,
    height: "100%",
    vLoading: true
  }
};

export default {
  shopListTableData,
  taskListTableData,
  taskListChooseShopTableData,
  taskListChooseStaffTableData,
  staffTableData,
  orderListTableData,
  userTableData,
  withdrawalManageTableData,
  billListTableData,
  setMealListTableData,
  commodityTableData,
  toStoreOrderManageListTableData,
  rebateTableData,
  RebateOrderTableData,
  batchtaskListTableData,
  AreaGroupManageTableData
};
