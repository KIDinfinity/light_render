import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

export const VLD_000389 = (claimEntities: any) => {
  const claimPayableListMap = lodash.get(claimEntities, 'claimPayableListMap');
  const hasReimbursement = lodash.some(
    claimPayableListMap,
    (item: any) => item?.benefitCategory === eBenefitCategory.Reimbursement
  );

  const target = [
    'invoicePayableListMap',
    'invoiceListMap',
    'treatmentPayableListMap',
    'treatmentListMap',
    'benefitItemPayableListMap',
  ];
  if (!hasReimbursement) return '';
  return lodash.every(target, (item) => lodash.size(claimEntities?.[item]))
    ? ''
    : [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })];
};
