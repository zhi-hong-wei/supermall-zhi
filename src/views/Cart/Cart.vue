<template>
  <div>
    <NavBar class="nav">
      <div slot="center">购物车({{cartLength}})</div>
    </NavBar>
    <CartList/>
    <CartBottomBar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childCart/CartList'
  import CartBottomBar from './childCart/CartBottomBar'

  /*vuex中一种方法，用于将vuex中getter.js方法映射到此文件使用*/
  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength','cartGoodsList'])
    }
  }
</script>

<style scoped>
  .nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
