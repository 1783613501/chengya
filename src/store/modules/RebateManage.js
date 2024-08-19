const RebateManage = {
    state: {
      detail: JSON.parse(sessionStorage.getItem("REBATE_MANAGER_DETAIL")) || {
        userName:"",
        salesPersonId:null,
        businessName:"",
        businessId:"",
        rebate1Money:"",
        rebateMoney:"",
        business1Money:"",
        businessMoney:"",
        mediaType:"",
        comments:""
      }
    },
  
    mutations: {
      SET_REBATE_DETAIL: (state, detail) => {
        state.detail = detail;
      },
      SET_REBATE_ONEOF: (state, obj) => {
        state.detail[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
        console.log(state.detail, "state.detail", obj);
      }
    },
    actions: {
      // 选中的商家详情
      activeRebateManager({ commit }, detail) {
        console.log(detail)
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
        //     console.log('修改store------',res.data.data)
            commit("SET_REBATE_DETAIL", detail);
            sessionStorage.setItem("REBATE_MANAGER_DETAIL", JSON.stringify(detail));
        //   }
        // );
      }
    }
  };
  
  export default RebateManage;
  