<!--<template>
  <transition name="fold" mode="in-out">
    <div class="collect">
      <son-header @back="back" :title="title"></son-header>
      <div class="model" :class="model">
        <div class="collectNewList">
          <ul>
            <li v-for="story in data" class="new border-1px" @click="goNew(story.id)">
              <span class="title">{{story.title}}</span>
              <span class="avatar"><img :src="attachImageUrl(story.images[0])"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import router from '../../router'
  import sidebar from '../sidebar/sidebar.vue'
  import SonHeader from '../son-header/son-header'

  export default {
    data() {
      return {
        data: this.$store.state.isCollectNews,           //已收藏新闻数组
        sidebarShow: false,                                 //侧边栏显示状态
        title: '收藏'                                        //收藏页面标题
      }
    },
    methods: {
      //返回上一页面，并判断是从哪里进入的
      back() {
        let id = this.$store.state.currentThemeId;
        if (this.$store.state.currentThemeId > 0) {
          router.push({name: 'themeDetail', params: {id: id}})
        } else {
          router.push({name: 'homePage'})
        }
      },
      //对图片url进行转化
      attachImageUrl(srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      //去往收藏新闻详情页
      goNew(id) {
        this.$store.state.id = id;
        router.push({name: 'newDetail', params: {id: id}});
        this.$store.dispatch('judgeCollectState');
        this.$store.dispatch('changeGoType', 2)
      }
    },
    computed: {
      model() {
        return this.$store.getters.getModel;
      }
    },
    //注册组件
    components: {
      SonHeader
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl";

  .collect
    position fixed
    width 100%
    height 100%
    z-index 100
    background rgb(255, 255, 255)
    transform translate3d(0, 0, 0)
    &.fold-enter-active, &.fold-leave-active
      transition all 0.5s
    &.fold-enter, &.fold-leave-active
      transform translate3d(100%, 0, 0)
    .model
      position absolute
      width 100%
      height 100%
      &.morning
        color rgb(51, 51, 51)
        background-color rgb(255, 255, 255)
      &.night
        color rgb(184, 184, 184)
        background-color rgb(52, 52, 52)
      .collectNewList
        position absolute
        top 40px
        width 100%
        z-index 30
        .new
          display flex
          position relative
          left -15px
          padding 15px 0 15px 10px
          border-1px(rgba(7, 17, 27, 0.1))
          .title
            flex 1
            margin-right 10px
            line-height 20px
          .avatar
            flex 0 0 70px
            width 70px
            height 55px
            img
              width 70px
              height 55px

</style>
-->