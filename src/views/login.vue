<template lang="pug">
.loginPage
  header
    .inner
      img.logo(src='../assets/images/logo.svg')
  .login-warpper(@keyup.13="submitForm()")
    h2 登录
    el-form.login-form(ref="user",:model="user",:rules="rules",class="doem-form")
      el-form-item(prop="email")
        el-input(placeholder='请输入您的邮箱地址', v-model="user.email")
      el-form-item(prop="password")
        el-input(placeholder="请输入您的密码",v-model="user.password",type="password")
      el-form-item
        el-button.input(type="submit",@click="submitForm") 立即登录
  footer
    p(style="margin-top: 10px;") 联系电话：010-84554188   京ICP备150220058号-1
    p ©2016 开通金融信息服务（北京）有限公司

</template>

<script>
import {
  // MessageBox,
  Form,
  FormItem,
  Input,
  Button,
  Loading
} from 'element-ui'
import {
  mapActions
} from 'vuex'

export default {
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button
  },
  methods: {
    ...mapActions(['login']),
    submitForm() {
      let loadingInstance
      this.$refs.user.validate((valid) => {
        if (valid) {
          loadingInstance = Loading.service({
            target: '.login-form'
          })

          this.login(this.user)
            .then(res => {
              loadingInstance.close()
              this.$router.push({
                name: 'dashboard'
              })
            })
            .catch(res => {
              loadingInstance.close()
            })
        }
      })
    }
  },

  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      rules: {
        email: [{
          required: true,
          message: '请输入邮箱地址',
          trigger: 'blur'
        }, {
          type: 'email',
          message: '请输入正确邮箱地址',
          trigger: 'change,blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  }
}
</script>

<style lang="scss">
//登录页面样式
.loginPage {
  width: 100%;
  height: 100vh;
  position: relative;
  .inner {
    width: 1024px;
    height: 100%;
    margin: 0 auto;
  }
  .login-warpper {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 340px;
    h2 {
      font-size: 30px;
      color: #3d4351;
      height: 80px;
      line-height: 80px;
    }
    .login-form {
      border-radius: 4px;
      background: #ffffff;
      padding: 40px;
    }
    .input {
      width: 100%;
      height: 40px;
      border-radius: 4px;
      background: #79859a;
      font-size: 17px;
      color: #fff;
      border: none;
      text-indent: 10px;
      cursor: pointer;
    }
  }
}
</style>
