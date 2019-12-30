import { decorate, observable, action } from './mobx';

export default class ConfirmOrder {
  goodList = []
  changeGoodList(lsit) {
    this.goodList = lsit
  }
}

decorate(ConfirmOrder, {
   goodList: observable
})
