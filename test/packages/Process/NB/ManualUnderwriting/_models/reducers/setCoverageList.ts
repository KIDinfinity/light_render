import { produce }  from 'immer';
import lodash from 'lodash';
import SustainabilityOption from 'process/NB/ManualUnderwriting/Enum/SustainabilityOption';

export default (state: any, action: any) => {
  const { sustainabilityOption, increasedCoverageList } = lodash.pick(action?.payload, [
    'sustainabilityOption',
    'increasedCoverageList',
  ]);
  const nextState = produce(state, (draftState: any) => {
    const coverageList = lodash.get(draftState, 'businessData.policyList[0].coverageList', []);
    const increasedContributionCoverageList = lodash
      .chain(coverageList)
      .concat(increasedCoverageList)
      .uniqBy('id')
      .value();
    if (sustainabilityOption === SustainabilityOption.IncreasePrem) {
      lodash.set(
        draftState,
        'businessData.policyList[0].coverageList',
        increasedContributionCoverageList
      );
    } else {
      const increasedCoverageIdList =
        lodash.map(increasedCoverageList, (item: any) => item?.id) || [];
      const originCoverageList = lodash.filter(
        coverageList,
        (coverageItem: any) => !lodash.includes(increasedCoverageIdList, coverageItem?.id)
      );
      lodash.set(draftState, 'businessData.policyList[0].coverageList', originCoverageList);
    }
  });
  return {
    ...nextState,
  };
};
