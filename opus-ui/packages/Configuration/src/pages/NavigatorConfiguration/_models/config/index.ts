import { FunctionCode } from '../../Enum';

export default (functionCode: string) => {
  const config = {
    // 注意:这里hardcord
    [FunctionCode.Fun_venus_rbac_rbac_role]: {
      setPreview: 'configureRoleController/getPreview',
      resetPreview: 'configureRoleController/resetPreview',
    },
    [FunctionCode.Fun_venus_uc_user_general_information]: {
      setPreview: 'configureUserController/getPreview',
      resetPreview: 'configureUserController/resetPreview',
    },
    [FunctionCode.Fun_venus_rbac_rbac_group]: {
      setPreview: 'configureUserGroupController/getPreview',
      resetPreview: 'configureUserGroupController/resetPreview',
    },
  };
  return config[functionCode];
};
