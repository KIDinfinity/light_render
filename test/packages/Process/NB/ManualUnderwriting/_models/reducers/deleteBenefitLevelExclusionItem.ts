import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, coverageItemId } = lodash.pick(action?.payload, ['id', 'coverageItemId']);
  const nextState = produce(state, (draftState: any) => {
    const coverageIndex = lodash
      .chain(state)
      .get('businessData.policyList[0].coverageList', [])
      .findIndex((item) => item.id === coverageItemId)
      .value();
    const coverageExclusionList = lodash
      .chain(state)
      .get('businessData.policyList[0].coverageList', [])
      .find((item: any) => item?.id == coverageItemId)
      .get('coverageExclusionList', [])
      .filter((item: any) => item?.id !== id)
      .value();
    lodash.set(
      draftState,
      `businessData.policyList[0].coverageList[${coverageIndex}].coverageExclusionList`,
      coverageExclusionList
    );
  });
  return {
    ...nextState,
  };
};
