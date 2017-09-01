<template>
    <div>
          <swipe :speed='500' class="my-swipe">

              <swipe-item class='swipe-item' v-for='item in listImg' :style="{backgroundImage:'url('+item.url+')'}" alt="">
                  <a :href="item.link">
                    
                  </a>
              </swipe-item>
          </swipe>
    </div>
</template>
<script>
require('vue-swipe/dist/vue-swipe.css');
import { Swipe, SwipeItem } from 'vue-swipe';

export default {
  data(){
    return {
      listImg : [
        {link:'http://www.baidu.com',url:'https://gw.alicdn.com/tfs/TB1dN9fX3MPMeJjy1XcXXXpppXa-1280-520.jpg_720x720Q30.jpg'},
        {link:'http://www.iguoyi.com',url:'https://gw.alicdn.com/tfs/TB1d5ZeXMMPMeJjy1XbXXcwxVXa-1280-520.jpg_720x720Q30.jpg'},
        {link:'http://fy.035k.com',url:'https://gw.alicdn.com/tfs/TB1JHKvSVXXXXXLaXXXXXXXXXXX-1280-520.jpg_720x720Q30.jpg'},
      ]
    }
  },
  components:{Swipe,SwipeItem}
}
</script>
<style>
.my-swipe {
  height: 150px;
  color: #fff;
  font-size: 30px;
  text-align: center;
}
.swipe-item{
  -webkit-background-size: cover;
  background-size: cover;
}
.swipe-item a{
  display: block;
  width: 100%;
  height:100%;
}
.mint-swipe-indicator{
  opacity: 1;
  background:#fff;
}
.mint-swipe-indicator.is-active{
  background: #FCB890;
}
</style>