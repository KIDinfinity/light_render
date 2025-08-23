import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, coverageId } = lodash.pick(action?.payload, ['id', 'coverageId']);
  const { businessData } = state;
  const ownCoverageList = lodash.get(businessData, 'policyList[0].coverageList');
  const ownCoverageLoadingList =
    lodash
      .chain(ownCoverageList)
      .find((item: any) => item?.id === coverageId)
      .get('coverageLoadingList')
      .value() || [];
  const index = lodash.findIndex(ownCoverageList, (item: any) => item?.id === coverageId);
  const finalCoverageList = lodash.filter(ownCoverageLoadingList, (item) => item.id !== id);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      `businessData.policyList[0].coverageList[${index}].coverageLoadingList`,
      finalCoverageList
    );
  });
  return {
    ...nextState,
  };
};
