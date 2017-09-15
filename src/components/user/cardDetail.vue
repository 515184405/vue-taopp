<template>
  <div class="cardDetail" id="cardDetail">
		<div class="cardDetail-container">
			<headerTemplate close='cardDetailMsg' isActive='true' title='电影票详情'></headerTemplate>
			<div class="dy-list overflow-text">
				凭二维码取票更方便，取票码将不再以短信形式发送
			</div>
			<div class="dy-item">
				<div class="dy-item-info">
					<p class="dy-showName">{{cardDetail.title}}</p>
					<p class='dy-showTime'>{{cardDetail.showTime | format1}}~{{cardDetail.showEndTime | format2}}{{cardDetail.version}}</p>
					<p class='dy-dress'>{{cardDetail.cinemaName}}{{cardDetail.hallName}}</p>
					<p class='dy-seat'><span v-for='seat in cardDetail.seatInfo'>{{seat}}</span></p>
					<p class="dy-egg"><span class="egg">片尾有1个彩蛋，不要错过</span></p>
				</div>
				<div class="dy-item-img">
					<img :src="'//gw.alicdn.com/'+cardDetail.logoUrl+'_320x320Q30s150.jpg'" alt="">
				</div>
			</div>
			<div class="getMovieCard">
				<div class="getMovieCard-title">
					<span>取电影票</span>
					<span class="ifSaoMa">如何扫码</span>
				</div>
				<div class="getMovieCard-content">
					<p class="card-count">{{cardDetail.count}}张电影票</p>
					<div class="qrcode-box">
						<canvas id="canvas" class="qrcode"></canvas>
					</div>
					<p class="order-id">订单号：<s class="order-num">{{cardDetail.tbOrderId}}</s></p>
					<p class="order-id">验证码：<s class="order-num">{{cardDetail.filmId}}</s></p>
				</div>
			</div>
			<div class="getMovieCard-dress">
				<div class="dress-local">
					<p class="movieShowName">{{cardDetail.cinemaName}}</p>
					<p class="cinema-dress">数据里面无影院地址</p>
				</div>
				<a :href="'tel:'+cardDetail.providerPhone" class="cinema-tel"></a>
			</div>
			<div class="order-Detail">
				<div class="getMovieCard-dress">
					<p class="movieShowName">实付金额</p>
					<p class="movieShowName">{{cardDetail.amount/100}}元</p>
				</div>
				<ul class="order-msg">
					<li>订单号 {{cardDetail.tradeNo}}</li>
					<li>购买时间 {{cardDetail.showTime | format1}}</li>
					<li>手机号 15321351111</li>
					<li>电影票由 {{cardDetail.providerName}}提供</li>
				</ul>
			</div>
			<div class="order-Detail">
				<div class="getMovieCard-dress">
					<p class="movieShowName">观影须知</p>
				</div>
				<ul class="order-msg">
					<li>1. 请提前到达影院现场，找到自助取票机，打印纸质电影票，完成取票。</li>
					<li>2. 如现场自助取票机无法打印电影票，请联系影院工作人员处理。</li>
					<li>3. 凭打印好的纸质电影票，检票入场观影。</li>
					<li>4. 如果订单使用了兑换券，或购买了特殊场次，暂不支持退票和改签。</li>
					<li>5. 如有开具所购电影票发票的需求，请保留好电影票根，尽量在观影当天联系影城工作人员进行开具，如遇特殊情况请及时联系淘票票人工客服咨询。</li>
				</ul>
			</div>
			<div @click='removeOrder(cardDetail.cinemaId)' class="removeOrder">
				删除订单
			</div>
		</div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import {formatDate} from '@/common/js/formatDate';
import headerTemplate from '@/components/header/header';
import Vue from 'vue'
import QRCode from 'qrcode'
Vue.use(QRCode);
export default {
	props:['cardDetail'],
	watch:{
		cardDetail(val,oldVal){
			this.useqrcode();
		}
	},
	methods:{
		_initScroll(){
  			this.$nextTick(() => { 
  				if(!this.detailScroll){
	  				this.detailScroll = new BScroll(cardDetail, {
	  					click : true,
	  				}) 
			  	}else{
		  			this.detailScroll.refresh();
		  		}
  			})
	  	},
	  	bankCardClick(){
	  		alert('暂不可用')
	  	},
	  	removeOrder(id){
	  		var orderList = this.$parent.list.orders;
	  		for(var i=0;i < orderList.length;i++){
	  			if(orderList[i].cinemaId == id){
	  				var isTrue = window.confirm('确定要删除电影名为《'+orderList[i].title+'》的订单吗');
	  				if(isTrue){
	  					orderList.splice(i,1);
	  					this.$parent.cardDetailMsg = '';
	  					alert('删除成功');
	  				}
	  				return;
	  			}
	  		}
	  	},
	  	useqrcode(){
			if(!!this.cardDetail.tradeNo){
				QRCode.toCanvas(canvas, this.cardDetail.tbOrderId,{
					 color: {
					    dark: '#aaa',  // Blue dots
					    light: '#0000' // Transparent background
					  }
				}, function (error) {
					if (error) console.error(error)
					console.log('success!');
				})
			}
		}
	},
	filters:{
		format1(time){
			return formatDate(time,'yyyy-MM-dd hh:mm');
		},
		format2(time){
			return formatDate(time,'hh:mm');
		},
	},
	mounted(){
		this._initScroll();
		this.useqrcode();
	},

	components:{headerTemplate},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition';

.cardDetail
	position:fixed;
	left:0;
	top:0rem;
	bottom:2.84rem;
	background-color:#f1f1f1;
	overflow:hidden;
	z-index:19;
	width:100%;
	.dy-list{
		height:1.9rem;
		text-align: left;
	    color: #fea54c;
	    background-color: #fff5be;
	    line-height:1.9rem;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    padding:0 15px;
	    box-sizing:border-box;
	}
	.dy-item
		padding:1rem;
		display:flex;
		background-color:#fff;
		align-items:center;
		justify-content:space-between;
		.dy-item-img
			img
				width:3rem;
		.dy-showName
			font-size:1rem;
			color:#333;
		.dy-showTime
			color:$red;
			font-size:0.75rem;
			margin-top:0.5rem;
		.dy-dress,.dy-seat
			font-size:0.75rem;
			margin-top:0.5rem;
			color:#333;
		.dy-egg
			background-color: #fea54c;
			color:#fff;
			border-radius:0.75rem;
			font-size:0.75rem;
			padding:0.2rem 0.7rem;
			margin-top:0.7rem;
	.getMovieCard
		padding:1rem;
		margin-top:0.7rem;
		background-color:#fff;
		.getMovieCard-title
			display:flex;
			justify-content:space-between;
			span 
				color:#444;
				font-size:0.825rem;
			.ifSaoMa
				color:$red;
	.getMovieCard-content
		margin-top:2.5rem;
		.card-count
			text-align:center;
			font-size:0.8rem;
			color:#8a869e;
		.qrcode
			height:60%!important;
			width:60%!important;
			margin-left:20%;
		.qrcode-box
			position:relative;
		.order-id
			width:16rem;
			display:block;
			margin:0 auto;
			font-size:0.8rem;
			margin-bottom:0.5rem;
			.order-num
				font-size:1.2rem;
	.getMovieCard-dress
		padding:1rem;
		margin-top:0.7rem;
		background-color:#fff;
		display:flex;
		justify-content:space-between;
		align-items:center;
		.movieShowName
			font-size:0.9rem;
			color:#333;
		.cinema-dress
			font-size:0.7rem;
			margin-top:0.7rem;
			color:#777;
		.cinema-tel
			width:2.3rem
			height:2.3rem;
			background:url('img/tel.png') no-repeat right center;
			background-size:contain;
			padding-left:1.2rem;
			border-left:1px solid #ddd;
	.order-Detail
		padding:1rem;
		margin-top:0.7rem;
		background-color:#fff;
		.getMovieCard-dress
			padding:0;
			margin-top:0;
		.order-msg
			margin-top:1.3rem;
			font-size:0.6rem;
			color:#777;
			line-height:0.8rem;
			li
				margin-top:0.5rem;
				line-height:1.1rem;
	.removeOrder{
		margin:1rem;
		box-sizing:border-box;
		border-radius:5px;
		color:$red;
		border:1px solid $red;
		padding:1rem 0;
		font-size:1.1rem;
		text-align:center;
	}
	.cardDetail-container{
		padding-bottom:2rem;
	}
</style>
