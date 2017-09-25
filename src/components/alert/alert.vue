<template>
	<transition name='fade'>
	<!-- 卡片模块 -->
	<div v-show='alertShow' id="alert" class="alertBox" :class="{alertModel:(opts.title||btnLen())}">
		<div :style='[{width:(opts.width ? opts.width : "auto")},{height:(opts.height ? opts.height : "auto")}]' id="vueAlertContainer" class="alert-container" :class='{notTitle:!opts.title&&!btnLen()}'>
			<p class="alert-title" v-if='opts.title'>{{opts.title}}</p>
			<p class="alert-content">{{opts.content}}</p>
			<p class="alert-btn" v-if='btnLen()'>
				<button @click='key' :style='{width:(100/btnLen())+"%"}' v-for='(key,val) in opts.buttons'>{{val}}</button>
			</p>
		</div>
	</div>
	</transition>

</template>
<script>
	export default {
		data(){
			return {
				alertShow : false,
				opts : {
					//title  : '',
					//content : '',
					//width : '', 例如 200px
					//height : '', 例如 200px
					//buttons:{
						 // '确定':function(){

						 // },
						// '取消' : function(){

						// }
					//},
					//time : '',
				}
			}
		},
		methods:{
			btnLen(){
				var len = 0;
				for(var key in this.opts.buttons){
					len++;
				}
				return len;
			},
		},
		updated(){
			if(this.alertShow && !this.btnLen()){
				var _self = this;
				setTimeout(function(){
					_self.alertShow = false;
				},(_self.opts.time ? _self.opts.time : 1800))
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import '../../common/css/transition.styl';
	.alertBox
		font-size:0.9rem;
		position:fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		display:inline-flex;
		align-items:center;
		justify-content:center;
		z-index:999;
	.alertModel
		background-color:rgba(0,0,0,0.65);
	.alert-container
		position:relative;
		z-index:1000;
		background-color:#fff;
		border-radius:0.3rem;
		color:#333;
	.notTitle
		color:#fff;
		background-color:rgba(0,0,0,0.8);
	.alert-title
		padding-top:0.5rem;
		text-align:center;
	.alert-content
		line-height:1.2rem;
		padding:0.8rem 1rem;
		max-width:100%;
	.alert-btn
		display:flex;
		align-items:center;
		justify-content:space-between;
		border-top:1px solid #ddd;
		button 
			font-size:0.9rem;
			color:#333;
			border:0;
			background-color:transparent;
			font-family: 'PingFang SC','STHeitiSC-Light',"Microsoft YaHei",Arial,"Helvetica Neue",Helvetica,sans-serif;
			padding:0.5rem 0;
			outline:none;
			box-sizing:border-box;

			&:nth-of-type(2)
				border-left:1px solid #ddd;
</style>