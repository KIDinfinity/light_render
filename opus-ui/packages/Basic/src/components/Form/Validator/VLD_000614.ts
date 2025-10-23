import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000614 = ({
  dateOfDischarge,
  dateOfAdmission,
  icuFromDate,
  icuToDate,
  serviceItem,
}: any) => (rule: any, value: any, callback: Function) => {
  const map = {
    '10.0.0': {
      fromDate: dateOfAdmission,
      toDate: dateOfDischarge,
    },
    '10.1.0': {
      fromDate: icuFromDate,
      toDate: icuToDate,
    },
  };

  const fromDate = moment(formUtils.queryValue(map?.[serviceItem]?.fromDate));
  const toDate = moment(formUtils.queryValue(map?.[serviceItem]?.toDate));

  if (
    !formUtils.queryValue(map?.[serviceItem]?.fromDate) ||
    !formUtils.queryValue(map?.[serviceItem]?.toDate)
  ) {
    callback();
    return;
  }

  const durations = toDate.diff(fromDate, 'day');
  const unitsRules = add(durations, 1);
  if (value > unitsRules) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000253' }));
    return;
  }
  callback();
};
