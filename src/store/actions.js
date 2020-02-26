export default {
//逻辑等在这里写
  addCart(context, payload) {
   return new Promise(resolve => {
     /*find是数组函数用于查找*/
     /*item是func函数的参数*/
     const product = context.state.cartGoods.find(item => {
       return item.iid === payload.iid
     })
     if (product) {
       context.commit('addCount', product)
       resolve('购物车数量+1')
     } else {
       context.commit('pushCartGoods', payload)
       resolve('添加成功，在购物车等亲~')
     }
   })
  }
}
