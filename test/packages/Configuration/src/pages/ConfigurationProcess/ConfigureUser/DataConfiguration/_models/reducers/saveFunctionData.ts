import lodash from 'lodash';
import moment from 'moment';
import { Operation } from 'configuration/pages/NavigatorConfiguration/Enum';
import { formUtils } from 'basic/components/Form';
import { saveVersionList } from 'configuration/common/reducers';
import saveFormData from './saveFormData';
import saveListPage from './saveListPage';
import saveChangeData from './saveChangeData';
import saveHeaderData from './saveHeaderData';
import showFormData from './showFormData';
import hideFormData from './hideFormData';
import saveOriginRows from './saveOriginRows';
import saveAllOrganization from './saveAllOrganization';
import saveAllGroupInfo from './saveAllGroupInfo';
import saveCacheAllRolePermissions from './saveCacheAllRolePermissions';
import saveCacheAllGroupUsers from './saveCacheAllGroupUsers';
import { companyCodeHandler } from 'configuration/utils';


export default (state: any, action: any) => {
  const {
    functionData,
    formData,
    listPage,
    changeData,
    headerData,
    originRows,
    versionList,
    allGroupInfo,
    allOrganization,
    allRolePermissions,
    allGroupUsers
  } = action.payload;
  let newState = state;
  if (!lodash.isEmpty(allOrganization)) {
    newState = saveAllOrganization(newState, {
      type: 'saveAllOrganization',
      payload: {
        allOrganization,
      },
    });
  }
  if (!lodash.isEmpty(formData)) {
    newState = saveFormData(newState, {
      type: 'saveFormData',
      payload: {
        formData: companyCodeHandler.toFE([formData])?.[0],
      },
    });
  }
  if (!lodash.isEmpty(listPage)) {
    newState = saveListPage(newState, {
      type: 'saveListPage',
      payload: {
        listPage: {
          ...listPage,
          rows: companyCodeHandler.toFE(listPage.rows),
        },
      },
    });
  }
  if (!lodash.isEmpty(changeData)) {
    newState = saveChangeData(newState, {
      type: 'saveChangeData',
      payload: {
        changeData,
      },
    });
  }

  if (!lodash.isEmpty(originRows)) {
    newState = saveOriginRows(newState, {
      type: 'saveOriginRows',
      payload: {
        originRows,
      },
    });
  }

  if (!lodash.isEmpty(versionList)) {
    newState = saveVersionList(newState, {
      type: 'saveVersionList',
      payload: {
        versionList,
        transfer: false,
      },
    });
  }
  if (!lodash.isEmpty(allGroupInfo)) {
    newState = saveAllGroupInfo(newState, {
      type: 'saveAllGroupInfo',
      payload: {
        allGroupInfo,
      },
    });
  }

  if (!lodash.isEmpty(allRolePermissions)) {
    newState = saveCacheAllRolePermissions(newState, {
      type: 'saveCacheAllRolePermissions',
      payload: {
        allRolePermissions,
      },
    });
  }
  if (!lodash.isEmpty(allGroupUsers)) {
    newState = saveCacheAllGroupUsers(newState, {
      type: 'saveCacheAllGroupUsers',
      payload: {
        allGroupUsers,
      },
    });
  }

  if (!lodash.isEmpty(headerData)) {
    newState = saveHeaderData(newState, {
      type: 'saveHeaderData',
      payload: {
        changedFields: {
          effectiveDate: formUtils.queryValue(headerData?.effectiveDate) || moment().format(),
          expiryDate: formUtils.queryValue(headerData?.expiryDate) || moment('2999-12-31').format(),
        },
      },
    });
  }

  const pageTemplateType = lodash.get(functionData, 'task.pageTemplateType');
  const isUpdate = pageTemplateType === Operation.Update;
  const isUpdateMultiple = pageTemplateType === Operation.UPDATE_Multiple;
  if (lodash.has(action?.payload, 'showFormData')) {
    const reducerTemp =
      action?.payload?.showFormData || isUpdateMultiple || isUpdate ? showFormData : hideFormData;
    newState = reducerTemp(newState, {
      type:
        action?.payload?.showFormData || isUpdateMultiple || isUpdate
          ? 'showFormData'
          : 'hideFormData',
    });
  }
  return {
    ...newState,
    functionData: functionData || {},
    isAdd: pageTemplateType === Operation.Add,
    isUpdate,
    isUpdateMultiple,
  };
};
