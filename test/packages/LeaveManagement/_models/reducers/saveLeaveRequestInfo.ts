import { produce }  from 'immer';

const saveLeaveRequestInfo = (state: any, action: any) => {
  const { datas } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.requestInfo = {
      ...draftState.requestInfo,
      ...datas,
    };
  });

  return { ...nextState };
};

export default saveLeaveRequestInfo;
