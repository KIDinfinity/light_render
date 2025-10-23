import { produce } from 'immer';

const claimProcessDataAdd = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { datas } = action.payload;

    draftState.businessData.claimProcessData[0] = {
      ...datas,
      uploadFiles: draftState.businessData.claimProcessData[0]?.uploadFiles || [],
    };
  });
  return { ...nextState };
};

export default claimProcessDataAdd;
