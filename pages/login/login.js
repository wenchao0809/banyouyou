import { login } from '../../api/index'

const app = getApp()

Page({
    data: {
        form: {
            phone: '',
            password: ''
        }
    },
    inputChange({currentTarget: { dataset: { name: name } }, detail: { value: value }}) {
        let form = this.data.form
        form = { ...form, [name]:  value}
        this.setData({ form })
    },
    login() {
        let form = this.data.form
        login(form)
            .then(res => {
                wx.navigateTo({ url: '/pages/home/home' })
                wx.setStorage({ key: 'token', data: res })
            })
    }
})