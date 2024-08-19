const taskManage = {
  state: {
    detail: JSON.parse(sessionStorage.getItem("TASK_MANAGER_DETAIL")) || {
      beginDate: "",
      businessId: "",
      businessName: "",
      endDate: "",
      joinRuleType: "",
      mediaType: "",
      receivables: "",
      favourableComment:1,
      recommendedWords: "",
      signUpBeginDate: "",
      signUpEndDate: "",
      taskCode: "自动生成",
      taskDetailId: 1,
      taskRuleReturn: "",
      taskRuleUp: "",
      totalJoinQuota: "",
      userId: "",
      userName: "",
      taskDetail: [{ name: 1, url: Tool.URL + "img/other/taskDetail.jpg" }],
      taskDetailList: [{ name: 1, url: Tool.URL + "img/other/taskDetail.jpg" }]
    }
  },

  mutations: {
    SET_TASK_DETAIL: (state, detail) => {
      state.detail = detail;
    },
    SET_TASK_ONEOF: (state, obj) => {
      state.detail[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
      console.log(state.detail, "state.detail", obj);
    }
  },
  actions: {
    // 选中的商家详情
    activeTaskManager({ commit }, detail) {
      Tool.axios(
        `tbms/b/tasks/${detail.id}`,
        "get",
        {},
        res => {
          console.log(res.data.data, "res.data.data");
          res.data.data.taskDetail = [
            {
              name: res.data.data.taskDetailId,
              url: Tool.URL + res.data.data.taskDetailPath
            }
          ];
          res.data.data.taskDetailList = [
            {
              name: res.data.data.taskDetailId,
              url: Tool.URL + res.data.data.taskDetailPath
            }
          ];
          res.data.data.mediaType = res.data.data.media.mediaType;
          res.data.data.userName = res.data.data.staffName;
          res.data.data.userId = res.data.data.userCode;
          res.data.data.businessName = res.data.data.businessDesc;
          res.data.data.signUpBeginDate = new Date('1970-1-1 '+ res.data.data.signUpBeginDate).formats('yyyy-MM-dd hh:mm');
          res.data.data.signUpEndDate = new Date('1970-1-1 '+ res.data.data.signUpEndDate).formats('yyyy-MM-dd hh:mm');
          console.log(res.data.data, "storedetail");
          commit("SET_TASK_DETAIL", res.data.data);
          sessionStorage.setItem("TASK_MANAGER_DETAIL", JSON.stringify(res.data.data));
        }
      );
    }
  }
};

export default taskManage;
