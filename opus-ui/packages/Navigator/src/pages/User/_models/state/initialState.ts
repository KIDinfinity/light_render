export default {
  userId: '',
  userGeneralInfo: {},
  getUserManagement: {
    userPersonInfo: {},
    organizationList: {},
    userCertificateList: [],
    originUserCertificateList: [],
    skillSet: {
      skillTypeList: [],
    },
  },
  originUserManagement: {
    userPersonInfo: {},
    skillSet: {
      skillTypeList: [],
    },
  },
  findAuthActivityByRoleCodesV2: [],
  switchIdx: 0,
  isShow: {
    isShowPermission: false,
  },

  forms: {},
  newCertificateTable: [],
  isHandleAdd: false, // 证书是否点击添加
  isShowAddForm: true, // 证书是否要显示空列表
  isRequired: false, // 证书是否是必填
  permissionTransactionLimit: [],
  permissionCommonResource: [],
  permissionDataMasking: [],
  groupName: '',
};
