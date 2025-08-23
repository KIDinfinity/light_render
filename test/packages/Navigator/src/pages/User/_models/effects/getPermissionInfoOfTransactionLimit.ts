import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';
import rbac2PermissionLimitControllerService from '@/services/rbac2PermissionLimitControllerService';

export default function* (_: any, { call, put, select }: any) {
  const roleData = yield select((state) => state.userManagement.roleData);

  const [response, dictResponse] = yield [
    call(rbac2PermissionLimitControllerService.findLimitsByRoles, roleData),
    call(
      miscDictionaryControllerService.findDictionaryByTypeCode,
      objectToFormData({
        typeCode: 'transactionLimit',
      })
    ),
  ];

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isArray(response.resultData) &&
    lodash.isPlainObject(dictResponse) &&
    dictResponse.success &&
    lodash.isArray(dictResponse.resultData)
  ) {
    yield put({
      type: 'savePermissionInfoTransactionLimit',
      payload: {
        permissionTransactionLimit: response.resultData,
        dictList: dictResponse.resultData,
      },
    });
  }
}
