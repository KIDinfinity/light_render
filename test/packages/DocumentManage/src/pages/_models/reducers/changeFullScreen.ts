import { produce }  from 'immer';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { showFullScreen, url } = payload;
    draft.url = url;
    draft.showFullScreen = showFullScreen;
  });
};
