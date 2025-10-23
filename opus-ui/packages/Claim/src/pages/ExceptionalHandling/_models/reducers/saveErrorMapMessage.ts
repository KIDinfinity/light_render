import { produce } from 'immer';

const saveErrorMapMessage = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.errorCodeMapMessageCode = action.payload.list;
  });
  return { ...nextState };
};

export default saveErrorMapMessage;
