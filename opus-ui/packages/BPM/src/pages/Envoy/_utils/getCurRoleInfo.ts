import lodash from 'lodash';

interface IArg {
  businessNo: string;
  curDestRole: string;
  roleInfoKey: string;
  destRoleInfo: any;
}

export default function getCurRoleInfo({
  businessNo,
  curDestRole,
  roleInfoKey,
  destRoleInfo,
}: IArg): any[] {
  if (!businessNo || !curDestRole) {
    return [];
  }
  return lodash.get(destRoleInfo, roleInfoKey);
}
