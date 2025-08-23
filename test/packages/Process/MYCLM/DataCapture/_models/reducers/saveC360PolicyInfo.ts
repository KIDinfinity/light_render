import { produce } from 'immer';

const saveC360PolicyInfo = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.c360PolicyInfo = payload?.c360PolicyInfo;
  });
  return { ...nextState };
};

export default saveC360PolicyInfo;
