import {
  getTouchResult,
  touch,
  revertTouchResult,
} from '@/services/navigatorCaseTouchOperationControllerService';
import handleMessageModal, { handleWarnMessageModal } from '@/utils/commonMessage';
import delay from '@/utils/delay';
import { notification } from 'antd';
import lodash from 'lodash';

interface ITouchPayload {
  params: any;
  option: any;
  overTime?: number;
  interval?: number;
}

interface ITouchAction {
  payload: ITouchPayload;
}

async function touchResult({
  touchId,
  payload,
  resolve,
}: {
  touchId: string;
  payload: ITouchPayload;
  resolve: (value: any) => void;
}) {
  const { params, overTime = 120, interval = 2 } = payload;
  let timer = 0;
  for (;;) {
    if (timer >= overTime) {
      notification.error({ message: 'Action timeout!' });
      revertTouchResult({ touchId });
      resolve({ success: false });
      return;
    }
    timer += interval;
    const response = await getTouchResult({ touchId }, {}, true);
    if (!response?.success) {
      const { warnData } = response;
      if (response.warnData?.['x-error-nonce']) {
        handleMessageModal(response?.promptMessages);
        resolve({ success: false });
        return;
      }

      // 遇到warning messasge 如果点ok，重新call touch
      if (!!warnData && warnData?.['x-warn-nonce']) {
        handleWarnMessageModal(response.promptMessages, {
          okFn: async () => {
            const res = await touchFn({
              params,
              option: { headers: { ...(warnData ?? {}) } },
            });
            resolve(res);
          },
          cancelFn: () => {},
        });
        return;
      }

      resolve(response);
      return;
    }

    if (
      lodash.isPlainObject(response) &&
      response?.success &&
      lodash.isPlainObject(response.resultData) &&
      !lodash.isEmpty(response.resultData)
    ) {
      resolve(response);
      return;
    }
    await delay(interval * 1000);
  }
}

async function touchFn(payload: ITouchPayload) {
  const { params, option } = payload;
  const touchResponse = await touch(params, option);
  return await new Promise((resolve) => {
    if (
      lodash.isPlainObject(touchResponse) &&
      touchResponse?.success &&
      lodash.isPlainObject(touchResponse.resultData)
    ) {
      if (!touchResponse.resultData?.async) {
        resolve(touchResponse);
      } else {
        const touchId = touchResponse.resultData?.touchId || '';
        touchResult({ touchId, payload, resolve }).then(resolve);
      }
    } else {
      notification.error({
        message: touchResponse?.promptMessages[0]?.content || 'Action failed!',
      });
      resolve(touchResponse);
    }
  });
}

export default function* ({ payload }: ITouchAction, { call }: any): Generator {
  const response = yield call(touchFn, payload);
  return response;
}
