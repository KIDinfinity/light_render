import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import flatProductConfig from 'process/NB/ManualUnderwriting/utils/flatProductConfig';

export default (state: any, action: any) => {
  const { changedFields, coverageId, id } = action.payload;
  const { businessData } = state;
  const ownCoverageList = lodash.get(businessData, 'policyList[0].coverageList', []) || [];
  const coverageIndex = lodash.findIndex(ownCoverageList, (item: any) => item?.id === coverageId);

  const periodMapping = {
    PT: 'payPeriod',
    RT: 'indemnifyPeriod',
  };
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

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      const changedFieldsKey = lodash.chain(changedFields).keys().first().value();
      if (lodash.isNil(formUtils.queryValue(changedFields[`${changedFieldsKey}`]))) {
        lodash.set(changedFields[`${changedFieldsKey}`], 'value', null);
      }
      lodash.set(
        draftState,
        `businessData.policyList[0].coverageList[${coverageIndex}].coverageLoadingList[${index}]`,
        {
          ...ownCoverageLoadingItem,
          ...changedFields,
        }
      );
      const coverage = lodash.get(
        draftState,
        `businessData.policyList[0].coverageList[${coverageIndex}]`,
        {}
      );
      const planProductConfig = lodash.get(state, 'planProductConfig', {});
      const productList = flatProductConfig({ planProductConfig });

      const coverageLoadingItem = lodash.get(
        draftState,
        `businessData.policyList[0].coverageList[${coverageIndex}].coverageLoadingList[${index}]`,
        {}
      );
      const currentChangeFieldValue = lodash
        .chain(changedFields[`${changedFieldsKey}`])
        .get('value')
        .toString()
        .value();

      const changeFieldKey = lodash.keys(changedFields)[0];
      const changedField = lodash.keys(changedFields)[0].substring(0, 1);

      if (lodash.includes(['extraMortality', 'pmLoading', 'flatMortality'], changedFieldsKey)) {
        const filterList = [
          'extraMortality',
          'emPeriod',
          'pmLoading',
          'pmPeriod',
          'flatMortality',
          'fmPeriod',
        ];
        const loadingTermFollowCodeKeyMap = {
          flatMortality: 'feTermFollowCode',
          pmLoading: 'rateTermFollowCode',
          extraMortality: 'meTermFollowCode',
        };
        const loadingTermFollowCodeKey = loadingTermFollowCodeKeyMap[changeFieldKey] || 'RT';
        const loadingTermFollowCode = lodash
          .chain(productList)
          .find((item: any) => item.productCode === formUtils.queryValue(coverage?.coreCode))
          .get(loadingTermFollowCodeKey)
          .value();
        const dataSourceKey = periodMapping[loadingTermFollowCode] || 'payPeriod';
        const policyTerm = lodash.get(
          draftState,
          `businessData.policyList[0].coverageList[${coverageIndex}].${dataSourceKey}`,
          {}
        );
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
    }
    //点confirm会自动校验section，changedFields会传入所有field，需要>1这个判断来走这条设值的逻辑，不然没有更新
    if (lodash.size(changedFields) > 1) {
      lodash.set(
        draftState,
        `businessData.policyList[0].coverageList[${coverageIndex}].coverageLoadingList[${index}]`,
        {
          ...ownCoverageLoadingItem,
          ...changedFields,
        }
      );
    }
  });
  return {
    ...nextState,
  };
};
