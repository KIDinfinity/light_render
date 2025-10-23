/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId } = payload;
    const reinstatementPath = `entities.transactionTypesMap[${transactionId}].uwPolicy`;
    const policyCoverageList = draftState.processData?.policyInfo?.policyCoverageList || [];

    lodash.set(
      draftState,
      `${reinstatementPath}.uwCoverageList`,
      lodash.map(lodash.get(draftState, `${reinstatementPath}.uwCoverageList`), (item) => {
        const policyItem = policyCoverageList.find(
          (policyItem) =>
            policyItem?.insuredClientId === item?.clientId &&
            policyItem?.productCode === item?.productCode
        );
        return {
          ...item,
          uwCoverageExclusionList: policyItem?.coverageExclusionList,
          uwCoverageLoadingList: (policyItem?.coverageLoadingList || []).map((loading) => {
            const NumberRateAdjust = Number(loading?.rateAdjust || 0);
            const NumberFlatMortality = Number(loading?.flatMortality || 0);
            const NumberDuration = Number(loading?.duration || 0);
            return {
              ...loading,
              pmLoading: NumberRateAdjust > 0 ? NumberRateAdjust : null,
              pmPeriod: NumberRateAdjust > 0 ? NumberDuration : null,
              flatMortality: NumberFlatMortality > 0 ? NumberFlatMortality : null,
              fmPeriod: NumberFlatMortality > 0 ? NumberDuration : null,
            };
          }),
        };
      })
    );
  });
