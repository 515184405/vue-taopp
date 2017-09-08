<template>
	<div class="detail remove-nav" v-if='!!movieProject'>
		<headerTemplate close='detailShow' :isActive='true' :title='movieProject.showName'></headerTemplate>
		<div class="detail-box" id="detailBox">
			<div class="detail-container">
				<div class="detail-msg">
					<div class="detail-msg-info">
						<img v-if='!!movieProject.poster' class="detail-msg-img" v-lazy="'//gw.alicdn.com/'+movieProject.poster+'_400x400Q30s150.jpg'" alt="">
						<div class="detail-msg-box">
							<p class="showName overflow-text"><span v-if='!!movieProject.showName' class="showName-title">{{description(movieProject.showName,6)}}</span><span class="showName-icon" v-if='!!movieProject.showMark'>{{movieProject.showMark}}</span></p>
							<p class="showNameEn overflow-text">{{movieProject.showNameEn}}</p>
							<ul class="movie-msg">
								<li>{{movieProject.type}}</li>
								<li>{{movieProject.country}} | {{movieProject.duration}}分钟</li>
								<li>
									<span v-if='!!movieProject.features'>{{movieProject.features.openTime}}</span>
									<span v-if='!!movieProject.features'>在{{movieProject.features.openCountry}}上映</span>
								</li>
								<li><span>想看人数</span></li>
								<li><span class="wantCount">{{movieProject.wantCount}}</span></li>
							</ul>
						</div>
					</div>
				</div>
				<div class="movie-desc">
					<p v-html='description(desc,descStrNum)'></p>	
					<p @click='descBtnClick' class="desc-btn">{{descBtn ? '展开' : '收起'}}</p>
				</div>
				<_line></_line>
				<div class="movie-artist-list">
					<p class="movie-artist-title">剧照</p>
					<div class="pics" id="picDom">
		                <ul class="pics-list" id="picsList">
		                    <li class="pics-item"  v-for='artist in movieProject.trailer'>
		                      <img v-lazy="'//gw.alicdn.com/'+artist+'_160x160Q30s150.jpg'" height='90' width="140" alt=""/>
		                    </li>
		                </ul>
		            </div>
				</div>
				<_line></_line>
				<div class="movie-artist-list">
					<p class="movie-artist-title">票房</p>
					<div class="clearfix">
						<div class="left weekCount">
							<p class="count">暂无</p>
							<p class="wan">首周票房(万)</p>
						</div>
						<div class="left allCount">
							<p class="count">暂无</p>
							<p class="wan">累计票房(万)</p>
						</div>
					</div>
					<p class="house-btn">查看票房详情</p>
				</div>
				<_line></_line>
				<div class="movie-artist-list pdm">
					<p class="movie-artist-title">热门影评</p>
					<p class="null">暂无</p>
					<p class="hotWan">因json没有数据</p>
				</div>
				<_line></_line>
			</div>
		</div>
		<router-link to='/buy' class="buy-p">
			选座购票
		</router-link>
		<transition name='fade'>
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import _line from '@/components/line/line';
	import headerTemplate from '@/components/header/header';
	export default{
		data(){
			return {
				desc :'<span style="color:#f00">这块数据JSON里面没有，所以是固定的</span> 故事改编自著名的二战军事事件“敦刻尔克大撤退”。二战初期，40万的英法盟军被敌军围困于敦刻尔克的海滩之上，面对敌军步步逼近的绝境，他们不得不为自己的命运背水一战，才有可能活着回家。 本片以二战时期代号为“发电机计划”的敦刻尔克大撤退为故事背景，是一部从不同视角聚焦人类生存的电影。影片将会分成沙滩上的步兵部分（芬恩·怀特海德与哈里·斯泰尔斯参演）、海军部分（希里安·墨菲与马克·里朗斯参演）以及空军部分（汤姆·哈迪开战斗机）分别来讲述，力求从不同的个人观点来呈现和构建这起历史事件。',
				descBtn : true,
				descStrNum : 100
			}
		},
		props:['movieProject'],
		watch:{
			movieProject:function(val,oldval){
				this._initDetailScroll()
			}
		},
		methods:{
			description(str,num){
				if(num){
					return str.substr(0,num)+"...";
				}
				return str;
			},
			descBtnClick(){
				this.descBtn = !this.descBtn;
				this.descStrNum = !!this.descStrNum ? 0 : 100;
		  		this._initDetailScroll();
			},
			_initDetailScroll(){
	  			this.$nextTick(() => { 
	  				if(!this.detailScroll){
		  				this.detailScroll = new BScroll(detailBox, {
		  					click : true,
		  				}) 
				  	}else{
			  			this.detailScroll.refresh();
			  		}
	  			})
		  	},
     		 _initPic(){
		        if (this.movieProject.trailer) {
		          let picWidth = 140;
		          let margin = 6;
		          let width = (picWidth + margin) * this.movieProject.trailer.length - margin;
		          picsList.style.width = width + 'px';
		          this.$nextTick(()=>{
		            if(!this.picScroll){
		              this.picScroll = new BScroll(picDom, {
		                scrollX: true,
		                //eventPassthrough: 'vertical'
		              })
		            }else{ 
		              this.picScroll.refresh();
		            }
		          })
		        }
      		},
		},
		mounted(){
	      this._initPic();
	    },
	    updated(){
	      this._initPic();
		  this._initDetailScroll();
	    },
		components:{_line,headerTemplate},
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';

	.detail-box
		position:fixed;
		left:0;
		top:40px;
		bottom:51px;
		width:100%;
	.detail
		position:fixed;
		height:100%;
		width:100%;
		left:0;
		top:0;
		background:#fff;
		padding-top:2.5rem;
		z-index:11;
		.detail-msg
			position:relative;
			background:#333;
			padding-top:1.2rem;
			height:11rem;
		.detail-msg-img
			width:6rem;
			padding:0 15px;
			position:absolute;
			left:0;
			top:30px;
		.detail-msg-box
			padding-left:7.5rem;
			box-sizing:border-box;
			text-align:left;
			.showName
				display:flex;
				align-item:center;
				margin-top:12px;
				.showName-title
					font-size:1.1rem;
					color:#fff;
				.showName-icon
					font-size:10px;
					border-radius:3px;
					padding:0 2px;
					line-height:1rem;
					border:1px solid #aaa;
					color:#aaa;
					margin-left:10px;
			.showNameEn
				font-size:0.75rem;
				color:#fff;
				margin-top:7px;
			.movie-msg
				margin-top:30px;
				li
					font-size:0.75rem;
					color:#eee;
					margin-top:7px;
					.wantCount
						color:#ffa84c;
						font-size:1.125rem;
		.movie-desc{
		    font-size:0.8rem;
		    line-height:25px;
		    text-align:left;
			padding:0 15px;
		    color:#333;
		    margin:20px 0;
		}
		.desc-btn{
			text-align:center;
			color:$color;
			font-size:1rem;
			padding-top:15px;
		}
		.movie-artist-list{
			padding-left:15px;
			.movie-artist-title{
				color:#333;
				font-weight:700;
				font-size:1;
				text-align:left;
				padding:15px 0;
				font-size:1rem;
			}
			.artist-photo{
				display:inline-block;
				width:74px;
				height:102px;
			}
			.pics{
	            padding-bottom:18px;
	            overflow:hidden;
	            .pics-list{
	              white-space:nowrap;
	              font-size:0;
	              .pics-item{
	                display: inline-block;
	                margin-right:6px;
	                &:last-child{
	                  margin-right:0;
	                 }
	              }
	            }
	          }
		}
		.weekCount,.allCount
			width:50%;
			.count	
				font-size:1.5rem;
			.wan
				margin-top:10px;
		.house-btn
			text-align:center;
			color:$color;
			font-size:1rem;
			padding:1.2rem 0;
		.null
			font-size:1.5rem;
		.hotWan
			padding:1.2rem 0;
		.buy-p
			background:$red;
			height:3.5rem;
			line-height:3.5rem;
			color:#fff;
			position:fixed;
			left:0;
			bottom:0;
			width:100%;
			font-size:1.2rem;
		.pdm
			padding-bottom:3rem;
</style>