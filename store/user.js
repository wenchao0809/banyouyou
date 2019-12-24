import { decorate, observable, action } from './mobx';

export default class User {
    Name = '';
    HeaderPic = ''; // 头像
    Phone = ''; 
    VIPLevel = 0; // 会员等级
    Points = 0; // 积分
    ChinaId = ''; // 身份证号
    Type = 1; //  用户类型,  1: 个人用户, 2: 企业管理者, 3: 企业用户
    IsDistribution = 0; // 是否为分销者, 0: 不是, 1: 正在申请, 2: 申请失败, 3: 是分销者

    changeUser(data) {
      let keys = Object.keys(data)
      for(let key of keys) {
        this[key] = data[key]
      }
    }
}

decorate(User, {
    Name: observable,
    HeaderPic: observable,
    Phone: observable,
    VIPLevel: observable,
    Points: observable,
    ChinaId: observable,
    Type: observable,
    IsDistribution: observable
})
