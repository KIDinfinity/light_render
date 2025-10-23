import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const momentDuration = (timeOne: any, timeTwo: any) => {
  const momentTimeOne = moment.isMoment(formUtils.queryValue(timeOne))
    ? formUtils.queryValue(timeOne)
    : moment(formUtils.queryValue(timeOne));
  const momentTimeTwo = moment.isMoment(formUtils.queryValue(timeTwo))
    ? formUtils.queryValue(timeTwo)
    : moment(formUtils.queryValue(timeTwo));
  const clearTimeOne = momentTimeOne.hour(0).minute(0).second(0).millisecond(0);
  const clearTimeTwo = momentTimeTwo.hour(24).minute(0).second(0).millisecond(0);

  return clearTimeTwo.diff(clearTimeOne, 'days');
};
/**
 * ICU Days > Date of Discharge - Date of Admission
 */
export const VLD_000020 = (
  icuFromDate: any,
  icuToDate: any,
  dateOfAdmission: any,
  dateOfDischarge: any
) => (rule: any, value: any, callback: Function) => {
  if (!formUtils.queryValue(icuFromDate) || !formUtils.queryValue(icuToDate)) {
    if (formUtils.queryValue(dateOfAdmission) && formUtils.queryValue(dateOfDischarge)) {
      const duration = momentDuration(dateOfAdmission, dateOfDischarge);
      if (value > duration) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000039' }));
        return;
      }
    }
    callback();
    return;
  }
  const duration = momentDuration(icuFromDate, icuToDate);

  if (value > duration) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000039' }));
    return;
  }
  callback();
};
