<template>
  <div class="movie-card">
      	<headerTemplate close='discount' isActive='true' title='我的电影票'></headerTemplate>
      	<div @click='routerDirect()' class="close-btn"></div>
		<div class="movie-card-container">
			<div class="movie-card-box">
				<div class="movie-item" @click='cardDetailClick(item)' v-for='item in list.orders'>
					<div class="movie-seat">
						<p class="movie-seat-word">座</p>
					</div>
					<div class="movie-info">
						<p class="movie-showName">{{item.title}} {{item.count}}张</p>
						<p class="movie-date">{{item.showTime | format}}</p>
						<p class="movie-dress">{{item.cinemaName}}</p>
					</div>
					<div class="movie-btn">
						<span class="movie-btn-txt">查看</span>
					</div>
				</div>
			</div>
		</div>
		<transition name='slide'>
			<cardDetail ref='cardDetail' v-show='!!cardDetailMsg' :cardDetail = 'cardDetailMsg'></cardDetail>
		</transition>
  </div>
</template>

<script>
import headerTemplate from '@/components/header/header';
import cardDetail from '@/components/user/cardDetail';
import {formatDate} from '@/common/js/formatDate';
export default {
	data(){
		return{
			list : '',
			cardDetailMsg : "",
		}
	},
	filters:{
		format(time){
			return formatDate(time,'yyyy-MM-dd hh:mm');
		}
	},
	components:{cardDetail,headerTemplate},
	methods:{
		cardDetailClick(data){
			this.cardDetailMsg = data;
			this.$refs.cardDetail._initScroll();
		},
		routerDirect(){
			this.$router.go(-1);
		}
	},
	created(){
	    var href = location.href;
	    var url = '/api/moviecard';
	    if(href.indexOf('taopp') != -1){
	      url = '/buyMovieMsg.json';
	    }
	    this.$http.get(url).then((response) => {
	        response = response.body;
	        if(response.data.returnCode == 0){
	          this.list = response.data.returnValue;
	          this.$parent.$parent.loaderShow = false;
	        }
	    });
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.close-btn
		position:fixed;
		left:15px;
		top:0;
		width:2.5rem;
		height:2.5rem;
		z-index:17;
	.movie-card
		color:#ccc
		position:fixed;
		left:0;
		top:0;
		padding-top:2.5rem;
		bottom:0;
		width:100%;
		background-color:#f1f1f1;
		.movie-item
			background-color:rgba(255,255,255,0.8);
			display:flex;
			justify-content:space-between;
			align-items:center;
			margin-top:0.6rem;
			.movie-info
				flex:1;
				border-left:1px dotted #bbb;
				padding:1rem 0.7rem;
				background:url('img/endIcon.png') no-repeat 90% center;
				background-size: 2.5rem auto;
				.movie-showName
					font-size:1rem;
				.movie-date,.movie-dress
					font-size:0.8rem;
					margin-top:0.6rem;
			.movie-seat
				height:100%;
				padding:0 1rem;
				.movie-seat-word
					padding:0.75rem;
					border-radius:50%;
					font-size:0.8rem;
					background-color:#bbb;
					color:#fff;
			.movie-btn
				padding-right:1rem;
				.movie-btn-txt{
					padding:0.2rem 0.5rem;
					border:1px solid #ffc600;
					border-radius:3px;
	   				color: #ffc600;
	   				font-size:0.8rem;
	   			}

</style>
