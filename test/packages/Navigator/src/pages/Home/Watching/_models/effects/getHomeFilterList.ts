import lodash from 'lodash';
import {
  prioritiesDropDown,
  completesDropDown,
  favoritesDropDown,
  unassignDropDown,
} from '@/services/dcHomePageCaseDataCallService';

export default function* getStatusFilterList({ payload }: any, { put, call, select }: any) {
  const { filter } = payload;

  const userId = yield select((state: any) => state.user.currentUser.userId);
  const configuration = yield select((state: any) => state.configController?.configuration) || {};

  let url = null;

  switch (filter) {
    case 'todo':
    case 'pending':
      url = prioritiesDropDown;
      break;
    case 'completed':
      url = completesDropDown;
      break;
    case 'favorite':
      url = favoritesDropDown;
      break;
    case 'unassigned':
      url = unassignDropDown;
      break;
    default:
      break;
  }

  if (url && lodash.isArray(configuration?.[filter]?.resultField)) {
    const response = yield call(url, {
      taskStatus: filter === 'unassigned'? 'todo' : filter,
      userId,
      resultFieldBOList: configuration?.[filter]?.resultField,
    });

    if (
      lodash.isPlainObject(response) &&
      response?.success &&
      lodash.isArray(response.resultData)
    ) {
      yield put({
        type: 'saveFilterList',
        payload: {
          list: response.resultData,
        },
      });
      yield put({
        type: 'saveFilterState',
        payload: {
          filterState: filter,
        },
      });
    }
  }
}
