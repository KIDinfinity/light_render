import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { factoringHouseDefault } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState,
      'businessData.policyList[0].bankCardInfoList[0].factoringHouse',
      factoringHouseDefault
    );
  });
  return { ...nextState };
};
