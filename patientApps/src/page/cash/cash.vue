<template>
  <section>
    <template v-if="detailList.length>0" v-for="(item,index) in detailList">
      <div class="from_item ui-border-bottom ui-border-top ui-bg2 ui-box-sizing ui-color2 ui-pdl-25 ui-pdt-25 ui-mgb-30">
        <p class="ui-bg2 ui-size-30 ui-font-weight">{{item.activityTitle}}</p>
        <p class="merchant"><span>核销商户</span>{{item.name}}</p>
        <p class="ui-color1 ui-size-16 ui-mgt-30">{{item.verificationTime}}</p>
        <label class="ui-position_a money">
          <span class="ui-size-30">￥</span>{{item.money}}
        </label>
      </div>
    </template>
    <template v-else>
      <div class="more ui-color1 ui-font-weight ui-size-26">暂无数据</div>
    </template>
    <div class="more ui-color1 ui-font-weight ui-size-26">{{ismore?"查看更多":"没有更多数据"}}</div>
  </section>
</template>

<script>
  export default {
    name: "cash",
    data() {
      return {
        pageIndex: 0,
        detailList:[],
        ismore:true,

      }
    },
    created() {
      this.key = sessionStorage.getItem("key");
      this.commissionOrderId = this.$route.query.commissionOrderId;
      if (!this.key || !this.commissionOrderId) {
        this.$router.push({path: "/driverLogin"});
        return
      }
      this.pickupDetailList();
    },
    methods: {
      /**
       *@desc 提现明细记录分页
       *@author renlinfei
       *@date 2018-11-27
       */
      pickupDetailList() {
        if(this.ismore){
          this.pageIndex++;
        }else{
          return;
        }
        var data = {
          key: this.key,
          pageIndex: this.pageIndex.toString(),
          pageSize: "6",
          commissionOrderId: this.commissionOrderId.toString()
        };
        this.$api.codeAxios({
          url: "/hmp_website/activity/pickupDetailList.json", data, success: res => {
            if(res.length==6){
              this.ismore=true;
            }else{
              this.ismore=false;
            }
            this.detailList = res;
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .from_item {
    padding-top: 0.4rem;
    height: 2.31rem;
    position: relative;
    .money {
      right: 0.25rem;
      font-weight: bold;
      font-size: 0.4rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .more {
    margin-top: 0.16rem;
    text-align: center;
  }

  .merchant {
    margin-top: 0.27rem;
    span {
      border: 1px solid #333333;
      width: 1.2rem;
      line-height: 0.38rem;
      border-radius: 2px;
      font-size: 0.24rem;
      text-align: center;
      display: inline-block;
      margin-right: 0.14rem;
    }
  }
</style>
