import lodash from 'lodash';
import { notification } from 'antd';
import {
  touch,
  getTouchResult,
  revertTouchResult,
} from '@/services/navigatorCaseTouchOperationControllerService';
import TimingRequest from './timingRequest';

export default async ({ params, setTimer }: any, option: any) => {
  const touchResponse = await touch({ ...params }, option);

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
          touchParams: params,
          option,
          params: { touchId },
          timeOutCallBack: () => {
            notification.error({
              message: 'Submit fail!',
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
    } else {
      notification.error({
        message: touchResponse?.promptMessages[0]?.content || 'Submit fail!',
      });
      resolve(touchResponse);
      return false;
    }
  });
};
