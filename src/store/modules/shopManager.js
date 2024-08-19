const shopManager = {
  state: {
    detail:JSON.parse(sessionStorage.getItem("SHOP_MANAGER_DETAIL")) || {
        businessCode: "",
        businessName: "",
        contactsUser: "",
        contactsPhone: "",
        saleUserName: "",
        saleUserCode: "",
        platformServiceFee:"",
        status: 1,
        businessDistrict: "",
        categoryId: "",
        categoryIds: [],
        storeCategoryId: "",
        storeCategoryIds:[],
        addressProvince: "",
        addressArea: "",
        addressCity: "",
        addressDetail: "",
        coordinate: "",
        deliveryDistance: "",
        elemeLink: "",
        meituanLink: "",
        elema: [],
        mtma: [],
        logo: [],
        searchKeywords: "",
        meituanUId: ""
      }
  },

  mutations: {
    SET_DETAIL: (state, detail) => {
      state.detail = detail
    },
    SET_SHOP_ONEOF: (state, obj) => {
      state.detail[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
      console.log(state.detail, "state.detail", obj);
    }
  },
  actions: {
    // 选中的商家详情
    activeManager({ commit }, detail) {
        // Tool.axios(`tbms/b/business/detail?businessId=${detail.id}`,'get',{},res=>{
        //   console.log(res.data.data,'res.data.data')
        //   res.data.data.elema = res.data.data.elemePath ? [{name:res.data.data.elemeId,url:Tool.URL+res.data.data.elemePath}] :[];
        //   res.data.data.mtma = res.data.data.meituanPath ? [{name:res.data.data.meituanId,url:Tool.URL+res.data.data.meituanPath}]:[];
        //   res.data.data.logo = res.data.data.logoPath ? [{name:res.data.data.logoId,url:Tool.URL+res.data.data.logoPath}] :[];
        //   res.data.data.coordinate = res.data.data.latitude + "," + res.data.data.longitude;
        //   res.data.data.status == 3 && (res.data.data.status = res.data.data.statusMeaning);
        //   res.data.data.status == 2 && (res.data.data.status = res.data.data.statusMeaning);
          commit('SET_DETAIL', detail);
        //   sessionStorage.setItem('SHOP_MANAGER_DETAIL',JSON.stringify(res.data.data));
        // });
        // console.log(this,'this')
    }
  }
}


export default shopManager
