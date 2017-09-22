<template>
  <div>
      <div class="user">
      <ul class="item-list">
        <li>  
          <router-link to='/user/card'>
            <p>我的电影票</p>
          </router-link>
        </li>
        <li>
          <p @click='discountClick'>优惠券</p>
        </li>
        <li>
          <p @click='alert'>帮助中心</p>
        </li>
        <li>
          <p @click='alert'>意见反馈</p>
        </li>
      </ul>
  </div>
    <transition name='move'>
      <login v-show='loginShow'></login>
    </transition>
    <transition name='move'>
      <discount v-show='discount'></discount>
    </transition>
    <transition name='move'>
      <router-view></router-view>
    </transition>
    <alerts ref='alerts'></alerts>
  </div>
</template>

<script>
import login from '@/components/login/login';
import alerts from '@/components/alert/alert';
import discount from '@/components/user/discount';
export default {
  data () {
    return {
      loginShow:true,
      discount:false,
    }
  },
  methods:{
    discountClick(){
      this.discount = true;
    },
    alert(){
      this.$refs.alerts.alertShow = false;
      this.$refs.alerts.opts = {
      content : '暂未开通',
      }
      this.$refs.alerts.alertShow = true;
    }
  },
  created(){
  	this.$parent.loaderShow = false;
  },
  watch:{
    $route(to,from){
      var _self = this;
      setTimeout(function(){
        _self.$parent.loaderShow = false;
      },200)
    }
  },
  components:{login,discount,alerts},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.user{
		position:fixed;
		left:0;
		top:0;
		bottom:0;
		background-color:#f1f1f1;
		width:100%;
  }
	.item-list
		background-color:#fff;
		li
			padding-left:3.5rem;
			&:nth-of-type(1)
				background:url('../../common/img/movie.png') no-repeat 1rem center;
				background-size:1.5rem auto;
			&:nth-of-type(2)
				background:url('img/lottery.png') no-repeat 1rem center;
				background-size:1.5rem auto;
			&:nth-of-type(3)
				background:url('img/help.png') no-repeat 1rem center;
				background-size:1.5rem auto;
			&:nth-of-type(4)
				background:url('img/opinion.png') no-repeat 1rem center;
				background-size:1.5rem auto;
			p
				font-size:0.9rem;
				color:#444;
				padding:1rem 0;
				border-bottom:1px solid #f1f1f1;
				background:url('../movie/img/right.png') no-repeat 96% center;
				background-size:0.8rem auto;

</style>
