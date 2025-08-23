import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import CheckNtuType from 'process/NB/Enum/CheckNtuType';

export default ({ extendtoDate, extendtoDays, currentRadio }: any) => {
  let newCurrentDate = null;
  switch (currentRadio) {
    case CheckNtuType.ExtendtoDays:
      newCurrentDate = moment().add(formUtils.queryValue(extendtoDays), 'days').format();
      break;
    case CheckNtuType.ExtendtoDate:
      newCurrentDate = moment(formUtils.queryValue(extendtoDate)).format();
      break;
    default:
      break;
  }
  return newCurrentDate;
};
