let config = {
  rotate: 90,
  align: 'left',
  verticalAlign: 'middle',
  position: 'insideBottom',
  distance: 15,
  onChange: function () {
    var labelOption = {
      normal: {
        rotate: config.rotate,
        align: config.align,
        verticalAlign: config.verticalAlign,
        position: config.position,
        distance: config.distance
      }
    };
    myChart.setOption({
      series: [{
        label: labelOption
      }, {
        label: labelOption
      }, {
        label: labelOption
      }, {
        label: labelOption
      }]
    });
  }
};


var labelOption = {
  normal: {
    show: true,
    position: config.position,
    distance: config.distance,
    align: config.align,
    verticalAlign: config.verticalAlign,
    rotate: config.rotate,

    fontSize: 12,
    rich: {
      name: {
        textBorderColor: '#fff'
      }
    }
  }
};


let xAxis = {
  type: 'value',
  axisLine: {
    lineStyle: {
      color: '#6888a2'
    }
  }

}
let toolbox = {
  show: true,
  right: 20,
  feature: {
    saveAsImage: {}
  }
}
const echart = {
  id: 'echart1',
  option: {
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['正在进行', '已下发', '已完成', '未下发'],
      textStyle: {
        color: '#ccc'
      }
    },
    toolbox: {
      show: true,
      right: 20,
      feature: {
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: ['2019.11.01', '2019.11.05', '2019.11.10', '2019.11.15', '2019.11.20', '2019.11.25', '2019.11.30'],
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      }
    }],
    yAxis: [{
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      }
    }],
    series: [{
        name: '正在进行',
        type: 'line',
        tiled: '总量',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '已下发',
        type: 'line',
        tiled: '总量',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '已完成',
        type: 'line',
        tiled: '总量',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '未下发',
        type: 'line',
        tiled: '总量',
        data: [320, 332, 301, 334, 390, 330, 320]
      }
    ]
  }
}
//用户统计
let userEchart = {
  // color: ['#00cccc', '#0066cc', '#437bfe', '#6c41ff', '#8f6fff'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  toolbox: toolbox,
  legend: {
    type: 'scroll',



    x: 'center',
    y: 'bottom',
    data: ['单位1', '单位2', '单位3', '单位4', '单位5']
  },

  calculable: true,
  series: [{
      name: '单位在线',
      type: 'pie',
      radius: [20, 100],
      center: ['50%', '43%'],
      roseType: 'radius',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      lableLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: true
        }
      },
      data: [{
          value: 10,
          name: '单位1'
        },
        {
          value: 5,
          name: '单位2'
        },
        {
          value: 15,
          name: '单位3'
        },
        {
          value: 25,
          name: '单位4'
        },
        {
          value: 20,
          name: '单位5'
        }

      ]
    }

  ]
}
//数据统计
let dataEchart = {
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  toolbox: toolbox,
  legend: this.data ? this.data.legend : {

    // x: 'right',
    textStyle: {
      color: '#000'
    },
    right: 50,
    top: '0',
    data: ['数据量（G）', '文件数（个）']
  },
  grid: {
    top: '30',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: this.data ? this.data.xAxis : [{
    type: 'category',
    data: ['原始数据', '预处理', '数据分发', '数据处理'],
    axisTick: {
      alignWithLabel: true
    },
    axisLine: {
      lineStyle: {
        color: '#000'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#000'
      }
    }
  }],
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#000'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#000'
      }
    }
  }],
  series: this.data ? this.data.series : [{
      name: '数据量（G）',
      type: 'bar',
      barGap: '30%',
      itemStyle: {
        color: '#012f6d'
      },
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: [2.0, 4.9, 7.0, 23.2]

    },
    {
      name: '文件数（个）',
      type: 'bar',
      barGap: '30%',
      itemStyle: {
        color: '#7f86f4'
      },
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: [2.6, 5.9, 9.0, 26.4]

    }
  ]
}
//任务统计
let taskEchart = {
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  toolbox: toolbox,
  grid: {
    top: '30',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: this.data ? this.data.xAxis : [{
    type: 'category',
   
    nameTextStyle:{
      fontSize:12
    },
    data: [],
    axisTick: {
      alignWithLabel: true
    },
    axisLine: {
      lineStyle: {
        color: '#000'
      }
    },
    axisLabel: {
      interval:0,
      textStyle: {
        color: '#000'
      }
    }
  }],
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#000'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#000'
      }
    }
  }],
  series: this.data ? this.data.series : [{
      name: '总任务数',
      
      // barWidth:'10',
      type: 'bar',
      barGap: '30%',
      itemStyle: {
        color: '#012f6d',
      },
      
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      data: [2.0, 4.9, 7.0, 23.2]

    }
  ]
}
// 设备故障次数
let performanceDevFaclt = {
  title: {
    text: "故障次数",
    show: false
  },
  toolbox: {
    show: true,
    right: 20,
    feature: {
      saveAsImage: {}
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },

  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: 25,
    containLabel: true
  },
  xAxis: xAxis,
  yAxis: {
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    },
    data: ['设备01', '设备02', '设备03', '设备04', '设备05', '设备06']
  },
  series: [{
    // name: '2011年',
    type: 'bar',
    itemStyle: {
      normal: {
        color: '#990066'
      }
    },
    data: [18203, 23489, 29034, 104970, 131744, 630230]
  }]
}
// 故障修复
let performanceDevTask = {
  title: {
    text: "故障修复",
    show: false
  },
  toolbox: {
    show: true,
    right: 20,
    feature: {
      saveAsImage: {}
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    // data: ['完成数', '失败数', '正在执行数'],
    textStyle: {
      color: '#6888a2'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '30px',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }

  },
  yAxis: {
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    },
    data: ['设备01', '设备02', '设备03', '设备04', '设备05', '设备06', '设备07']
  },
  series: [{
    // name: '完成数',
    type: 'bar',
    stack: '总量',
    label: {
      normal: {
        show: true,
        position: 'insideRight'
      }
    },
    itemStyle: {
      normal: {
        color: '#326887'
      }
    },
    data: [320, 302, 301, 334, 390, 330, 320]
  }, ]
}
// 任务环节
let performanceDevTaskType = {
  title: {
    text: "任务环节",
    show: false
  },
  toolbox: toolbox,
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
 
  legend: {
    textStyle: {
      color: '#6888a2'
    },
    data: ['任务总数', '任务成功', '分发任务']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {

    nameTextStyle: {
      color: '#6888a2'
    },
    axisLine: {

      lineStyle: {
        color: '#6888a2'
      }
    },
    type: 'category',
    data: ['东部', '西部', '南部','北部','中部','二局','十局','57所']
  },
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  }],
  series: [

    {
      name: '任务总数',
      type: 'bar',
      barGap: 0,

      label: labelOption,
      itemStyle: {
        normal: {
          color: '#326887'
        }
      },
      data: [120, 132, 101]
    },
    {
      name: '任务成功',
      type: 'bar',

      label: labelOption,
      itemStyle: {
        normal: {
          color: '#009900'
        }
      },
      data: [220, 182, 191]
    },
    {
      name: '分发任务',
      type: 'bar',

      label: labelOption,
      itemStyle: {
        normal: {
          color: '#e6a23c'
        }
      },
      data: [150, 232, 201]
    }
  ]
}
//故障环节
let PerformanceDevgzType = {
  title: {
    text: "故障环节",
    show: false
  },
  toolbox: toolbox,
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    textStyle: {
      color: '#6888a2'
    },
    // data: ['完成', '失败', '正在执行']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    nameTextStyle: {
      color: '#6888a2'
    },
    axisLine: {

      lineStyle: {
        color: '#6888a2'
      }
    },
    type: 'category',
    data: ['通信任务', '雷达任务', '侦查任务']
  },
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  }],
  series: [{
    // name: '完成',
    type: 'bar',
    stack: '广告',
    itemStyle: {
      normal: {
        color: '#990000'
      }
    },
    label: {
      normal: {
        show: true,
        position: 'insideRight'
      }
    },
    data: [120, 132, 101]
  }]
}
//工作时长
let PerformanceDevWorktime = {
  title: {
    text: "工作时长",
    show: false
  },
  toolbox: toolbox,
  color: ['#054962'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      alignWithLabel: true
    },
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  },
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  }],
  series: [{
    name: '工作时长',
    type: 'bar',
    barWidth: '60%',
    label: {
      normal: {
        show: true,
        position: 'insideRight'
      }
    },
    data: [10, 52, 200, 334, 390, 330, 220]
  }]
}
//绩效目标
let performanceDevGoalType = {
  title: {
    text: "常用目标",
    show: false
  },
  toolbox: toolbox,
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    textStyle: {
      color: '#6888a2'
    },
    data: ['通知信息', '错误信息', '告警信息']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {

    nameTextStyle: {
      color: '#6888a2'
    },
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    },
    type: 'category',
    data: ['通信任务', '雷达任务', '侦查任务']
  },
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  }],
  series: [

    {
      name: '通知信息',
      type: 'bar',

      itemStyle: {
        normal: {
          color: '#326887'
        }
      },
      label: labelOption,
      data: [120, 132, 101]
    },
    {
      name: '错误信息',
      type: 'bar',

      itemStyle: {
        normal: {
          color: '#990000'
        }
      },
      label: labelOption,
      data: [220, 182, 191]
    },
    {
      name: '告警信息',
      type: 'bar',

      label: labelOption,
      itemStyle: {
        normal: {
          color: '#944e4e'
        }
      },
      data: [150, 232, 201]
    }
  ]
}
//常用频段
let PerformanceDevRange = {
  title: {
    text: "常用频段",
    show: false
  },
  toolbox: toolbox,
  color: ['#054962'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      alignWithLabel: true
    },
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  },
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  }],
  series: [{
    name: '频段',
    type: 'bar',
    barWidth: '60%',
    label: {
      normal: {
        show: true,
        position: 'insideRight'
      }
    },
    data: [10, 52, 200, 334, 390, 330, 220]
  }]
}
//故障类型
let PerformanceDevRange2 = {
  title: {
    text: "故障类型",
    show: false
  },
  toolbox: toolbox,
  color: ['#054962'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      alignWithLabel: true
    },
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  },
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  }],
  series: [{
    name: '频段',
    type: 'bar',
    barWidth: '60%',
    label: {
      normal: {
        show: true,
        position: 'insideRight'
      }
    },
    data: [10, 52, 200, 334, 390, 330, 220]
  }]
}
//    数据状态进行统计分析
let getStatusData = {
  toolbox: toolbox,
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  legend: {
    textStyle: {
      color: '#6888a2'
    },
    data: ['告警', '正常', '错误']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{

    nameTextStyle: {
      color: '#6888a2'
    },
    axisLine: {

      lineStyle: {
        color: '#6888a2'
      }
    },
    type: 'category',
    data: ['通信任务', '雷达任务', '侦查任务']
  }],
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  }],
  series: [

    {
      name: '正常',
      type: 'bar',
      stack: '广告',
      itemStyle: {
        normal: {
          color: '#009900'
        }
      },
      data: [120, 132, 101]
    },
    {
      name: '错误',
      type: 'bar',
      stack: '广告',
      itemStyle: {
        normal: {
          color: '#326887'
        }
      },
      data: [220, 182, 191]
    },
    {
      name: '告警',
      type: 'bar',
      stack: '广告',
      itemStyle: {
        normal: {
          color: '#990000'
        }
      },
      data: [150, 232, 201]
    }
  ]
}
//    异常情况进行统计分析
let getAbnormalData = {
  toolbox: toolbox,
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },

  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '0',
    containLabel: true
  },
  xAxis: xAxis,
  yAxis: {
    type: 'category',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    },
    data: ['设备01', '设备02', '设备03', '设备04', '设备05', '设备06']
  },
  series: [{
    // name: '2011年',
    type: 'bar',
    itemStyle: {
      normal: {
        color: '#990066'
      }
    },
    data: [18203, 23489, 29034, 104970, 131744, 630230]
  }]
}
//日志数据进行统计分析
let getLogData = {
  toolbox: toolbox,
  color: ['#054962'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisTick: {
      alignWithLabel: true
    },
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  }],
  yAxis: [{
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#6888a2'
      }
    }
  }],
  series: [{
    name: '日志数量',
    type: 'bar',
    barWidth: '60%',
    data: [10, 52, 200, 334, 390, 330, 220]
  }]
}
// 故障数据进行统计分析
let getWaringData = {
  toolbox: toolbox,
  tooltip: {

    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: [{
      name: '已处理',
      // icon: 'circle',
      textStyle: {
        color: '#6888a2'
      }
    }, {
      name: '严重',
      // icon: 'circle',
      textStyle: {
        color: '#6888a2'
      }
    }, {
      name: '告警',
      // icon: 'circle',
      textStyle: {
        color: '#6888a2'
      }
    }, {
      name: '异常',
      // icon: 'circle',
      textStyle: {
        color: '#6888a2'
      }
    }],
    color: "#6888a2"
  },
  xAxis: this.data ? this.data.xAxis : null,
  series: [{
    name: '故障数据',
    type: 'pie',
    radius: ['50%', '70%'],


    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    },
    data: [{
        value: 335,
        name: '已处理',
      },
      {
        value: 310,
        name: '严重'
      },
      {
        value: 234,
        name: '告警'
      },
      {
        value: 135,
        name: '异常'
      }
    ]
  }]
}


//磁盘信息
let diskEchart = {
  // color: ['#00cccc', '#0066cc', '#437bfe', '#6c41ff', '#8f6fff'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}T ({d}%)'
  },
 
  toolbox: toolbox,
  legend: {
    // type: 'scroll',


    // orient:'vertical',
    x: 'center',
    y: 'bottom',
    data: ['已用', '可用']
  },

  calculable: true,
  series: [{
      name: '磁盘信息',
      type: 'pie',
      radius: [20, 100],
      center: ['50%', '43%'],
      roseType: 'radius',
      label: {
        
        show:true,
        formatter:'{b}  \n{c}T  ({d}%)',
        fontSize:12,
      },
      lableLine: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: [{
          value: 10,
          name: '已用'
        },
        {
          value: 5,
          name: '可用'
        }

      ]
    }

  ]
}


//一体化监控历史值
let allMonitorEchart={
 
  tooltip: {
      trigger: 'axis'
  },
  legend: {
  },
  grid:[{
    x:'5%',
    y:'2%',
    width:'90%',
    top:40
  }],
  toolbox: {
      show: true,
      feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          dataView: {readOnly: false},
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
      }
  },
  xAxis:  {
      type: 'category',
      boundaryGap: false,
      data: []
  },
  yAxis: {
      type: 'value',
  },
  dataZoom: [{
    type: 'inside',
    start: 0,
    end: 10
}, {
    start: 0,
    end: 10,
    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    handleSize: '80%',
    handleStyle: {
        color: '#fff',
        shadowBlur: 3,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffsetX: 2,
        shadowOffsetY: 2
    }
}],
  series: [
      {
          type:'line',
          data:[],
          markPoint: {
              data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
              ]
          },
          markLine: {
              data: [
                  {type: 'average', name: '平均值'}
              ]
          }
      }
  ]
}
export default {
  userEchart,
  echart,
  dataEchart,
  taskEchart,
  performanceDevFaclt,
  performanceDevTask,
  performanceDevTaskType,
  PerformanceDevgzType,
  PerformanceDevWorktime,
  performanceDevGoalType,
  PerformanceDevRange,
  PerformanceDevRange2,
  getStatusData,
  getAbnormalData,
  getLogData,
  getWaringData,
  diskEchart,
  allMonitorEchart
}
