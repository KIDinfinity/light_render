import moment from 'moment';
import queryValue from './queryValue';

const compareNowDateTimeEarlierThanTargetTime = (targetTime: any) => {
  let result = false;
  if (
    moment(new Date()).startOf('day').valueOf() <
    moment(queryValue(targetTime)).startOf('day').valueOf()
  ) {
    result = true;
  }

  return result;

};

export default compareNowDateTimeEarlierThanTargetTime;
