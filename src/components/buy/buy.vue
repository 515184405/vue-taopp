<template>
	<div class="buy" v-if='!!selectSeats'>
    <login v-show='loginShow'></login>
    <!-- title模块 -->
		<div class="buy-head">
       <p class="movie-showName">{{selectSeats.seatsLocked[0].cinemaName}}</p>
			 <p class="movie-time">今天 {{selectSeats.seatsLocked[0].lockTime | filterTime}} （{{selectSeats.schedule.showVersion}}）</p>
		</div>
    <!-- title模块 -->
    <!-- 影厅与标注模块 -->
     <p class="hallName">{{selectSeats.schedule.hallName}}</p>
     <p class="seat-title">
        <span class="sel">可选</span>
        <span class="noSel">已售</span>
        <span class="yesSel">已选</span>
     </p>
    <!-- 影厅与标注模块 -->
    <!-- 选座模块 -->
     <div class="seat-box" id="seatBox">
        <div class="seats-list" id="seatList">
            <!-- 排数模块 -->
            <div class="seat-row-box" :style="{height:parseInt(selectSeats.mtopSeatMap.maxTopPx/selectSeats.mtopSeatMap.minTopPx)*4 + 'rem'}">
                <div class="seat-row" :style="{top:selectSeats.mtopSeatMap.minTopPx/fontSize()*fontSize()/12*row+'rem'}" v-for='row in parseInt(selectSeats.mtopSeatMap.maxTopPx/selectSeats.mtopSeatMap.minTopPx)'>
              {{row}}
              </div>
            </div>
            <!-- 排数模块 -->
            <!-- 座位模块 -->
            <div @click='seatSel($event,seat)' :class='[{noSel : seat.status == 0},{sel : seat.status == 1},{yesSel : seat.status == 2}]' class="seats-item" :style="{left:seat.leftPx*fontSize()/12+'px',top:seat.topPx*fontSize()/12+'px'}" v-for='seat in selectSeats.mtopSeatMap.seats'>
                <p class="seatName">
                   <span v-if='seat.status === 2'> {{seat.name}} </span>
                </p>
            </div>
            <!-- 座位模块 -->
        </div>
     </div>
      <!-- 底部提示选座模块 -->
      <div v-show='!selMoney' class="alertSelSeat">
          请在上图中选择座位
      </div>
      <!-- 底部提示选座模块 -->
       <!-- 底部提示选座模块 -->
      <div v-show='selMoney' class="buyShopping">
          <div class="buy-info">
              <div class="user-msg">
                <p class="buy-phone-txt">购票成功后将发送取票码到</p>
                <input id="userPhone" type='number' disabled="disabled" v-model="userPhone" class="buy-userPhone"> 
                <b v-show='tabStatus' @click='resetPhone' class="reset-btn">确定</b>
                <i v-show='!tabStatus' @click='changeTel' class="reset-icon"></i> 
            </div>
            <div class="money-msg">
                票价 <span class="moeny-highlight"><span class="selMoney">{{selMoney}}</span>元</span>
            </div>
          </div>
          <button @click='showBuyDetail' class="confirm-btn">确认选座</button>
      </div>
      <!-- 底部提示选座模块 -->
    <!-- 选座模块 -->
    <transition name='fade'>
       <buyDetail ref='buyDetail' v-show='isShowBuyDetail' :selSeats='selSeats' :buyMsg='selectSeats'></buyDetail>
    </transition>
    <alerts ref='alerts'></alerts>
	</div>
</template>
<script>
var data = '';
import {formatDate} from '@/common/js/formatDate';  //引入时间格式化js文件
import {getFontSize} from '@/common/js/getHtmlFontSize'; //引入获取fontSize文件
import buyDetail from '@/components/buy/buyDetail';
import login from '@/components/login/login';
import alerts from '@/components/alert/alert';
import BScroll from 'better-scroll';

export default {
      data(){
        return {
          selectSeats:'',//全部数据
          selMoney : 0, //选座的全部钱数
          tabStatus : false, //修改手机号状态 
          userPhone : '', //手机号
          selSeats : [], //选择的座位
          isShowBuyDetail : false, //是否显示购买详情模块
          loginShow : true,//是否显示登录模块
        }
      },
      filters:{ 
         filterTime(time){//时间筛选器
            return formatDate(time,'MM-dd hh:mm');
         }
      },
      components:{buyDetail,login,alerts},
      created(){ //获取数据
        if(!data){
         var href = location.href;
         var url = '/api/buyseats';
         if(href.indexOf('taopp') != -1){
           url = '/buySeats.json';
         }
         this.$http.get(url).then((response) => {
            response = response.body;
            if(response.data.returnCode == 0){
              this.selectSeats = data = response.data.returnValue;
              this.$parent.loaderShow = false;
              this.userPhone = this.selectSeats.mtopSeatMap.userPhone;
            }
          });
        }else{
          this.selectSeats = data;
          this.$parent.loaderShow = false;
          this.userPhone = this.selectSeats.mtopSeatMap.userPhone;
        }
      },
      methods:{
        fontSize(){ //获取html的font-size值
          return getFontSize();
        },
        seatSel(event,seat){ //选座操作
          if(seat.status == 0){
            return;
          }
          if(seat.status == 1){
            seat.status = 2;
            this.selSeats.push(seat.name);
            this.selMoney += this.selectSeats.marketingToolSolution.oriSettlePrice/100;
          }else{
            seat.status = 1;
            // 从数组中删除某个元素
            for(var i=0; i<this.selSeats.length; i++) {
              if(this.selSeats[i] == seat.name) {
                this.selSeats.splice(i, 1);
                break;
              }
            }

            this.selMoney -= this.selectSeats.marketingToolSolution.oriSettlePrice/100;
          }
        },
        changeTel(){ //点击修改手机号
          userPhone.removeAttribute('disabled');
          userPhone.focus();
          this.tabStatus = true;
        },
        resetPhone(){ //修改成功确认
          if(this.userPhone.length != 11){
            this.$refs.alerts.opts = {
              content : '请输入正确的手机号码',
            }
            this.$refs.alerts.alertShow = true;
             return
          }
          this.selectSeats.mtopSeatMap.userPhone = this.userPhone;
          this.tabStatus = false;
          userPhone.setAttribute('disabled','disabled');
            this.$refs.alerts.opts = {
              content : '修改成功',
            }
            this.$refs.alerts.alertShow = true;
        },
        showBuyDetail(){ //显示购买详情信息
          this.isShowBuyDetail = true;
          this.$refs.buyDetail._initScroll();
          this.$refs.buyDetail.countDown();
        },
        _initScroll(){ //座位滚动操作
          var width = parseInt(this.selectSeats.mtopSeatMap.maxLeftPx/this.selectSeats.mtopSeatMap.minLeftPx)*4*getFontSize() + 'px';
          seatBox.style.height = window.innerHeight*0.6+ 'px';
          seatList.style.width = width;
          this.$nextTick(() => { 
            if(!this.detailScroll){
              this.detailScroll = new BScroll(seatBox, {
                click : true,
                scrollX: true,
              }) 
            }else{
              this.detailScroll.refresh();
            }
          })
        },
      },
       updated(){
        this._initScroll();
      },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	@import '../../common/css/transition';
  .seat-box{
     width:100%;
     overflow:hidden;
     margin-top:2rem;
  }
	.buy
		position:fixed;
		left:0;
		top:0;
		bottom:0;
		background-color:#EFEFF4;
		width:100%;
		z-index:10;
    .buy-head{
      padding:0.7rem;
      background-color:#fff;
      .movie-showName{
        font-size:0.95rem;
      }
      .movie-time{
        font-size:0.7rem;
        color:$red;
        margin-top:0.7rem;
      }
    }
    .hallName{
      font-size:0.65rem;
      text-align:center;
      padding-top:0.8rem;
      padding-bottom:0.25rem;
      width:65%;
      margin:0 auto;
      border-bottom:2px solid #ddd;
      border-radius:7px;
      position:relative;
      &:before{
        position:absolute;
        left:0;
        top:0;height:1.75rem;
        border-left:2px solid #ddd;
        content:"";
        transform-origin:bottom left;
        transform:rotateZ(-15deg);
      }
      &:after{
        position:absolute;
        right:0;
        top:0;height:1.75rem;
        border-left:2px solid #ddd;
        content:"";
        transform-origin:bottom left;
        transform:rotateZ(15deg);
      }
    }
    .seat-title{
      margin-top:1rem;
      text-align:center;
      .sel,.noSel,.yesSel{
        padding:0.3rem 0 0.3rem 1.7rem;
        margin:0.5rem;
        background-size:1.5rem auto;
      }
    }
   .sel{
      background:url('img/seat1.png') no-repeat left center;
    }
    .noSel{
      background:url('img/seat2.png') no-repeat left center;
    }
    .yesSel{
      background:url('img/seat3.png') no-repeat left center;
    }
    .seats-list{
      position:relative;
      .seats-item{
        position:absolute;
        height:1.2rem;
        width:1.2rem;
        padding:0.6rem;
        background-size:contain;
        .seatName{
          margin-top:-0.2rem;
          font-size:0.6rem;
          text-align:center;
          color:#fff;
        }
      }
      .seat-row{
        position:absolute;
        width:1rem;
        font-size:0.8rem;
        left:0;
        text-align:center;
        line-height:3rem;
      }
      .seat-row-box{
        width:1rem;
        border-radius:1rem;
        background-color:#888;
        color:#fff;
      }
    }
    .alertSelSeat{
      padding:3rem 0;
      position:fixed;
      left:0;
      bottom:0;
      width:100%;
      text-align:center;
      font-size:0.8rem;
      color:#aaa;
      background:#fff;
      border-top:1px solid #ddd;
    }
  .buyShopping{
    padding:1rem;
    background-color:#fff;
    position:fixed;
    box-sizing:border-box;
    left:0;
    bottom:0;
    width:100%;
  }
  .buy-info{
    display:flex;
    align-items:center;
    justify-content:space-between;
    .user-msg{
      .buy-phone-txt{
        color:#888;
        font-size:0.7rem;
      }
      .buy-userPhone{
        font-size:0.95rem;
        color:#333;
        margin-top:0.8rem;
        display:inline-block;
        background-color:#fff;
        width:6rem;
        padding:0.1rem 0.3rem;
        border:1px solid transparent;
      }
      .buy-userPhone:focus{
        outline:none;
        box-shadow:0 0 10px rgba(0, 204, 204, .5);  
      }
    }
    .money-msg{
      color:#666;
      font-size:0.8rem;
      .moeny-highlight{
        color:$red;
        .selMoney{
          font-size:1.2rem;
        }
      }
    }
  }
  .confirm-btn{
      padding:0.7rem 0;
      width:100%;
      background-color:$red;
      color:#fff;
      font-size:1.1rem;
      text-align:center;
      margin-top:1rem;
      border:0;
    }
    .reset-icon{
      padding-right:1rem
      background:url('img/reset.png') no-repeat right center;
      background-size:contain;
    }
    .reset-btn{
      color:$color;
      border-radius:3px;
      border:1px solid $color;
      padding:0.1rem 0.5rem;
      font-weight:normal;
      font-size:0.7rem;
    }
</style>