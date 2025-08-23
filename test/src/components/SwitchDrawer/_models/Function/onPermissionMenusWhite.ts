import lodash from 'lodash';
import { PermissionMenusWhite } from '../Enum';

export default (permissionMenusList: any[]) => {
  if (lodash.isArray(permissionMenusList) && !lodash.isEmpty(permissionMenusList)) {
    if (
      !lodash.includes(permissionMenusList, PermissionMenusWhite.InformationManagement) &&
      !lodash.includes(permissionMenusList, PermissionMenusWhite.EnvoyManagement) &&
      !lodash.includes(permissionMenusList, PermissionMenusWhite.InsuredManagement)
    ) {
      return false;
    }
  }
  return true;
};
