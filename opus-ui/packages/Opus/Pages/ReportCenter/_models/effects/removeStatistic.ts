import { deleteStatistic } from '@/services/owbReportCenterMetadataConfigControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* ({ payload }: any, { call, put }: any) {
  const { id } = payload;
  yield put({
    type: 'saveStatisticCode',
    payload: {
      statisticCode: '',
    },
  });
  const response = yield call(deleteStatistic, objectToFormData({ id }));
  if (response?.success) {
    yield put({
      type: 'findStatisticByReportCode',
    });
  }
}
