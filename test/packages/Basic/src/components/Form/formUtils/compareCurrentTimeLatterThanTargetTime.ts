import moment from 'moment';
import queryValue from './queryValue';

const compareCurrentTimeLatterThanTargetTime = (currentTime: any, targetTime: any) => {
  let result = false;
  if (
    currentTime?.value &&
    currentTime?.dirty === false &&
    currentTime?.errors === undefined &&
    moment(currentTime?.value).startOf('day').valueOf() >
    moment(queryValue(targetTime)).startOf('day').valueOf()
  ) {
    result = true;
  }

  return result;

};

export default compareCurrentTimeLatterThanTargetTime;
