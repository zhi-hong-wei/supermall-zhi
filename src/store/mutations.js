export default {
  // mutataions唯一目的是为了修改state中的状态
  // 所以尽可能只做一件事情
  addCount(state,payload) {
    payload.count += 1;
  },
  pushCartGoods(state,payload) {
    payload.isCheck = true;   /*购物车勾选一定记录在模型（mutation）中*/
    payload.count = 1;
    state.cartGoods.push(payload)
  }
}
