import lodash from 'lodash';
import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import type { planProductConfig } from 'opus/NewBusiness/ManualUnderwriting/types';
import { editCopy } from 'opus/NewBusiness/ManualUnderwriting/_utils/copyRuleMatching';
import flatProductConfig from 'opus/NewBusiness/ManualUnderwriting/_utils/flatProductConfig';
import fixOfflimitLoading from 'opus/NewBusiness/ManualUnderwriting/_utils/fixOfflimitLoading';
import { getOWBLoadingCode } from 'opus/NewBusiness/ManualUnderwriting/_utils';

const periodMapping: Record<string, string> = {
  PT: 'payPeriod',
  RT: 'indemnifyPeriod',
};

export default (state: any, action: any) => {
  const nextState = produce(state, (draftState) => {
    const { changedFields, coverageId, id } = action.payload;
    const ownCoverageList = lodash.get(draftState, 'processData.coverageList', []) || [];
    const coverageIndex = lodash.findIndex(ownCoverageList, (item: any) => item?.id === coverageId);

    const ownCoverageLoadingItem =
      lodash
        .chain(ownCoverageList)
        .find((item: any) => item?.id === coverageId)
        .get('coverageLoadingList')
        .find((e: any) => e?.id === id)
        .value() || [];
    const index = lodash
      .chain(ownCoverageList)
      .find((item: any) => item?.id === coverageId)
      .get('coverageLoadingList')
      .findIndex((e: any) => e?.id === id)
      .value();

    if (lodash.size(changedFields) === 1) {
      const changedFieldsKey = lodash.chain(changedFields).keys().first().value();
      if (lodash.isNil(formUtils.queryValue(changedFields[`${changedFieldsKey}`]))) {
        lodash.set(changedFields[`${changedFieldsKey}`], 'value', null);
      }
      const newOwbLoadingCode = getOWBLoadingCode(ownCoverageLoadingItem);

      lodash.set(
        draftState,
        `processData.coverageList[${coverageIndex}].coverageLoadingList[${index}]`,
        {
          ...ownCoverageLoadingItem,
          ...changedFields,
          owbLoadingCode: newOwbLoadingCode,
        }
      );
      const coverage = lodash.get(draftState, `processData.coverageList[${coverageIndex}]`, {});

      const planProductConfig: planProductConfig = lodash.get(draftState, 'planProductConfig', {});
      const productList = flatProductConfig({ planProductConfig });
      const loadingTermFollowCode = lodash
        .chain(productList)
        .find((item: any) => item.productCode === formUtils.queryValue(coverage?.coreCode))
        .get('loadingTermFollowCode')
        .value();
      const dataSourceKey = periodMapping[loadingTermFollowCode] || 'payPeriod';
      const policyTerm = lodash.get(
        draftState,
        `processData.coverageList[${coverageIndex}].${dataSourceKey}`,
        {}
      );
      const coverageLoadingItem = lodash.get(
        draftState,
        `processData.coverageList[${coverageIndex}].coverageLoadingList[${index}]`,
        {}
      );

      const currentChangeFieldValue = lodash
        .chain(changedFields[`${changedFieldsKey}`])
        .get('value')
        .toString()
        .value();
      if (lodash.includes(['extraMortality', 'pmLoading', 'flatMortality'], changedFieldsKey)) {
        const changedField = lodash.keys(changedFields)[0].substring(0, 1);
        const filterList = [
          'extraMortality',
          'emPeriod',
          'pmLoading',
          'pmPeriod',
          'flatMortality',
          'fmPeriod',
        ];
        lodash.forEach(coverageLoadingItem, (value: any, key: any) => {
          if (
            lodash.startsWith(key, `${changedField}mPeriod`) &&
            lodash.chain(formUtils.queryValue(value)).toString().isEmpty().value()
          ) {
            coverageLoadingItem[key] = lodash.toNumber(policyTerm);
          }
          if (
            (!lodash.isEmpty(currentChangeFieldValue) &&
              !lodash.startsWith(key, changedField) &&
              lodash.filter(filterList, (item: any) => item !== changedFieldsKey).includes(key)) ||
            (lodash.startsWith(key, `${changedField}mPeriod`) &&
              lodash.isEmpty(currentChangeFieldValue))
          ) {
            coverageLoadingItem[key] = null;
          }
        });
      }

      const coverageList = draftState.processData.coverageList;
      const coverageItem = coverageList[coverageIndex];
      const coreCode = formUtils.queryValue(coverageItem.coreCode);
      if (formUtils.queryValue(coverageLoadingItem.code)) {
        editCopy(draftState, {
          copyItem: coverageLoadingItem,
          isLoading: true,
          coreCode,
          insuredList: coverageItem.coverageInsuredList,
        });
        draftState.processData.coverageList = fixOfflimitLoading(coverageList, planProductConfig);
      }
    } else {
      lodash.set(
        draftState,
        `processData.coverageList[${coverageIndex}].coverageLoadingList[${index}]`,
        {
          ...ownCoverageLoadingItem,
          ...changedFields,
        }
      );
    }
  });
  return nextState;
};
