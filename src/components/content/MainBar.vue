<template>
  <TabBar>
    <TabBarItem path="/home" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/home.svg">
      <img slot="item-icon-active" src="~assets/img/home_active.svg">
      <div slot="item-text">首页</div>
    </TabBarItem>
    <TabBarItem path="/category" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/category.svg">
      <img slot="item-icon-active" src="~assets/img/category_active.svg">
      <div slot="item-text">分类</div>
    </TabBarItem>
    <TabBarItem path="/cart" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/cart.svg">
      <img slot="item-icon-active" src="~assets/img/cart_active.svg">
      <div slot="item-text">购物车</div>
    </TabBarItem>
    <TabBarItem path="/profile" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/profile.svg">
      <img slot="item-icon-active" src="~assets/img/profile_active.svg">
      <div slot="item-text">我的</div>
    </TabBarItem>
  </TabBar>
</template>

<script>
  import TabBar from '../common/tabbar/TabBar'
  import TabBarItem from '../common/tabbar/TabBarItem'
    export default {
        name: "MainBar",
      components:{
        TabBar,
        TabBarItem
      }
    }
</script>

<style scoped>

</style>
