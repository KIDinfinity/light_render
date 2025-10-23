import { produce } from 'immer';

const saveMenuPermissions = (state: any, action: any) => {
  const { permissionMenus } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.permissionMenus = permissionMenus;
  });
  return { ...nextState };
};

export default saveMenuPermissions;
