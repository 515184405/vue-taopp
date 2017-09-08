<template>
	<!-- 卡片模块 -->
	<div id="backCard" class="back-card remove-nav">
		<headerTemplate close='isbankCard' isActive='true' title='淘票票银行活动'></headerTemplate>
		<div id="activitiesContainer" class="activities-container">
			<div class="activities-box">
				<div class="bank-box" v-for='bank in banks'>
					<div class="bank-icon-box">
						<img class="bank-icon" :src="'//gw.alicdn.com/'+bank.bigPicUrl" alt="">
					</div>
					<div class="bank-content">                 
						<div class="bank-title">{{bank.activityTitle}}</div>                 
						<div class="bank-quota">名额：{{bank.quota}}</div>                 
						<div class="bank-area">地区：{{bank.area}}</div>             
					</div>
					<div>
						<span @click='bankCardClick' class="bank-btn" v-show='!!bank.tag'>{{bank.tag}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import headerTemplate from '@/components/header/header';
	export default{
		data(){
			return {
				banks :"",
			}
		},
		methods:{
			_initScroll(){ //滚动操作
	  			this.$nextTick(() => { 
	  				if(!this.detailScroll){
		  				this.detailScroll = new BScroll(activitiesContainer, {
		  					click : true,
		  				}) 
				  	}else{
			  			this.detailScroll.refresh();
			  		}
	  			})
		  	},
		  	bankCardClick(){
		  		alert('暂不可用')
		  	}
		},
		components:{headerTemplate},
		created(){ //获取数据方法
          var href = location.href;
		  var url = '/api/bank';
          if(href.indexOf('taopp') != -1){
            url = '/bankCard.json';
          }
          this.$http.get(url).then((response) => {
            response = response.body;
            if(response.data.returnCode == 0){
              this.banks = response.data.returnValue;
            }
          });
        },
	    updated(){
	      this._initScroll();
	    },
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import '../../common/css/transition.styl';
	.activities-box
		padding-bottom:50px;
	.activities-container
		padding:0 15px;
		box-sizing:border-box;
		position:fixed;
		left:0;
		top:2.5rem;
		bottom:0;
		width:100%;
	.back-card
		padding-top:2.5rem;
		position:fixed;
		left:0;
		top:0;
		height:100%;
		width:100%;
		z-index:15;
		background:#fff;
		text-align:left;
		.bank-box
			padding:15px 0;
			border-bottom:1px solid #f1f1f1;
			display:flex;
			flex-direction: row;
			justify-content:between-space;
			align-items:center;
			-webkit-box-align: center;
			.bank-icon-box
				.bank-icon
					border:1px solid #ddd;
					height:3.5rem;
			.bank-content{
			    flex: 1;
			    width: 0;
				padding:0 15px;
				.bank-title{
					font-weight:bold;
					color:#333;
					font-size:0.8rem;
					height:1.5rem;
					line-height:1.5rem;
					overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}
				.bank-quota,.bank-area{
					font-size:0.7rem;
					height:1.5rem;
					line-height:1.5rem;
					overflow: hidden;
				    text-overflow: ellipsis;
				    white-space: nowrap;
				}
			}
			.bank-btn
				padding:3px 8px;
				border-radius:3px;
				border:1px solid $red;
				color:$red;
				font-size:0.8rem;
</style>