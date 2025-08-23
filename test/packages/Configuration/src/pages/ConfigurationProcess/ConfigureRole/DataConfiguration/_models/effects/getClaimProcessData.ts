import { formUtils } from 'basic/components/Form';
import lodash, { omit } from 'lodash';
import OperationType from 'configuration/pages/ConfigurationCenter/Enum/OperationType';

export default function* (_: any, { select }: any) {
  const {
    functionData,
    listPage,
    formData,
    showFormData,
    isUpdate,
    isAdd,
    userId,
    isUpdateMultiple,
    headerData,
    confirm,
    originRows,
    mode,
    versionList,
    allPermissionInfo,
    allRoleLists,
    userGroupList,
  } = yield select((state: any) => ({
    ...state.configureRoleController,
    userId: state.user.currentUser?.userId,
  }));
  const formDataTemp = formUtils.cleanValidateData(formData);

  const newFormData = formDataTemp;

  const updateChangeData = isUpdate
    ? [
        {
          ...newFormData,
          data: {
            ...newFormData?.data,
            '#operation': OperationType.update,
          },
        },
      ]
    : false;
  const changeData = updateChangeData || listPage?.rows;

  return {
    functionData,
    listPage,
    changeData: lodash.map(changeData, (item: any) =>
      omit(item, ['isDuplicate', 'duplicateData', 'isWarning', 'validateResultType'])
    ),
    showFormData,
    isAdd,
    isUpdateMultiple,
    confirm,
    originRows,
    mode,
    versionList,
    operator: userId,
    headerData: formUtils.cleanValidateData(headerData),
    pageTemplateType: functionData?.task?.pageTemplateType,
    formData: omit(formDataTemp, [
      'isDuplicate',
      'duplicateData',
      'isWarning',
      'validateResultType',
    ]),
    allPermissionInfo,
    allRoleLists,
    userGroupList,
  };
}
