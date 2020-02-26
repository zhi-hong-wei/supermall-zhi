export default {
  cartLength(state) {
     //return 必须写
     return state.cartGoods.length;
  },
  cartGoodsList(state) {
    return state.cartGoods
  }
}
