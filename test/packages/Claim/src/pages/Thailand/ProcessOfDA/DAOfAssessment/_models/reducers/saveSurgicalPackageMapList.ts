import { produce } from 'immer';

const saveSurgicalPackageMapList = (state: any, { payload }: any) => {
  const { surgicalPackageMapList } = payload;

  return produce(state, (draftState: any) => {
    const draft = draftState;

    draft.surgicalPackageMapList = surgicalPackageMapList;
  });
};

export default saveSurgicalPackageMapList;
