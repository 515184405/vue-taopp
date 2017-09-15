<template>
	<div class="video" v-if='!!preview'>
      <headerTemplate close='preview' :isActive='true' :title='preview.preview[0].title'></headerTemplate>
      <transition name='slideDown'>
        <myVideo class='myVideo' v-if='!!video.sources[0].src && !!video.options.poster' :sources="video.sources" :options="video.options"></myVideo>
      </transition>
      <div id="detailBox2" class='detailBox2'>
          <div>
              <div class="movie-msg">
                <div class="movie-top">
                    <p>
                      <span class="showName">{{preview.showName}}</span>
                      <star class='movie-star' :score='preview.remark'></star>
                      <span class="movie-score">{{preview.remark}}</span>
                    </p>
                    <p class="loadingRole">{{preview.leadingRole}}</p>
                </div>
                <div>
                    <router-link to='/cinema' v-if='preview.soldType == "NORMAL"' class="buy-btn">购票</router-link>
                    <router-link to='/cinema' v-if='preview.soldType == "PRE"' class="buy-btn btn-advance">预售</router-link>
                </div>
            </div>
            <div class="movie-artist-list">
                <p class="movie-artist-title">剧照</p>
                <div class="pics" id="picDom2">
                    <ul class="pics-list" id="picsList2">
                        <li class="pics-item"  v-for='artist in preview.trailer'>
                          <img v-lazy="'//gw.alicdn.com/'+artist+'_160x160Q30s150.jpg'" height='90' width="140" alt=""/>
                        </li>
                    </ul>
                </div>
              </div>
              <div class="movie-artist-list pdm">
                <p class="movie-artist-title">热门影评</p>
                <p class="null">暂无</p>
                <p v-for='n in 25' class="hotWan">评论内容{{n}}</p>
              </div>
          </div>
      </div>
	</div>
</template>

<script>
import myVideo from 'vue-video';
import star from '@/components/star/star';
import BScroll from 'better-scroll';
import {isPhone} from '@/common/js/isPhone';
import {getFontSize} from '@/common/js/getHtmlFontSize';
import headerTemplate from '@/components/header/header';

export default {
  props:['preview'],
  data(){
    return {
      videoClientHeight : '',
      video: {
        sources: [{
            src: '',
            type: 'video/mp4',
        }],
        options: {
            autoplay: true,
            volume: 0.6,
            poster: '',
        }
      }
    }
  },
  watch:{
    preview(newVal,oldVal){
      if(!newVal)
        return;
      this.video.sources[0].src = isPhone() ? newVal.preview[0].iphoneUrl : newVal.preview[0].ipadUrl;
      this.video.options.poster = '//gw.alicdn.com/tfscom/'+newVal.preview[0].coverUrl   
    },
  },
  methods:{
    _initDetailScroll(){
      if(this.videoClientHeight){
        detailBox2.style.top = ( this.videoClientHeight + 2.5*getFontSize()) + 'px';
        this.$nextTick(() => { 
          this.detailScroll = new BScroll(detailBox2, {
            click : true,
          }) 
        })
      }
      this.videoClientHeight = '';
    },
    _initPic(){
      if (this.preview.trailer) {
        let picWidth = 140;
        let margin = 6;
        let width = (picWidth + margin) * this.preview.trailer.length - margin;
        picsList2.style.width = width + 'px';
        this.$nextTick(()=>{
          this.picScroll = new BScroll(picDom2, {
            scrollX: true,
          })
        })
      }
    },
  },
  mounted(){
    this._initPic();
  },
  updated(){
    this._initPic();
  },
  components:{
    myVideo,
    headerTemplate,
    star,
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';
.video
  transition:all 0.3s ease-in;
  opacity:0;
  position:fixed;
  left:0;
  top:0;
  height:100%;
  width:100%;
  background:#f1f1f1;
  z-index:15;
  .myVideo
    margin-top:2.5rem;
    overflow:hidden;
  .movie-msg
    padding:1rem;
    text-align:left;
    background-color:#fff;
    display:flex;
    justify-content:space-between;
    align-items:center;
    .movie-top
      flex:1;
      width:0;
    p
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top:0.5rem;
    .showName
      font-size:1rem;
      color:#333;
    .movie-star
      display:inline-block;
    .movie-score
      font-size:0.9rem;
      margin-left:4.2rem;
    .loadingRole
      font-size:0.7rem;
      color:#888;
      padding-bottom:0.5rem;
    .buy-btn
        border: 1px solid #ff4d64;
        color: #ff4d64;
        border-radius: 4px;
        padding:5px 8px;
        display:inline;
        font-size:0.8rem;
    .btn-advance
        border: 1px solid #37b7ff;
        color: #37b7ff;
  .movie-artist-list{
    padding-left:15px;
    background-color:#fff;
    margin-top:1rem;
    .movie-artist-title{
      color:#333;
      font-weight:700;
      font-size:1;
      text-align:left;
      padding:15px 0;
      font-size:1rem;
    }
    .artist-photo{
      display:inline-block;
      width:74px;
      height:102px;
    }
    .pics{
      padding-bottom:18px;
      overflow:hidden;
      .pics-list{
        white-space:nowrap;
        font-size:0;
        .pics-item{
          display: inline-block;
          margin-right:6px;
          &:last-child{
            margin-right:0;
           }
        }
      }
    }
  }
  .null
    font-size:1.5rem;
  .hotWan
    padding:1.2rem 0;
  .detailBox2
    position:fixed;
    left:0;
    bottom:0;
    width:100%;
    overflow:hidden;
</style>
