import { produce } from 'immer';

const saveShowSurgicalPackage = (state: any, { payload }: any) => {
  const { show } = payload;

  return produce(state, (draftState: any) => {
    const draft = draftState;

    draft.showSurgicalPackage = show;
  });
};

export default saveShowSurgicalPackage;
