import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any) => {
  const nextState = produce(state, (draftState: any) => {
    if (
      !lodash.includes(
        draftState.modalData.processData?.clientInfoList || [],
        draftState.expandedClientId
      )
    ) {
      draftState.expandedClientId = '';
    }
  });
  return {
    ...nextState,
  };
};
