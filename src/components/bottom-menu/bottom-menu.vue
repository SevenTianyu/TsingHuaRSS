<!--<template>
  <div class="bottomMenu">
    <div class="model" :class="model">
      <div class="menu" @click="goBack"><i class="icon iconfont icon-back"></i></div>
      <div class="menu" @click="goNext"><i class="icon iconfont icon-moreunfold"></i></div>
      <div class="menu" :class="{'isThumbUp':thumb}" @click="thumbUp"><i class="icon iconfont icon-dianzan"></i><span
        class="extra">{{this.$store.state.popularity}}</span></div>
      <div class="menu" @click="showShare"><i class="icon iconfont icon-fenxiang"></i></div>
      <div class="menu" @click="goComments(newId)"><i class="icon iconfont icon-pinglun"></i><span class="extra"
                                                                                                   v-if="this.$store.state.comments != 0">{{this.$store.state.comments}}</span>
      </div>
      <transition name="fold">
        <div class="share" v-show="shareshow" :class="model">
          <div class="title">分享这篇内容</div>
          <div class="shareMenus" :class="model">
            <mt-swipe :auto="0" style="height: 200px;">
              <mt-swipe-item>
                <div class="shareMenu">
                  <i class="icon iconfont icon-weixinhaoyou"></i><br>
                  <span class="name">微信好友</span>
                </div>
                <div class="shareMenu">
                  <i class="icon iconfont icon-weixinpengyouquan"></i><br>
                  <span class="name">微信朋友圈</span>
                </div>
                <div class="shareMenu">
                  <i class="icon iconfont icon-QQ"></i><br>
                  <span class="name">QQ</span>
                </div>
                <div class="shareMenu">
                  <i class="icon iconfont icon-weibo"></i><br>
                  <span class="name">新浪微博</span>
                </div>
                <div class="shareMenu">
                  <i class="icon iconfont icon-fuzhi"></i><br>
                  <span class="name">复制链接</span>
                </div>
                <div class="shareMenu">
                  <i class="icon iconfont icon-youdaoyunbiji"></i><br>
                  <span class="name">有道云笔记</span>
                </div>
                <div class="shareMenu">
                  <i class="icon iconfont icon-yinxiangbiji"></i><br>
                  <span class="name">印象笔记</span>
                </div>
                <div class="shareMenu">
                  <i class="icon iconfont icon-tengxunweibo"></i><br>
                  <span class="name">腾讯微博</span>
                </div>
              </mt-swipe-item>
              <mt-swipe-item>
                <div class="shareMenu">
                  <i class="icon iconfont icon-xinxi"></i><br>
                  <span class="name">信息</span>
                </div>
                <div class="shareMenu">
                  <i class="icon iconfont icon-instapaper"></i><br>
                  <span class="name">Instapaper</span>
                </div>
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="button" @click="changeCollect" :class="model">{{this.$store.getters.getCollect}}</div>
          <div class="button" @click="hideShare" :class="model">取消</div>
        </div>
      </transition>
      <transition name="fade">
        <div class="mask" v-show="shareshow" @click="hideShare"></div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import router from '../../router'
  import axios from 'axios'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        thumb: false,                         //点赞状态
        shareshow: false,                    //分享栏状态
        scroll: ''
      }
    },
    //生命周期创建进行数据观察
    created() {
      this.fetchExtraData();
    },
    //观察路由跳转数据更新
    watch: {
      '$route'(to, from) {
        this.fetchExtraData();
      }
    },
    methods: {
      //获取新闻
      fetchExtraData() {
        let id = this.$store.state.id;
        console.log(id)
        axios.get('api/story-extra/' + this.$store.state.id).then(response => {
          let long_comments = response.data.long_comments;
          let popularity = response.data.popularity;
          let short_comments = response.data.short_comments;
          let comments = response.data.comments;

          this.setStoryExtra({
            long_comments: long_comments,
            short_comments: short_comments,
            comments: comments,
            popularity: popularity
          })
        }).catch(error => {
          console.log(error);
        });
      },
      //返回上一级路由，判断是从哪里进入
      goBack() {
        if (this.$store.state.goType === 1) {
          router.push({name: 'homePage'})
        } else if (this.$store.state.goType === 2) {
          router.push({name: 'collect'});
          this.$store.dispatch('changeGoType', 1);
        } else if (this.$store.state.goType === 3) {
          router.push({name: 'themeDetail', params: {id: this.$store.state.currentThemeId}});
        }
        console.log(this.$store.state.homepageDate);
        console.log(this.$store.state.homepageDateStr);
      },
      //点赞
      thumbUp() {
        this.thumb = !this.thumb;
        if (this.thumb) {
          this.$store.state.popularity++;
        } else {
          this.$store.state.popularity--;
        }
      },
      //显示分享栏
      showShare() {
        this.scroll = document.scrollingElement.scrollTop
        this.shareshow = !this.shareshow
        document.body.className = 'modal-open'
        document.body.style.top = -this.scroll + 'px'
      },
      //隐藏分享栏
      hideShare() {
        this.shareshow = !this.shareshow
        document.body.className = ''
        document.scrollingElement.scrollTop = this.scroll
      },
      //改变收藏状态
      changeCollect() {
        this.$store.dispatch('changeCollectState')
      },
      //跳转评论路由页面
      goComments(id) {
        router.push({name: 'comments', params: {id: id}})
      },
      //将日期推前一天
      decreaseDateStr() {
        let nowDate = new Date(this.$store.state.date.getTime());
        nowDate.setDate(nowDate.getDate() - 1);
        this.$store.dispatch('addDate', nowDate);
        let year = nowDate.getFullYear();
        let month = nowDate.getMonth() + 1;
        let date = nowDate.getDate();
        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;

        let dateStr = year + month + date;

        this.$store.dispatch('addDateStr', dateStr)

      },
      //获取前一天的新闻
      fetchMoreDate() {
        axios.get('api/news/before/' + this.$store.state.dateStr).then((response) => {
          let stories = response.data.stories;
          let ids = stories.map(story => story.id)

          this.$store.dispatch('addMoreIds', ids)
          this.$nextTick(() => {
            let index = this.$store.state.ids.indexOf(this.$store.state.id);
            let id = this.$store.state.ids[++index];
            router.push({name: 'newDetail', params: {id: id}});
            this.$store.dispatch('addNextId', id);
          })
        }).catch((error) => {
          console.log(error)
        })
      },
      //加载下一篇新闻
      goNext() {
        if (this.$store.state.goType === 1) {
          if (this.$store.state.ids.indexOf(this.$store.state.nextId) > 0) {
            let id = this.$store.state.nextId;
            router.push({name: 'newDetail', params: {id: id}});
            this.$store.dispatch('addNextId', id);
          } else {
            this.fetchMoreDate();
            this.decreaseDateStr();
            console.log(this.$store.state.homepageDate);
            console.log(this.$store.state.homepageDateStr);
          }
        } else if (this.$store.state.goType === 3) {
          if (this.$store.state.themeids.indexOf(this.$store.state.themenextId) > 0) {
            let id = this.$store.state.themenextId;
            router.push({name: 'newDetail', params: {id: id}});
            this.$store.dispatch('addThemeNextId', id)
          } else {
            alert('已到最后一篇')
          }
        }
      },
      ...mapMutations({
        setStoryExtra: 'STORY_EXTRA'
      })
    },
    computed: {
      //返回当前新闻详情页id
      newId() {
        return this.$store.state.id;
      },
      //返回当前模式
      model() {
        return this.$store.getters.getModel
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "bottom-menu.styl"
</style>
-->