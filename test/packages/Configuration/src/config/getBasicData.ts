import { FunctionCode } from '../constant';

export default (functionCode: string, key: any) => {
  const Config = {
    [FunctionCode.Fun_venus_uc_user_general_information]: `data.${key}`,
    [FunctionCode.Fun_venus_rbac_rbac_group]: `data.${key}`,
    [FunctionCode.Fun_venus_rbac_rbac_role]: `data.${key}`,
    default: key,
  };
  return Config?.[functionCode] || Config.default;
};
