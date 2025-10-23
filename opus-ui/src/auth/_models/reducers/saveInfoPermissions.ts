import { produce } from 'immer';

const saveInfoPermissions = (state: any, action: any) => {
  const { authInfoEditable, authInfoVisible } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.authInfoEditable = authInfoEditable;
    draftState.authInfoVisible = authInfoVisible;
  });
  return { ...nextState };
};

export default saveInfoPermissions;
