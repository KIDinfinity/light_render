import lodash from 'lodash';
import { notification } from 'antd';
import {
  touch,
  getTouchResult,
  revertTouchResult,
} from '@/services/navigatorCaseTouchOperationControllerService';
import TimingRequest from './timingRequest';

export default async ({ params, setTimer }: any) => {
  const touchResponse = await touch({ ...params });

  return new Promise((resolve: any) => {
    if (
      lodash.isPlainObject(touchResponse) &&
      touchResponse?.success &&
      lodash.isPlainObject(touchResponse.resultData)
    ) {
      if (!touchResponse.resultData?.async) {
        resolve(touchResponse.resultData);
      } else {
        const touchId = touchResponse.resultData?.touchId || '';
        TimingRequest({
          url: getTouchResult,
          params: { touchId },
          timeOutCallBack: () => {
            notification.error({
              message: 'Re-Assessment fail!',
            });
            // 告诉接口失败
            revertTouchResult({
              touchId,
            });
            resolve([]);
          },
          setTimer,
        }).then((touchResult: any) => {
          resolve(touchResult);
        });
      }
    }
  });
};
