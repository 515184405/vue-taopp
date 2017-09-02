<template>
  	<div class="search">
		<div class="search-box">
			<input v-model='cinemaName' placeholder="影院名称" class='search-input' type="text">
		</div>
		<button @click='searchBack' class="search-back">取消</button>
    </div>
</template>

<script>
export default {
	data(){
		return {
			cinemaName : '',
		}
	},
	methods : {
		searchBack(){
			this.$parent.searchShow = false;
		}
	},
	watch:{
		cinemaName(oldVal,newVal){
			this.$parent.selectName = oldVal;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/css/transition.styl';
.search
	position:fixed;
	left:0;
	top:0;
	width:100%;
	z-index:13;
	background-color:#fff;
	height:2.5rem;
	.search-box
		padding-right:80px;
		padding-left:15px;
		box-sizing:border-box;
   		.search-input
			width:100%;
			margin-top:0.4rem;
			box-sizing:border-box;
			height:1.7rem;
			padding-left:30px;
			background:url('img/search.png') no-repeat 5px center;
			background-size:1.2rem auto;
			border-radius:3px;
			border:1px solid #eee;
			outline:none;
			font-family: 'PingFang SC','STHeitiSC-Light',"Microsoft YaHei",Arial,"Helvetica Neue",Helvetica,sans-serif;
		.search-back{
			outline:none;
			width:80px;
			text-align:center;
			position:absolute;
			right:0;
			top:0;
			border:0;
			background-color:#fff;
			font-size:0.9rem;
			color:$color;
   			font-family: 'PingFang SC','STHeitiSC-Light',"Microsoft YaHei",Arial,"Helvetica Neue",Helvetica,sans-serif;
			height:2.5rem;
		}
</style>
