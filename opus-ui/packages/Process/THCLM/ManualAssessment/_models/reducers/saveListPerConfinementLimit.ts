import { produce } from 'immer';

const saveListPerConfinementLimit = (state: any, { payload }: any) => {
  const { listPerConfinementLimit } = payload;

  return produce(state, (draftState: any) => {
    const draft = draftState;

    draft.listPerConfinementLimit = listPerConfinementLimit;
  });
};

export default saveListPerConfinementLimit;
