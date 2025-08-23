import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { formUtils } from 'basic/components/Form';
import { add } from '@/utils/precisionUtils';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

const skips = tenant.isPH()
  ? [
      ClaimDecision.deny,
      ClaimDecision.NA,
      ClaimDecision.approve,
      ClaimDecision.pending,
      ClaimDecision.exGratia,
    ]
  : [ClaimDecision.deny, ClaimDecision.NA];

export const VLD_000283 =
  (
    claimPayableListMap: any,
    serviceItemPayableListMap: any,
    payableId: string,
    serviceItemListMap?: any
  ) =>
  (rule: any, value: any, callback: Function) => {
    const { payableAmount, benefitCategory, deductibleAmount, isAdjustment, benefitSubCategory } =
      formUtils.cleanValidateData(claimPayableListMap?.[payableId]) || {};

    if (Number(payableAmount) === 0 && !!deductibleAmount && Number(deductibleAmount) > 0) {
      callback();
    }

    if (benefitCategory === 'L' && benefitSubCategory === 'WOP') {
      callback();
      return;
    }

    const serviceItemPayableList = lodash.filter(serviceItemPayableListMap, { payableId });

    if (benefitCategory === eBenefitCategory.Reimbursement && tenant.isHK()) {
      const filterList = lodash.reduce(
        serviceItemPayableList || [],
        (arr: any, { serviceItemId }: any) => {
          const serviceItemList = lodash.filter(
            serviceItemListMap,
            (el: any) =>
              serviceItemId === el?.id &&
              formUtils.queryValue(el.expense) !== formUtils.queryValue(el.otherInsurerPaidAmount)
          );

          return [...arr, ...serviceItemList];
        },
        []
      );
      if (lodash.isEmpty(filterList)) {
        callback();
      }
    }

    const boosterPayableIds = lodash
      .chain(serviceItemPayableList)
      .map((item) => {
        const { policyNo, benefitItemCode, productCode, productPlan, serviceItemId } =
          formUtils.cleanValidateData(item);
        const booster =
          lodash.find(serviceItemPayableListMap, {
            policyNo,
            benefitItemCode,
            productCode,
            productPlan,
            booster: 'Y',
            serviceItemId,
          }) || {};
        return booster?.payableId;
      })
      .compact()
      .uniq()
      .value();

    const boosterPayableAmount = lodash.reduce(
      boosterPayableIds,
      (result, item) =>
        add(result, formUtils.queryValue(claimPayableListMap?.[item]?.payableAmount)),
      0
    );

    if (
      value === ClaimDecision.deny &&
      add(payableAmount, boosterPayableAmount) !== 0 &&
      isAdjustment !== 'Y'
    ) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001197' }));
    }

    if (
      !lodash.includes(skips, value) &&
      add(payableAmount, boosterPayableAmount) === 0 &&
      isAdjustment !== 'Y'
    ) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000266' }));
    }
    callback();
  };
