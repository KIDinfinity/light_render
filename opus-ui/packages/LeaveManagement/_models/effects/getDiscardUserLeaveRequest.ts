import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { LS, LSKey } from '@/utils/cache';
import { discardUserLeaveRequestDetail } from '@/services/userCenterUserLeaveRequestControllerService';
import { RequestStatus } from '../../Enum';

export default function* (_: any, { call, put }: any) {
  const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};

  const response = yield call(
    discardUserLeaveRequestDetail,
    objectToFormData({ userId, leaveRequestStatus: RequestStatus.Cancelled })
  );

  if (lodash.isPlainObject(response) && response.success) {
    yield put({
      type: 'saveLeaveRequestInfo',
      payload: {
        datas: {
          cancelled: [],
        },
      },
    });
    yield put({
      type: 'getLeaveRequestInfo',
      payload: {
        params: {
          statuses: [RequestStatus.Rejected, RequestStatus.Cancelled],
        },
      },
    });
  }
}
