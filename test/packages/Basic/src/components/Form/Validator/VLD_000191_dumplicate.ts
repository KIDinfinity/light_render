import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

export const VLD_000191 = (contrastFn: Function, incidentId: string) => async (
  rule: any,
  value: any,
  callback: Function
) => {
  const contrast = await contrastFn();
  lodash.forEach(contrast, (item) => {
    if (
      moment(value).isBetween(
        formUtils.queryValue(item.dateOfAdmission),
        formUtils.queryValue(item.dateOfDischarge),
        'day'
      )
    ) {
      if (incidentId === item.incidentId) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000200' }, item.treatmentNo));
      } else {
        callback(
          formatMessageApi(
            { Label_COM_WarningMessage: 'ERR_000201' },
            item.treatmentNo,
            item.incidentNo
          )
        );
      }
    }
  });
  callback();
};
