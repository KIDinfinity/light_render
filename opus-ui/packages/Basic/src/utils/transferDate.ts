import moment, { Moment } from 'moment';
import lodash from 'lodash';
const buddistYearThreshold = 2300;
const transferBuddistDate = (moment: Moment, isBuddistDate: Boolean) => {
  const finalDate = moment;
  if (moment?.year() < buddistYearThreshold && isBuddistDate) {
    return finalDate.add('year', 543);
  }
  return finalDate;
};

const transferDate = (str: String) => {
  const currentMoment = moment.parseZone(str);
  if (moment.isMoment(currentMoment) && currentMoment.isValid()) {
    return currentMoment.year() > buddistYearThreshold
      ? currentMoment.subtract(543, 'years')?.format()
      : str;
  }
  return str;
};
export { transferBuddistDate, transferDate };
