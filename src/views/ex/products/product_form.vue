<template lang="pug">
  .kt-panel
    .panel-head {{$route.params.id === 'new' ? '新增产品': product.name}}
    .panel-body
      el-form.login-form(ref="productForm", :model="product",label-width="115px", :rules="rules")
        .panel-body-title 基本信息
        .form-block.clfix
          .left
            el-form-item.el-input--xs(label="产品全称：", prop="name")
              el-input(placeholder='示例：京东丰银宝A', v-model="product.name")
            el-form-item.el-input--xs(label="销售平台：", prop="consignee_name")
              el-autocomplete(v-model="product.consignee_name", :fetch-suggestions="queryConsigneeSearch", placeholder="请输入销售平台", @select="handleConsigneeSelect")
            el-form-item.el-input--xs(label="产品简称：", prop="product_short_name")
              el-input(placeholder='请输入产品简称', v-model="product.product_short_name")
            el-form-item.el-input--xs(label="产品代码：", prop="product_code")
              el-input(placeholder='请输入产品代码', v-model="product.product_code")
            el-form-item.el-input--xs(label="发行利率：", prop="annual_rate")
              el-input(placeholder='建议填写', v-model="product.annual_rate")
               template(slot='append') %
            el-form-item.el-input--xs(label="起息日：", prop="value_at")
              el-date-picker(v-model="product.value_at", type="date", placeholder="建议填写", :picker-options="valueAtOptions", @change="calculateSustained")
            el-form-item.el-input--xs(label="到期日：", prop="due_at")
              el-date-picker(v-model="product.due_at", type="date", placeholder="建议填写", :picker-options="valueAtOptions", @change="calculateSustained")
            el-form-item.el-input--xs(label="发行期限：", prop="sustained")
              el-input(placeholder='发行期限=到期日-起息日',:disabled="true", v-model.number="product.sustained")
               template(slot='append') 天
          .right
            el-form-item.el-input--xs(label="计划募集金额：", prop="allocated_amount")
              el-input(placeholder='建议填写，示例：50000', v-model="product.allocated_amount")
                template(slot='append') 元
            el-form-item.el-input--xs(label="实际募集金额：", prop="subscription_amount")
              el-input(placeholder='该字段填写后不可修改。示例：50000', v-model="product.subscription_amount")
                template(slot='append') 元
            el-form-item.el-input--xs(label="产品风险评级：", prop="raw_risk_level")
              el-select(v-model="product.raw_risk_level", placeholder="请选择风险等级")
                el-option(v-for='item in riskLevelOptions', :label='item.label', :value='item.value')
            el-form-item.el-input--xs(label="上架日期：", prop="published_start_at")
              el-date-picker(v-model="product.published_start_at", type="date", placeholder="请选择上架日期", :picker-options="valueAtOptions", @change="calculateAllocatedSustained")
            el-form-item.el-input--xs(label="下架日期：", prop="published_end_at")
              el-date-picker(v-model="product.published_end_at", type="date", placeholder="请选择上架日期", :picker-options="valueAtOptions", @change="calculateAllocatedSustained")
            el-form-item.el-input--xs(label="募集期限：", prop="reserved_sustained")
              el-input(placeholder='募集期限=下架日期-上架日期',:disabled="true", v-model="product.reserved_sustained")
               template(slot='append') 天
            el-form-item.el-input--xs(label="结算时限：", prop="settle_deadline_minutes")
              el-autocomplete(v-model="product.settle_deadline_minutes", :fetch-suggestions="querySDMinutesSearch", placeholder="请输入结算时限", @select="handleSDMinutesSelect")
              //- el-input(placeholder='建议填写，示例：50000', v-model.number="product.allocated_amount", icon="time")
              //- el-time-select(v-model="product.settle_deadline_minutes", placeholder="请选择结算时限", :picker-options="{start: '00:00', step: '00:01', end: '23:30'}", @change="settleDeadlineMinuteChange")
              //- | {{product.settle_deadline_minutes}}
              //- el-time-picker(v-model="product.settle_deadline_minutes", placeholder="请选择结算时限", :picker-options="{selectableRange: '18:30:00 - 20:30:00'}")
            el-form-item.el-input--xs(label="年化计息天数：", prop="days_of_year")
               el-select(v-model="product.days_of_year", placeholder="请选择年化计息天数")
                el-option(v-for='item in daysOfYearOptions', :label='item.label', :value='item.value')
        .panel-body-title 发行方募集账户
        .form-block.clfix
          .left
            el-form-item.el-input--xs(label="账户名：", prop="consignee_bank_account_name")
              el-input(placeholder='示例：xxx商务有限公司客户备付金', v-model="product.consignee_bank_account_name")
            el-form-item.el-input--xs(label="账户：", prop="consignee_bank_account")
              el-input(placeholder='示例：0200 0000 2222 0000 2222', v-model="product.consignee_bank_account")
            el-form-item.el-input--xs(label="开户行：", prop="consignee_bank_name")
              el-input(placeholder='示例：中国工商银行xxx支行', v-model="product.consignee_bank_name")
        .form-footer
          el-button.input(type="primary", size="xs", @click="submitForm") 保存
          el-button.input(type="minor", size="xs", @click="cancelForm") 取消
</template>

<script>
import {
  Form,
  FormItem,
  DatePicker,
  TimePicker,
  TimeSelect,
  Autocomplete,
  MessageBox,
  Message,
  Select,
  Loading,
  Option,
  Input,
  Button
} from 'element-ui'
import moment from 'moment'
import _ from 'lodash'
import {
  consignees,
  productOne,
  essentialInformation
} from '../../../common/resources.js'
import {
  updateCrumbs
} from '../../../common/crossers.js'

let loadingInstance

export default {
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElSelect: Select,
    ElOption: Option,
    ElDatePicker: DatePicker,
    ElTimePicker: TimePicker,
    ElTimeSelect: TimeSelect,
    ElAutocomplete: Autocomplete,
    ElButton: Button
  },

  async mounted() {
    let {
      id
    } = this.$route.params

    let consigneesData = await consignees.get().then(res => res.json())
    this.consignees = _.map(consigneesData.consignees, v => {
      return {
        id: v.id,
        value: v.name
      }
    })

    if (id && id !== 'new') {
      let data = await essentialInformation.get({
        virtual_asset_id: id
      }).then(res => res.json())

      setTimeout(() => {
        updateCrumbs.$emit('update-crumbs', [{
          id: 'productName',
          name: data.virtual_asset.name
        }])
      }, 100)

      data.virtual_asset.consignee_name = _.get(_.find(this.consignees, c => c.id === data.virtual_asset.consignee_id), 'value')
      if (data.virtual_asset.annual_rate) data.virtual_asset.annual_rate *= 100

      this.product = data.virtual_asset
    } else {
      setTimeout(() => {
        updateCrumbs.$emit('update-crumbs', [{
          id: 'productName',
          name: '新增产品'
        }])
      }, 100)
    }
  },

  methods: {
    // 机构名称实时筛选
    queryConsigneeSearch(queryString, cb) {
      var results = queryString ? this.consignees.filter(v => v.value.includes(queryString)) : []

      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    // 选择机构后的回调
    handleConsigneeSelect(item) {
      this.product.consignee_id = item.id
      this.reValidate(['consignee_name'])
    },

    // 结算时间实时筛选
    querySDMinutesSearch(queryString, cb) {
      var results = queryString ? this.sdMinutes.filter(v => v.value.includes(queryString)) : this.sdMinutes
      cb(results)
    },

    // 选择结算时间后的回调
    handleSDMinutesSelect(item) {
      this.reValidate(['settle_deadline_minutes'])
    },

    // 重新验证哪些字段
    reValidate(fields) {
      _.map(fields, v => {
        this.$refs.productForm.validateField(v)
      })
    },

    // 计算发行期限
    calculateSustained() {
      if (this.product.value_at && this.product.due_at) {
        this.reValidate(['value_at', 'due_at', 'published_start_at'])
        this.product.sustained = moment(this.product.due_at).diff(moment(this.product.value_at), 'days')
      }
    },

    // 计算募集期限
    calculateAllocatedSustained() {
      if (this.product.published_start_at && this.product.published_end_at) {
        this.reValidate(['value_at', 'published_start_at', 'published_end_at'])
        this.product.reserved_sustained = moment(this.product.published_end_at).diff(moment(this.product.published_start_at), 'days')
      }
    },

    // 剔除非数字字符, 解决输入非数字结果不被自动清除的问题
    // numberTrim(e, value) {
    //   if (value === '') return
    //   setTimeout(() => {
    //     e.target.value = value
    //   }, 100)
    // },

    // 结算时限
    // settleDeadlineMinuteChange(value) {
    //   this.product.settle_deadline_minutes = value
    //   console.log(value)
    // },

    // 提交表单
    submitForm() {
      this.$refs.productForm.validate((valid) => {
        if (valid) {
          loadingInstance = Loading.service({
            target: this.$refs.productForm.$el
          })

          // hack上架日期和下架日期
          let hackProduct = {
            published_start_at: moment(this.product.published_start_at).format('YYYY-MM-DD') + ' 00:00:00',
            published_end_at: moment(this.product.published_end_at).format('YYYY-MM-DD') + ' 23:59:59'
          }

          let savePromise
          if (this.$route.params.id === 'new') { // 新建
            savePromise = productOne.save({
              action: 'create'
            }, {
              ...this.product,
              ...hackProduct
            })
          } else {
            savePromise = productOne.update({ // 编辑
              virtual_asset_id: this.product.id,
              action: 'update'
            }, {
              ...this.product,
              ...hackProduct
            })
          }

          savePromise.then(res => res.json()).then(data => {
            loadingInstance.close()
            Message({
              type: 'success',
              message: '保存成功！'
            })
            this.$router.push({
              name: 'productDashboard',
              params: {
                id: this.product.id || data.id
              }
            })
          }).catch(res => {
            loadingInstance.close()
          })
        }
      })
    },

    // 取消提交表单
    cancelForm() {
      MessageBox.confirm('确认离开吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.back()
      })
    }
  },

  watch: {
    'product.settle_deadline_minutes' (newValue) {
      if (moment(newValue, 'H:mm').format('H:mm') === newValue) {
        this.product.settle_deadline_minutes = moment(newValue, 'H:mm').format('HH:mm')
      }
    }
  },

  data() {
    var _self = this

    // 机构名称校验
    let validateConsignee = (rule, value, cb) => {
      if (value === '') {
        cb(new Error('请填写机构'))
      } else if (!_.some(this.consignees, v => v.value === value)) {
        cb(new Error('请按提示选择相应机构'))
      } else {
        cb()
      }
    }

    // 日期验证
    let validateCompareDate = (rule, value, cb) => {
      if (rule.lt && moment(value).toDate() >= moment(_.get(_self, rule.lt)).toDate()) {
        cb(new Error(`要求小于${rule.ltFieldName}`))
      } else if (rule.lte && moment(value).toDate() > moment(_.get(_self, rule.lte)).toDate()) {
        cb(new Error(`要求小于等于${rule.lteFieldName}`))
      } else if (rule.gt && moment(value).toDate() <= moment(_.get(_self, rule.gt)).toDate()) {
        cb(new Error(`要求大于${rule.gtFieldName}`))
      } else if (rule.gte && moment(value).toDate() < moment(_.get(_self, rule.gte)).toDate()) {
        cb(new Error(`要求大于等于${rule.gteFieldName}`))
      } else {
        cb()
      }
    }

    // 时间验证
    let validateTime = (rule, value, cb) => {
      if (value && rule.timeFormat && moment(value, rule.timeFormat).format(rule.timeFormat) !== value) {
        cb(new Error(`请正确填写时间格式，例如${moment().format(rule.timeFormat)}`))
      }
      cb()
    }

    // 修正数字验证
    let validateNumber = (rule, value, cb) => {
      if (value !== '' && value !== null && rule.pattern && !rule.pattern.test(value)) {
        cb(new Error(`请正确填写数字格式`))
      } else if (value !== '' && value !== null && rule.min && value < rule.min) {
        cb(new Error(`请正确填写数字，不能小于${rule.min}`))
      } else {
        cb()
      }
    }

    let sdMinutes = _.flatten(_.map(_.range(24), vh => {
      return _.map(_.range(4), vm => {
        return {
          value: moment(`${vh}:${vm * 15}`, 'H:mm').format('HH:mm')
        }
      })
    }))

    return {
      valueAtOptions: {
        /*disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }*/
      },
      daysOfYearOptions: [{ // 年化计息天数
        label: '360 天',
        value: '1'
      }, {
        label: '365 天',
        value: '2'
      }],
      riskLevelOptions: [{ // 风险等级
        label: '低',
        value: 'L'
      }, {
        label: '较低',
        value: 'ML'
      }, {
        label: '中',
        value: 'M'
      }, {
        label: '较高',
        value: 'MH'
      }, {
        label: '高',
        value: 'H'
      }],
      consignees: [],
      sdMinutes: sdMinutes,
      product: {
        name: '', // 产品名称
        consignee_id: '', //销售平台id
        raw_risk_level: 'L', //风险等级
        consignee_name: '', //销售平台名称
        product_short_name: '', // 产品简称
        product_code: '', // 产品代码
        annual_rate: null, // 发行利率
        value_at: '', // 起息日
        due_at: '', // 到期日
        sustained: null, // 发行期限
        days_of_year: '2', //年化计息天数
        subscription_amount: null, // 实际募集金额
        allocated_amount: null, // 计划募集金额
        published_start_at: '', // 产品上架时间
        published_end_at: '', // 产品下架时间
        reserved_sustained: '', // 募集期限
        settle_deadline_minutes: '17:00', // 结算时限
        consignee_bank_name: '', // 平台开户银行
        consignee_bank_account: '', //平台银行账户
        consignee_bank_account_name: '' //平台银行账户名称
      },
      rules: { // 校验规则
        name: [{
          required: true,
          message: '请填写产品全称',
          trigger: 'blur'
        }, {
          min: 1,
          max: 50,
          message: '文本，字数不得超过50',
          trigger: 'blur'
        }],
        consignee_name: [{
          required: true,
          message: '如无意向平台，请填写「其它」或与我们联系',
          trigger: 'blur'
        }, {
          validator: validateConsignee,
          trigger: 'blur'
        }],
        product_short_name: [{
          min: 0,
          max: 50,
          message: '文本，字数不得超过50'
        }],
        product_code: [{
          min: 0,
          max: 50,
          message: '文本，字数不得超过50'
        }],
        annual_rate: [{
          pattern: /^\d+(?:\.\d+)?$/,
          min: 0.01,
          // type: 'number',
          validator: validateNumber,
          message: '请正确输入利率, 不能小于0.01'
        }],
        value_at: [{
          gt: 'product.published_start_at',
          lt: 'product.due_at',
          ltFieldName: '到期日',
          gtFieldName: '上架日期',
          validator: validateCompareDate
        }],
        due_at: [{
          gt: 'product.value_at',
          gtFieldName: '起息日',
          validator: validateCompareDate
        }],
        allocated_amount: [{
          pattern: /^\d+$/,
          message: '请输入正整数'
            // min: 0
        }],
        subscription_amount: [{
          pattern: /^\d+$/,
          message: '请输入正整数'
            // type: 'integer',
            // min: 0
        }],
        published_start_at: [{
          lte: 'product.published_end_at',
          lteFieldName: '下架日期',
          validator: validateCompareDate
        }],
        published_end_at: [{
          gte: 'product.published_start_at',
          lt: 'product.value_at',
          gteFieldName: '上架日期',
          ltFieldName: '起息日',
          validator: validateCompareDate
        }],
        settle_deadline_minutes: [{
          validator: validateTime,
          timeFormat: 'HH:mm'
        }],
        consignee_bank_name: [{
          min: 0,
          max: 50,
          message: '文本，字数不得超过50'
        }],
        consignee_bank_account: [{
          min: 0,
          max: 50,
          message: '文本，字数不得超过50'
        }],
        consignee_bank_account_name: [{
          min: 0,
          max: 50,
          message: '文本，字数不得超过50'
        }]
      }
    }
  }
}
</script>

<style lang="scss">
.kt-panel {
  // margin: -10px;
  .panel-head {
    height: 40px;
    line-height: 40px;
  }
}
</style>
