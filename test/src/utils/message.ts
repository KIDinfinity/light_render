import lodash from 'lodash';
import moment from 'moment';
import timeUtils from '@/utils/time';

class MessageUtil {
  setShowTimeToMessage = (message = []) => {
    let lastTime: any = null;

    const list = lodash
      .chain(message)
      .map((item: any, index: number) => {
        if (index === 0) {
          lastTime = item.time;

          return {
            ...item,
            showTime: true,
            calendarTime: timeUtils.calendar(item.time, true),
          };
        }
        const currentMessageTime = item.time && moment(item.time);
        const diffTime = Math.abs(moment(lastTime).diff(currentMessageTime, 'minutes'));
        if (diffTime >= 5) {
          lastTime = item.time;

          return {
            ...item,
            showTime: true,
            calendarTime: timeUtils.calendar(item.time, true),
          };
        }

        return { ...item, showTime: false };
      })
      .value();
    return list;
  };
}

export default new MessageUtil();
