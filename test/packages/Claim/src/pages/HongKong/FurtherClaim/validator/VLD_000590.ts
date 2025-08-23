import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * Symptom Date of Diagnosis should not be later than First Consultation Date
 */

export const VLD_000590 = ({ claimEntities }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const { incidentListMap } = claimEntities;
  const noPase = lodash.some(
    incidentListMap,
    ({ firstConsultationDate }: any) =>
      moment(value).format('YYYY-MM-DD') >
      moment(formUtils.queryValue(firstConsultationDate)).format('YYYY-MM-DD')
  );

  return noPase && value
    ? callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000509' }))
    : callback();
};
