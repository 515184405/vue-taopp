<template>
    <div class="star">
      <div class="star-box">
        <div class="star-gray">
          <span v-for="n in 5" class="star-item"></span>
        </div>
        <div class="star-mask" :style={width:width}>
          <div class="star-yellow">
            <span v-for="n in 5" class="star-item"></span>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    name : 'star',
    props:['score'],
    computed:{
      width(){
        return parseInt((this.score/10)*100)+'%';
      }
    }

  }
</script>
<style lang="stylus" rel='stylesheet/stylus'>
  .star{
    height:10px;
    position: relative;
    font-size:0;
    .star-box{
      width:50px;
      position: absolute;
      left:0;
      top:0;
    }
    .star-gray{
      width:50px;
      .star-item{
        background:url('img/star48_off@3x.png') no-repeat;
        background-size:10px auto;
      }
    }
    .star-mask{
      overflow: hidden;
      position: absolute;left:0;top:0;height:100%
    }
    .star-yellow{
      height:10px;
      width:50px;
      position: absolute;left:0;top:0;
      .star-item {
        background:url('img/star48_on@3x.png') no-repeat;
        background-size:10px auto;
      }
    }
    .star-item{
      display: inline-block;
      height:10px;
      width:10px;
      background-size: 10px auto;
      background-repeat: no-repeat;
    }
  }
</style>
