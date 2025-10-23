import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';
import { getUserClassifiedLeaveRequestInfo } from '@/services/userCenterUserLeaveRequestControllerService';

export default function* (action: any, { call, put }: any) {
  const { params } = action.payload;
  const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};
  const response = yield call(getUserClassifiedLeaveRequestInfo, {
    ...params,
    userId,
  });

  if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
    const list = response.resultData ?? [];

    const newData = (params?.statuses ?? []).reduce((acc: {}, curr: any) => {
      acc[curr] = list.find((item: any) => item.status === curr)?.detailVOS ?? [];
      return acc;
    }, {});

    yield put({
      type: 'saveLeaveRequestInfo',
      payload: {
        datas: newData,
      },
    });
  }
}
