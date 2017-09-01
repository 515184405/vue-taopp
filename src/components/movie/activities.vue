<template>
	<div id="activities" v-if='!!activitiesTxt' class="activitiesDetail remove-nav">
		<headerTemplate close='activitiesShow' title='活动说明'></headerTemplate>
		<p class="activities-title">{{activitiesTxt[0].activityTag}}</p>
		<p class="activities-desc">{{activitiesTxt[0].activityTitle}}</p>
		<div class="activities-detail" v-for='txt in activitiesLongDesc(activitiesTxt[0].longDescription)'><p>{{txt}}</p></div>
	</div>
</template>
<script>
	import headerTemplate from '@/components/header/header';
	export default{
		props:['activitiesTxt','activitiesShow'],
		methods:{
			activitiesLongDesc(data){
				return data.split('\n');
			}
		},
		components:{headerTemplate}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.activitiesDetail
		padding:15px;
		padding-top:2.5rem;
		box-sizing:border-box;
		position:fixed;
		left:0;
		top:0;
		height:100%;
		width:100%;
		z-index:11;
		overflow:auto;
		background:#fff;
		text-align:left;
		.activities-title
			font-size:1.1rem;
			color:#333;
			line-height:2.2rem;
		.activities-desc
			font-size:0.75rem;
			color:#888;
			line-height:2.2rem;
			border-bottom:1px solid #ddd;	
		.activities-detail
			line-height:1.4rem;
			p
				margin-top:15px;
</style>