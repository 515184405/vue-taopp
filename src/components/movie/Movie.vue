<template>
  <div class="movie remove-nav">
   		<div class="movie-header clearfix">
   		  <selectcity></selectcity>
        <div class="right f0">
                <router-link to='/movie' class="hot-screen">正在热映</router-link>
                <router-link to='/movie/begin' class="begin-screen">即将上映</router-link>
          </div> 
   		</div>
      <transition name='slide'>
        <router-view class='movie-box'></router-view>
      </transition>
  </div>
</template>

<script>
import selectcity from '@/components/selectcity/selectcity';
export default {
  components:{selectcity},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';
.t-c{
  text-align:center;
}
.movie
	color:#595757;
	.movie-header
		.hot-screen,.begin-screen{
			padding:0.55rem 15px;
			display:inline-block;
			font-size:0.875rem;
			&.router-link-exact-active{
				border-bottom:2px solid $color;
				color : $color;
			}
		}
</style>
