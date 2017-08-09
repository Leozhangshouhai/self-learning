<template>
    <div id="example" v-title="'机票入口'">
        <div id="header">
            <div id="choose-btn">
                <div @click="btnChoose('1')" :class="select ? 'active':''">单程</div>
                <div @click="btnChoose('2')" :class="!select ? 'active':''">往返</div>
            </div>
        </div>
        <!-- 中部两地数据显示-->
        <div id="middle-data">
            <div class="middle-data-text">
                <input v-on:blur="getAirport('start',start)" type="text" v-model="start" placeholder="输入出发城市" name="middle-data-name-go"
                       class="middle-data-name"/>
                <span class="middle-data-airname">
               <select  class="middle-data-airname-select">
                 <option v-for="(item,index) in startAirport" class="middle-data-airname-select-option">{{item.airportname}}</option>
               </select>
           </span>
            </div>
            <div class="middle-data-img">
                <img src="../assets/img/1.png" alt=""/>
            </div>
            <div class="middle-data-text">
                <input v-on:blur="getAirport('end',end)" type="text" v-model="end" placeholder="输入到达城市"
                       name="middle-data-name-back" class="middle-data-name"/>
                <span class="middle-data-airname">
                <select  id="position-back" class="middle-data-airname-select">
                <option v-for="(item,index) in endAirport" class="middle-data-airname-select-option">{{item.airportname}}</option>
            </select></span>
            </div>
        </div>
        <!--日历插件-->


    </div>
</template>
<script>
  import Vue from 'vue'
  import fly from "../assets/js/linyer"
  export default {
    data() {
      return {
        select: true,
        start: '',
        end: '',
        startAirport: [{airportname:'请选择出发机场'}],
        endAirport: [{airportname:'请选择到达机场'}],

      };
    },
    created() {
      const _self = this;

    },
    computed: {
      changeEnd: function () {
        console.log(this.endAirport)
      }
    },
    watch: {
      endAirport: function (val) {
        console.log(this.endAirport)
      }
    },
    methods: {
      btnChoose: function (sign) {
        //        通过set的方法来实时改变0.
 this.endAirport=['1','2']
//        this.$set(this.endAirport, this.endAirport.length, '北京机场')
//        console.log(this.endAirport)
        if (sign == '1') {
          this.select = this.select ? this.select : !this.select
        } else {
          this.select = this.select ? !this.select : this.select
        }
      },
      getAirport: function (sign,content) {
        console.log('请求机场');
        let url = "http://118.178.225.32/hmp_website/yiplain/getairportlist.json",
          pram = {
            'keywords': encodeURI(content)
          };
        let _this=this;
        fly.Axios({
          url: url,
          data:pram,
          success: function (res) {
            console.log(res.data.body.list);
              if(sign=='end'){
                _this.endAirport=res.data.body.list;
              }else if(sign=='start'){
                _this.startAirport=res.data.body.list
              }
            console.log(this.endAirport);
          }, error: function (err) {
            console.log(err)
          }
        })
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../assets/css/index.scss";
    @import "../assets/css/base.scss";
    @import "../assets/css/airIndex.scss";
</style>
