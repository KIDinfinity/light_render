import lodash from 'lodash';
import { EPolicySource } from 'claim/enum/EPolicySource';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000364 = (claimPayableListMap: any) => {
  const fieldName = formatMessageApi({
    Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.product',
  });
  const filter = lodash.filter(
    claimPayableListMap,
    (item) => item?.policySource === EPolicySource.Individual
  );
  const errorMessage = {
    code: 'VLD_000364',
    content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000371' }, fieldName),
  };
  if (lodash.size(filter) === 0) return errorMessage;
  return lodash.every(filter, (payable: any) => formUtils.queryValue(payable?.productCode))
    ? ''
    : errorMessage;
};
