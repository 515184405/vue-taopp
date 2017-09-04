<template>
   <div class="t-c hot-movie">
               <swipe class='swipe'></swipe>
               <div v-for='(item,key) in movieList' class="movie-list">
                   <div class="movie-list-item">
                      <div class="movie-img-box">
                          <img class="movie-img" :src="'https://gw.alicdn.com/'+item.poster+'_160x160Q75.jpg'" alt="">
                      </div>
                      <div @click='movieProjectData(item)' class="movie-item">
                          <p class="movie-showName overflow-text"><span>{{item.showName}}</span></p>
                          <p class="movie-star-box overflow-text"><star class='movie-star' :score='item.remark'></star><span class="movie-score">{{item.remark}}</span></p>
                          <p class="movie-director overflow-text">导演 ：{{item.director}} </p>
                          <p class="movie-leadingRole overflow-text">主演 ：{{item.leadingRole}} </p>
                      </div>
                      <img class="today-hot" v-if='key == 0' src="./img/today-hot.png" alt="今日最热">
                      <img class="week-hot" v-if='key == 0' src="./img/week-hot.png" alt="一周最热">
                      <span v-if='!!item.showMark' class="showMark">{{item.showMark}}</span>
                      <router-link to='/cinema' v-if='item.soldType == "NORMAL"' class="buy-btn">购票</router-link>
                      <router-link to='/cinema' v-if='item.soldType == "PRE"' class="buy-btn btn-advance">预售</router-link>
                   </div>
                    <p @click='activitiesDetailShow(item.activities)' class="movie-activities overflow-text" v-if='!!item.activities'>
                    <template v-if='!!item.activities[0].activityTag'>
                        <span class='activityExtTagMap'>{{item.activities[0].activityTag}}</span>
                        <span class="activities_line">|</span>
                        <span class="activityTitle">{{item.activities[0].activityTitle}}</span>
                    </template>
                    </p>
               </div>
               <transition name='move'>
                  <detail v-show='detailShow' :movieProject='movieProject'></detail>
              </transition>
               <transition name='move'>
                  <activities v-show='activitiesShow' :activitiesTxt='activitiesTxt'></activities>
              </transition>
          </div>
</template>
<script>
  import detail from '@/components/movie/detail';
  import activities from '@/components/movie/activities';
  import swipe from "@/components/swipe/swipe";
  import star from '@/components/star/star';
  export default {
      data(){
        return {
           movieList : '',
           movieProject : '',
           detailShow : false,
           activitiesTxt : "",
           activitiesShow :false,
        }
      },
      created(){
       var href = location.href;
       var url = '/api/data';
       if(href.indexOf('taopp') != -1){
         url = '/data.json';
       }
       this.$http.get(url).then((response) => {
            response = response.body;
            if(response.data.returnCode == 0){
              this.movieList = response.data.returnValue;
              this.$parent.$parent.loaderShow = false;
            }
          });

      },
      methods:{
         movieProjectData(data){
           this.detailShow = true;
           this.movieProject = data;
        },
        activitiesDetailShow(data){
          this.activitiesTxt = data;
          this.activitiesShow = true;
        }
      },
      components:{swipe,star,detail,activities},
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';
.t-c{
  text-align:center;
}
.swipe
  height:150px !important;
.hot-movie
  .movie-list
    overflow:hidden;
    border-bottom:1px solid #e1e1e1;
    position:relative;
    color:#888;
    box-sizing:border-box;
    margin-left:15px;
    text-align:left;
    .movie-list-item
        padding:15px 15px 15px 0;
    .movie-img-box
        position:absolute;
        top:15px;
        left:0;
        height:90px;
        width:65px;
        .movie-img
           max-width:100%;
           max-height:100%
    .movie-item
      width:75%;
      padding-left:75px;
      height:90px;
      padding-right:15px;
      box-sizing:border-box;
      .movie-showName
          color:#333;
          padding-top:3px;
      .movie-star-box
          position:relative;
          .movie-star
              width:50px;
              margin-top:10px;
          .movie-score
              position:absolute;
              left:60px;
              top:10px;
              font-size:10px;
      .movie-director
          margin-top:10px;
          font-size:0.7rem;
      .movie-leadingRole
          font-size:0.7rem;
          width:100%;
          margin-top:10px;
    .movie-activities
        margin-left:75px;
        line-height:36px;
        border-top:1px solid #e1e1e1;
        font-size:0.7rem;
        padding-right:20px;
        margin-right:15px;
        box-sizing:border-box;
        background:url('img/right.png') no-repeat right center;
        background-size:12px auto;
        .activityExtTagMap
            color:#fea54c;
        .activities_line
            padding:0 10px;
    .buy-btn
        border: 1px solid #ff4d64;
        color: #ff4d64;
        border-radius: 4px;
        padding:5px 8px;
        display:inline;
        font-size:0.7rem;
        position:absolute;
        right:30px;
        top:45px;
    .btn-advance
        border: 1px solid #37b7ff;
        color: #37b7ff;
    .showMark
        position:absolute;
        right:-20px;
        top:10px;
        text-align:center;
        font-size:0.6rem;
        width:80px;
        line-height:20px;
        color:#fff;
        background:$color;
        transform:rotate(45deg);
    .today-hot,.week-hot
        width:25px;
        position:absolute;
        top:0;
        right:55px;
    .today-hot
        right:85px;
</style>
