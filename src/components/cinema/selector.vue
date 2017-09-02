<template>
  	<div class="selector" v-if='selector'>
   		<div class="selector-box" id="selectorBox">
			<div class="selector-main">
	   			<!-- 区域筛选 -->
		   		<div class="selector-container">
		   			<h3 class="selector-title"><span class="selector-name">区域</span><span class="selector-sel" :class='{addColor : (localtionSel!="不限")}'>{{localtionSel}}</span></h3>
		   			<div class="selector-main">
		   				<p @click='localtionEvent($event,index)' :class='{addColor2 : localtion === index}' v-for='(reginName,index) in selector.regionNames' >{{reginName}}</p>
		   			</div>
		   		</div>

	   			<!-- 区域筛选 -->
		   		<!-- 特色筛选 -->
		   		<div class="selector-container">
		   			<h3 class="selector-title"><span class="selector-name">特色</span><span class="selector-sel" :class='{addColor : (specalSel!="不限")}'>{{specalSel}}</span></h3>
		   			<div class="selector-main">
		   				<p @click='specalEvent($event,index)' :class='{addColor2 : specal === index}' v-for='(support,index) in selector.supports'>{{support.desc}}</p>
		   			</div>
		   		</div>
		   		<!-- 特色筛选 -->
		   		<!-- 时段筛选 -->
		   		<div class="selector-container">
		   			<h3 class="selector-title"><span class="selector-name">时段</span><span class="selector-sel" :class='{addColor : (timeSel!="不限")}'>{{timeSel}}</span></h3>
		   			<div class="selector-main">
		   				<p @click='timeEvent($event,index)' :data-id='time.timeRange' :class='{addColor2 : times === index}' v-for='(time,index) in selector.timeMap'>{{time.desc}}</p>
		   			</div>
		   		</div>
		   		<!-- 时段筛选 -->
		   	</div>
   		</div>
		<!-- 按钮模块 -->
		<div class="btn-group">     
			<button @click='closeSelector' class="cancel-btn" data-tap="1">取消筛选</button>     
			<button @click='addSelector' class="confirm-btn" data-tap="1">确定</button>  
		</div>
		<!-- 按钮模块 -->
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
	data(){
		return{
			localtionSel:'不限',
			specalSel : '不限',
			timeSel : '不限',
			selectArr : [],//筛选显示数组
			selectEndArr : [],//筛选结果数组
			localtion:'',
			specal : '',
			times : '',
		}
	},
	props:['selector'],
	methods:{
		localtionEvent(event,index){ //区域
			if(this.localtion !== index){
				this.localtion = index;
				this.localtionSel = event.target.innerHTML;
				this.selectArr[0] = this.localtionSel
			}else{
				this.localtionSel = '不限';
				this.selectArr[0] = this.localtionSel
				this.localtion = "";
			}
			
		},
		specalEvent(event,index){ //特色
			if(this.specal !== index){
				this.specal = index;
				this.specalSel = event.target.innerHTML;
				this.selectArr[1] = this.specalSel;
			}else{
				this.specalSel = '不限';
				this.selectArr[1] = this.specalSel;
				this.specal = "";
			}
		},
		timeEvent(event,index){ //时段
			if(this.times !== index){
				this.times = index;
				this.timeSel = event.target.innerHTML;
				this.selectArr[2] = this.timeSel;
				this.selectEndArr = event.target.getAttribute('data-id');
			}else{
				this.timeSel = '不限';
				this.selectArr[2] = this.timeSel;
				this.selectEndArr = "";
				this.times = "";
			}
		},
		closeSelector(){//关闭
			this.$parent.isSelector = false;
		},
		addSelector(){//筛选
			this.$parent.selectArr = this.selectArr;
			this.$parent.selectEndArr = this.selectEndArr;
			this.$parent.isSelector = false;
		},
		_initCinemaList(){
  			this.$nextTick(() => { 
  				if(!this.selectScroll){
	  				this.selectScroll = new BScroll(selectorBox, {
	  					click : true,
	  				}) 
			  	}else{
		  			this.selectScroll.refresh();
		  		}
  			})
	  	},
	},
	updated(){
	   this._initCinemaList()
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';
.selector-box
	position:fixed;
	left:0;
	top:41px;
	bottom:65px;
	z-index:11;
	width:100%;
	overflow:hidden;
	background-color:#fff;
.selector
	position:fixed;
	left:0;
	top:41px;
	width:100%;
	bottom:0px;
	background-color:#fff;
	z-index:11;
	.btn-group{
		height:4rem;
	    width:100%;
	    position:fixed;
	    background-color:#fff;
	    bottom:0;
	    left:0;
	    padding:0 15px;
	    border-top:1px solid #ddd;
	    width:100%;
	    box-sizing:border-box;
	    z-index:11;
	    display:flex;
	    align-items:center;
	    justify-content:space-between;
	    .cancel-btn,.confirm-btn{
			width:45%;
			text-align:center;
			line-height:2.8rem;
			height:2.8rem;
			border-radius:5px;
			font-size:1rem;
			border:0;
			background-color:#fff;
			color:#888;
			font-size:1rem;
			font-family: 'PingFang SC','STHeitiSC-Light',"Microsoft YaHei",Arial,"Helvetica Neue",Helvetica,sans-serif;
		}
		.cancel-btn{
			border:1px solid #888;
		}
   		.confirm-btn{
			background-color:$color;
			color:#fff;
   		}
	}
	.selector-container
		padding-left:15px;
		margin-top:5px;
		.selector-title
			line-height:2.5rem;
			.selector-name
				font-size:.9rem;
				font-weight:bold;
			.selector-sel
				font-size:0.725rem;
				margin-left:8px;
				color:#888;
			.addColor
				color:$color;
		.selector-main
			padding-bottom:5px;
			border-bottom:1px solid #ddd;
			p
				width:22.5%;
				height:2.2rem;
				line-height:2.2rem;
				color:#888;
				border:1px solid #ddd;
				border-right:0;
				box-sizing:border-box;
				margin-right:2%;
				text-align:center;
				margin-bottom:0.7rem;
				display:inline-block;
			.addColor2
				color:$color;
				border-color:$color;
		&:last-child .selector-main
			border:0;
</style>
