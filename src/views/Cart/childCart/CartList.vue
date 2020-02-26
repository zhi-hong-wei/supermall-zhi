<template>
  <div class="list">
    <Scroll class="content" ref="scroll">
      <!--<div v-for="item in cartGoods">{{item}}</div>-->
      <CartListItem v-for="(item,index) in cartGoodsList"
                    :key="index" :product="item"/>
    </Scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";
  import { mapGetters } from "vuex";

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(["cartGoodsList"])
    },
    activated (){
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .list {
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>
