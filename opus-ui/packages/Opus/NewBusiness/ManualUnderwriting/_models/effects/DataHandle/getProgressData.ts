import lodash from 'lodash';

import { getProgressResult } from '@/services/owbNbNbInquiryControllerService';

//  TODO:hasBusinessData判断这个代码之后要去掉
export default function* ({ payload }: any, { put, select }: any): Generator<any, any, any> {
  const { touchId, option, hasBusinessData, warnData } = payload || {};

  const loadingStatus = yield select(({ login }: any) => login.loadingStatus) || false;

  if (lodash.isPlainObject(warnData) && !lodash.isEmpty(warnData)) {
    yield put({
      type: 'saveProgressData',
      payload: {
        progressData: [],
      },
    });
  } else {
    const response = yield getProgressResult({ touchId }, option);

    if (
      lodash.isPlainObject(response) &&
      response?.success &&
      lodash.isArray(response?.resultData?.progressData) &&
      !lodash.isEmpty(response?.resultData?.progressData)
    ) {
      const list = response?.resultData?.progressData || [];

      yield put({
        type: 'saveProgressData',
        payload: {
          progressData: list,
        },
      });

      if (!!loadingStatus) {
        yield put({
          type: 'login/saveLoadingStatus',
          payload: {
            loadingStatus: false,
          },
        });
      }

      return response?.resultData?.progressData || [];
    }
  }
}
