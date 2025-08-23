import { produce } from 'immer';

interface IAction {
  roleInfoKey: string;
  roleInfo: any[];
}

export default function (state: any, { payload }: { payload: IAction }) {
  return produce(state, (draftState: any) => {
    const { roleInfoKey, roleInfo } = payload;

    draftState.destRoleInfo = {
      ...draftState.destRoleInfo,
      [roleInfoKey]: roleInfo,
    };
  });
}
