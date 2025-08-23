import React from 'react';
import DataMainTenanceForBusinessPreview from 'configuration/pages/ConfigurationProcess/DataMainTenanceForBusiness/DataConfiguration/Modal/Preview';
import ConfigureUserPreview from 'configuration/pages/ConfigurationProcess/ConfigureUser/DataConfiguration/Modal/Preview';
import ConfigureUserGroupPreview from 'configuration/pages/ConfigurationProcess/ConfigureUserGroup/DataConfiguration/Modal/Preview';
import { FunctionCode } from '../../../Enum';
import ConfigureRolePreview from 'configuration/pages/ConfigurationProcess/ConfigureRole/DataConfiguration/Modal/Preview';

const Config = {
  [FunctionCode.Fun_venus_uc_user_general_information]: (props: any) => (
    <ConfigureUserPreview {...props} />
  ),
  [FunctionCode.Fun_venus_rbac_rbac_group]: (props: any) => (
    <ConfigureUserGroupPreview {...props} />
  ),
  [FunctionCode.Fun_venus_rbac_rbac_role]: (props: any) => (
    <ConfigureRolePreview {...props} />
  ),
  default: (props: any) => <DataMainTenanceForBusinessPreview {...props} />,
};

export default ({ formData, dataFieldList, functionCode, underAuditData }: any) => {
  const component = Config?.[functionCode] || Config.default;
  return component({ formData, dataFieldList, functionCode, underAuditData });
};
