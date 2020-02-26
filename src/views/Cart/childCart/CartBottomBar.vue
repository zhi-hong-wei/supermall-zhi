<template>
  <div class="cart-bottom-bar">
    <div class="total-check">
      <!--<img src="~assets/img/cart/tick.svg" alt="">-->
      <check-button :is-check="isSelectAll" @click.native="selectAllClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>合计：￥{{totalPrice}}</span>
    </div>
    <div class="calc" @click="calcClick">
      去结算({{calcCount}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkbutton/CheckButton'

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        /*过滤器取满足item.isCheck === true的*/
        return this.$store.state.cartGoods.filter(item => {
          return item.isCheck === true
        }).reduce((prev, item) => {      /*对数组内容进行汇总*/
          return prev + item.price * item.count
        }, 0).toFixed(2)
      },
      calcCount() {
        return this.$store.state.cartGoods.filter(item => {
          return item.isCheck === true
        }).length
      },
      isSelectAll() {
        if (this.$store.state.cartGoods.length === 0) {
          return false;
        }
        /*方法一：过滤器*/
        return !(this.$store.state.cartGoods.filter(item => !item.isCheck).length)
        /*方法二：遍历*/
       /* for(let item of this.$store.state.cartGoods){
          if(!item.isCheck){
            return false
          }
          return true
        }*/
      }
    },
    methods: {
      selectAllClick() {
        /*如果全选*/
        if (this.isSelectAll) {
          /*forEach函数遍历*/
          this.$store.state.cartGoods.forEach(item => item.isCheck = false)
        } else {
          this.$store.state.cartGoods.forEach(item => item.isCheck = true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('您还没有选择宝贝哦~',1500)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 49px;
    background: #eeeeee;
    display: flex;
    line-height: 40px;
    text-align: center;
  }

  .total-check {
    width: 25%;
    display: flex;
    justify-content: center;
  }

  .total-price {
    width: 50%;
  }

  .calc {
    width: 25%;
    background-color: #ff5028;
    color: #fff;
  }

</style>
