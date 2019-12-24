import { sendSmsCode, uploadImage, codeLogin } from '../../api/index'
const app = getApp()

Page({
    data: {
        policyStatus: 'gray',
        form: {
          name: '',
          phone: '',
          code: '',
          password: '',
          china_id: '',
          type: 2, // 企业用户
          company_pic: 'test'
        },
        formErrmsg: '',
        time: 0
    },
    takePhoto() {
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
                  console.log(res)
                })
            }
          })
      },
      sendSms() {
        let form = this.data.form
        if (!form.phone) return
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
        codeLogin({ ...this.data.form })
          .then(res => {
            console.log(res)
          })
      },
      tologin() {
        wx.navigateTo({ url: '/pages/login/login' })
      }
})