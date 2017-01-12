import { Message, MessageBox } from 'element-ui'
import { productOne } from '../../common/resources.js'

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
  '不可执行': 'icon-wait', //灰色
  '已过期': 'icon-wait' //灰色
}

export default {
  filters: {
    updateStatusIcon(value) {
      return updateStatusIconMap[value] || ''
    },
    excuteStatusIcon(value) {
      return excuteStatusIconMap[value] || ''
    }
  },
  methods: {
    editProduct(product) {
      if (product.type === 'origin') {
        Message({
          type: 'error',
          message: '非导入或录入产品不支持编辑'
        })
        return
      }

      this.$router.push({
        name: 'productForm',
        params: {
          id: product.id
        }
      })
    },
    async deleteProduct(product) {
      if (product.type === 'origin') {
        Message({
          type: 'error',
          message: '非导入或录入产品不支持删除'
        })
        return
      }

      let action = await MessageBox({
        title: '提示',
        type: 'warning',
        message: '确认删除？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })

      if (action === 'confirm') {
        await productOne.delete({
          virtual_asset_id: product.id
        }, {}).then(res => {
          Message({
            type: 'info',
            message: '删除成功'
          })
        }).catch(res => {
          Message({
            type: 'error',
            message: res.body.error || '删除失败'
          })
          return Promise.reject('删除失败')
        })
      } else {
        return Promise.reject('取消删除')
      }
    }
  }
}
