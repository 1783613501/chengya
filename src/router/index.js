import router from "./routers";
import store from "@/store";
import Config from "@/settings";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // getToken from cookie
import { buildMenus } from "@/api/system/menu";
import { filterAsyncRouter } from "@/store/modules/permission";

import Layout from '../layout/index'

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = sessionStorage.getItem("navTitle") + " - " +  to.meta.title;
  }
  NProgress.start();
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        console.log('store.getters.roles.length')
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch("GetInfo")
          .then(() => {
            // 拉取user_info
            // 动态路由，拉取菜单
            loadMenus(next, to);
          })
          .catch(() => {
            store.dispatch("LogOut").then(() => {
              location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
          });
        // 登录时未拉取 菜单，在此处拉取
      } else if (store.getters.loadMenus) {
        console.log('修改成false，防止死循环')
        // 修改成false，防止死循环
        store.dispatch("updateLoadMenus");
        loadMenus(next, to);
      } else {
        console.log('next()')
        next();
      }
    }
  } else {
    /* has no token*/
    console.log('whiteList.indexOf(to.path) !== -1')
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

const roleMenu = {
  business:{// 商家管理模块  
    alwaysShow: true,
    children: [
      {
        component: "ShopManage/ShopList/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "商家列表管理" },
        name: "shopList",
        path: "shopList",
      },
      {
        component: "ShopManage/OutShopType/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "外卖分类设置" },
        name: "outShopType",
        path: "outShopType"
      },
      {
        component: "ShopManage/InsideShopType/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "到店分类设置" },
        name: "insideShopType",
        path: "insideShopType"
      }
    ],
    component: "Layout",
    hidden: false,
    meta: { icon: "", noCache: true, title: "商家管理" },
    name: "商家管理",
    path: "/shopManage",
    redirect: "noredirect"
  },
  task:{//霸王餐任务管理模块   
    component: "Layout",
    hidden: false,
    children: [
      {
        component: "TaskManage/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "任务管理" },
        name: "taskManageIndex",
        path: "/taskManageIndex",
      }
    ],
    meta: { icon: "", noCache: true, title: "任务管理" },
    name: "任务管理",
    path: "/taskManage",
    redirect: "noredirect"
  },
  order:{//霸王餐订单管理模块   
    component: "Layout",
    hidden: false,
    children: [
      {
        component: "orderManage/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "订单管理" },
        name: "orderManageIndex",
        path: "/orderManageIndex",
      }
    ],
    meta: { icon: "", noCache: true, title: "订单管理" },
    name: "订单管理",
    path: "/orderManage",
    redirect: "noredirect"
  },
  user:{//B用户管理模块 
    component: "Layout",
    hidden: false,
    children: [
      {
        component: "staffManage/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "员工管理" },
        name: "staffManageIndex",
        path: "/staffManageIndex",
      }
    ],
    meta: { icon: "", noCache: true, title: "员工管理" },
    name: "员工管理",
    path: "/staffManage",
    redirect: "noredirect"
  },
  cuser:{//C用户管理模块 
    component: "Layout",
    hidden: false,
    children: [
      {
        component: "userManage/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "用户管理" },
        name: "userManageIndex",
        path: "/userManageIndex",
      }
    ],
    meta: { icon: "", noCache: true, title: "用户管理" },
    name: "用户管理",
    path: "/userManage",
    redirect: "noredirect"
  },
  cash:{//提现管理模块  
    component: "Layout",
    hidden: false,
    children: [
      {
        component: "withdrawalManage/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "提现管理" },
        name: "withdrawalManageIndex",
        path: "/withdrawalManageIndex",
      }
    ],
    meta: { icon: "", noCache: true, title: "提现管理" },
    name: "提现管理",
    path: "/withdrawalManage",
    redirect: "noredirect"
  },
  bill:{//账单管理模块  
    component: "Layout",
    hidden: false,
    children: [
      {
        component: "billManage/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "账单管理" },
        name: "billManageIndex",
        path: "/billManageIndex",
      }
    ],
    meta: { icon: "", noCache: true, title: "账单管理" },
    name: "账单管理",
    path: "/billManage",
    redirect: "noredirect"
  },
  // package:{//到店套餐管理模块    
  //   component: "Layout",
  //   hidden: false,
  //   children: [
  //     {
  //       component: "SetMealManage/index",
  //       hidden: false,
  //       meta: { icon: "", noCache: true, title: "套餐管理" },
  //       name: "merchantPackage",
  //       path: "/merchantPackage",
  //     }
  //   ],
  //   meta: { icon: "", noCache: true, title: "套餐管理" },
  //   name: "套餐管理",
  //   path: "/merchant",
  //   redirect: "noredirect"
  // },
  // packageOrder:{//到店套餐订单管理模块  
  //   component: "Layout",
  //   hidden: false,
  //   children: [
  //     {
  //       component: "toStoreOrderManage/index",
  //       hidden: false,
  //       meta: { icon: "", noCache: true, title: "到店订单管理" },
  //       name: "merchantOrderHere",
  //       path: "/merchantOrderHere",
  //     }
  //   ],
  //   meta: { icon: "", noCache: true, title: "到店订单管理" },
  //   name: "到店订单管理",
  //   path: "/merchantOrder",
  //   redirect: "noredirect"
  // },
  rebate:{//返利餐管理模块 
    component: "Layout",
    hidden: false,
    children: [
      {
        component: "RebateManage/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "返利餐管理" },
        name: "merchantRebate",
        path: "/merchantRebate",
      }
    ],
    meta: { icon: "", noCache: true, title: "返利餐管理" },
    name: "返利餐管理",
    path: "/merchants",
    redirect: "noredirect"
  },
  rebateOrder:{//返利餐订单管理模块   
    component: "Layout",
    hidden: false,
    children: [
      {
        component: "RebateOrder/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "返利餐订单" },
        name: "merchantRebateOrder",
        path: "/merchantRebateOrder",
      }
    ],
    meta: { icon: "", noCache: true, title: "返利餐订单" },
    name: "返利餐订单",
    path: "/nestedssss",
    redirect: "noredirect"
  },
  // roleTemplate:{//权限模板管理模块    
  
  // },
  // role:{//角色管理模块  
  // },
  
  // userRole:{//用户关联角色管理模块  
  // },
  groupQrcode:{//地区群二维码管理模块  
    component: "Layout",
    hidden: false,
    children: [
      {
        component: "AreaGroupManage/index",
        hidden: false,
        meta: { icon: "", noCache: true, title: "群二维码管理" },
        name: "merchantAreaGroup",
        path: "/merchantAreaGroup",
      }
    ],
    meta: { icon: "", noCache: true, title: "群二维码管理" },
    name: "群二维码管理",
    path: "/nestedsssss",
    redirect: "noredirect"
  }
}

export const loadMenus = (next, to) => {

  Tool.axios(`tbms/b/auth/menu`,'get',{},res=>{
    console.log(res,"res----");
    if(!res.data.data || res.data.data.length == 0){
      Tool.that.$message.error("当前账号无任何权限，请联系管理员！");
      next({ path: "/login" });
      // return;
    }
    let menuList = [];
    for (let key in roleMenu) {
      if(res.data.data.find(item => item.key == key)){
        menuList.push(roleMenu[key]);
        console.log(roleMenu[key],key);
      };
    };
    // menuList.push({
    //   path: '/',
    //   component: "Layout",
    //   redirect: "/shopManage/shopList",
    // });
    // router.addRoute({
    //   path: '/',
    //   component: Layout,
    //   redirect: "/shopManage/shopList"
    // });
    // console.log(router.addRoute);
    // debugger;
    const sdata = JSON.parse(JSON.stringify(menuList));
    const rdata = JSON.parse(JSON.stringify(menuList));
    const sidebarRoutes = filterAsyncRouter(sdata);
    const rewriteRoutes = filterAsyncRouter(rdata, false, true);
    rewriteRoutes.push({ path: "*", redirect: "/404", hidden: true });
    console.log('rewriteRoutes' ,rewriteRoutes,sidebarRoutes)
    store.dispatch("GenerateRoutes", rewriteRoutes).then(() => {
      // 存储路由
      router.addRoutes(rewriteRoutes); // 动态添加可访问路由表
      next({ ...to, replace: true });
    });
    store.dispatch("SetSidebarRouters", sidebarRoutes);
    // debugger;
  })

  // const res = [
  //   {
  //     alwaysShow: true,
  //     children: [
  //       {
  //         component: "ShopManage/ShopList/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "商家列表管理" },
  //         name: "shopList",
  //         path: "shopList",
  //       },
  //       {
  //         component: "ShopManage/OutShopType/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "外卖分类设置" },
  //         name: "outShopType",
  //         path: "outShopType"
  //       },
  //       {
  //         component: "ShopManage/InsideShopType/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "到店分类设置" },
  //         name: "insideShopType",
  //         path: "insideShopType"
  //       }
  //     ],
  //     component: "Layout",
  //     hidden: false,
  //     meta: { icon: "", noCache: true, title: "商家管理" },
  //     name: "商家管理",
  //     path: "/shopManage",
  //     redirect: "noredirect"
  //   },
  //   {
  //     component: "Layout",
  //     hidden: false,
  //     children: [
  //       {
  //         component: "TaskManage/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "任务管理" },
  //         name: "taskManageIndex",
  //         path: "/taskManageIndex",
  //       }
  //     ],
  //     meta: { icon: "", noCache: true, title: "任务管理" },
  //     name: "任务管理",
  //     path: "/taskManage",
  //     redirect: "noredirect"
  //   },
  //   {
  //     component: "Layout",
  //     hidden: false,
  //     children: [
  //       {
  //         component: "orderManage/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "订单管理" },
  //         name: "orderManageIndex",
  //         path: "/orderManageIndex",
  //       }
  //     ],
  //     meta: { icon: "", noCache: true, title: "订单管理" },
  //     name: "订单管理",
  //     path: "/orderManage",
  //     redirect: "noredirect"
  //   },
  //   {
  //     component: "Layout",
  //     hidden: false,
  //     children: [
  //       {
  //         component: "userManage/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "用户管理" },
  //         name: "userManageIndex",
  //         path: "/userManageIndex",
  //       }
  //     ],
  //     meta: { icon: "", noCache: true, title: "用户管理" },
  //     name: "用户管理",
  //     path: "/userManage",
  //     redirect: "noredirect"
  //   },

  //   {
  //     component: "Layout",
  //     hidden: false,
  //     children: [
  //       {
  //         component: "staffManage/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "员工管理" },
  //         name: "staffManageIndex",
  //         path: "/staffManageIndex",
  //       }
  //     ],
  //     meta: { icon: "", noCache: true, title: "员工管理" },
  //     name: "员工管理",
  //     path: "/staffManage",
  //     redirect: "noredirect"
  //   },

  //   {
  //     component: "Layout",
  //     hidden: false,
  //     children: [
  //       {
  //         component: "withdrawalManage/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "提现管理" },
  //         name: "withdrawalManageIndex",
  //         path: "/withdrawalManageIndex",
  //       }
  //     ],
  //     meta: { icon: "", noCache: true, title: "提现管理" },
  //     name: "提现管理",
  //     path: "/withdrawalManage",
  //     redirect: "noredirect"
  //   },
  //   {
  //     component: "Layout",
  //     hidden: false,
  //     children: [
  //       {
  //         component: "billManage/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "账单管理" },
  //         name: "billManageIndex",
  //         path: "/billManageIndex",
  //       }
  //     ],
  //     meta: { icon: "", noCache: true, title: "账单管理" },
  //     name: "账单管理",
  //     path: "/billManage",
  //     redirect: "noredirect"
  //   },
  //   // {
  //   //   component: "Layout",
  //   //   hidden: false,
  //   //   children: [
  //   //     {
  //   //       component: "SetMealManage/index",
  //   //       hidden: false,
  //   //       meta: { icon: "", noCache: true, title: "套餐管理" },
  //   //       name: "merchantPackage",
  //   //       path: "/merchantPackage",
  //   //     }
  //   //   ],
  //   //   meta: { icon: "", noCache: true, title: "套餐管理" },
  //   //   name: "套餐管理",
  //   //   path: "/merchant",
  //   //   redirect: "noredirect"
  //   // },
  //   // {
  //   //   component: "Layout",
  //   //   hidden: false,
  //   //   children: [
  //   //     {
  //   //       component: "toStoreOrderManage/index",
  //   //       hidden: false,
  //   //       meta: { icon: "", noCache: true, title: "到店订单管理" },
  //   //       name: "merchantOrderHere",
  //   //       path: "/merchantOrderHere",
  //   //     }
  //   //   ],
  //   //   meta: { icon: "", noCache: true, title: "到店订单管理" },
  //   //   name: "到店订单管理",
  //   //   path: "/merchantOrder",
  //   //   redirect: "noredirect"
  //   // },
  //   {
  //     component: "Layout",
  //     hidden: false,
  //     children: [
  //       {
  //         component: "RebateManage/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "返利餐管理" },
  //         name: "merchantRebate",
  //         path: "/merchantRebate",
  //       }
  //     ],
  //     meta: { icon: "", noCache: true, title: "返利餐管理" },
  //     name: "返利餐管理",
  //     path: "/merchants",
  //     redirect: "noredirect"
  //   },
  //   {
  //     component: "Layout",
  //     hidden: false,
  //     children: [
  //       {
  //         component: "RebateOrder/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "返利餐订单" },
  //         name: "merchantRebateOrder",
  //         path: "/merchantRebateOrder",
  //       }
  //     ],
  //     meta: { icon: "", noCache: true, title: "返利餐订单" },
  //     name: "返利餐订单",
  //     path: "/nestedssss",
  //     redirect: "noredirect"
  //   },
  //   {
  //     component: "Layout",
  //     hidden: false,
  //     children: [
  //       {
  //         component: "AreaGroupManage/index",
  //         hidden: false,
  //         meta: { icon: "", noCache: true, title: "群二维码管理" },
  //         name: "merchantAreaGroup",
  //         path: "/merchantAreaGroup",
  //       }
  //     ],
  //     meta: { icon: "", noCache: true, title: "群二维码管理" },
  //     name: "群二维码管理",
  //     path: "/nestedsssss",
  //     redirect: "noredirect"
  //   }
  // ];
  // 
  // const sdata = JSON.parse(JSON.stringify(res));
  // const rdata = JSON.parse(JSON.stringify(res));
  // const sidebarRoutes = filterAsyncRouter(sdata);
  // const rewriteRoutes = filterAsyncRouter(rdata, false, true);
  // rewriteRoutes.push({ path: "*", redirect: "/404", hidden: true });
  // console.log('rewriteRoutes' ,rewriteRoutes,sidebarRoutes)
  // store.dispatch("GenerateRoutes", rewriteRoutes).then(() => {
  //   // 存储路由
  //   router.addRoutes(rewriteRoutes); // 动态添加可访问路由表
  //   next({ ...to, replace: true });
  // });
  // store.dispatch("SetSidebarRouters", sidebarRoutes);
  // buildMenus().then(res => {
  // })
};

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
