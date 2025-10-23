import { listReportsV2 } from '@/services/owbReportCenterMetadataConfigControllerService';
import lodash from 'lodash';

export default function* (_: any, { call, put }: any) {
  const response = yield call(listReportsV2);

  if (response?.success) {
    yield put({
      type: 'saveReportList',
      payload: lodash.reduce(
        response?.resultData,
        (result, item: any) => {
          const temp = result;
          temp[item.reportCode] = item;
          return result;
        },
        {}
      ),
    });
    _.callback && _.callback();
  }
}
