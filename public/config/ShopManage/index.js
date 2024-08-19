
const CreatedBusOn = 'DutyManageBusOn'

let that = null;
let uigetThis = function (data) {
  that = data;
}




//页面统一获取数据
function uiGetDutyManage(data, type) {
  
}





const config = [{
  gutter: 10, 
  style: {
    height: '100%' 
  },
  row: [{
      span: 24,
      style: {
        height: '100%',
        'background-color': '#FFF'
      },
      type: 'col',
      data: [{
        span: 24, 
        style: {
          height: '100%'
        },
        type: 'col', 
        data: [{
          span: 24,
          style: {
            height: '100%'
          },
          type: '',
          data: {
          }
        }]
      }] 
    }
  ]
}]



export default {
  config,
  CreatedBusOn,
  uiGetDutyManage,
  uigetThis,
}
