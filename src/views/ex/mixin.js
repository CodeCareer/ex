// 更新状态icon映射
let updateStatusIconMap = {
  '已更新': 'icon-success',
  '更新中': 'icon-wait',
  '待更新': 'icon-wait ignore-status',
  '异常': 'icon-wait ignore-status'
}

// 执行状态icon映射
let excuteStatusIconMap = {
  '已执行': 'icon-success',
  '待执行': 'icon-wait',
  '不可执行': 'icon-wait ignore-status',
  '已过期': 'icon-wait ignore-status'
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
