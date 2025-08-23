import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { manualExtendNtu } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'businessData.policyList[0].manualExtendNtu', manualExtendNtu);
  });
  return {
    ...nextState,
  };
};
