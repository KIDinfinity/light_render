import { produce }  from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const { ocrErrors } = payload;
    draftState.ocrErrors = ocrErrors;
  });
};
