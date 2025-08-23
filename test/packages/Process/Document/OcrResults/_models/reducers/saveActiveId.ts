import { produce }  from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const { activeId } = payload;
    draftState.activeId = activeId;
  });
};
