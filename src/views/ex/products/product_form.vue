<template lang="pug">
  .kt-panel
    .panel-head 产品名称
    .panel-body
      el-form.login-form(ref="productForm", :model="product",label-width="115px", :rules="rules")
        .panel-body-title 基本信息
        .form-block.clfix
          .left
            el-form-item.el-input--xs(label="产品全称：", prop="name")
              el-input(placeholder='示例：京东丰银宝A', v-model="product.name")
            el-form-item.el-input--xs(label="销售平台：", prop="consignee_name")
              el-autocomplete(v-model="product.consignee_name", :fetch-suggestions="querySearch", placeholder="如无意向平台，请填写「其它」或与我们联系", @select="handleSelect")
            el-form-item.el-input--xs(label="产品简称：", prop="product_short_name")
              el-input(placeholder='请输入产品简称', v-model="product.product_short_name")
            el-form-item.el-input--xs(label="产品代码：", prop="product_code")
              el-input(placeholder='请输入产品代码', v-model="product.product_code")
            el-form-item.el-input--xs(label="发行利率：", prop="annual_rate")
              el-input(placeholder='建议填写', v-model="product.annual_rate")
               template(slot='append') %
            el-form-item.el-input--xs(label="起息日：", prop="value_at")
              el-date-picker(v-model="product.value_at", type="date", placeholder="建议填写", :picker-options="valueAtOptions")
            el-form-item.el-input--xs(label="到期日：", prop="due_at")
              el-date-picker(v-model="product.due_at", type="date", placeholder="建议填写", :picker-options="valueAtOptions")
            el-form-item.el-input--xs(label="发行期限：", prop="sustained")
              el-input(placeholder='发行期限=到期日-起息日',:disabled="true", v-model="product.sustained")
               template(slot='append') 天
          .right
            el-form-item.el-input--xs(label="计划募集金额：", prop="allocated_amount")
              el-input(placeholder='建议填写', v-model="product.allocated_amount")
            el-form-item.el-input--xs(label="实际募集金额：", prop="subscription_amount")
              el-input(placeholder='建议填写', v-model="product.subscription_amount")
            el-form-item.el-input--xs(label="实际募集金额：", prop="subscription_amount")
              el-select(v-model="product.risk_level", placeholder="请选择风险等级")
                el-option(v-for='item in riskLevelOptions', :label='item.label', :value='item.value')
            el-form-item.el-input--xs(label="上架日期：", prop="published_start_at")
              el-date-picker(v-model="product.published_start_at", type="date", placeholder="请选择上架日期", :picker-options="valueAtOptions")
            el-form-item.el-input--xs(label="下架日期：", prop="published_end_at")
              el-date-picker(v-model="product.published_end_at", type="date", placeholder="请选择上架日期", :picker-options="valueAtOptions")
            el-form-item.el-input--xs(label="募集期限：", prop="allocated_sustained")
              el-input(placeholder='募集期限=下架日期-上架日期',:disabled="true", v-model="product.allocated_sustained")
               template(slot='append') 天
            el-form-item.el-input--xs(label="结算时限：", prop="settle_deadline_minutes")
              el-time-picker(v-model="product.settle_deadline_minutes", placeholder="请选择结算时限", :picker-options="{selectableRange: '18:30:00 - 20:30:00'}")
            el-form-item.el-input--xs(label="年化计息天数：", prop="days_of_year")
               el-select(v-model="product.days_of_year", placeholder="请选择年化计息天数")
                el-option(v-for='item in daysOfYearOptions', :label='item.label', :value='item.value')
        .panel-body-title 基本信息
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
  Autocomplete,
  Select,
  Option,
  Input,
  Button
} from 'element-ui'

export default {
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElSelect: Select,
    ElOption: Option,
    ElDatePicker: DatePicker,
    ElTimePicker: TimePicker,
    ElAutocomplete: Autocomplete,
    ElButton: Button
  },
  mounted() {
    this.consignees = [{
      value: '机构1',
      id: '1'
    }, {
      value: '机构2',
      id: '2'
    }, {
      value: '机构3',
      id: '3'
    }, {
      value: '机构4',
      id: '4'
    }, {
      value: '机构5',
      id: '5'
    }]
  },
  methods: {
    // 机构名称实时筛选
    querySearch(queryString, cb) {
      var results = queryString ? this.consignees.filter(v => v.value.includes(queryString)) : this.consignees
        // 调用 callback 返回建议列表的数据
      cb(results)
    },

    handleSelect(item) {
      this.product.consignee_id = item.id
    },

    submitForm() {
      this.$refs.productForm.validate((valid) => {
        if (valid) {
          // loadingInstance = Loading.service({
          //   target: this.$refs.productForm
          // })
        }
      })
    }
  },

  data() {
    return {
      valueAtOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      daysOfYearOptions: [{
        label: '360 天',
        value: 1
      }, {
        label: '365 天',
        value: 2
      }],
      riskLevelOptions: [{
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
      product: {
        name: '', // 产品名称
        consignee_id: '', //销售平台id
        risk_level: '', //风险等级
        consignee_name: '', //销售平台名称
        product_short_name: '', // 产品简称
        product_code: '', // 产品代码
        annual_rate: null, // 发行利率
        value_at: '', // 起息日
        due_at: '', // 到期日
        sustained: null, // 发行期限
        days_of_year: '', //年化计息天数
        subscription_amount: null, // 实际募集金额
        allocated_amount: null, // 计划募集金额
        published_start_at: '', // 产品上架时间
        published_end_at: '', // 产品下架时间
        allocated_sustained: '', // 募集期限
        settle_deadline_minutes: '', // 结算时限
        consignee_bank_name: '', // 平台开户银行
        consignee_bank_account: '', //平台银行账户
        consignee_bank_account_name: '' //平台银行账户名称
      },
      rules: {
        name: [{
          required: true,
          message: '请填写产品全称',
          trigger: 'blur'
        }, {
          min: 1,
          max: 50,
          message: '文本，字数不得超过50。',
          trigger: 'blur'
        }]
      }
    }
  }
}
</script>

<style lang="scss">
.kt-panel {
  margin: -10px;
  .panel-head {
    height: 40px;
    line-height: 40px;
  }
}
</style>
