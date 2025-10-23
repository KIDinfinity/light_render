import lodash from 'lodash';

interface IAction {
  roleInfoKey: string;
  roleInfo: any[];
}

export default function (state: any, { payload }: IAction) {
  const { roleInfoKey, roleInfo } = payload;
  lodash.set(state, `destRoleInfo[${roleInfoKey}]`, roleInfo);
  return state;
}
