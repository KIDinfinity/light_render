import { produce } from 'immer';

export default (state: any, action: any) => {
  const { selectRole } = action?.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.selectRole = selectRole;
    const index = draftState.clientRole.OtherRoleList.findIndex((item) => item.role === selectRole);
    draftState.clientRole.OtherRoleList = [
      ...draftState.clientRole.OtherRoleList.slice(index),
      ...draftState.clientRole.OtherRoleList.slice(0, index),
    ];
  });
  return {
    ...nextState,
  };
};
