import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, { payload }: any) => {
  const { fundList } = payload;

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `businessData.policyList[0].fundInfo.totalFundInfoList`, fundList);
  });
  return nextState;
};
