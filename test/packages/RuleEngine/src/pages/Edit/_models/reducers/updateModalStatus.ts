import { produce }  from 'immer';

// TODO:这个到时要废除
const updateModalStatus = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.modalStatus = {
      ...draftState.modalStatus,
      ...action.payload,
    };
  });

  return { ...nextState };
};

export default updateModalStatus;
