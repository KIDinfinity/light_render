import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import rbac2GroupControllerService from '@/services/rbac2GroupControllerService';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';
import RBAC from '../enum/RBAC';

export default function* (_: any, { call, put, select }: any) {
  const userId = yield select((state) => state.user.currentUser?.userId);

  if (lodash.isString(userId) && userId) {
    const [response, dictResponse] = yield [
      call(rbac2GroupControllerService.findGroupByUserId, objectToFormData({ userId })),
      call(
        miscDictionaryControllerService.findDictionaryByTypeCode,
        objectToFormData({
          typeCode: RBAC.GROUP,
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
        type: 'saveGetPermissionGroupName',
        payload: {
          list: response.resultData,
          dictList: dictResponse.resultData,
        },
      });
    }
  }
}
