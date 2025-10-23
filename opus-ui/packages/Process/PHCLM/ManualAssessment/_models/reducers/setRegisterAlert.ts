import { produce } from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    draftState.claimProcessData.showRegisterAlert = payload?.showRegisterAlert;
  });
