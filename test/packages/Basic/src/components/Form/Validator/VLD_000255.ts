import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

enum ClaimDecision {
  deny = 'D',
  pending = 'P',
  approve = 'A',
}

enum BenefitCategory {
  life = 'L',
  cashless = 'C',
  aipa = 'A',
  reimbursement = 'R',
}

const BenefitCategoryFn = {
  [BenefitCategory.aipa]: (source: any) => {
    const { treatmentPayableList, treatmentPayableListMap, policyNo, benefitTypeCode } = source;
    const errors: string[] = [];
    if (
      lodash.some(treatmentPayableList, (id) =>
        lodash
          .chain(treatmentPayableListMap)
          .get(`${id}.accidentBenefitPayableList`)
          .isEmpty()
          .value()
      )
    ) {
      errors.push(
        formatMessageApi({ Label_COM_WarningMessage: 'ERR_000238' }, policyNo, benefitTypeCode)
      );
    }
    return errors;
  },
  [BenefitCategory.reimbursement]: (source: any) => {
    const {
      treatmentPayableList,
      treatmentPayableListMap,
      policyNo,
      benefitTypeCode,
      invoicePayableListMap,
    } = source;
    const errors: string[] = [];
    lodash.forEach(treatmentPayableList, (id) => {
      const target = lodash.get(treatmentPayableListMap, id, {});
      const invoicePayableList = lodash.get(target, 'invoicePayableList');
      lodash.forEach(invoicePayableList, (invoicePayableId) => {
        const invoicePayableItem = lodash.get(invoicePayableListMap, invoicePayableId);
        const benefitItemPayableList = lodash.get(invoicePayableItem, 'benefitItemPayableList');
        if (lodash.isEmpty(benefitItemPayableList)) {
          errors.push(
            formatMessageApi({ Label_COM_WarningMessage: 'ERR_000242' }, policyNo, benefitTypeCode)
          );
        }
      });
    });
    return errors;
  },
  [BenefitCategory.cashless]: () => [],
  [BenefitCategory.life]: () => [],
};

export const VLD_000255 = (claimEntities: any) => {
  let errors: string[] = [];
  const { claimPayableListMap, treatmentPayableListMap, invoicePayableListMap } = claimEntities;
  lodash.forEach(
    claimPayableListMap,
    ({ claimDecision, benefitCategory, treatmentPayableList, policyNo, benefitTypeCode }: any) => {
      if (claimDecision === ClaimDecision.approve) {
        errors = [
          ...errors,
          ...(BenefitCategoryFn?.[benefitCategory]?.({
            treatmentPayableList,
            treatmentPayableListMap,
            policyNo,
            benefitTypeCode,
            invoicePayableListMap,
          }) || []),
        ];
      }
    }
  );
  return errors;
};
