import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';

import { tenant, Region } from '@/components/Tenant';

interface IProps {
  outTime?: number;
  url: Function;
  params: any;
  timeOutCallBack: Function;
  setTimer: Function;
}

export default ({ outTime, url, params, timeOutCallBack }: IProps) => {
  const overTime = outTime || 120000;

  return new Promise((resolve) => {
    let initTime = 0;
    let timer: any = null;

    const reRereques = tenant.region({
      [Region.TH]: () => () => {
        // 3秒请求一次
        if (initTime % 3000 === 0 && initTime < 9000) {
          getData();
        }
        // 9秒后请求每隔一秒请求一次
        if (initTime >= 9000) {
          getData();
        }
      },
      notMatch: () => () => {
        // 5秒请求一次
        if (initTime % 5000 === 0) {
          getData();
        }
      },
    });

    const getData = async () => {
      const response = await url({ ...params });
      if (
        lodash.isPlainObject(response) &&
        response?.success &&
        lodash.isPlainObject(response.resultData) &&
        lodash.isPlainObject(response.resultData?.businessData) &&
        !lodash.isEmpty(response.resultData?.businessData)
      ) {
        clearInterval(timer);
        resolve(response.resultData);
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

        reRereques();
      }, 1000);
      LS.setItem(LSKey.REASSESSMENTTIMER, timer);
    };

    getTime();
  });
};
