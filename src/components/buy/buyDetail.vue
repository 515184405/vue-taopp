<template>
<div>
  <headerTemplate close='isShowBuyDetail' isActive='true' title='确认订单'></headerTemplate>  
	<div class="buyDetail" v-if='buyMsg' id="buyDetail">
      <div class="buy-container">
          <div class="buy-bg">
              <div class="buy-content">
                  <div class="buy-top">
                      <div class="buy-msg">
                        <p class="buy-title"><span class='buy-showName'>{{buyMsg.seatsLocked[0].showName}}</span><span v-if='!!selSeats'> {{selSeats.length}}张</span></p>
                        <p>明天 {{buyMsg.schedule.showTime}}（周二晚上）（{{buyMsg.schedule.showVersion}}）</p>
                        <p>{{buyMsg.seatsLocked[0].cinemaName}}</p>
                        <p>{{buyMsg.schedule.hallName}}<span v-for='seat in selSeats'>{{seat}}</span>  </p>
                      </div>
                      <div class="buy-Date">
                         <p>付款时间</p>
                         <p class="countDown">{{timeShow}}</p>
                         <p class="logo-bg"></p>
                      </div>
                  </div>
                  <div class="_line"></div>
                  <p class="change-trick"><span>√</span>开场前1小时可退票（有退票费）</p>
                  <p class="change-trick"><span>√</span>开场前1小时可改签（有改签费）</p>
              </div>
          </div>
          <div class="all-money">
             <p class="allMoney-title">票价总计</p>
             <p class="allMoney-rmb">含服务费3元/张 <span class="highLight">{{selSeats.length*buyMsg.marketingToolSolution.oriSettlePrice/100}}元</span></p>
          </div>
          <div class="change-rule">
              <p class="change-rule-title">购票和退改签须知</p>
              <p class="change-say">退改签说明</p>
              <p class="change-item">未取票开场前24小时，可免费退票</p>
              <p class="change-item border_line">未取票开场前1小时，可改签，改签费规则<span class='rule-look'>点击查看</span></p>
              <p class="change-say">购票须知</p>
              <p class="change-item line-height" v-for="item in buyMsg.seatsLocked[0].notice.split('\n')" v-html='item'></p>
          </div>
      </div>
	</div>
  <div class="buy-bottom">
      <p class="buy-money">应付<span class="highLight-money"><span class="bold-money">{{selSeats.length*buyMsg.marketingToolSolution.oriSettlePrice/100}}</span>元</span></p>
      <p class="buy-btn" @click='payment'>立即付款</p>
  </div>
</div>

</template>
<script>
import {formatDate} from '@/common/js/formatDate';
import BScroll from 'better-scroll';
import headerTemplate from '@/components/header/header';

export default {
  data(){
    return {
       payTime : 15*60,//倒计时
       timeShow : '15:00',
    }
  },
  props:['selSeats','buyMsg'],
  components:{headerTemplate},
  methods:{
    _initScroll(){ //座位滚动操作
      this.$nextTick(() => { 
        if(!this.detailScroll){
          this.detailScroll = new BScroll(buyDetail, {
            click : true,
          }) 
        }else{
          this.detailScroll.refresh();
        }
      })
    },
    countDown(){
      var _self = this;
      var timer = setInterval(function(){
        if(!_self.$parent.isShowBuyDetail){
          clearInterval(timer);
          _self.payTime = 15*60;
        }
        if(_self.payTime <= 0){
           clearInterval(timer);
           alert('已超时')//超时提醒
           _self.$parent.isShowBuyDetail = false;
           _self.payTime = 15*60;
        }
        _self.payTime--;
        let h = parseInt(_self.payTime/60);
        let H = h > 9 ? h : "0" + h;
        let m =  _self.payTime - h*60;
        let M = m > 9 ? m : "0" + m;
        _self.timeShow = H+":"+M;
      },1000)
    },
    payment(){
      alert('付款功能未开通')
    }
  },
   updated(){
    this._initScroll();
  },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>

	@import '../../common/css/transition';
  .buyDetail{
    position:fixed;
    left:0;
    top:2.5rem;
    bottom:3.5rem;
    width:100%;
    z-index:11;
    background-color:#f1f1f1;
  }
  .buy-bg{
    padding:1rem
    background-color:#aaa
  }
  .buy-content{
    font-size:0.7rem;
    background-color:#fff;
    border-radius:5px;
    overflow:hidden;
    padding:1rem;
    color:#888;
  }
  .buy-top{
    display:flex;
    justify-content:space-between;
  }
  .buy-msg p{
    line-height:1rem;
    margin-bottom:0.3rem;
  }
  .buy-title{
    .buy-showName{
      font-size:1rem;
      color:#333;
    }
  }
  .buy-Date{
    width:3.5rem;
    text-align:right;
    >p{
      line-height:1rem;
      margin-bottom:0.3rem;
    }
    .countDown{
      font-size:0.8rem;
      color:#333;
    }
  }
  ._line{
    margin-top:0.4rem;
    border:1px dotted #ddd;
    width:100%;
    padding:0 1rem;
    margin-left:-1rem;
    position:relative;
    margin-bottom:0.7rem;
    &:before{
      content:"";
      position:absolute;
      left:-0.4rem;
      top:-0.4rem;
      height:0.8rem;
      width:0.8rem;
      border-radius:0.8rem;
      background-color:#aaa;
    }
    &:after{
      content:"";
      position:absolute;
      right:-0.4rem;
      top:-0.4rem;
      height:0.8rem;
      width:0.8rem;
      border-radius:0.8rem;
      background-color:#aaa;
    }
  }
  .change-trick{
    margin-top:0.4rem;
    >span{
      color:#F8D850;
      display:inline-block;
      width:0.7rem;
      height:0.7rem;
      margin-right:0.3rem;
      padding-left:0.1rem;
      border-radius:0.7rem;
      border:1px solid #f8d850;
    }
  }
  .all-money{
    display:flex;
    justify-content:space-between;
    padding:1rem;
    background-color:#fff;
    .allMoney-title{
      font-size:0.9rem;
    }
    .highLight{
      color:$red;
    }
  }
  .change-rule{
    padding:1rem 0 1rem 1rem;
    box-size:border-box;
    background-color:#fff;
    margin-top:0.5rem;
    margin-bottom:2.5rem;
    .change-rule-title{
      font-size:0.9rem;
      padding-bottom:1rem;
      border-bottom:1px solid #ddd;
    }
  }
  .change-say{
    margin-top:1rem;
    margin-bottom:0.3rem;
  }
  .change-item{
     color:#888;
     margin-top:0.7rem;
     .rule-look{
        color:$color;
     }
  }
  .border_line{
    border-bottom:1px solid #ddd;
    padding-bottom:1rem;
  }
  .line-height{
    margin-top:0.5rem;
    line-height:1.5rem;
  }
  .buy-bottom{
    height:3.5rem;
    width:100%;
    position:fixed;
    left:0;
    bottom:0;
    background-color:#fff;
    border-top:1px solid #ddd;
    z-index:16;
    line-height:3.5rem;
    display:flex;
    justify-content:space-between;
    .buy-money{
      padding-left:1rem;
      font-size:0.7rem;
      .highLight-money{
        color:$red;
        .bold-money{
          font-size:1rem;
        }
      }
    }
    .buy-btn{
      padding:0 3rem;
      line-height:3.5rem;
      background-color:$red;
      color:#fff;
      font-size:1rem;
      border:0;
    }
  }
</style>