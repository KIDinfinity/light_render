import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import rbac2ResourceControllerService from '@/services/rbac2ResourceControllerService';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';

export default function* (_: any, { call, put, select }: any) {
  const roleData = yield select((state) => state.userManagement.roleData);

  const [response, dictResponse] = yield [
    call(rbac2ResourceControllerService.findByRoles, roleData),
    call(
      miscDictionaryControllerService.findDictionaryByTypeCode,
      objectToFormData({
        typeCode: 'Label_COM_General',
      })
    ),
  ];

  if (
    lodash.isPlainObject(response) &&
    response?.success &&
    lodash.isArray(response.resultData) &&
    lodash.isPlainObject(dictResponse) &&
    dictResponse?.success &&
    lodash.isArray(dictResponse.resultData)
  ) {
    yield put({
      type: 'savePermissionInfoCommonResource',
      payload: {
        permissionCommonResource: response.resultData,
        dictList: dictResponse.resultData,
      },
    });
  }
}
