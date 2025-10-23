import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

export const VLD_000390 = (claimEntities: any) => {
  const claimPayableListMap = lodash.get(claimEntities, 'claimPayableListMap');
  const treatmentListMap = lodash.get(claimEntities, 'treatmentListMap');
  return lodash.every(claimPayableListMap, (item) => {
    if (item.benefitCategory === eBenefitCategory.Cashless && !lodash.size(treatmentListMap)) {
      return false;
    }
    if (
      item.benefitCategory === eBenefitCategory.Cashless &&
      !lodash.size(item.treatmentPayableList)
    ) {
      return false;
    }
    return true;
  })
    ? ''
    : [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })];
};
