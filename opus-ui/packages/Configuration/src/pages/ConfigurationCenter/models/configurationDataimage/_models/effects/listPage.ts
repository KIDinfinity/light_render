import {
  handlerSearchParams,
} from 'configuration/pages/ConfigurationCenter/Utils/Search';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { listPage } from '@/services/ccBusinessDataControllerService';

export default function* ({ payload }: PayProps, { put, call, select }: SagaProps) {
  const { dataImageFunction: functionData } = yield select(
    (state: any) => state.configurationDataImage
  );
  const { params, sortOrders } = payload;
  const newParams = handlerSearchParams(payload, functionData);

  yield put({
    type: 'save',
    payload: {
      searchDefault: {
        params,
        pagination: newParams.page,
        sortOrders,
      },
    },
  });

  const response = yield call(listPage, newParams);
  if (response && response.success) {
    yield put({
      type: 'save',
      payload: {
        resultData: response.resultData,
        searchParams: newParams,
      },
    });
  }
  return response;
}
