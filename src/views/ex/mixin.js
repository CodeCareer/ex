// 更新状态icon映射
let updateStatusIconMap = {
  '已更新': 'icon-success', //绿色
  '更新中': 'icon-wait ignore-status', //红色
  '待更新': 'icon-wait', //灰色
  '异常': 'icon-warn' //灰色
}

// 执行状态icon映射
let excuteStatusIconMap = {
  '已执行': 'icon-success', //绿色
  '待执行': 'icon-wait ignore-status', //红色
  '不可执行': 'icon-wait',  //灰色
  '已过期': 'icon-wait'  //灰色
}

export default {
  filters: {
    updateStatusIcon(value) {
      return updateStatusIconMap[value] || ''
    },
    excuteStatusIcon(value) {
      return excuteStatusIconMap[value] || ''
    }
  }
}
