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

export default (state: any, action: any) => {
  const {
    functionData,
    formData,
    listPage,
    changeData,
    headerData,
    originRows,
    versionList,
  } = action.payload;
  let newState = state;
  if (!lodash.isEmpty(formData)) {
    newState = saveFormData(newState, {
      type: 'saveFormData',
      payload: {
        formData,
      },
    });
  }
  if (!lodash.isEmpty(listPage)) {
    newState = saveListPage(newState, {
      type: 'saveListPage',
      payload: {
        listPage,
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
