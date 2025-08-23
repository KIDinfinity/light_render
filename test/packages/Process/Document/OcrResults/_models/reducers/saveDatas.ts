import { produce }  from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const { datas } = payload;
    draftState.datas = datas;
  });
};
