import { login, sendSmsCode, codeRegisterAndLogin } from '../../api/index'
const app = getApp()

Page({
    data: {
        activeTab: 1,
        smsTime: 0,
        form: {
            phone: '',
            password: ''
        },
        smsForm: {
            phone: '',
            code: ''
        }
    },
    onLoad() {
    },
    smsInputChange({currentTarget: { dataset: { name: name } }, detail: { value: value }}) {
        let form = this.data.smsForm
        form = { ...form, [name]:  value}
        this.setData({ smsForm: form })
    },
    inputChange({currentTarget: { dataset: { name: name } }, detail: { value: value }}) {
        let form = this.data.form
        form = { ...form, [name]:  value}
        this.setData({ form })
    },
    toRegister() {
        wx.navigateTo({ url: '/pages/register/register' })
    },
    toBusinessRegister() {
        wx.navigateTo({ url: '/pages/bussiness-register/register' })
    },
    login() {
        // wx.showLoading({
        //     title: '加载中',
        //   })
        this.data.activeTab === 1 ? this.smsLogin() : this.passwordLogin()
    },
    passwordLogin() {
        let form = this.data.form
        login(form)
            .then(res => {
                // wx.hideLoading()
                wx.setStorage({ key: 'token', data: res })
                wx.switchTab({ url: '/pages/home/home', fail: function(error) { console.log(error) } })
            })
    },
    smsLogin() {
        codeRegisterAndLogin(this.data.smsForm)
                .then(res => {
                    // wx.hideLoading()
                    wx.setStorage({ key: 'token', data: res })
                    wx.switchTab({ url: '/pages/home/home' })
                })
    },
    sendSms() {
        if (this.data.time > 0) return
        let phone = this.data.smsForm.phone
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
    handleClickTab(e) {
       this.setData({ activeTab:  e.currentTarget.dataset.index }) 
    }
})