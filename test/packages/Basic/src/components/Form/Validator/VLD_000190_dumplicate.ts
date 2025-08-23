import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

const UNIT = 'day';

export const VLD_000190 = (contrastFn: Function, incidentId: string) => async (
  rule: any,
  value: any,
  callback: Function
) => {
  if (lodash.isEmpty(value)) {
    callback();
  }
  const linkageTreatmentList = await contrastFn();
  let admissionMessage = '';
  lodash.forEach(linkageTreatmentList, (item) => {
    const { incidentNo, treatmentNo } = item;
    const admissionDate = formUtils.queryValue(item.dateOfAdmission);
    const dischargeDate = formUtils.queryValue(item.dateOfDischarge);
    // 入院日等于入院日 1,3,6 || 入院日等于退院日 7
    if (
      moment(value).isSame(formUtils.queryValue(admissionDate), UNIT) ||
      moment(value).isSame(formUtils.queryValue(dischargeDate), UNIT)
    ) {
      if (incidentId === item.incidentId) {
        admissionMessage += `${formatMessageApi(
          { Label_COM_WarningMessage: 'ERR_000188' },
          treatmentNo
        )},`;
      } else {
        admissionMessage += `${formatMessageApi(
          { message: 'ERR_000189' },
          treatmentNo,
          incidentNo
        )},`;
      }
    }

    // 入院日在期间 8，9，11
    if (moment(value).isBetween(admissionDate, dischargeDate, UNIT)) {
      if (incidentId === item.incidentId) {
        admissionMessage += `${formatMessageApi(
          { Label_COM_WarningMessage: 'ERR_000200' },
          treatmentNo
        )},`;
      } else {
        admissionMessage += `${formatMessageApi(
          { message: 'ERR_000201' },
          treatmentNo,
          incidentNo
        )},`;
      }
    }
  });
  if (!lodash.isEmpty(admissionMessage)) {
    admissionMessage = admissionMessage.slice(0, -1);
    callback(admissionMessage);
  }
  callback();
};
