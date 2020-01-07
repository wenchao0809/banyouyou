import { sendSmsCode, uploadImage, codeRegisterAndLogin } from '../../api/index'
const app = getApp()

Page({
    data: {
        policyStatus: 'gray',
        form: {
          name: '',
          phone: '',
          code: '',
          password: '',
          checkPassword: '',
          china_id: '',
          type: 2, // 企业用户
          company_pic: ''
        },

        formErrmsg: '',
        time: 0
    },
    takePhoto() {
      let that = this
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success (res) {
              // tempFilePath可以作为img标签的src属性显示图片
              console.log(res)
              const tempFilePaths = res.tempFilePaths
              uploadImage({ filePath: tempFilePaths[0], name: 'file' })
                .then(res => {
                  let form = that.data.form
                  that.setData({ form: { ...form, company_pic: res }  })
                })
            }
          })
      },
      sendSms() {
        let form = this.data.form
        if (!form.phone) {
          wx.showToast({ title: '请输入正确的手机号码', icon: 'none' })
          return
        }
        sendSmsCode({ phone:  form.phone})
          .then(() => {
            this.setData({ time: 60 })
            let timeId =  setInterval(() => {
              let time = this.data.time
              --time
              this.setData({ time })
              if (time = 0) clearInterval(timeId)
            }, 1000);
          })
      },
      inputChange({currentTarget: { dataset: { name: name } }, detail: { value: value }}) {
        // {currentTarget: { dataSet: { name: name } }}
        let form = this.data.form
        form = { ...form, [name]:  value}
        this.setData({ form })
      },
      register() {
        console.log('register')
        if (this.validateForm()) {
          let  params = { ...this.data.form }
          delete params.checkPassword
          codeRegisterAndLogin(params)
          .then(res => {
            console.log(res)
          })
        }
      },
      validateForm() {
        let message = ''
        let phoneReg = /^[1]\d{10}$/
        let { name, phone, code, company_pic, password, checkPassword, china_id } = this.data.form
        let policyStatus = this.data.policyStatus
        if (!name) {
            message = '请输入姓名'
        } else if (!phone) {
            message = '请输入手机'
        } else if (!phoneReg.test(phone)) {
            message ='手机格式错误'
        } else if(!/\d/.test(password) || !/[a-zA-Z]/.test(password) || password.length < 8) {
            message = '密码格式错误'
        } else if (!code) {
            message = '输入验证码'
        } else if (!(checkPassword === password)) {
            message = '两次密码输入不一致'
        } else if (!china_id) {
            message = '请输入身份证号码'
        } else if (policyStatus === 'gray') {
            message = '请阅读同意隐私政策'
        } else if (!company_pic) {
            message = '请上传图片'
        } 
        wx.showToast({ title: message, icon: 'none' })
        return !message
    },
      tagglePolicyStatus() {
        let status = this.data.policyStatus
        if (status === 'gray') {
            status = 'red'
        } else {
            status = 'gray'
        }
        this.setData({ policyStatus: status })
    },
      tologin() {
        wx.navigateTo({ url: '/pages/login/login' })
      }
})