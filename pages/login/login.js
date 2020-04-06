import { login } from '../../api/index'
const app = getApp()

Page({
    data: {
        activeTab: 1,
        form: {
            phone: '',
            password: ''
        },
        
    },
    onLoad() {
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
        wx.showLoading({
            title: '加载中',
          })
        let form = this.data.form
        login(form)
            .then(res => {
                wx.hideLoading()
                wx.setStorage({ key: 'token', data: res })
                wx.switchTab({ url: '/pages/home/home', fail: function(error) { console.log(error) } })
            })
    },
    handleClickTab(e) {
       this.setData({ activeTab:  e.currentTarget.dataset.index }) 
    }
})