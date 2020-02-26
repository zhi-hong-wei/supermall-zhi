import BackTop from 'components/content/backtop/BackTop'

export const backTopMixin = {
  data() {
    return {
      isshow: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    }
  },
  components: {
    BackTop
  }
}
