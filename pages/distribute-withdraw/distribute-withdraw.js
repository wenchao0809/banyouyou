import { registerDistributor, distributeOrderList, getUserInfo } from '../../api/index'
import { formateDate } from '../../utils/index'

const app = getApp()
function formateOrderData(res) {
    return res.map(item => {
        item.DistributionPrice = (item.DistributionPrice / 1000).toFixed(2)
        item.TotalPrice = (item.TotalPrice / 1000).toFixed(2)
        item.CreateAt = formateDate(item.CreateAt)
        if ([1, 2, 3, 4].includes(item.Status)) {
            item.Status = '未完成'
            item.statusStyle = 'color: #3d8b0f;'
        } else if ([-1, -2].includes(item.Status)) {
            item.Status = '取消'
            item.statusStyle = 'color: #e76170;'
        } else if (item.Status === 5) {
            item.Status = `已完成 ${item.EndTime ? formateDate(item.EndTime) : ''}`
        }
        return item
    })
}
Page({
    data: {
        //  0: 不是, 1: 正在申请, 2: 申请失败, 3: 是分销者
        status: 3,
        query: { limit: 30, offset: 0, status: 0, DistributionStatus: 2 },
        // 标识上拉是否还有数据继续加载
        pullUpDone: false,
        rewardList: [
        ]
    },
    getList() {
        let query = this.data.query
        distributeOrderList(query)
            .then(res => {
                if (res.length < query.limit) {
                    this.setData({ pullUpDone: true })
                }
                res = formateOrderData(res)
                this.setData({ rewardList: res })
            })
    },
    pullUpRefresh() {
        let query = this.data.query
        ++query.offset
        this.setData({ query })
        distributeOrderList(query)
        .then(res => {
            res = formateOrderData(res)
            let curList = this.data.rewardList
            let list = curList.concat(res)
            this.setData({ rewardList: list })
        })
    },
    async initData() {
        let userInfo = await getUserInfo()
        let status = userInfo.IsDistribution
        if (status === 3) {
            this.getList()
        }
        this.setData({ status })
    },
    onLoad(options) {
       this.initData()
    },
    async onPullDownRefresh(){
        this.setData({ query: { limit: 30, offset: 0, status: 0 }, pullUpDone: false })
        await this.initData()
        wx.stopPullDownRefresh()
    },
    onReachBottom() {
        if (pullUpDone) return
        this.pullUpRefresh()
    },
    apply() {
        registerDistributor()
            .then(res => {
                this.setData({ status: 1 })
            })
    }
})