import { registerDistributor, distributeOrderList, getUserInfo } from '../../api/index'

const app = getApp()

Page({
    data: {
        //  0: 不是, 1: 正在申请, 2: 申请失败, 3: 是分销者
        status: 3,
        query: { limit: 10, offset: 0, status: 0 },
        rewardList: [
            { Id: 1, DistributionPrice: 1000, DistributionStatus: 1 },
            { Id: 1, DistributionPrice: 1000, DistributionStatus: 1 }
        ]
    },
    getList() {
        let query = this.data.query
        distributeOrderList(query)
            .then(res => {
                this.setData({ rewardList: res })
            })
    },
    pullUpRefresh() {
        let query = this.data.query
        ++query.offset
        this.setData({ query })
        distributeOrderList(query)
        .then(res => {
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
        this.setData({ query: { limit: 10, offset: 0, status: 0 } })
        await this.initData()
        wx.stopPullDownRefresh()
    },
    onReachBottom() {
        this.pullUpRefresh()
    },
    apply() {
        registerDistributor()
            .then(res => {
                this.setData({ status: 1 })
            })
    }
})