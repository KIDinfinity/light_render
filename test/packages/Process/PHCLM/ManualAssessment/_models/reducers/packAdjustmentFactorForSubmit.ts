import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

import { shallowEqual } from 'react-redux';

export default (state: any, { payload }: any) => {
  const claimPayableListMap = state.claimEntities?.claimPayableListMap;
  const adjustmentFactorListMap = formUtils.cleanValidateData(state?.adjustmentFactorListMap);
  const listBenefitFactor = state?.listBenefitFactor || [];

  const preAdjustmentFactorList =
    state.originClaimProcessData?.claimProcessData?.claimAdjustmentFactorList;

  const basicData = formUtils.cleanValidateData(
    lodash.map(claimPayableListMap, (item) => ({
      claimNo: item?.claimNo,
      policyNo: item?.policyNo,
      productCode: item?.productCode,
      benefitTypeCode: item?.benefitTypeCode,
      incidentId: item?.incidentId,
      productPlan: item?.productPlan,
      policyYear: item?.policyYear,
      coverageKey: item?.coverageKey,
    }))
  );

  const nextAdjustmentFactorList = lodash
    .chain(basicData)
    .reduce((arr: any, claimPayableItem: any) => {
      const { policyNo, incidentId, productCode, policyYear }: any = claimPayableItem;
      const adjuctmentFactorItem = lodash.find(adjustmentFactorListMap, {
        policyNo,
        productCode,
        incidentId,
      });
      return adjuctmentFactorItem
        ? [
            ...arr,
            ...lodash
              .chain(adjuctmentFactorItem?.factorList)
              .map((factorItem: any) => {
                const childItem = lodash.find(factorItem.list, {
                  policyYear,
                });

                return {
                  ...claimPayableItem,
                  ...lodash.pick(factorItem, ['factorCode', 'isSelected']),
                  ...lodash.pick(childItem, ['factorValue']),
                  benefitTypeCode: claimPayableItem?.benefitTypeCode,
                };
              })
              .value(),
          ]
        : arr;
    }, [])
    .flatten()
    .filter((el: any) => {
      const benefitTypeCodes = lodash
        .filter(listBenefitFactor, (filter) => filter.factorCode === el.factorCode)
        .map((map) => map.benefitTypeCode);

      return (
        lodash.some(benefitTypeCodes, (someItem) => someItem === '0') ||
        lodash.includes(benefitTypeCodes, el.benefitTypeCode)
      );
    })
    .filter((item: any) => {
      const { factorCode } = item;

      const benefitItem = lodash.find(listBenefitFactor, { factorCode }) || {};
      return (
        (!lodash.isEmpty(benefitItem) && benefitItem.productCode === '0') ||
        lodash.find(listBenefitFactor, {
          benefitTypeCode: '0',
          productCode: item?.productCode,
          factorCode: item?.factorCode,
        }) ||
        lodash.find(listBenefitFactor, {
          benefitTypeCode: item?.benefitTypeCode,
          productCode: item?.productCode,
          factorCode: item?.factorCode,
        })
      );
    })
    .filter((item: any) => {
      const target: any = lodash.find(preAdjustmentFactorList, {
        policyNo: item?.policyNo,
        productCode: item?.productCode,
        benefitTypeCode: item?.benefitTypeCode,
        incidentId: item?.incidentId,
        factorCode: item?.factorCode,
        policyYear: item?.policyYear,
      });
      return !lodash.isEmpty(target) || item?.isSelected;
    })
    .compact()
    .value();

  const nextState = produce(state, (draftState: any) => {
    draftState.changeAdjustmentFactorList = false;

    const result: any = lodash
      .chain(nextAdjustmentFactorList)
      .map((item) => {
        const target: any = lodash.find(preAdjustmentFactorList, {
          policyNo: item?.policyNo,
          productCode: item?.productCode,
          benefitTypeCode: item?.benefitTypeCode,
          incidentId: item?.incidentId,
          factorCode: item?.factorCode,
          policyYear: item?.policyYear,
        });

        const itemFactorValue = lodash.isNil(item?.factorValue) ? '' : item?.factorValue;
        const targetFactorValue = lodash.isNil(target?.factorValue) ? '' : target?.factorValue;
        if (
          (target &&
            (item?.isSelected !== target.isSelected || itemFactorValue !== targetFactorValue)) ||
          lodash.isEmpty(target)
        ) {
          draftState.changeAdjustmentFactorList = true;
        }
        if (
          target &&
          item?.isSelected === target.isSelected &&
          item?.factorValue === target.factorValue &&
          target?.isManual !== 'Y'
        ) {
          return { ...target, isManual: 'N' };
        }
        return { ...item, isManual: 'Y' };
      })
      .value();
    if (!shallowEqual(state.claimProcessData?.claimAdjustmentFactorList, result)) {
      draftState.claimProcessData = {
        ...draftState.claimProcessData,
        claimAdjustmentFactorList: result,
      };
    }
  });
  return { ...nextState };
};
