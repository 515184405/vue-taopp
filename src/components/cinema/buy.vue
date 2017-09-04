<template>
    <div class="buy" v-if='!!buyData'>
        <headers close='buyShow' isActive='false' :title='buyData.cinemaName'></headers>
        <div class="buy-container" id="buyContainer">
            <div class="buy-box">
                <p class="cinemaName">地址 : {{buyData.address}}</p>
                <p class="cinema-tag" v-if='buyData.displaySupports.length > 0'><span v-for='tag in buyData.displaySupports'>{{tag.name}}</span></p>
                <p class="danger overflow-text">因抓取数据不足，有些数据未与影院关联，请见谅</p>
                <div @click='bankCarcShow' class="cinema-banner" v-if='!!buy.notifyBannerVos'>
                    <p>{{buy.notifyBannerVos[0].tag}}</p>
                    <p>{{buy.notifyBannerVos[0].title}}</p>
                </div>
                <div class="scroll-container" id="scrollContainer">
                    <div class="scroll-box" id="scrollBox">
                       <p @click='tabImg($event,index,show.showId)' class="showBox" v-for='(show,index) in buy.showVos'>
                          <span class="show-icon">{{show.activityTag}}</span>
                          <img :class='{bigImg : index===activeImg}' class='showUrl' :src="'//gw.alicdn.com/'+show.poster+'_110x10000Q75.jpg'" alt="">
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
                 <div class="showDate" id="showDate" v-if='!!showId'>
                    <template  v-for='(detail,index) in buy.showScheduleMap[showId]'>
                       <p :style="position(index)" @click='tabTag(index)' :class='{active : dateSel === index }' class="detail-date">{{detail.dateDesc}}<i v-if='!!detail.activityTag' class="active-icon">{{detail.activityTag}}</i></p>
                       <div class="showTab" v-show='index===dateSel'>
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
                                <span class="info-buy">购买</span>
                              </div>
                          </div>
                       </div>
                    </template>
                 </div>
            </div>
        </div>
        <transition name='move'>
          <bankCard ref='bankCard' v-show='isbankCard'></bankCard>
        </transition>
    </div>
</template>
<script>
    import headers from '@/components/header/header';
    import bankCard from '@/components/cinema/bank-card';
    import BScroll from 'better-scroll';
    export default {
      props:['buyData'],
       data(){
          return {
            buy:'',
            activeImg : 0,
            showId : '',
            dateSel : 0,
            isbankCard : false, //联名卡信息是否显示
          }
       },
       methods:{
          _initPic(){
            if (this.buy.showVos) {
              let imgWidth = 60;
              let width = imgWidth * this.buy.showVos.length + window.innerWidth - imgWidth;
              scrollBox.style.width = width + 'px';
              scrollBox.style.marginLeft = (window.innerWidth/2 - imgWidth) + 'px';
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
            alert('暂未开放')
          },
          bankCarcShow(){
            this.isbankCard = true;
            this.$refs.bankCard._initScroll();
          },
          position(index){
            let width = 90;
            return 'left:'+(width*index+15)+'px';
          },
          _initScroll(){
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
          tabTag(index){
            this.dateSel = index;
          },
          tabImg(event,index,showId){
            let imgWidth = 76;
            this.showId = showId;
            scrollBox.style.transform = 'translate(-'+imgWidth*index+'px,0)';
            if(event.target.className.indexOf('bigImg') != -1){
              alert(11)
            }
            this.activeImg = index;
          }
       },
       filters:{
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
       components:{headers,bankCard},
       created(){ //获取数据方法
          this.$http.get('/api/buy').then((response) => {
            response = response.body;
            if(response.data.returnCode == 0){
              this.buy = response.data.returnValue;
              console.log(this.buy)
              this.$parent.$parent.loaderShow = false;
              this.showId = this.buy.showVos[0].showId;
            }
         });
      },
      updated(){
        this._initPic();
        this._initScroll();
      },
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
        .cinema-tag
          margin-top:0.6rem;
          span 
            border-radius:0.5rem;
            border:1px solid $color;
            color:$color;
            margin-right:5px;
            font-size:10px;
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
          height:128px;
          width:100%;
          padding:0 15px;
          margin-left:-15px;
          margin-top:0.8rem;
          background:rgba(0,0,0,.7);
          .scroll-box
            margin-top:1rem;
            white-space:nowrap;
            .showUrl
              height:96px;
              margin-right:0.7rem;
            .bigImg
              height:112px;
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
</style>
