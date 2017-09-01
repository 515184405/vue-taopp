<template>
  	<div class="cinema remove-nav">

		<!-- 头部 -->

   		<div class="cinema-header clearfix">
   		  <selectcity></selectcity>
        <div class="right f0">
                <p @click='selector' :class='{selector:isSelector}' class="hot-screen">筛选</p>
                <p class="begin-screen">搜索</p>
          </div> 
   		</div>
		<!-- 头部 -->
		<!-- 日期筛选模块 -->

   		<div id="dateSelect" class="dateSelect" v-if='!!cinemaList.cinemaFilter'>
   			<div id='dateBox' class="date-box">
   				<p @click='dateTab(index,dates)' class="date-day" :class='{active : index === dateSelectActive}' v-for='(dates,index) in cinemaList.cinemaFilter.supportDates'>{{dates | filterDate}}</p>
   			</div>
   		</div>
   		<div v-if=''></div>
		<!-- 日期筛选模块 -->
		<!-- 筛选条件显示模块 -->

   		<div v-if='selectArr.length > 0' class="selectorArr">
   			<p>已选 : <span v-for='sel in selectArr'>{{sel}}</span></p>
   			<p @click='closeSelector'>取消筛选</p>
   		</div>
		
		<!-- 筛选条件显示模块 -->
		<!-- 影院列表 -->
   		<div v-show='isDateSelect(cinema.supportDate) && islocalSelect(cinema.regionName) && isSpecalSelect(cinema.displaySupports) && isTimeSelect(cinema.shows[0].dateShowTimeMap[dateSel])' class="cinemaList" v-for='cinema in cinemaList.mtopCinemas'>
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

		<!-- 影院列表 -->
		<!-- 筛选模块 -->

        <transition name='move'>
        	<selector v-show='isSelector' :selector='cinemaList.cinemaFilter'></selector>
        </transition>

        <!-- 筛选模块 -->
  </div>
</template>

<script>
	import selectcity from '@/components/selectcity/selectcity';
	import selector from '@/components/cinema/selector';
	import BScroll from 'better-scroll';
	export default {
	  data(){
	  	return {
	  		isSelector : false,//是否开始条件筛选
	  		cinemaList : '',//数据列表
	  		selectArr : [],//筛选结果数组
	  		dateSelectActive : 0,//日期选择活动对象
	  		dateSel : '',//日期筛选t条件
	  	}
	  },
	  components:{selectcity,selector},
	  methods : {
	  	selector(){  //筛选模块打开方法
	  		this.isSelector = true;
	  	},
	  	closeSelector(){ //取消筛选方法
	  		this.selectArr = [];
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
	  	isTimeSelect(local){
	  		console.log(local)
	  		return true;
	  	},

	  	_initPic(){  //日期滚动方法
	        if (this.cinemaList.cinemaFilter) {
	          let picWidth = 90;
	          let width = picWidth * this.cinemaList.cinemaFilter.supportDates.length;
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
	  created(){ //获取数据方法
       this.$http.get('/api/cinema').then((response) => {
            response = response.body;
            if(response.data.returnCode == 0){
              this.cinemaList = response.data.returnValue;
              console.log(this.cinemaList)
              this.dateSel = this.cinemaList.cinemaFilter.supportDates[0];
            }
         });
      },
      mounted(){
	     this._initPic();
	  },
	  updated(){
	     this._initPic();
	  },
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';
.t-c{
  text-align:center;
}
.cinema
	color:#888;
	.cinema-header
		position:fixed;
		left:0;
		top:0;
		background:#fff;
		height:40px;
		width:100%;
		border-bottom:1px solid #ddd;
		.hot-screen,.begin-screen{
			margion-top:2px;
			padding:2px 10px 2px 20px;
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
			padding-left:25px;
			border-left:1px solid #ddd;
		.selector
			color:$color;
			background-image:url('./img/selector2.png');
	.selectorArr
		display:flex;
		padding:0 15px;
		line-height:2.5rem;
		justify-content:space-between;	
		span 
			margin-right:5px;
			color:$red;
	.cinemaList
		border-bottom:1px solid #ddd;
		padding-bottom:0.6rem;
		margin-left:15px;
		.cinema-title
			width:100%;
			margin-top:0.6rem;
			.cinema-name
				font-size:1rem;
				font-weight:bold;
				width:50%;
				color:#333;
				display:inline-block;
			.cinema-money
				color:$red;
		.cinema-dress
			font-size:0.75rem;
			margin-top:0.6rem;
		.cinema-time
			margin-top:0.6rem;
			font-size:0.75rem;
		.cinema-tag
			margin-top:0.6rem;
			span 
				border-radius:0.5rem;
				border:1px solid $color;
				color:$color;
				padding: 0 3px;
				margin-right:5px;
				font-size:10px;
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
		margin-top:41px;
		border-bottom:1px solid #ddd;
		line-height:2.4rem;
		overflow:hidden;
		.date-box
			 white-space:nowrap;
		.date-day{
			padding-bottom:2px;
			display:inline-block;
			width:75px;
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
