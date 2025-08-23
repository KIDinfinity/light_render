import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

const UNIT = 'day';

export const VLD_000191 = (contrastFn: Function, incidentId: string) => async (
  rule: any,
  value: any,
  callback: Function
) => {
  if (lodash.isEmpty(value)) {
    callback();
  }
  const linkageTreatmentList = await contrastFn();
  let dischargeMessage = '';
  lodash.forEach(linkageTreatmentList, (item) => {
    const { incidentNo, treatmentNo } = item;
    const admissionDate = formUtils.queryValue(item.dateOfAdmission);
    const dischargeDate = formUtils.queryValue(item.dateOfDischarge);
    // 退院日等于退院日 2，3，5 || 退院日等于入院日 4
    if (
      moment(value).isSame(formUtils.queryValue(dischargeDate), UNIT) ||
      moment(value).isSame(formUtils.queryValue(admissionDate), UNIT)
    ) {
      if (incidentId === item.incidentId) {
        dischargeMessage += `${formatMessageApi(
          { Label_COM_WarningMessage: 'ERR_000188' },
          treatmentNo
        )},`;
      } else {
        dischargeMessage += `${formatMessageApi(
          { message: 'ERR_000189' },
          treatmentNo,
          incidentNo
        )},`;
      }
    }

    // 退院日在期间 9
    if (moment(value).isBetween(admissionDate, dischargeDate, UNIT)) {
      if (incidentId === item.incidentId) {
        dischargeMessage += `${formatMessageApi(
          { Label_COM_WarningMessage: 'ERR_000200' },
          treatmentNo
        )},`;
      } else {
        dischargeMessage += `${formatMessageApi(
          { message: 'ERR_000201' },
          treatmentNo,
          incidentNo
        )},`;
      }
    }
  });
  if (!lodash.isEmpty(dischargeMessage)) {
    dischargeMessage = dischargeMessage.slice(0, -1);
    callback(dischargeMessage);
  }
  callback();
};
