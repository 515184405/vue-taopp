<template>
	<div class="header" :class='{header2: isActive}'>
		<div @click='closeMask' class="back"></div>
		<p class="header-title overflow-text">{{title}}</p>
	</div>
</template>
<script>
	export default{
		props:['title','close','isActive'],
		methods:{
			closeMask(){
				this.$parent.$parent[this.close] = false;
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import '../../common/css/transition';
	.header
		position:fixed;
		left:0px;
		top:0px;
		color:#fff;
		width:100%;
		line-height:2.5rem;
		height:2.5rem;
		text-align:center;
		border-bottom:1px solid #f1f1f1;
		background:$color;
		font-size:1rem;
		font-weight:bold;
		z-index:15;
		.header-title
			font-weight:bold;
			display:block;
			margin:0 auto;
			width:60%;
			text-align:center;
		.back	
			position:fixed;
			left:10px;
			top:0;
			width:2.5rem;
			height:2.5rem;
			background:url('../../common/img/left.png') no-repeat 0 center;
			background-size:1.5rem auto;
	.header2
		color:#666;
		background:#fff;
		.back	
			background-image:url('../../common/img/left1.png')
</style>