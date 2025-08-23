import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

/**
 * Symptom Date of Diagnosis should not be later than Admission Date
 */

export const VLD_000589 = ({ claimEntities }: any) => (
  rule: any,
  value: any,
  callback: Function
) => {
  const { treatmentListMap } = claimEntities;

  const noPase = lodash.some(
    treatmentListMap,
    ({ dateOfAdmission }: any) =>
      moment(value).format('YYYY-MM-DD') >
      moment(formUtils.queryValue(dateOfAdmission)).format('YYYY-MM-DD')
  );

  return noPase && value
    ? callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000508' }))
    : callback();
};
