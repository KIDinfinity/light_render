import { produce } from 'immer';

const saveC360PolicyInfo = (state: any, { payload }: any) => {
  const { c360PolicyInfo } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.c360PolicyInfo = c360PolicyInfo;
  });
  return { ...nextState };
};

export default saveC360PolicyInfo;
