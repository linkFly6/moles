var so = {
    padNumber: (num, fill) => {
        //改自：http://blog.csdn.net/aimingoo/article/details/4492592
        var len = ('' + num).length;
        return (Array(
            fill > len ? fill - len + 1 || 0 : 0
        ).join(0) + num);
    },
    parseDate: function(jsonDate) {
        try {
            const type = Object.prototype.toString.call(jsonDate);
            if (type === '[object Date]') return jsonDate;
            if (!jsonDate) return null;
            return new Date(type === '[object Number]' ? jsonDate : parseInt(String(jsonDate).replace("/Date(", "").replace(")/", ""), 10));
        } catch (e) {
            return null;
        }
    },
    // 参见这里 https://github.com/linkFly6/Said/blob/master/Said/Content/Widget/so/so.js#L596
    dateFormat: (jsonDate, format) => {
        if (!format || typeof (format) != 'string')
            format = 'yyyy-MM-dd HH:mm:ss';
        var date = so.parseDate(jsonDate);
        if (!date) return '';
        var month = date.getMonth() + 1,
            day = date.getDate(),
            hours = date.getHours(),
            hours12 = hours > 11 ? 'PM' + (hours - 12) : 'AM' + hours,//12小时制1位数
            hours12double = hours > 11 ? 'PM ' + so.padNumber(hours - 12, 2) : 'AM ' + so.padNumber(hours, 2),//12小时制2位数
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            milliseconds = date.getMilliseconds();
        return format
            .replace('yyyy', date.getFullYear())//4位数年份
            .replace('MM', so.padNumber(month, 2))//2位数月份
            .replace('M', so.padNumber(month, 2))//1位数月份
            .replace('dd', so.padNumber(day, 2))//2位数日期
            .replace('d', day)//1位数日期
            .replace('HH', so.padNumber(hours, 2))//24小时制2位数
            .replace('H', hours)//24小时制1位数
            .replace('hh', hours12double)//12小时制2位数
            .replace('h', hours12)//12小时制1位数
            .replace('mm', so.padNumber(minutes, 2))//2位分钟
            .replace('m', minutes)//1位分钟
            .replace('ss', so.padNumber(seconds, 2))//2位秒数
            .replace('s', seconds)//1位秒数
            .replace('fff', so.padNumber(milliseconds, 3))//3位数毫秒
            .replace('f', milliseconds);//1位数毫秒
    }
};
export default so;