import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const clientId = lodash.get(action, 'payload.clientId', '');
  const nextState = produce(state, (draftState: any) => {
    if (draftState.expandedClientId) {
      draftState.expandedClientId = clientId;
    }
    draftState.processData.clientInfoList = lodash
      .chain([clientId])
      .concat(draftState?.processData?.clientInfoList)
      .uniq()
      .value();
  });
  return {
    ...nextState,
  };
};
