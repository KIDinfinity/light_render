import lodash from 'lodash';
import { list } from '@/services/owbNbDropdownControllerService';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from '../../../activity.config';

export default function* (_: any, { call, put, select }: any) {
  const preList = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.roleDicts);
  if (lodash.size(preList) > 0) {
    return;
  }

  const response = yield call(list, {
    dropDownType: 'dropdownOfDedupCheckConfig',
  });
  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'saveRoleDropdown',
      payload: {
        roleDicts: lodash.map(response.resultData, (item: any) => {
          return {
            ...item,
            dictName: formatMessageApi({
              Dropdown_CLM_CustomerRole: item.dictCode,
            }),
            display: item.dictName,
          };
        }),
      },
    });
  }
}
