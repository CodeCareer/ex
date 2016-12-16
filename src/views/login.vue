<template lang="pug">
.loginPage
  .header
    .inner
      img.logo(src='../assets/images/logo.svg')
  .login-warpper
    h2 登录
    form.login-form(@submit.prevent='submitForm()')
      ul
        li
          input(v-model='user.email', type='text', placeholder='请输入您的邮箱')
        li
          input(v-model='user.password', type='password', placeholder='请输入您的密码')
        li(style='margin-bottom: 30px;')
          input(type='submit', value='立即登录')
  .footer
    p(style="margin-top: 10px;") 联系电话：010-84554188   京ICP备150220058号-1
    p ©2016 开通金融信息服务（北京）有限公司

</template>

<script>
import {
  MessageBox
} from 'element-ui'
import {
  mapActions
} from 'vuex'

export default {
  methods: {
    ...mapActions(['login']),
    submitForm() {
      this.login(this.user).then(() => {
        this.$router.push({
          name: 'dashboard'
        })
      }).catch(res => res.json()).then(data => {
        MessageBox.alert(data.errors || '抱歉！服务器忙。', '提示')
      })
    }
  },

  data() {
    return {
      user: {
        email: '',
        password: ''
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
  .header {
    height: 60px;
    width: 100%;
    color: #ffffff;
    background: #414453;
    font-size: 14px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .inner {
    width: 1024px;
    height: 100%;
    margin: 0 auto;
  }
  .logo {
    height: 35px;
    margin-top: 12px;
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
      li {
        margin-top: 20px;
        &:first-child {
          margin-top: 0;
        }
      }
      input {
        border-radius: 4px;
        height: 45px;
        width: 100%;
        background: #f3f5f8;
        font-size: 15px;
        text-indent: 10px;
        // padding-left: 10px;
        cursor: text;
      }
      input[type="submit"] {
        background: #79859a;
        color: #ffffff;
        font-size: 17px;
        text-indent: 0;
        cursor: pointer;
        &:active {
          background: darken(#79859a, 10%);
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #79859a;
    color: #ffffff;
    padding: 30px 0;
    margin-top: 30px;
    p {
      line-height: 1.3;
      text-align: center;
      font-size: 12px;
    }
  }
}
</style>
