import { decorate, observable, action } from './mobx';

const vipLevelMapStr = {
  '0': 'VIP0',
  '1': 'VIP1',
  '2': 'VIP2',
  '3': 'VIP3',
  '4': 'VIP4',
  '5': 'VIP5',
  '6': 'VIP6',
  '7': 'VIP白银',
  '8': 'VIP黄金',
  '9': 'VIP白金',
  '10': 'VIP钻石',
  '11': 'VIP至尊'
}

export default class User {
    Name = '';
    HeaderPic = ''; // 头像
    Phone = ''; 
    VIPLevel = 0; // 会员等级
    VipLevelStr = 'VIP0'; // vip等级描述
    Points = 0; // 积分
    ChinaId = ''; // 身份证号
    Type = 1; //  用户类型,  1: 个人用户, 2: 企业管理者, 3: 企业用户
    IsDistribution = 0; // 是否为分销者, 0: 不是, 1: 正在申请, 2: 申请失败, 3: 是分销者

    changeUser(data) {
      let keys = Object.keys(data)
      for(let key of keys) {
        this[key] = data[key]
        if (key === 'VipLevel') {
          this.changeVipLevelStr(data[key])
        }
      }
    }

    changeVipLevelStr(VIPLevel) {
      this.VipLevelStr = vipLevelMapStr[VIPLevel]
    }
}

decorate(User, {
    Name: observable,
    HeaderPic: observable,
    Phone: observable,
    VipLevel: observable,
    Points: observable,
    ChinaId: observable,
    Type: observable,
    IsDistribution: observable
})
