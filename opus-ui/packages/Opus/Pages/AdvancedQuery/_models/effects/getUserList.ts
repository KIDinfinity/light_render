import lodash from 'lodash';

import { findAssigneeDropdownList } from '@/services/userCenterUserGeneralInfoControllerService';

export default function* (_: any, { call, put }: any): Generator<any, any, any> {
  const response = yield call(findAssigneeDropdownList);

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    lodash.isArray(response?.resultData)
  ) {
    yield put({
      type: 'saveFilterDatas',
      payload: {
        assignee: lodash.map(
          response?.resultData,
          ({ userId: dictCode, userName: dictName }: any) => ({
            dictCode,
            dictName,
          })
        ),
      },
    });
  }
}
