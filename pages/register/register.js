
import { sendSmsCode, codeRegisterAndLogin } from '../../api/index'

const app = getApp()

Page({
    data: {
        policyStatus: 'gray',
        time: 0,
        form: {
            name: '',
            phone: '',
            code: '',
            password: '',
            checkPassword: '',
            type: 1,
            china_id: ''
        }
    },
    tologin() {
        wx.navigateTo({ url: '/pages/login/login' })
    },
    sendSms() {
        if (this.data.time > 0) return
        let phone = this.data.form.phone
        if (!phone) {
            wx.showToast({ title: '手机号码错误', icon: 'none' })
            return
        }
        sendSmsCode({ phone })
            .then(res => {
                this.setData({ time: 60 })
                let that = this
                function timer() {
                    that.setData({ time: --that.data.time })
                    if (that.data.time > 0) {
                        setTimeout(timer, 1000)
                    }
                }
                setTimeout(timer, 1000);
            })
    },
    validateForm() {
        let message = ''
        let phoneReg = /^[1]\d{10}$/
        let { name, phone, code, password, checkPassword, china_id } = this.data.form
        let policyStatus = this.data.policyStatus
        if (!name) {
            message = '请输入姓名'
        } else if (!phone) {
            message = '请输入手机'
        } else if (!phoneReg.test(phone)) {
            message ='手机格式错误'
        } else if(!/\d/.test(password || !/[a-zA-Z]/.test(password) || password.length < 8)) {
            message = '密码格式错误'
        } else if (!code) {
            message = '输入验证码'
        } else if (!(checkPassword === password)) {
            message = '两次密码输入不一致'
        } else if (!china_id) {
            message = '请输入身份证号码'
        } else if (policyStatus === 'gray') {
            message = '请阅读同意隐私政策'
        }
        wx.showToast({ title: message, icon: 'none' })
        return !message
    },
    register() {
        if (this.validateForm()) {
            let { name, phone, code, type, password, china_id} = this.data.form
            codeRegisterAndLogin({ name, phone, code, password, china_id, type })
                .then(res => {
                    wx.setStorage({ key: 'token', data: res })
                    wx.showToast({ title: '注册成功即将跳转', })
                    wx.switchTab({ url: '/pages/home/home' })
                })
        }
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
    inputChange({ currentTarget: { dataset: { name: name } }, detail: { value: value } }) {
        let form = this.data.form
        form = { ...form, [name]: value}
        this.setData({ form })
    }
})