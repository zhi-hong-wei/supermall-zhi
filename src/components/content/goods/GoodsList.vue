<template>
    <div class="goodsList">
      <GoodsListItem v-for="item in goods" :goodsItem="item"/>
    </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
    export default {
        name: "GoodsList",
      components:{
        GoodsListItem
      },
      props: {
        goods: {
          type: Array,
          default(){
            return []
          }
        }
      }
    }
</script>

<style scoped>
  .goodsList {
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
    padding:2px;
  }
</style>
