import lodash from 'lodash';

export default (state: any, action: any) => {
  const { getUserManagement, userGeneralInfo } = state;
  const {
    payload: { organizationList, skillSet },
  } = action;
  // 个人信息的某些数据要从组织里拿取
  const newUserPersonInfo = {
    faxNumber: organizationList.faxNumber,
    landLinePhone: organizationList.landLinePhone,
  };

  // 技能信息的某些数据要从组织里拿取
  const newSkillSet = {
    ...skillSet,
    workingYear: organizationList.workingYear,
    employmentDate: userGeneralInfo.employmentDate,
    educationLevel: organizationList.educationLevel,
  };
  const newOrganization = organizationList;
  const newOrganizationDOList = organizationList?.organizationDOList;

  // 组织里的公司信息
  // organizationLevel 去掉前缀后的值
  const newOrganizationLevel = lodash.map(newOrganizationDOList, (item) => {
    const newItem = item;
    const organizationLevel = item.organizationLevel.split('ORG')[1] * 1;
    newItem.organizationLevel = organizationLevel;

    return newItem;
  });

  // 通过值后去重排序
  newOrganization.organizationDOList = lodash.groupBy(newOrganizationLevel, 'organizationLevel');

  // 筛选重复的都去掉
  const organizationNameList = lodash?.filter(
    newOrganization?.organizationDOList,
    (item) => item.length === 1
  );
  // 拼接并去掉最后的 '/';
  let name = '';
  organizationNameList.forEach((item) => {
    name += `${item[0].organizationName}/`;
  });
  const organization = lodash.trimEnd(name, '/');

  return {
    ...state,
    getUserManagement: {
      ...getUserManagement,
      userPersonInfo: {
        ...getUserManagement.userPersonInfo,
        ...newUserPersonInfo,
      },
      organizationList: {
        ...organizationList,
        organization,
      },
      skillSet: newSkillSet,
    },
    originUserManagement: {
      ...getUserManagement,
      userPersonInfo: {
        ...getUserManagement.userPersonInfo,
        ...newUserPersonInfo,
      },
      skillSet: newSkillSet,
    },
  };
};
