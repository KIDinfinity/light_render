import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const clientInfoList = lodash.get(action, 'payload.clientInfoList');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(
      draftState.customerIdentification.datas,
      'policyList[0].clientInfoList',
      clientInfoList
    );
  });
  return {
    ...nextState,
  };
};
