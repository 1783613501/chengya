const menuData = [{
    name: '全景监视',
    img: '',
    url: '/index/all'
  },

  {
    name: '卫星监视',
    img: '',
    url: '/index/satGuard'
  }, {
    name: '中心系统运行态势',
    img: '',
    url: '/index/CentreSys'
  }, {
    name: '低轨卫星运行态势',
    img: '',
    url: '/index/lowSat'
  },
  {
    name: '高轨卫星运行态势',
    img: '',
    url: '/index/highSat'
  },
  // {
  //   name: "运维管理",
  //   img: "",
  //   url: "/maintain"
  // },
  // {
  //   name: "地面装备管理",
  //   img: "",
  //   url: "/groundDev"
  // },
  {
    name: '设备管理',
    img: '',
    children: [{
        name: '中心',
        url: '/index/devManage'
      },
      {
        name: '前哨三',
        url: '/index/original'
      }
    ],
    url: ''
  },
  {
    name: '任务监视',
    img: '',
    url: '/index/task'
  }, {
    name: '定位业务',
    img: '',
    url: '/index/position'
  }, {
    name: '数据流转',
    img: '',
    url: '/index/dataflow'
  },
  {
    name: '健康管理',
    img: '',
    url: '/index/health'
  },
  {
    name: '绩效评估',
    img: '',
    url: '/index/performance'
  },
  {
    name: '系统管理',
    img: '',
    children: [{
        name: '用户管理',
        url: '/index/sysUser'
      },
      {
        name: '角色管理',
        url: '/index/sysRole'
      },

      {
        name: '菜单管理',
        url: '/index/sysMenu'
      }
    ]
  }
];
export default {
  menuData,
};
