import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ClaimTypeArray } from 'claim/enum/claimTypeArray';

export const VLD_000351 = (incidentListMap: any) => {
  const errorMessage = {
    code: 'VLD_000351',
    content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000370' }),
  };
  if (lodash.size(incidentListMap) === 0) return errorMessage;
  return lodash.every(incidentListMap, (incidentItem) =>
    lodash.some(
      formUtils.queryValue(incidentItem?.claimTypeArray),
      (item) => item === ClaimTypeArray.Death
    )
  )
    ? ''
    : errorMessage;
};
