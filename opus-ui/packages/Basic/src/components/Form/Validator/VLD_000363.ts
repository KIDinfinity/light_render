import lodash from 'lodash';
import { EPolicySource } from 'claim/enum/EPolicySource';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export const VLD_000363 = (claimPayableListMap: any) => {
  const fieldName = formatMessageApi({
    Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
  });
  const filter = lodash.filter(
    claimPayableListMap,
    (item) => item?.policySource === EPolicySource.Individual
  );
  return lodash.size(filter) > 0
    ? ''
    : {
        code: 'VLD_000363',
        content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000371' }, fieldName),
      };
};
