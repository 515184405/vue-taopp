<template>
	<div class="loader-box">
      <div class="load-container appLoader">
        <div class="loader">
        </div>
        <p class="loader-txt">Loader...</p>
    </div> 
  </div>
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
.loader-box{
  position:fixed;
  left:0;
  top:0;
  height:100%;
  width:100%;
  background-color:rgba(255,255,255,0.1);
}
.appLoader{
	position:fixed;
	left:50%;
	top:50%;
  z-index:999;
	margin-left:-2.8rem;
	margin-top:-2.8rem;
	width:5.6rem;
	height:5.6rem;
	background-color:rgba(55,55,55,0.9);
	border-radius:5px;
	color:#fff;
	text-align:center;
}
.loader-txt
	margin-top:0.5rem;
.appLoader .loader {
  font-size: 10px;
  text-indent: -9999em;
  width: 2.5rem;
  height: 2.5rem;
  margin:0.7rem auto 0;
  border-radius: 50%;
  background: #ffffff;
  background: -moz-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -webkit-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -o-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: -ms-linear-gradient(left, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  -webkit-animation: appLoader 1.4s infinite linear;
  animation: appLoader 1.4s infinite linear;
}
.appLoader .loader:before {
  width: 50%;
  height: 50%;
  background: #FFF;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.appLoader .loader:after {
  background-color:rgba(55,55,55,0.9);
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes appLoader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes appLoader {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
