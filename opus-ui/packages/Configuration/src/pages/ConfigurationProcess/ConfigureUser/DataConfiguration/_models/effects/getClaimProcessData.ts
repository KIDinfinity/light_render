import { formUtils } from 'basic/components/Form';
import lodash, { omit } from 'lodash';
import OperationType from 'configuration/pages/ConfigurationCenter/Enum/OperationType';
import { changeUpdateChangeContent } from '../../Utils';

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
    allGroupInfo,
    allOrganization,
    allRolePermissions,
    allGroupUsers,
  } = yield select((state: any) => ({
    ...state.configureUserController,
    userId: state.user.currentUser?.userId,
  }));
  const formDataTemp = formUtils.cleanValidateData(formData);

  const newFormData = formDataTemp;

  const updateChangeData = isUpdate
    ? changeUpdateChangeContent({
        data: [
          {
            ...newFormData,
            data: {
              ...newFormData?.data,
              '#operation': OperationType.update,
            },
          },
        ],
        key: 'account_status',
        newValue: formDataTemp?.data?.account_status,
      })
    : false;

  const changeData =
    updateChangeData ||
    changeUpdateChangeContent({
      data: listPage?.rows,
      key: 'account_status',
      newValue: formDataTemp?.data?.account_status,
    });

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
    allGroupInfo,
    allOrganization,
    allRolePermissions,
    allGroupUsers,
  };
}
