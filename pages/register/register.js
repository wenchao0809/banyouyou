
import { sendSmsCode, codeRegisterAndLogin } from '../../api/index'

const app = getApp()

Page({
    data: {
        policyStatus: 'gray',
        time: 0,
        form: {
            nameOrEmail: '',
            phone: '',
            smsCode: '',
            password: '',
            checkPassword: '',
            IDNo: ''
        }
    },
    tologin() {
        wx.navigateTo({ url: '/pages/login/login' })
    },
    sendSms() {
        if (this.data.time > 0) return
        let phone = this.data.form.phone
        if (!phone) return
        sendSmsCode({ phone })
            .then(res => {
                this.setData({ time: 60 })
                function timer() {
                    this.setData({ time: --this.data.time })
                    if (this.data.time > 0) {
                        setTimeout(timer, 1000)
                    }
                }
                setTimeout(timer, 1000);
            })
    },
    inputChange({ currentTarget: { dataset: { name: name } }, detail: { value: value } }) {
        let form = this.data.form
        form = { ...form, [name]: value}
        this.setData({ form })
    }
})