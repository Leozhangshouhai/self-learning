export default {

    /*
     * 时间戳转成日期时间格式
     * @params time 传入时间戳，必需
     * @params rules 转换规则，返回格式配置，默认返回date格式
     */
    formatDate(time, rules) {
        if (!time) {
            return;
        }
        var result = "";
        if (typeof time === "string" || typeof time === "number") {
            time = new Date(time * 1000);
            var   year = time.getFullYear();
            var   month = (time.getMonth()+1) > 9 ? (time.getMonth()+1) : "0" + (time.getMonth()+1);
            var   date = time.getDate() > 9 ? time.getDate() : "0" + time.getDate();
            var   hour = time.getHours();
            var   minute = time.getMinutes();
            var   second = time.getSeconds();

            if (rules) {
                switch (rules) {
                    case 'datetime':
                        result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
                        break;
                    case 'date':
                        result = year + '-' + month + '-' + date;
                        break;
                }
            } else {
                result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
            }
        }
        return result;
    },

    /*
     * 将日期格式转成时间戳格式
     * @params time 传入时间戳，必需
     * @params exact 是否精确到毫秒，默认为false
     */
    formatUnixTime(time, exact) {
        if (!time) {
            return;
        }
        var result = Date.parse(new Date(time));
        if (exact !== true) {
            result = result / 1000;
        }
        return result;
    }
}
