let GroundDevTreeData2 = [];
let GroundDevTreeData1 = [];
let GroundDevTreeData3 = []
let GroundDevTreeData4 = []
if (sessionStorage.getItem("Dict")) {
  GroundDevTreeData2 = JSON.parse(sessionStorage.getItem("Dict"))
    .GetBranchSystemList ?
    JSON.parse(sessionStorage.getItem("Dict")).GetBranchSystemList : [];
  GroundDevTreeData1 = JSON.parse(sessionStorage.getItem("Dict")).DevTypeList ?
    JSON.parse(sessionStorage.getItem("Dict")).DevTypeList.filter(z => {
      z.DEV_TYPE_NAME = z.NAME;
      z.ID = z.Id
      return z;
    }) : [];
  // 机柜
  GroundDevTreeData3 = JSON.parse(sessionStorage.getItem('Dict')).CabinetList
  GroundDevTreeData3.map(item => {
    item.DEV_TYPE_NAME = item.CABINET_NAME
    // item.value = item.CABINET_ID
  })

  //分布式城市
  GroundDevTreeData4 = JSON.parse(sessionStorage.getItem('Dict')).CityList ? JSON.parse(sessionStorage.getItem('Dict')).CityList.filter(a => {
    a.DEV_TYPE_NAME = a.CITY_NAME
    a.ID = a.CITY_ID
    return a
  }) : ''
  // GroundDevTreeData3 = JSON.parse(sessionStorage.getItem('Dict')).Cabinet ? GroundDevTreeData3 = JSON.parse(sessionStorage.getItem('Dict')).Cabinet : []
}



const maintainTree = [{
    label: "服务器",
    children: GroundDevTreeData1
  },
  {
    label: "交换机",
    children: GroundDevTreeData2
  },
  {
    label: "计算机",
    children: [{
        label: "计算机01"
      },
      {
        label: "计算机02"
      }
    ]
  },
  {
    label: "盘阵",
    children: [{
        label: "盘阵01"
      },
      {
        label: "盘阵02"
      }
    ]
  }
];
let GroundDevTree = [{
  DEV_TYPE_NAME: "中心",
  children: [{
      DEV_TYPE_NAME: "设备类型",
      children: [{
          DEV_TYPE_NAME: "硬件",
          children: []
        },
        {
          DEV_TYPE_NAME: "虚拟机",
          children: []
        }
      ]
    },
    {
      DEV_TYPE_NAME: "大数据",
      children: []
    },
    {
      DEV_TYPE_NAME: "华为私有云",
      children: [{
        DEV_TYPE_NAME: "宿主机",
        className: 'SYS_PhysicalHost'
      }, {
        DEV_TYPE_NAME: "虚拟机",
        className: 'SYS_VM'
      }]
    },
    {
      DEV_TYPE_NAME: "华为桌面云",
      HuaWeiId: "1",
      children: []
    },
    {
      DEV_TYPE_NAME: "精灵云",
      SpiritId: "1",
      children: []
    },
    {
      DEV_TYPE_NAME: "分系统",
      children: []
    },
    {
      DEV_TYPE_NAME: "机柜",
      children: []
    },
  ]
}, {
  DEV_TYPE_NAME: "分布式",
  children: []
}];
// 任务监控数
let taskGuardTree = [{
    label: "用户",
    children: [{
        label: "一局"
      },
      {
        label: "二局"
      },
      {
        label: "三局"
      }
    ]
  },

  {
    label: "频段",
    children: [{
        label: "UHF"
      },
      {
        label: "L"
      },
      {
        label: "S"
      },
      {
        label: "C"
      },
      {
        label: "X"
      }
    ]
  },
  {
    label: "卫星",
    children: [{
        label: "QS0201"
      },
      {
        label: "QS0202"
      },
      {
        label: "QS0301"
      },
      {
        label: "QS0302"
      }
    ]
  },
  {
    label: "环节",
    children: [{
        label: "计划编排",
        tache: "计划编排",
        value: 'is_plan'
      },
      {
        label: "指令上注",
        tache: "指令上注",
        value: 'is_up_sat'
      },
      {
        label: "侦查",
        tache: "侦查",
        value: 'spy_plan'
      },
      {
        label: "数传",
        tache: "数传",
        value: 'tran_plan'
      },
      {
        label: "预处理",
        tache: "预处理",
        value: 'pre_handle'
      },
      {
        label: "分发",
        tache: "分发",
        value: 'dispatch'
      }
    ]
  }
];

//数据流转树菜单
let dataFlowTree = [{
    label: "任务索引号",
    children: [{
        label: "RWSY001"
      },
      {
        label: "RWSY002"
      }
    ]
  },
  {
    label: "任务类型",
    children: [{
        label: "接入任务"
      },
      {
        label: "分发任务"
      }
    ]
  }, {
    label: "申请用户",
    children: [{
        label: "用户1"
      },
      {
        label: "用户2"
      }
    ]
  },
  {
    label: "频段",
    children: [{
        label: "UFC"
      },
      {
        label: "L"
      }
    ]
  },
  {
    label: "发送地",
    children: [{
        label: "UFC"
      },
      {
        label: "L"
      }
    ]
  },
  {
    label: "接收地",
    children: [{
        label: "UFC"
      },
      {
        label: "L"
      }
    ]
  },
  {
    label: "数据类型",
    children: [{
        label: "UFC"
      },
      {
        label: "L"
      }
    ]
  },
  {
    label: "分发方式",
    children: [{
        label: "UFC"
      },
      {
        label: "L"
      }
    ]
  }
]

//dw业务树菜单
let positionTree = [{
    label: "任务索引号",
    children: [{
        label: "RWSY001"
      },
      {
        label: "RWSY002"
      }
    ]
  },
  {
    label: "频段",
    children: [{
        label: "UHF"
      },
      {
        label: "L"
      }
    ]
  },
  {
    label: "卫星",
    children: [{
        label: "卫星1"
      },
      {
        label: "卫星2"
      }
    ]
  },

]
export default {

  maintainTree,
  GroundDevTree,
  taskGuardTree,
  dataFlowTree,
  positionTree
};
