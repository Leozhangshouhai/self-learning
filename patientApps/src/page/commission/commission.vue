<template>
  <div class="contain">
    <div class="content">
      <div
        class="from_item ui-border-bottom ui-position_r ui-font-weight-blod ui-bg1 ui-box-sizing ui-size-30 ui-color2 ui-pdl-25 ui-pdt-40 ui-line-height">
        请输入司机账号
        <label class="ui-color2 ui-size-28 ui-position_a edit" v-if="isChecked==true"
               @click="isChecked=false">[编辑]</label>
        <label class="ui-color2 ui-size-28 ui-position_a edit" v-if="isChecked==false"
               @click="saveOrUpdate">[保存]</label>
      </div>
      <div class="from_item ui-border-bottom ui-bg2 ui-box-sizing ui-size-26 ui-color2 ui-mgl-25 ui-mgr-25 ui-pdt-25">
        <label for="">银行卡号</label>
        <input style="width:4rem" class="from_input ui-size-16 ui-color2" ref="bankCardNumber" type="number" maxlength="19" v-model="commission.bankCardNumber" :disabled="isChecked"
               placeholder="请填写">
      </div>
      <div class="from_item ui-border-bottom ui-bg2 ui-box-sizing ui-size-26 ui-color2 ui-mgl-25 ui-mgr-25 ui-pdt-25">
        <label for="">持卡人姓名</label>
        <input class="from_input ui-size-16 ui-color2" ref="cardHolder" v-model="commission.cardHolder" :disabled="isChecked"
               placeholder="请填写" type="text">
      </div>
      <div class="from_item ui-border-bottom ui-bg2 ui-box-sizing ui-size-26 ui-color2 ui-pdl-25 ui-pdt-25">
        <label for="">发卡银行</label>
        <template v-if="isChecked">
          <span class="from_input ui-size-16 ui-color2 ui-mgr-25">{{commission.cardIissuingBank}}</span>
        </template>
        <template v-else>
          <select v-model="commission.cardIissuingBankCode" class="from_input ui-size-16 ui-color2 ui-mgr-25" :disabled="isChecked">
            <option :value="item.v" v-for="(item,index) in myItems1" :key="index">{{item.n}}</option>
          </select>
        </template>

        <!--<input class="from_input ui-size-16 ui-color2 ui-mgr-25"-->
               <!--v-model="commission.cardIissuingBank" :disabled="true" placeholder="请选择" type="text">-->
      </div>
    </div>
    <div class="content">
      <div
        class="from_item ui-border-bottom ui-font-weight-blod ui-bg1 ui-box-sizing ui-size-30 ui-color2 ui-pdl-25 ui-pdt-40 ui-line-height">
        佣金信息
      </div>
      <div class="from_item ui-border-bottom ui-bg2 ui-box-sizing ui-size-26 ui-color2 ui-mgl-25 ui-mgr-25 ui-pdt-25">
        <label for="">总收入 &nbsp;￥{{item.totalIncome}}</label>
      </div>
      <div
        class="from_item ui-border-bottom ui-position_r ui-bg2 ui-box-sizing ui-size-26 ui-color2 ui-pdl-25 ui-pdt-25">
        <label for="">余额 &nbsp;￥{{item.canPickUpAmount}}</label>
        <label class="tixian" @click="pickup">提现</label>
      </div>

    </div>
    <div
      class="from_item ui-font-weight-blod ui-bg1 ui-box-sizing ui-size-30 ui-color2 ui-pdl-25 ui-pdt-40 ui-line-height">
      提现记录
    </div>
    <template v-if="pickList.length>0" v-for="(item,index) in pickList">
    <div class="tabbar ui-border1 ui-mgb-30" @click="cash(item)">
      <div class="private_info ui-size-28 ui-color2">
        <div class="info"><p>金额</p>￥{{!!item.money?item.money:'0'}}</div>
        <div class="info ui-border-left ui-border-right"><p>手续费</p>￥{{!!item.poundage?item.poundage:'0'}}</div>
        <div class="info"><p>个税</p>￥{{!!item.personalIncomeTax?item.personalIncomeTax:'0'}}</div>
      </div>
      <div class="card ui-size-30 ui-pdt-40 ui-color2">收款银行卡号 {{!!item.bankCardNumber?item.bankCardNumber:"无"}}</div>
      <div class="card ui-size-30 ui-position_r ui-color2">持卡人 {{item.trueName}} <label for="">{{item.cardType}}</label></div>
      <div class="card ui-size-30 ui-position_r ui-color2">{{item.createTime|filterDate}} <label for="">{{item.statusName}}</label></div>
    </div>
    </template>
    <template v-else>
      <div class="more ui-color1 ui-font-weight ui-size-26">暂无数据</div>
    </template>
    <div class="more ui-color1 ui-font-weight ui-size-26">{{ismore?"查看更多":"没有更多数据"}}</div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "commission",
    data() {
      return {
        item: {},
        show1: true,
        myItems1: [
          {
            v:'1002',
            n: '工商银行'
          },
          {
            v:'1005',
            n: '农业银行'
          },
          {
            v:'1026',
            n: '中国银行'
          },
          {
            v:'1003',
            n: '建设银行'
          },
          {
            v:'1001',
            n: '招商银行'
          },
          {
            v:'1066',
            n: '邮储银行'
          }, {
            v:'1020',
            n: '交通银行'
          },
          {
            v:'1004',
            n: '浦发银行'
          }, {
            v:'1006',
            n: '民生银行'
          }, {
            v:'1009',
            n: '兴业银行'
          },
          {
            v:'1010',
            n: '平安银行'
          },
          {
            v:'1021',
            n: '中信银行'
          },
          {
            v:'1025',
            n: '华夏银行'
          },
          {
            v:'1027',
            n: '广发银行'
          },
          {
            v:'1022',
            n: '光大银行'
          },
          {
            v:'1032',
            n: '北京银行'
          },
          {
            v:'1056',
            n: '宁波银行'
          }
        ],
        isChecked: true,//不可编辑
        pageIndex:-1,
        pickList:[],
        ismore:true,
        commission: {
          cardHolder: null,
          bankCardNumber: null,
          cardIissuingBank: null,
          id: null,
          cardIissuingBankCode:null,
        }
      }
    },
    created() {
      this.key = sessionStorage.getItem("key");
      if (!this.key) {
        this.$router.push({path: "/driverLogin"});
        return
      }
      this.incomeMessage();
      this.findOneByUserId();
      this.pickupList();
    },
    filters:{
      filterDate(date){
        return moment(new Date(date)).format("YYYY/MM/DD hh:mm")
      },
    },

    methods: {
      /** 2018-11-27
       * author:renlinfei
       * explain:查询佣金主要信息
       */
      incomeMessage() {
        var data = {
          key: this.key
        };
        this.$api.codeAxios({
          url: "/hmp_website/activity/incomeMessage.json", data, success: res => {
            this.item = res;
          }
        })
      },
      /** 2018-11-27
       * author:renlinfei
       * explain:银行卡信息查询
       */
      findOneByUserId() {
        var data = {
          key: this.key
        };
        this.$api.codeAxios({
          url: "/hmp_website/activity/findOneByUserId.json", data, success: res => {

            this.commission = res;
          }
        })
      },
      /** 2018-11-27
       * author:renlinfei
       * explain:银行卡信息添加和修改
       */
      saveOrUpdate() {
        var data = {
          name:this.commission.cardHolder,
          bankNumber:this.commission.bankCardNumber,
          id:this.commission.id?this.commission.id.toString():null,
          issuingBank:this.commission.cardIissuingBank,
          issuingBankCode:this.commission.cardIissuingBankCode,
          key: this.key
        };
        if(data.name==""){
          this.$dialog.toast({
            mes: '请输入持卡人姓名',
            timeout: 1500,
            icon: 'error',
            callback: () => {
              this.$refs.cardHolder.focus();
            }
          });
          return;
        }else if(data.bankNumber==""||data.bankNumber.length>20){
          this.$dialog.toast({
            mes: '银行卡号输入错误',
            timeout: 1500,
            icon: 'error',
            callback: () => {
              this.$refs.bankCardNumber.focus();
            }
          });
          return;
        }
        this.$api.codeAxios({
          url: "/hmp_website/activity/saveOrUpdate.json", data, success: res => {
            //this.commission = res;
            this.$dialog.toast({
              mes: '保存成功',
              timeout: 1500,
              icon: 'success'
            });

          }
        })
      },
      /**
       *@desc 提现
       *@author renlinfei
       *@date 2018-11-27
       */
      pickup(){
        var data = {
          key: this.key
        };
        this.$api.codeAxios({
          url: "/hmp_website/activity/pickup.json", data, success: res => {
            this.$dialog.toast({
              mes: res,
              timeout: 1500,
              icon: 'success'
            });
            this.incomeMessage();
          }
        })
      },
      /**
       *@desc 提现记录
       *@author renlinfei
       *@date 2018-11-27
       */
      pickupList(){
        if(this.ismore){
          this.pageIndex++;
        }else{
          return;
        }
        var data = {
          key: this.key,
          pageSize:"6",
          pageIndex:this.pageIndex.toString()
        };
        this.$api.codeAxios({
          url: "/hmp_website/activity/pickupList.json", data, success: res => {
            if(res.length==6){
              this.ismore=true;
            }else{
              this.ismore=false;
            }
            this.pickList=this.pickList.concat(res);
          }
        })
      },
      /** 2018-11-28
       * author:renlinfei
       * explain: 点击跳转到提现明细
       */
      cash(item){
        this.$router.push({path:"/cash",query:{"commissionOrderId":item.id}});
      },
      /** 2018-11-27
       * author:renlinfei
       * explain:取消保存
       */
      cancelSave() {
        for (var key in this.commission) {
          this.commission[key] = null;
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    background: #fff;
  }
  .more{
    margin-top: 0.16rem;
    text-align: center;
  }
  .tabbar {
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    background: #fff;
    height: 3.52rem;
    border-radius: 0.1rem;
    box-sizing: border-box;
    padding-top: 0.5rem;
    .card {
      padding-left: 0.3rem;
      margin-top: 0.15rem;
      label {
        position: absolute;
        right: 0.3rem;
        top: 0;
        line-height: 1;
      }
    }
    .private_info {
      display: flex;
      height: 0.7rem;
      .info {
        text-align: center;
        flex: 1;
      }
    }
  }

  .from_item {
    height: 1rem;
    label {
      margin-top: 0.04rem;
      display: inline-block;
    }
    .tixian {
      position: absolute;
      right: 0.25rem;
      top: 0.16rem;
      width: 1rem;
      border: 1px solid #efad22;
      border-radius: 0.06rem;
      color: #efad22;
      text-align: center;
      line-height: 0.52rem;
    }
    .edit {
      right: 0.25rem;
      top: 50%;
      font-weight: initial;
      transform: translateY(-50%);
    }
  }

  .from_input {
    padding: 0.05rem;
    border: 0px;
    display: inline-block;
    float: right;
    text-align: right;
  }
</style>
