<template>
  <div class="discount">
      <headerTemplate close='discount' isActive='true' title='优惠券'></headerTemplate>
      <div class="discount-container">
          <div class="discount-item" v-for='money in moneys'>
              <div class="discount-msg">
                  <p class="discount-title">淘票票用户回馈代金券</p>
                  <p class="discount-rule overflow-text">发放后30天内有效|不可和活动票叠加使用</p>
                  <p class="discount-time">有效期至 ：2017-03-15</p>
              </div>
              <div class="discount-money">
                 <span class="discount-RMB">{{money}}</span>元
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import headerTemplate from '@/components/header/header';
export default {
  data(){
    return {
      moneys:[10,20,30]
    }
  },
  components:{headerTemplate}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .discount
    position:fixed;
    left:0;
    top:0;
    padding-top:2.5rem;
    bottom:0;
    width:100%;
    background-color:#f1f1f1;
    .discount-container
       padding:0 0.7rem;
      .discount-item
        color:#aaa;
        margin-top:0.7rem;
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:1rem;
        background-color:#fff;
        border-left:3px solid #aaa;
        border-radius:5px;
        .discount-title
          font-size:0.9rem;
          margin-bottom:2rem;
        .discount-rule,.discount-time
          font-size:0.6rem;
          margin-top:0.5rem;
        .discount-msg
          flex:1;
          width:0;
          border-right:1px dotted #aaa;
        .discount-money
          position:relative;
          width:4rem;
          text-align:center;
          height:3.5rem;
          line-height:3.5rem;
          color:#666;
          font-size:0.9rem;
          &:after
            width:4rem;
            content:"";
            background:url('img/endIcon.png') no-repeat right center;
            background-size:3.5rem auto;
            height:3.5rem;
            opacity:0.3;
            position:absolute;
            left:0;
            top:0;
          .discount-RMB
            font-size:1.4rem;
</style>
