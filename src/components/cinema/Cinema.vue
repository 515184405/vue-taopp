<template>
  	<div class="cinema remove-nav">

		<!-- 头部 -->

   		<div class="cinema-header clearfix">
   		 <selectcity></selectcity>
        <div class="right f0">
                <p @click='selector' :class='{selector:isSelector}' class="hot-screen">筛选</p>
                <p @click='searchBtn' class="begin-screen">搜索</p>
          </div> 
   		</div>
		<!-- 头部 -->
		<!-- 搜索模块 -->

		<transition name='slideDown'>
			<search v-if='searchShow'></search>
		</transition>

		<!-- 搜索模块 -->
		<!-- 日期筛选模块 -->

   		<div id="dateSelect" class="dateSelect" v-if='!!cinemaList.cinemaFilter'>
   			<div id='dateBox' class="date-box">
   				<p @click='dateTab(index,dates)' class="date-day" :class='{active : index === dateSelectActive}' v-for='(dates,index) in cinemaList.cinemaFilter.supportDates'>{{dates | filterDate}}</p>
   			</div>
   		</div>
   		<div v-if=''></div>
		<!-- 日期筛选模块 -->
		<!-- 影院列表 -->
		<div class="cinema-container" id="cinemaContainer">
			<div class="cinema-box">
				<!-- 筛选条件显示模块 -->

		   		<div v-if='selectArr.length > 0' class="selectorArr">
		   			<p>已选 : <span v-for='sel in selectArr'>{{sel}}</span></p>
		   			<p @click='closeSelector'>取消筛选</p>
		   		</div>
				
				<!-- 筛选条件显示模块 -->
		   		<div  @click='buyShowClick(cinema)' v-show='isDateSelect(cinema.supportDate) && islocalSelect(cinema.regionName) && isSpecalSelect(cinema.displaySupports) && isTimeSelect(cinema.shows[0].dateShowTimeMap[dateSel]) && cimenaNameSelect(cinema.cinemaName)' class="cinemaList" v-for='cinema in cinemaList.mtopCinemas'>
		   			<p class="cinema-title">
		   				<span class="cinema-name overflow-text">{{cinema.cinemaName}}</span>
		   				<span class="cinema-money">{{cinema.noShowDisplayPrice/100}}</span>元起
		   			</p>
		   			<p class="cinema-dress overflow-text">{{cinema.address}}</p>
		   			<p class="cinema-tag" v-if='cinema.displaySupports.length > 0'><span v-for='tag in cinema.displaySupports'>{{tag.name}}</span></p>
		   			<p class="cinema-newPeople" v-if='cinema.activities'><span class='activities-icon'>{{cinema.activities[0].activityTag | split(1)}}</span><span class="activities-active">{{cinema.activities[0].activityTag}}</span></p>
		   			<p class="cinema-time">
		   				场次 : {{cinema.shows[0].dateShowTimeMap[dateSel]}}
		   			</p>
		   		</div>
		   	</div>
		</div>
		<!-- 影院列表 -->

		<!-- 购买模块 -->
		<transition name='move'>
			<buy v-if='buyShow' :buyData = 'buyData'></buy>
		</transition>
		<!-- 购买模块 -->
		

		<!-- 筛选模块 -->

        <transition name='slideDown'>
        	<selector ref='selector' v-show='isSelector' :selector='cinemaList.cinemaFilter'></selector>
        </transition>

        <!-- 筛选模块 -->
  </div>
</template>

<script>
	var data = '';
	import selectcity from '@/components/selectcity/selectcity';
	import selector from '@/components/cinema/selector';
	import search from '@/components/cinema/search';
	import BScroll from 'better-scroll';
	import buy from '@/components/cinema/buy';
	import {getFontSize} from '@/common/js/getHtmlFontSize';
	export default {
	  data(){
	  	return {
	  		isSelector : false,//是否开始条件筛选
	  		cinemaList : '',//数据列表
	  		selectArr : [],//筛选显示数组
	  		dateSelectActive : 0,//日期选择活动对象
	  		dateSel : '',//日期筛选t条件
	  		selectEndArr : '',//筛选时间
	  		searchShow : false,
	  		selectName : '',
	  		buyData : '',
	  		buyShow : false,
	  	}
	  },
	  components:{selectcity,selector,search,buy},
	  methods : {
	  	selector(){  //筛选模块打开方法
	  		this.isSelector = true;
	  	},
	  	searchBtn(){
	  		this.searchShow = true;
	  	},
	  	buyShowClick(data){
	  		this.buyShow = true;
	  		this.buyData = data;
	  		this.$parent.loaderShow = true;
	  	},
	  	closeSelector(){ //取消筛选方法
	  		this.selectArr = [];
	  		this.selectEndArr = '';
	  		this.selectName = '';
	  		this.$refs.selector.selectArr = [];
	  	},
	  	dateTab(index,dates){ //日期tab选项方法
	  		this.dateSelectActive = index;
	  		this.dateSel = dates;
	  	},
	  	//日期筛选
	  	isDateSelect(dateArr){
	  		if(!!this.dateSel){
	  			if((dateArr.indexOf(this.dateSel) != -1)){
	  				return true;
	  			}
	  			return false;
	  		}
	  		return false;
	  	},
	  	//区域筛选
	  	islocalSelect(local){
	  		if(this.selectArr[0] == '不限' || !this.selectArr[0]){		
	  			return true;
	  		}else if(local == this.selectArr[0]){
				return true;
	  		}
	  		return false;
	  	},
	  	//特色筛选
	  	isSpecalSelect(specal){
	  		if(this.selectArr[1] == '不限' || !this.selectArr[1]){
	  			return true;
	  		}else{
	  			for(var i=0;i < specal.length;i++){
	  				if(this.selectArr[1] == specal[i].name){
	  					return true;
	  					break;
	  				}
	  			}
	 			return false;
	  		}
	  	},
	  	//时间筛选
	  	isTimeSelect(time){
	  		if(this.selectEndArr != ''){
	  			let selTime = this.selectEndArr.split('-');
	  			let showTime = time.split('|');
	  			var timeArr=[];//新的数组做比较
	  			for(var j=0;j < showTime.length;j++){
	  				var timeStr = showTime[j].substr(0,5).replace(':','.');
	  				if(showTime[j].substr(6,2) == '次日'){
	  					timeArr.push(parseFloat(timeStr)+24)
	  				}
	  				timeArr.push(parseFloat(timeStr));
	  			}
	  			var minTime = parseFloat(selTime[0].replace(':','.'));
	  			var maxTime = parseFloat(selTime[1].replace(':','.'));
	  			for(var i=0;i < timeArr.length;i++){
	  				if((timeArr[i] > minTime) && timeArr[i] < maxTime){
	  					return true;
	  				}else{
	  					return false;
	  				}
	  			}
	  		}
	  		return true;
	  	},
	  	//影院名称搜索
	  	cimenaNameSelect(cinemaName){
	  		if(this.selectName != ''){
	  			if(cinemaName.indexOf(this.selectName) != -1){
	  				return true;
	  			}
	  			return false;
	  		}
	  		return true;
	  	},
	  	_initCinemaList(){
  			this.$nextTick(() => { 
  				if(!this.cinemaListScroll){
	  				this.cinemaListScroll = new BScroll(cinemaContainer, {
	  					click : true,
	  				}) 
			  	}else{
		  			this.cinemaListScroll.refresh();
		  		}
  			})
	  	},
	  	_initPic(){  //日期滚动方法
	        if (this.cinemaList.cinemaFilter) {
	          let picWidth = 4.16;
	          let margin = 15;
	          let len = this.cinemaList.cinemaFilter.supportDates.length;
	          let width = picWidth * len * getFontSize() + margin*len;
	          dateBox.style.width = width + 'px';
	          this.$nextTick(()=>{
	            if(!this.picScroll){
	              this.picScroll = new BScroll(dateSelect, {
	                scrollX: true,
	                click : true,
	                //eventPassthrough: 'vertical'
	              })
	            }else{ 
	              this.picScroll.refresh();
	            }
	          })
	        }
  		},
	  },
	  filters:{ 
	  	split(input,num){ //截取字符串方法
	  		return input.substr(0,num);
	  	},
	  	filterDate(dates){ //设置日期方法
	  		let show_day=new Array('周日','周一','周二','周三','周四','周五','周六'); 
	  		let today = new Date('2017-08-31 00:00:00')*1000;
	  		let cinameDate = new Date(dates*1000);
	  		let yiTodayTime = 86400000000;
	  		let monthDate = (cinameDate.getMonth()+1) + "-" + cinameDate.getDate();
	  		let week = show_day[new Date(dates*1000).getDay()];
	  		if(cinameDate*1000 - today == 0){
	  			week = '今天';
	  		}
	  		if(cinameDate*1000 - today == yiTodayTime){
	  			week = '明天'
	  		}
	  		if(cinameDate*1000 - today == yiTodayTime*2){
	  			week = '后天'
	  		}
	  		return week + "   " + monthDate;
	  	}
	  },
	  created(){ //获取数据方法 var href = location.href;
	  	 if(!data){
	        var href = location.href;
	        var url = '/api/cinema';
	        if(href.indexOf('taopp') != -1){
	          url = '/cinema.json';
	        }
	        this.$http.get(url).then((response) => {
	            response = response.body;
	            if(response.data.returnCode == 0){
	              this.cinemaList = data = response.data.returnValue;
	              this.dateSel = this.cinemaList.cinemaFilter.supportDates[0];
	              this.$parent.loaderShow = false;
	            }
	         });
	       }else{
	       		this.cinemaList = data;
	       		this.dateSel = this.cinemaList.cinemaFilter.supportDates[0];
	            this.$parent.loaderShow = false;
	       }
      },
      mounted(){
	     this._initPic();
	     this._initCinemaList()
	  },
	  updated(){
	  	 this.$refs.selector._initCinemaList()
	     this._initPic();
	     this._initCinemaList()
	  },
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';
.t-c{
  text-align:center;
}
.cinema-container
	position:fixed;
	left:0;
	top:4.1rem;
	width:100%;
	overflow:hidden;
	bottom:51px;
	background:#fff;
.cinema
	color:#888;
	position:absolute;
	left:0;
	top:0;
	bottom:0;
	width:100%;
	height:100%;
	.cinema-header
		position:fixed;
		left:0;
		top:0;
		z-index:12;
		background:#fff;
		height:2rem;
		width:100%;
		border-bottom:1px solid #f1f1f1;
		.hot-screen,.begin-screen{
			margion-top:2px;
			padding:2px 10px 2px 1.3rem;
			display:inline-block;
			font-size:0.875rem;
			margin-top:10px;
			display:inline-block;
		}
		.hot-screen
			background:url('./img/selector.png') no-repeat left center;
			background-size:1rem;
		.begin-screen
			background:url('./img/search.png') no-repeat 5px center;
			background-size:1.2rem;
			padding-left:1.3rem;
			border-left:1px solid #f1f1f1;
		.selector
			color:$color;
			background-image:url('./img/selector2.png');
	.selectorArr
		display:flex;
		padding:0 15px;
		line-height:2.5rem;
		background:#fff;
		border-bottom:1px solid #f1f1f1;
		justify-content:space-between;	
		span 
			margin-right:5px;
			color:$red;
	.cinemaList
		background:#fff;
		border-bottom:1px solid #f1f1f1;
		padding-bottom:0.6rem;
		margin-left:15px;
		.cinema-title
			width:100%;
			margin-top:0.5rem;
			font-size:0.75rem;
			.cinema-name
				font-size:1rem;
				font-weight:bold;
				line-height:1.1rem;
				width:50%;
				color:#333;
				display:inline-block;
			.cinema-money
				color:$red;
				font-size:1rem;
		.cinema-dress
			font-size:0.75rem;
			margin-top:0.5rem;
			line-height:0.85rem;
		.cinema-time
			margin-top:0.6rem;
			font-size:0.75rem;
		.cinema-tag
			margin-top:0.6rem;
			span 
				border-radius:0.5rem;
				border:1px solid $color;
				color:$color;
				font-size:0.75rem;
				padding: 0 3px;
				margin-right:5px;
		.cinema-newPeople
			margin-top:0.6rem;
			.activities-icon
				color:#fff;
				background:$red;
				font-size:0.75rem;
				padding:0 3px;
				border-radius:3px;
				margin-right:5px;
		.activities-active
			font-size:0.75rem;
	.dateSelect
		position:fixed;
		left:0;
		top:2rem;
		right:0;
		z-index:1;
		background:#fff;
		border-bottom:1px solid #f1f1f1;
		line-height:2.1rem;
		overflow:hidden;
		.date-box
			 white-space:nowrap;
		.date-day{
			padding-bottom:2px;
			display:inline-block;
			width:4.16rem;
			margin-left:15px;
			text-align:center;
			font-size:0.9rem;
			&.active{
				color:$color;
				padding-bottom:0;
				border-bottom:2px solid $color;
			}
		}
</style>
