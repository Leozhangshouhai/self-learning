<template>
    <div>
        <mu-date-picker v-model="selectDate" hintText="选择时间 v-model同步value"/>
        <br/>
        <p :class='"ppp"'> dmeo</p>
        选择的时间为： {{selectDate}} <br/>
        <mu-date-picker hintText="选择 2017-07-21 到 2017-07-29 " minDate="2017-07-21" maxDate="2017-07-29"
                        format="YYYY-MM-DD"/>
        <br/>
        <mu-date-picker autoOk hintText="选择日期后自动确定"/>
        <br/>
        <mu-date-picker disableYearSelection hintText="不可选择年份"/>
        <mu-date-picker
                class="demo"
                hintText="提示文字"
                ref="demo"
                :firstDayOfWeek=1
                v-model="selectDate"
                format="DD-MM-YYYY"
                maxDate="29-07-2017"
                minDate="21-07-2017"
                name="我的日历"
                :hintTextClass="['ppp']"
                errorText="123"
                :errorColor="'blue'"
                container="inline"
                :formatDisplay="false"
        />
    </div>
</template>

<script>
  import Vue from 'vue'
  import MuseUI from 'muse-ui'
  import 'muse-ui/dist/muse-ui.css'
  Vue.use(MuseUI);
  export default {
    data() {
      return {
        selectDate: '',
        demoClass: 'red'
      };
    },
    created() {
      const _self = this;
    },
    watch: {
      selectDate: function () {

        console.log(this.$refs.demo.name)
      }
    },
    methods: {}
  };
</script>

<style lang="scss">
    @import "../assets/css/index.scss";
    @import "../assets/css/base.scss";

    .demo {
      .ppp {
        color: blue !important;
        }
    }

    #example {
        background: red;
        height: 100vh;
    }
</style>
