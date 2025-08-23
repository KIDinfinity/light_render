import lodash from 'lodash';
import { getSrvReviewCaseInfo } from '@/services/posSrvPreviewControllerService';
import { notification } from 'antd';

export default function* ({ payload }: any, { call, put }: any) {
  const businessNo = lodash.get(payload, 'businessNo');
  const response = yield call(getSrvReviewCaseInfo, businessNo);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    return { success, businessNo: resultData?.reviewedSrvNo };
  } else {
    notification.error({
      message: 'Network Error',
    });
    return { success };
  }
}
