import { produce } from 'immer';

export default (state: any, { payload: { findAuthActivityByRoleCodesV2 } }: any) =>
  produce(state, (draftState: any) => {
    draftState.findAuthActivityByRoleCodesV2 = findAuthActivityByRoleCodesV2;
  });
