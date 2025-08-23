import moment from 'moment';

class TimeUtil {
  calendar = (time, showMinutes = false) => {
    if (!time) {
      return '';
    }
    const startOfToday = moment().startOf('day');
    const startOfTime = moment(time).startOf('day');
    const todayValueOf = startOfToday.valueOf();
    const timeValueOf = startOfTime.valueOf();
    const startOfThisWeek = moment().startOf('isoWeek');
    const valueOfThisWeekStart = startOfThisWeek.valueOf();
    // 一天的毫秒数
    const oneDayMilliseconds = 24 * 60 * 60 * 1000;
    // time 和 today 的零点毫秒数差
    const millisecondsDiff = todayValueOf - timeValueOf;
    // 判断时间为今日内
    if (millisecondsDiff === 0) {
      return moment(time).format('LT');
    }
    // 判断为昨天
    if (millisecondsDiff === oneDayMilliseconds) {
      return moment(time).calendar();
    }
    // 昨天前本周内
    if (millisecondsDiff > oneDayMilliseconds && timeValueOf >= valueOfThisWeekStart) {
      if (showMinutes) {
        return moment(time).format('dddd LT');
      }

      return moment(time).format('dddd');
    }
    if (showMinutes) {
      return moment(time).format('L LT');
    }

    // 本周前
    return moment(time).format('L');
  };

  formatWithTimeZone = ({ time, format }) => {
    if (!time) {
      return null;
    }
    const datetime = moment(time).format(format);
    // 由于服务端的时区格式不同 此处做特殊处理
    const timeZone = moment(time).format('Z').replace(':', '');
    return `${datetime}${timeZone}`;
  };
  formatDateTime(time: string) {
    if (!time) {
      return null;
    }
    return moment(time).format('YYYY-MM-DD LTS');
  }
}

export default new TimeUtil();
