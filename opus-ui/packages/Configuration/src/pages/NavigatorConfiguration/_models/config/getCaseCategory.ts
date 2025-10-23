import CaseCategory from 'claim/pages/CaseCategory';
import { FunctionCode } from '../../Enum';

export default (functionCode: string) => {
  const Config = {
    [FunctionCode.Fun_venus_uc_user_general_information]: CaseCategory.UserConfiguration,
    [FunctionCode.Fun_venus_rbac_rbac_group]: CaseCategory.UserGroupConfiguration,
    [FunctionCode.Fun_venus_rbac_rbac_role]: CaseCategory.RoleConfiguration,
    default: CaseCategory.MaintenanceConfiguration,
  };
  return Config?.[functionCode] || Config.default;
};
