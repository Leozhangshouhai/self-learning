/**
* Created  on 2018/2/23.
*/

<template>
    <div class="datePicker">
        <div class="date-box">
            <div class="date-select">
                <div class="check-time">
                    <div class="check-way">入住</div>
                    <div class="time" @click="checkIn">
                        03-09 星期三
                    </div>
                </div>
                <div class="duration">1天</div>
                <div class="check-time">
                    <div class="check-way">离店</div>
                    <div class="time" @click="checkOut">
                        03-10 星期四
                    </div>
                </div>
            </div>
        </div>
        <transition name="bounce">
            <div class="datePicker-box" v-show="canlenderShow">
            <div class="datePicker-inner" >
                <div class="month-box">
                    <div class="inner">
                        <div class="month-box">
                            <div @click="selectMonFun(index)" :class=" index == latelyMonthIndex ? 'nowMonth': '' " v-for="(mon,index) in latelyMonth">{{mon.txt}}</div>
                        </div>
                    </div>
                </div>
                <table>
                    <thead>
                    <tr>
                        <td v-for="week in weeks" class="week">{{week}}</td>
                    </tr>
                    </thead>
                </table>
                <div v-for="(mon, k1) in days" class="table-box">
                    <table>
                        <tbody >
                        <tr v-for="day in mon">
                            <td v-for="dayChild in day">
                                <span :class="selected(dayChild)">{{dayChild == '+'? ' ' :dayChild }}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="btn-box" >
                <button @click="confirm">确定</button>
            </div>
        </div>
        </transition>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                weeks: ['日', '一', '二', '三', '四', '五', '六'],
                days: [],
                nowMonth: '',
                nowYear: '',
                canlenderShow: false,
                latelyMonth: [
                    {txt: '三月', num: 3, year: 2018},
                    {txt: '四月', num: 4, year: 2018},
                    {txt: '五月', num: 5, year: 2018},
                ],
                latelyMonthIndex: 0,
                curDate:{}
            }
        },
        created() {
            console.log(this.curDate.year)

        },
        mounted(){
            this.inittest()
        },
        computed : {},
        methods : {
            init(){
                let daysArr = [];
                let days = [];
                let today = new Date(),
                    year = today.getFullYear(),
                    month = today.getMonth();

                // ❌
                let weeks = ['日','一','二','三','四','五','六'];
                let dayStr = '';
                // 3月有31天
                let dayInMonth = 31;

                // 每个月的第一天
                let firstDay = new Date(year,month,1);
                // 每个月的最后一天
                let lastDay = new Date(year,month,31);

                //第一天星期几(0-6)
                let weekday = firstDay.getDay();
                // 当月的最后一天星期几
                let lastDayWeekDay = lastDay.getDay();

                // 每一个都是从1号开始
                let date = 1;

                // ❌
                dayStr += weeks.join(' ') + '\n';
                //console.log(dayStr)
                // 补齐前面的空格
                for(let i = 0; i < weekday; i++){
                    dayStr += '+ ';
                    days.push("+ ")
                }
                //console.log(days)
                for(;date <= dayInMonth;date++){
                    dayStr += date + ' ';
                    weekday++
                    days.push(date + ' ')

                    // 换行处理
                    if(weekday%7 == 0){
                        weekday = 0;
                        dayStr += '\n';
                        //let daystr =
                        //daysArr.push(days)
                    }

                }
                //console.log(days)


                // 补齐后面的空格
                for(let j = 0; j < (7 - lastDayWeekDay - 1); j++){
                    dayStr += '+  ';
                    days.push("+ ")
                }

                for(let i = 0 ; i < 5 ; i++){
                    //daysArr.push(days.splice(i*7 ,(i+1)*7))
                    if(i == 0){
                        daysArr.push(days.slice(0 ,7));
                    }else{
                        daysArr.push(days.slice(i*7, (i+1)*7))
                    }
                }
                console.log(daysArr)
                console.log(dayStr)

            },
            inittest(){
                let daysArr = [];
                let days = [];
                let alldaysArr = [];
                function daysInMonth(month, year) {
                    return new Date(year, month + 1, 0).getDate();
                }
                let data = new Date()
                let year = data.getFullYear();

                this.nowYear = year;
                this.nowMonth = data.getMonth();
                let dayStr = '';

                for(let month = this.nowMonth; month <=this.nowMonth; month++) {
                    // 每个月的第一天
                    let firstDay = new Date(year, month, 1);
                    let dayInMonth = daysInMonth(month, year);

                    // 每个月的最后一天
                    let lastDay = new Date(year, month, dayInMonth);

                    // 第一天星期几(0-6)
                    let weekday = firstDay.getDay();
                    let lastDayWeekDay = lastDay.getDay();
                    // 每一个都是从1号开始
                    let date = 1;

                    //dayStr += weeks.join(' ') + '\n';

                    // 补齐前面的空格
                    for ( let i = 0; i < weekday; i++ ) {
                        dayStr += '+ ';
                        //days.push('+ ')
                    }
                    //console.log(days)
                    for ( ; date <= dayInMonth; date++ ) {
                        dayStr += date + ' ';
                        weekday++

                        if ( weekday % 7 == 0 ) {
                            weekday = 0;
                            //dayStr += '\n';
                        }
                    }

                    // 补齐后面的空格
                    for ( let j = 0; j < (7 - lastDayWeekDay - 1); j++ ) {
                        dayStr += '+ ';
                    }
                    //dayStr += '\n';
                }

                alldaysArr = dayStr.split(' ')
                alldaysArr = alldaysArr.splice(0,alldaysArr.length-1)
                //console.log(alldaysArr)
                for(let i = 0; i < 4; i++){
                    if(i == 0){
                        daysArr.push(alldaysArr.slice(0 ,35));
                    }else{
                        daysArr.push(alldaysArr.slice(i*35, (i+1)*35))
                    }
                }
                //console.log(daysArr)
                let newAlldays = [];
                for(let j = 0; j < 4; j++){
                    let newdays = []
                    for(let i = 0; i < 5; i++){
                        if(i == 0){
                            newdays.push(daysArr[j].slice(0 ,7));
                        }else{
                            newdays.push(daysArr[j].slice(i*7, (i+1)*7))
                        }
                    }
                    newAlldays[j] = newdays
                }
                this.days = newAlldays;
                console.log(this.days)
            },
            selected(val){
                if(val == '9' || val== '10'){
                    return 'selected'
                }
            },
            checkIn(){
                this.canlenderShow = true
            },
            checkOut(){
                this.canlenderShow = true
            },
            confirm(){
                this.canlenderShow = false
            },
            selectMonFun(index){
                this.latelyMonthIndex = index;
                if(index == 2){
                    this.latelyMonth = [
                        {txt: '五月', num: 4, year: 2018},
                        {txt: '六月', num: 5, year: 2018},
                        {txt: '七月', num: 6, year: 2018},
                    ]
                    this.latelyMonthIndex = 0;
                }
            },
            getNowData(){
                let data = new Date();

            }
        },
        components: {

        }
    }
</script>

<style lang="scss">
    .datePicker{
        width: 100%;
        /*padding: 0 .26rem;*/
        table{
            width: 100%;
            thead{
                /*padding-top: 10px;*/
                line-height: .8rem;
            }
            .week{
                text-align: center;
                width: 14%;
            }
            td{
                text-align: center;
                span{
                    display: inline-block;

                    font-size: .28rem;
                    height: .72rem;
                    line-height: .72rem;
                    width: 100%;

                    &.selected{
                        border-bottom: .06rem solid #fdcc2b;
                    }
                }
            }
        }

        .datePicker-box{
            padding: 0 .26rem;
            .datePicker-inner{
                box-shadow: .08rem 0 .08rem -.08rem #f3f3f3,
                -.08rem 0 .08rem -.08rem #f3f3f3;
                .table-box{
                    >div{
                        width: 100%;
                        line-height: 20px;
                        margin-top: 20px;
                    }
                }
                .month-box{
                    width: 100%;
                    >.inner{
                        >.month-box{
                            padding-top: .24rem;
                            padding-bottom: .34rem;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            >div{
                                font-size: .4rem;
                                line-height: 1rem;
                                width: 1.2rem;
                                text-align: center;
                                color: #aaaaaa;
                                &.nowMonth{
                                    color: #3c3c3c;
                                }
                            }
                        }
                        >.week{

                        }
                    }
                }
            }

        }
        .btn-box{
            padding-top: .1rem;
            text-align: right;
            padding-bottom: .35rem;
            button{
                font-size: .32rem;
                width: 2.78rem;
                height: .8rem;
                color: #ffffff;
                background: #fdcc2b;
                border-radius: .4rem;
                text-align: center;
                line-height: .8rem;
                border: 0;
                outline: none;
            }
        }
        .date-box{
            >.date-select{
                display: flex;
                justify-content: space-around;
                align-items: center;
                box-shadow: 0 .11rem .11rem -.11rem #f3f3f3;
                >.duration{
                    height: .4rem;
                    width: .8rem;
                    border-radius: .12rem;
                    background: #fdcc2d;
                    color: #ffffff;
                    line-height: .4rem;
                    text-align: center;
                    font-size: .24rem;
                }
                >.check-time{
                    >.check-way{
                        font-size: .28rem;
                        color: #666666;
                        padding-top: .2rem;
                        text-align: center;
                    }
                    >.time{
                        font-size: .36rem;
                        line-height: .68rem;
                    }
                }
            }
        }
    }
    .bounce-enter-active {
        animation: zoom-in .3s;
    }
    .bounce-leave-active {
        animation: zoom-in .3s reverse;
    }
    @keyframes zoom-in {
        from {
            opacity: 0;
            transform: scale3d(.3, .3, .3);
        }
        50% {
            opacity: 1;
        }
    }
</style>
