<template>
  <div id="app">
      <transition name="move">
          <router-view></router-view>
      </transition>
      <div class="app-footer">
          <router-link class="footer-item" to='/movie'>电影</router-link>
          <router-link class="footer-item" to='/cinema'>影院</router-link>
          <router-link class="footer-item" to='/user'>我的</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {

    }
  },
  methods:{
    
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './common/css/transition.styl';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x:hidden;
}
.app-footer{
  font-size: 0;
  position: fixed;
  bottom:0;
  height:47px;
  padding-top:3px;
  background: #fff;
  left:0;
  width:100%;
  border-top:1px solid #ddd;

  }
.footer-item{
  font-size: 0.85rem;
  width:33.33%;
  height:100%;
  display: inline-block;
  text-align: center;
  padding-top: 28px;
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-position: center top;
}
.footer-item.router-link-active{
  color:#90B4FC;
}
.footer-item:nth-of-type(1){
  background-image: url('./common/img/movie.png');
  &.router-link-active{
    background-image: url('./common/img/movie_active.png');
  }
}
.footer-item:nth-of-type(2){
  background-image: url('./common/img/cinema.png');
  &.router-link-active{
    background-image: url('./common/img/cinema_active.png');
  }
}
.footer-item:nth-of-type(3){
  background-image: url('./common/img/user.png');
  &.router-link-active{
    background-image: url('./common/img/user_active.png');
  }
}
</style>
