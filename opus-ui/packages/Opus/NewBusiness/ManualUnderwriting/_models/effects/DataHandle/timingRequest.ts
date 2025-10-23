import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';
import { handleWarnMessageModal, handleMessageModal } from '@/utils/commonMessage';

import getTouch from './getTouch';

interface IProps {
  outTime?: number;
  url: Function;
  params: any;
  timeOutCallBack: Function;
  touchParams: any;
  option: any;
  setTimer: Function;
}

const response: any = {
  success: true,
  type: null,
  warnData: null,
  resultData: {
    businessData: {},
    progressData: [
      {
        title: 'Dedup Checking',
        statue: 'done',
      },
      {
        title: 'Create Update Customer',
        statue: 'done',
        error: 'error message',
      },
      {
        title: 'Quotation',
        statue: 'done',
      },
      {
        title: 'UpdatePolicy',
        statue: 'done',
      },
      {
        title: 'UpdateDatabase',
        statue: 'done',
      },
    ],
  },
  promptMessages: [null],
};

export default ({
  outTime,
  url,
  params,
  timeOutCallBack,
  setTimer,
  touchParams,
  option,
}: IProps) => {
  const overTime = outTime || 120000;

  return new Promise((resolve) => {
    let initTime = 0;
    let timer: any = null;

    const getData = async () => {
      const response = await url({ ...params, timer }, option, true);

      if (!response.success) {
        clearInterval(timer);

        if (response.warnData?.['x-error-nonce']) {
          handleMessageModal(response?.promptMessages);
        }

        if (!!response?.warnData && response?.warnData?.['x-warn-nonce']) {
          handleWarnMessageModal(response.promptMessages, {
            okFn: async () => {
              const res = await getTouch(
                { params: { ...touchParams } },
                { headers: { ...response?.warnData } }
              );
              resolve(res);
            },
            cancelFn: () => {
              resolve(false);
            },
          });
        } else {
          if (lodash.isPlainObject(response?.resultData)) {
            resolve(response);
          } else {
            resolve(false);
          }
        }
      }

      if (
        lodash.isPlainObject(response) &&
        response?.success &&
        lodash.isPlainObject(response.resultData) &&
        !lodash.isEmpty(response.resultData)
      ) {
        if (
          lodash.isPlainObject(response.resultData?.businessData) &&
          !lodash.isEmpty(response.resultData?.businessData)
        ) {
          clearInterval(timer);
        }

        resolve(response);
      }
    };

    const getTime = () => {
      getData();
      timer = setInterval(() => {
        initTime += 1000;
        // 超过请求告诉后台
        if (initTime === overTime) {
          initTime = 0;
          clearInterval(timer);
          if (lodash.isFunction(timeOutCallBack)) {
            timeOutCallBack();
          }
        }
        // 改为每秒请求一次
        if (initTime > 0 && initTime % 2000 === 0) {
          getData();
        }
      }, 1000);
      LS.setItem(LSKey.REASSESSMENTTIMER, timer);
    };

    getTime();
  });
};
