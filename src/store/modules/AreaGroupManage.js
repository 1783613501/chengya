const AreagroupManage = {
    state: {
      detail: JSON.parse(sessionStorage.getItem("AREAGROUP_DETAIL")) || {
        adcode:"",
        adcodeName:"",
        groupName:"",
        qrcodeUrl:[],

        status:"",
      }
    },
  
    mutations: {
      SET_AREAGROUP_DETAIL: (state, detail) => {
        state.detail = detail;
      },
      SET_AREAGROUP_ONEOF: (state, obj) => {
        state.detail[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
      }
    },
    actions: {
      // 选中的商家详情
      activeAreagroupManager({ commit }, detail) {
        // Tool.axios(
        //   `tbms/b/packages/${detail.packageId}`,
        //   "get",
        //   {},
        //   res => {
        //     console.log(res.data.data, "res.data.data");
            
        //     // res.data.data.productInstructions = [
        //     //   {
        //     //     name: res.data.data.taskDetailId,
        //     //     url: Tool.URL + res.data.data.taskDetailPath
        //     //   }
        //     // ];
            detail.qrcodeUrl = [
              {
                name: detail.id,
                url: detail.qrcodeUrl
              }
            ];
            detail.status = detail.status =='已启用'? '1' : '0';
            console.log('修改store------',detail)
            commit("SET_AREAGROUP_DETAIL", detail);
            sessionStorage.setItem("AREAGROUP_DETAIL", JSON.stringify(detail));
        //   }
        // );
      }
    }
  };
  
  export default AreagroupManage;
  