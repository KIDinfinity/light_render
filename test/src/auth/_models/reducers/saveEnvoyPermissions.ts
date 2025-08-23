import { produce } from 'immer';

const saveEnvoyPermissions = (state: any, action: any) => {
  const { authEnvoyVisible, authEnvoyEditable, authEnvoySendable } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.authEnvoyVisible = authEnvoyVisible;
    draftState.authEnvoyEditable = authEnvoyEditable;
    draftState.authEnvoySendable = authEnvoySendable; // authEnvoySendable;
  });
  return { ...nextState };
};

export default saveEnvoyPermissions;
