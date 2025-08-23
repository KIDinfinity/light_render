import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields } = lodash.pick(action?.payload, ['changedFields']);
  const nextState = produce(state, (draftState: any) => {
    const replacementInfoList = lodash
      .chain(state)
      .get('businessData.policyList[0].replacementInfoList', [])
      .map((item: any) => {
        return {
          ...item,
          ...changedFields,
        };
      })
      .value();
    lodash.set(draftState, 'businessData.policyList[0].replacementInfoList', replacementInfoList);
  });
  return { ...nextState };
};
