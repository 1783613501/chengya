// import router from "./routers";
var Tool = {};
Tool.that = null;

Tool.uiGetThis = function (data) {
  Tool.that = data
}
Tool.URL = '/'
// Tool.URL = 'https://tbms-btest.lantu7.cn/';

Tool.isPastdue=false;
Tool.axios = function (url, method,json, callBack, type) {
  let token=JSON.parse(sessionStorage.getItem('login'));
  console.log(json)
  if (!type) {
    Tool.that.$axios({
      url: Tool.URL + url,
      method,
      asyns: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':token?token.token:''
      },
      transformRequest: [function (data, headers) {
        let ret = '';
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'));
        return ret
      }],
      data: json
    }).then(res => {
      if(res.data=='token is outTime') {
        if(!Tool.isPastdue){
          Tool.isPastdue=true
          Tool.that.$alert("登录过期,请重新登录", "退出登录", {
            confirmButtonText: "确定",
            type: "warning"
          }).then(res => {
            document.cookie = "TBMSH5SESSION=";
              Tool.that.$router.push("/");
          }).catch(()=>{
            document.cookie = "TBMSH5SESSION=";
            Tool.that.$router.push("/");
          });
        }
      }
      console.log(res)
      if (res.status == 200 && res.data.msg == '操作成功' && res.data.code == 1 ) {
        callBack(res)
      } else {
        callBack(res);
        Tool.that.$message.error(res.data.msg);
      }
    }).catch(e=>{
      if(e.response && e.response.status == 401){
        Tool.that.$alert("登录过期,请重新登录", "退出登录", {
          confirmButtonText: "确定",
          type: "warning"
        }).then(res => {
            document.cookie = "TBMSH5SESSION=";
            Tool.that.$router.push("/login");
        }).catch(()=>{
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/");
        });
      }
    })
  } else if (type == 'D') {   
    Tool.that.$axios({
      url: Tool.URL + url,
      method,
      asyns: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':token?token.token:''
      },
      transformRequest: [function (data, headers) {
        let ret = '';
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + data[it] + '&'
        }
        //console.log(ret.lastIndexOf('&'))
        ret = ret.substring(0, ret.lastIndexOf('&'));
        return ret
      }],
      data: json
    }).then(res => {
      if (res.data.code == 1 || res.data.mag == '操作成功' || res.status == 200) {
        if(res.data=='token is outTime') {
          if(!Tool.isPastdue){
            Tool.isPastdue=true
            
          }
        }else{
          callBack(res)
        }
      } else {
        Tool.that.$message.error(res.data)
      }
    }).catch(e=>{
      console.log(e.response,"401了--------");
      
      if(e.response.status == 401){
        Tool.that.$alert("登录过期,请重新登录", "退出登录", {
          confirmButtonText: "确定",
          type: "warning"
        }).then(res => {
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/login");
        }).catch(()=>{
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/");
        });
      }
    })
  } else if (type == 'E') {     
    Tool.that.$axios({
      url: Tool.URL + url,
      method,
      asyns: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':token?token.token:''
      },
      transformRequest: [function (data, headers) {
        let ret = '';
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + "["+data[it]+"]" + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'));
        return ret
      }],
      data: json
    }).then(res => {
      if (res.data.code == 1 || res.data.mag == '操作成功' || res.status == 200) {
        if(res.data=='token is outTime') {
          if(!Tool.isPastdue){
            Tool.isPastdue=true
            Tool.that.$alert("登录过期,请重新登录", "退出登录", {
              confirmButtonText: "确定",
              type: "warning"
            }).then(res => {
              document.cookie = "TBMSH5SESSION=";
              Tool.that.$router.push("/");
            }).catch(()=>{
              document.cookie = "TBMSH5SESSION=";
              Tool.that.$router.push("/");
            });
          }
          
        }else{
          callBack(res)
        }
      } else {
        Tool.that.$message.error(res.data)
      }
    }).catch(e=>{
      console.log(e.response,"401了--------");
      if(e.response.status == 401){
        Tool.that.$alert("登录过期,请重新登录", "退出登录", {
          confirmButtonText: "确定",
          type: "warning"
        }).then(res => {
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/login");
        }).catch(()=>{
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/");
        });
      }
    })
  } else if (type == 'blob') {     
    Tool.that.$axios({
      url: Tool.URL + url,
      method,
      asyns: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':token?token.token:''
      },
      responseType: "blob",
      transformRequest: [function (data, headers) {
        let ret = '';
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + "["+data[it]+"]" + '&'
        }
        ret = ret.substring(0, ret.lastIndexOf('&'));
        return ret
      }],
      data: json
    }).then(res => {
      if (res.data.code == 1 || res.data.mag == '操作成功' || res.status == 200) {
        if(res.data=='token is outTime') {
          if(!Tool.isPastdue){
            Tool.isPastdue=true
            Tool.that.$alert("登录过期,请重新登录", "退出登录", {
              confirmButtonText: "确定",
              type: "warning"
            }).then(res => {
              document.cookie = "TBMSH5SESSION=";
              Tool.that.$router.push("/");
            }).catch(()=>{
              document.cookie = "TBMSH5SESSION=";
              Tool.that.$router.push("/");
            });
          }
          
        }else{
          callBack(res)
        }
      } else {
        Tool.that.$message.error(res.data)
      }
    }).catch(e=>{
      console.log(e.response,"401了--------");
      if(e.response.status == 401){
        Tool.that.$alert("登录过期,请重新登录", "退出登录", {
          confirmButtonText: "确定",
          type: "warning"
        }).then(res => {
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/login");
        }).catch(()=>{
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/");
        });
      }
    })
  } else if (type == 'formData') {  
    Tool.that.$axios({
      url: Tool.URL + url,
      method,
      asyns: true,
      headers: {
        'Content-Type': 'multipart/form-data;',
        'token':token?token.token:''
      },
      data: json
    }).then(res => {
      if (res.data.code == 1 || res.data.mag == '操作成功' || res.status == 200) {
        if(res.data=='token is outTime') {
          if(!Tool.isPastdue){
            Tool.isPastdue=true
            Tool.that.$alert("登录过期,请重新登录", "退出登录", {
              confirmButtonText: "确定",
              type: "warning"
            }).then(res => {
              document.cookie = "TBMSH5SESSION=";
              Tool.that.$router.push("/");
            }).catch(()=>{
              document.cookie = "TBMSH5SESSION=";
              Tool.that.$router.push("/");
            });
          }
          
        }else{
          callBack(res)
        }
      } else {
        Tool.that.$message.error(res.data)
      }
    }).catch(e=>{
      console.log(e.response,"401了--------");
      if(e.response.status == 401){
        Tool.that.$alert("登录过期,请重新登录", "退出登录", {
          confirmButtonText: "确定",
          type: "warning"
        }).then(res => {
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/login");
        }).catch(()=>{
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/");
        });
      }
    })
  } else {
    Tool.that.$axios({
      url: Tool.URL + url,
      method,
      headers: {
        'Content-Type': 'application/json',
        'token':token?token.token:''
      },
      data: json
    }).then(res => {
      console.log(res);
      if (res.data.code == 1 || res.data.mag == '操作成功' || res.status == 200) {
        if(res.data=='token is outTime') {
          if(!Tool.isPastdue){
            Tool.isPastdue=true
            Tool.that.$alert("登录过期,请重新登录", "退出登录", {
              confirmButtonText: "确定",
              type: "warning"
            }).then(res => {
              document.cookie = "TBMSH5SESSION=";
              Tool.that.$router.push("/");
            }).catch(()=>{
              document.cookie = "TBMSH5SESSION=";
              Tool.that.$router.push("/");
            });
          }
        }else if(res.data.code==0 && res.data.msg == "无权访问!"){
          Tool.that.$router.push({ path: '/401' });
        }else{
          callBack(res)
        }
      } else{
        Tool.that.$message.error(res.data.data)
      }
    }).catch(e=>{
      console.log(e);
      // debugger;
      if(e.response && e.response.status == 401){
        Tool.that.$alert("登录过期,请重新登录", "退出登录", {
          confirmButtonText: "确定",
          type: "warning"
        }).then(res => {
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/login");
        }).catch(()=>{
          document.cookie = "TBMSH5SESSION=";
          Tool.that.$router.push("/");
        });
      }
    })
  }
  // 
}
//特殊字符
Tool.pattern = new RegExp("[`~!@#$^&*()|%{}';',\\[\\]<>《》/?~!@#￥……&*（）——|{}【】’；：‘。，？]")
//
Tool.uiGetStatusParse = function () {

}

Tool.uiGetDict = function () {};
/**
 * 对象深度克隆(不带function)。
 *
 * @param {Object} obj 被克隆对象.
 * @returns {Object} 克隆出的新对象.
 */
Tool.CloneObj = function (obj) {
  var str,
    newobj = obj.constructor === Array ? [] : {};
  if (typeof obj !== "object") {
    return;
  } else if (window.JSON) {
    str = JSON.stringify(obj);
    newobj = JSON.parse(str);
  } else {
    for (var i in obj) {
      newobj[i] = typeof obj[i] === "object" ? Tools.cloneObj(obj[i]) : obj[i];
    }
  }
  return newobj;
};

/**
 * 判断字段是否为空
 */
Tool.IsEmpty = function (obj) {
  if (obj === undefined || obj === null || obj === "" || obj === NaN) {
    return true;
  }
  return false;
};

Tool.GetHashKey = function (pos) {
  return parseInt(pos.Lon) * 360 + (0 - parseInt(pos.Lat));
};

Tool.GetDatasVectors2 = function (eirpDat) {
  try {
    var datasVectors = null;

    if (Tool.IsEmpty(eirpDat)) {
      return datasVectors;
    }
    var eirps = Tool.GetEirps(eirpDat);
    if (eirps != null && eirps.length > 0) {
      var minV = 0.0;
      var maxV = 0.0;
      datasVectors = Tool.GetDatasVectors(eirps, minV, maxV);
    }

    return datasVectors;
  } catch (e) {
    return null;
  }
};

Tool.GetEirps = function (beamText) {
  if (Tool.IsEmpty(beamText)) {
    return null;
  }
  try {
    var eirps = [];
    if (beamText.indexOf("EIRP") === -1) {
      return null;
    }
    var txt = beamText.substring("EIRP:".length);
    var ss = txt.split(",");
    var m = 0;

    for (var i = 0; i < ss.length; i++) {
      var ei = {
        Lon: 0,
        Lat: 0,
        Val: 0
      };
      var v = parseFloat(ss[i]);

      if (m == 0) {
        ei.Lon = v;
        m = 1;
      } else if (m == 1) {
        ei.Lat = v;
        m = 2;
      } else if (m == 2) {
        ei.Val = v;
        m = 0;
        eirps.push(ei);
      }
    }

    return eirps;
  } catch (e) {
    return null;
  }
};

Tool.GetDatasVectors = function (eirps, minV, maxV) {
  if (eirps == null || eirps.length <= 0) {
    return null;
  }
  try {
    var Dats = new Array();
    var minV = 999999;
    var maxV = -999999;

    for (var x = 0; x < 360; x++) {
      Dats[x] = new Array(x);
      for (var y = 0; y < 180; y++) {
        Dats[x][y] = {
          X: x < 180 ? x : x - 360,
          Y: 90 - y,
          Z: 0
        };
      }
    }
    if (eirps != null && eirps.length > 0) {
      for (var i = 0; i < eirps.length; i++) {
        var ei = eirps[i];
        var x = Math.round(ei.Lon);

        if (x < 0) {
          x += 360;
        }

        var y = 90 - Math.round(ei.Lat);
        var v = ei.Val;

        if (minV > v) {
          minV = v;
        }
        if (maxV < v) {
          maxV = v;
        }

        Dats[x][y].Z = v;
      }
    }

    return Dats;
  } catch (e) {
    return null;
  }
};
/**
 * 时间格式转换
 */


Date.prototype.formats = function (format) {
  "use strict";

  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMinutes()
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return format;
};

/**
 * 时间按秒元整
 */
Date.prototype.Round = function (secends) {
  return new Date(
    Math.floor(this.valueOf() / (secends * 1000)) * (secends * 1000)
  );
};
Date.prototype.AddDays = function (d) {
  return new Date(this.valueOf() + d * 3600 * 24 * 1000);
  //return new Date( Math.floor(this.valueOf()/(secends*1000))*(secends*1000));
};

/**
 * 数据库链接错误弹窗
 */
Tool.errorMsg = function (vueobj, msg) {
  vueobj.$message.error("获取【" + msg + "】数据失败");
};

/**
 * 字典去重(去掉英文缩写的项)
 */
Tool.dictionaryDelRepeat = function (obj) {
  var returnobj = [];
  var keyarr = [];
  for (var i = 0; i < obj.length; i++) {
    var maxlenthobj = obj[i];
    for (var j = 0; j < obj.length; j++) {
      if (obj[i].NAME_CN == obj[j].NAME_CN) {
        maxlenthobj =
          maxlenthobj.NAME_EN.length > obj[j].NAME_EN.length ?
          maxlenthobj :
          obj[j];
      }
    }
    if (keyarr.indexOf(maxlenthobj.NAME_CN) == -1) {
      keyarr.push(maxlenthobj.NAME_CN);
      returnobj.push(maxlenthobj);
    }
  }
  return returnobj;
};
/**
 * 数字输入框格式校验(禁止输入e)
 */
Tool.inputNumber = function () {
  var oinput = $("input[type=number]");
  for (var i = 0; i < oinput.length; i++) {
    oinput[i].onkeypress = function (event) {
      if (event.keyCode == 46) {
        if (
          $(this)
          .val()
          .split(".")[0] == ""
        ) {
          return false;
        }
        if (
          $(this)
          .val()
          .indexOf(".") != -1
        ) {
          return false;
        }
      }
      return /[\d\.]/.test(String.fromCharCode(event.keyCode));
    };
  }
};
