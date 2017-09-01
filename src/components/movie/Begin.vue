<template>
   <div class="t-c hot-movie">
        <template v-for='dateTime in removal'>
            <p class="movie-date"><span class="dateTime">{{dateTime}}</span><span class="dateWeek">{{dateTime | getWeek}}</span></p>
            <div class="movie-begin" v-for='item in movieList2' v-if='dateTime == item.openTime'>
             <div class="movie-list">
                 <div class="movie-list-item">
                    <div class="movie-img-box">
                        <img class="movie-img" :src="'https://gw.alicdn.com/'+item.poster+'_160x160Q75.jpg'" alt="">
                    </div>
                    <div @click='movieProjectData(item)' class="movie-item">
                        <p class="movie-showName overflow-text"><span>{{item.showName}}</span></p>
                        <p class="movie-wantCount overflow-text">{{item.wantCount}}人想看</p>
                        <p class="movie-director overflow-text">导演 ：{{item.director}} </p>
                        <p class="movie-leadingRole overflow-text">主演 ：{{item.leadingRole}} </p>
                    </div>
                    <div v-if='item.soldType == "NORMAL"' class="buy-btn">购票</div>
                    <div v-if='item.soldType == "PRE"' class="buy-btn btn-advance">预售</div>
                 </div>
             </div>
          </div>
      </template>
      <div class="movie-begin" v-for='(items,key) in movieList'>
           <p class="movie-date"><span>{{key}}</span><span>待定</span></p>
          <template v-for='(item,index) in items'>
             <div @click='movieProjectData(item)' class="movie-list">
                 <div class="movie-list-item">
                    <div class="movie-img-box">
                        <img class="movie-img" :src="'https://gw.alicdn.com/'+item.poster+'_160x160Q75.jpg'" alt="">
                    </div>
                    <div class="movie-item">
                        <p class="movie-showName overflow-text"><span>{{item.showName}}</span></p>
                        <p class="movie-star-box overflow-text"></p>
                        <p class="movie-director overflow-text">导演 ：{{item.director}} </p>
                        <p class="movie-leadingRole overflow-text">主演 ：{{item.leadingRole}} </p>
                    </div>
                    <div v-if='item.soldType == "NORMAL"' class="buy-btn">购票</div>
                    <div v-if='item.soldType == "PRE"' class="buy-btn btn-advance">预售</div>
                 </div>
             </div>
              
          </template>
      </div>
      <transition name='move'>
          <detail v-show='detailShow' :movieProject='movieProject'></detail>
      </transition>
  </div>
</template>
<script>
  import detail from '@/components/movie/detail';
  export default {
      data(){
        return {
           movieList : '',
           movieList2 : '',
           removal : [],
           movieProject : '',
           detailShow : false,
        }
      },
      created(){
        this.$http.get('/api/begin').then((response) => {
            response = response.body;
            console.log(response.data.returnValue)
            if(response.data.returnCode == 0){
              var beginData = response.data.returnValue.soonShowGuideMap;
              this.movieList2 = response.data.returnValue.soonShows;
              for(var key in beginData){
                  beginData[key] = this.sortByKey(beginData[key],'openTime');
              }
              this.movieList = beginData;
              this.dateRemoval();
            }
          });
      },
      methods : {
        //json排序
        sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        },
        dateRemoval(){
           var len = this.movieList2.length;
           for(var i=0;i < len; i++){
              if(this.removal.indexOf(this.movieList2[i].openTime) == -1){
                 this.removal.push(this.movieList2[i].openTime);
              }
           }
        },
        movieProjectData(data){
           this.detailShow = true;
           this.movieProject = data;
        }
      },
      filters : {
         getWeek(val){
             var show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六'); 
            return show_day[new Date(val).getDay()];
         }
      },
      components:{detail},
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';
.t-c{
  text-align:center;
}
.movie-date
    color: #50505a;
    line-height:35px;
    padding:0 15px;
    background:#F5F5F5;
    text-align:left;
    .dateTime
        font-size:0.7rem;
    .dateWeek
        font-size:0.75rem;
        margin-left:10px;
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
      .movie-wantCount
          margin-top:10px;
          font-size:0.7rem;
          color:#fea54c;
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
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
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
