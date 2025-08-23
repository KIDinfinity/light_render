import { formUtils } from 'basic/components/Form';
import lodash, { omit } from 'lodash';
import OperationType from 'configuration/pages/ConfigurationCenter/Enum/OperationType';
import { changeUpdateChangeContent } from '../../Utils';
import { companyCodeHandler } from 'configuration/utils';

export default function* (action: any, { select }: any) {
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

  const [newFormData] = companyCodeHandler.toBE([formDataTemp]);

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
  
  const listPageForBE = {
    ...listPage,
    rows: companyCodeHandler.toBE(listPage?.rows || [])
  }
  const changeData =
    updateChangeData ||
    changeUpdateChangeContent({
      data: listPageForBE?.rows,
      key: 'account_status',
      newValue: formDataTemp?.data?.account_status,
    });

  return {
    functionData,
    listPage: listPageForBE,
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
    formData: omit(newFormData, [
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
