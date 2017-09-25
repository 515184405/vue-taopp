<template>
    <!-- 影院详情模块 -->
    <div class="buy" v-if='!!buyData'>
        <headers close='buyShow' isActive='false' :title='buyData.cinemaName'></headers>
        <div class="buy-container" id="buyContainer">
            <div class="buy-box">
                <!-- 影院信息与银行卡活动信息 -->
                <p class="cinemaName">地址 : {{buyData.address}}</p>
                <p class="cinema-tag" v-if='buyData.displaySupports.length > 0'><span v-for='tag in buyData.displaySupports'>{{tag.name}}</span></p>
                <p class="danger overflow-text">因抓取数据不足，有些数据未与影院关联，请见谅</p>
                <div @click='bankCarcShow' class="cinema-banner" v-if='!!buy.notifyBannerVos'>
                    <p>{{buy.notifyBannerVos[0].tag}}</p>
                    <p>{{buy.notifyBannerVos[0].title}}</p>
                </div>
                <!-- 影院信息与银行卡活动信息 -->
                <!-- 影院影片信息 -->
                <div class="scroll-container" id="scrollContainer">
                    <div class="scroll-box" id="scrollBox">
                       <p @click='tabImg($event,index,show.showId)' class="showBox" v-for='(show,index) in buy.showVos'>
                          <span class="show-icon">{{show.activityTag}}</span>
                          <img :class='{bigImg : index===activeImg}' class='showUrl' v-lazy="'//gw.alicdn.com/'+show.poster+'_110x10000Q75.jpg'" alt="">
                       </p>
                    </div>
                </div>
                 <div class="movie-msg-box">
                    <template v-for='(showVo,index) in buy.showVos'>
                      <p class="movie-msg" v-if='activeImg === index'>
                        <span class="movie-name">{{showVo.showName}}</span>
                        <span class="movie-remark" v-if='!!showVo.remark'><strong>{{showVo.remark}}</strong>分</span>
                      </p>
                      <p class="movie-info overflow-text" v-if='activeImg === index'>
                          <span>{{showVo.duration}}分钟</span> |
                          <span>{{showVo.type | filterString(0)}}</span> |
                          <span>{{showVo.leadingRole | filterString(2)}}</span>
                      </p>
                    </template>
                 </div>
                 <!-- 影院影片信息 -->
                 <!-- 影片详情信息 -->
                 <div class="showDate" id="showDate" v-if='!!showId'>
                    <template  v-for='(detail,index) in buy.showScheduleMap[showId]'>
                       <p :style="position(index)" @click='tabTag(index)' :class='{active : dateSel === index }' class="detail-date">{{detail.dateDesc}}<i v-if='!!detail.activityTag' class="active-icon">{{detail.activityTag}}</i></p>
                       <div class="showTab" v-show='index===dateSel' v-if='!!detail.scheduleVos.length'>
                          <div @click='activitiesShow' class="activies">
                              <span class="new-icon">{{buy.announceVos[0].tag}}</span>
                              <span class="new-right">{{buy.announceVos[0].title}}</span>
                          </div>
                          <div class="info-box" v-for='(info,index2) in detail.scheduleVos'>
                              <div>
                                 <p class="info-title">{{info.openTime}}</p>
                                 <p>{{info.closeTime}}散场</p>
                              </div>
                               <div>
                                 <p>{{info.showVersion}}</p>
                                 <p>{{info.hallName}}</p>
                              </div>
                               <div class="info-price-box">
                                 <p class="info-newPeople">{{info.scheduleTag.activityTag}}<span class="info-price">{{info.tradePrice | filterMoney}}</span>元</p>
                                 <p><s>{{info.cinemaPrice | filterMoney}}元</s></p>
                              </div>
                              <div class="info-buy-box">
                                <router-link to='/buy' class="info-buy">购买</router-link>
                              </div>
                          </div>
                       </div>
                       <div v-else class="info-undefined">
                         {{detail.dateDesc}}暂无场次
                       </div>
                    </template>
                 </div>
                 <!-- 影片详情信息 -->
                <taoppIcon></taoppIcon>
            </div>
        </div>
         <transition name='fade'>
           <router-view></router-view>
        </transition>
        <transition name='move'>
          <bankCard ref='bankCard' v-show='isbankCard'></bankCard>
        </transition>
        <alerts ref='alerts'></alerts>
    </div>
</template>
<script>
    var data = '';//js缓存数据
    import headers from '@/components/header/header';
    import taoppIcon from '@/components/taopp/taoppIcon';
    import bankCard from '@/components/cinema/bank-card';
    import BScroll from 'better-scroll';
    import alerts from '@/components/alert/alert';
    import {getFontSize} from '@/common/js/getHtmlFontSize';
    export default {
      props:['buyData'],
       data(){
          return {
            buy:'',  //总数据
            activeImg : 0, //当前影片
            showId : '',  //影片ID
            dateSel : 0,  //date切换
            isbankCard : false, //联名卡信息是否显示
          }
       },
       methods:{
          _initPic(){//影片滚动代码
            if (this.buy.showVos) {
              let imgWidth = 4.9;
              let len = this.buy.showVos.length;
              let width = imgWidth * len * getFontSize() + window.innerWidth - imgWidth * getFontSize();
              scrollBox.style.width = width + 'px';
              scrollBox.style.marginLeft = (window.innerWidth/2 - imgWidth*getFontSize()/2 - 15) + 'px';
              this.$nextTick(()=>{
                if(!this.picScroll){
                  this.picScroll = new BScroll(scrollContainer, {
                    scrollX: true,
                  })
                }else{ 
                  this.picScroll.refresh();
                }
              })
            }
          },
          activitiesShow(){
            var _self = this;
            this.$refs.alerts.opts = {
              content : '数据暂不存在 ，请谅解',
            }
            this.$refs.alerts.alertShow = true;
          },
          bankCarcShow(){ //卡片信息显示模块
            this.isbankCard = true;
            this.$refs.bankCard._initScroll();
          },
          position(index){//设置时间tab的定位
            let width = 5.5 * getFontSize();
            return 'left:'+(width*index+15)+'px';
          },
          _initScroll(){  //整体滚动模块
            this.$nextTick(()=>{
              if(!this.initScroll){
                this.initScroll = new BScroll(buyContainer, {
                    click:true,

                })
              }else{ 
                this.initScroll.refresh();
              }
            })
          },
          tabTag(index){  //时间选择切换
            this.dateSel = index;
          },
          tabImg(event,index,showId){  //影片选择切换
            this.dateSel = 0;
            var imgWidth = 4.9;
            this.showId = showId;
            if(event.target.className.indexOf('bigImg') != -1){
              var _self = this;
              this.$refs.alerts.opts = {
                content : '详情信息不存在 ，请谅解',
                buttons : {
                  '关闭' : function(){
                    _self.$refs.alerts.alertShow = false;
                  }
                }
              }
              this.$refs.alerts.alertShow = true;
              return;
            }
            this.picScroll.scrollTo(-imgWidth*index*getFontSize(),500)
            this.activeImg = index;
          }
       },
       filters:{  //筛选器
          filterString(input,num){
          var strArr = input.split(',');
           for(var i = 0,str=''; i < strArr.length;i++){
             if(i<=num){
               str += strArr[i];
             }else{
              break;
             }
           }
           return str;
          },
          filterMoney(input){
            if(!!input)
            return parseInt(input)/100
          }
       },
       components:{headers,bankCard,taoppIcon,alerts},
       created(){ //获取数据方法
        if(!data){
          var href = location.href;
          var url = '/api/buy';
          if(href.indexOf('taopp') != -1){
            url = '/cinemaDetail.json';
          }
          this.$http.get(url).then((response) => {
              response = response.body;
              if(response.data.returnCode == 0){
                this.buy = data = response.data.returnValue;
                console.log(this.buy)
                this.$parent.$parent.loaderShow = false;
                this.showId = this.buy.showVos[0].showId;
              }
           });
        }else{
          this.buy = data;
          this.showId = this.buy.showVos[0].showId;
          this.$parent.$parent.loaderShow = false;
        }
      },
      updated(){
        this._initPic();
        this._initScroll();
      },
      mounted(){
        this._initPic();
        this._initScroll();
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';
    .buy
      position:fixed;
      left:0;
      top:0;
      width:100%;
      height:100%;
      bottom:0;
      background-color:#fff;
      z-index:14;
      .buy-container
        position:fixed;
        width:100%;
        left:0;top:2.55rem;
        bottom:0;
        background-color:#fff;
        z-index:14;
        padding:0 15px;
        box-sizing:border-box;
        width:100%;
      .buy-box
        .danger{
          font-size:0.725rem;
          color:$red;
          line-height:1.5rem;
          margin-top:0.5rem;
          padding-left:25px;
          background:url('img/danger.png') no-repeat left center;
           background-size:1.1rem;
          }
        .cinemaName
          margin-top:0.5rem;
          width:80%;
          font-size:0.8rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
        .cinema-tag
          margin-top:0.6rem;
          span 
            font-size:0.8rem;
            border-radius:0.5rem;
            border:1px solid $color;
            color:$color;
            margin-right:5px;
        .cinema-banner
          margin-top:0.6rem;
          border-radius:5px;
          border:1px solid $color;
          padding:0.2rem;
          background:#f3f9fd url('img/right.png') no-repeat 95% center;
          background-size:1rem;
          p
            color:$color;
            line-height:1rem;
            font-size:0.725rem;
        .scroll-container
          overflow:hidden;
          height:8rem;
          width:100%;
          padding:0 15px;
          margin-left:-15px;
          margin-top:0.8rem;
          background:rgba(0,0,0,.7);
          .scroll-box
            margin-top:1rem;
            white-space:nowrap;
            .showUrl
              height:6rem;
              width:4.2rem
              margin-right:0.7rem;
            .bigImg
              width:auto;
              height:7rem;
            .showBox
              display:inline-block;
              position:relative;
              .show-icon
                position:absolute;
                right:0.7rem;
                top:0;
                background-color:#ff8625;
                color:#fff;
                font-size:0.9rem;
        .movie-msg-box
          position:relative;
          width:100%;
          background-color:#fff;
          .movie-msg
            position:absolute;
            left:0;
            top:0.8rem;
            width:100%;
            text-align:center;
            .movie-name
              font-size:1rem;
              color:#333;
              font-weight:bold;
            .movie-remark
              color:#fea54c;
              strong
                font-size:1rem;
          .movie-info
            position:absolute;
            top:2.6rem;
            left:0;
            font-size:0.7rem;
            width:100%;
            padding:0 15px;
            margin-left:-15px;
            text-align:center;
            border-bottom:1px solid #f1f1f1;
            padding-bottom:0.5rem;
        .showDate
          padding:0 15px;
          padding-top:2.7rem;
          margin-left:-15px;
          margin-top:4rem;
          width:100%;
          position:relative;
          .showTab
            width:100%;
          .detail-date
            position:absolute;
            top:0;
            font-size:0.9rem;
            display:inline-block;
            line-height:2.5rem;
            &.active
              border-bottom:1px solid #ff4d64;
              color: #ff4d64;
          .active-icon,.new-icon
            background-color: #ff8625;
            color: #fff;
            padding:0 2px;
            border-radius:2px;
            font-size: 0.7rem;
          .activies
            padding:0 15px;
            line-height:2.5rem;
            border-bottom:1px solid #f1f1f1;
            border-top:1px solid #f1f1f1;
            background:url('img/right.png') no-repeat 97% center;
            background-size:1rem;
          .info-box
            display:flex;
            justify-content:space-between;
            text-align:center;
            padding:0.5rem 0px;
            background-color:#fff;
            border-bottom:1px solid #f1f1f1;
            .info-price-box
              row:1;
            p
              line-height:1.8rem;
            .info-title
              font-size:1.2rem;
              color:#333;
            .info-newPeople
              color:$red;
            .info-price
              color:$red;
              font-size:1.1rem;
              font-weight:bold;
            .info-buy
              color:$red;
              border:1px solid $red;
              border-radius:2px;
              padding:3px 8px;
              font-size:0.9rem;
              display:inline-block;
              margin-top:1.2rem;
        .info-undefined
          text-align:center;
          line-height:2.5rem;
          border-top:1px solid #f1f1f1;
          margin-top:-2px;
</style>
