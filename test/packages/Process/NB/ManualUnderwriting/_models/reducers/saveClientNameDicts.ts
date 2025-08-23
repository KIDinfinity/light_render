import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const clientNameDicts = lodash.get(action, 'payload.clientNameDicts', []);
  const nextState = produce(state, (draftState: any) => {
    draftState.clientNameDicts = clientNameDicts;
  });
  return {
    ...nextState,
  };
};
