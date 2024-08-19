const SetMealManage = {
    state: {
      detail: JSON.parse(sessionStorage.getItem("SETMEAL_MANAGER_DETAIL")) || {
        userName:"",
        userId:null,
        businessName:"",
        businessCodes:"",
        packageName:"",
        packageCode:"自动生成",
        onChannel:"全渠道",
        originalPrice:null,
        sellPrice:null,
        vipPrice:null,
        termValidityStartTime:"",
        termValidityEndTime:"",
        totalCount:null,
        status:null,
        purchaseInstructions:"",
        productInstructionsId:"",
        refundRequest:null,
        reservationRequest:null,
        amountOfPoints:null,
        goodsDetailVOList:[],
        productInstructions: [],
        productInstructionsList: [],
      }
    },
  
    mutations: {
      SET_SETMEAL_DETAIL: (state, detail) => {
        state.detail = detail;
      },
      SET_SETMEAL_ONEOF: (state, obj) => {
        state.detail[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
        console.log(state.detail, "state.detail", obj);
      }
    },
    actions: {
      // 选中的商家详情
      activeSetMealManager({ commit }, detail) {
        console.log(detail)
        Tool.axios(
          `tbms/b/packages/${detail.packageId}`,
          "get",
          {},
          res => {
            console.log(res.data.data, "res.data.data");
            res.data.data.goodsDetailList.forEach(item=>{
                item.editButton = true
            })
            res.data.data.goodsDetailVOList = res.data.data.goodsDetailList;
            res.data.data.packageBusinessList.forEach((item,ind)=>{
                if(ind==0){
                    res.data.data.businessCode = [item.businessCode];
                    res.data.data.businessName = item.businessName;

                }else{
                    res.data.data.businessName += ' , ' + item.businessName;
                    res.data.data.businessCode.push(item.businessCode);
                }
                
            });
            res.data.data.goodsDetailVOList = res.data.data.goodsDetailList;
            res.data.data.termValidityTime = [res.data.data.termValidityStartTime,res.data.data.termValidityEndTime];
            res.data.data.productInstructionsId = res.data.data.productInstructions;
            res.data.data.productInstructions = [];
            res.data.data.productInstructionsUrls.split(",").forEach((item,ind)=>{
                res.data.data.productInstructions.push(
                    {
                        name: res.data.data.productInstructionsId.split(",")[ind],
                        url: Tool.URL + item
                    }
                )
            })
            // res.data.data.productInstructions = [
            //   {
            //     name: res.data.data.taskDetailId,
            //     url: Tool.URL + res.data.data.taskDetailPath
            //   }
            // ];
            console.log('修改store------',res.data.data)
            commit("SET_SETMEAL_DETAIL", res.data.data);
            sessionStorage.setItem("SETMEAL_MANAGER_DETAIL", JSON.stringify(res.data.data));
          }
        );
      }
    }
  };
  
  export default SetMealManage;
  