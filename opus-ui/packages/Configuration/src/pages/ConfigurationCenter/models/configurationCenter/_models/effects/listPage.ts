import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  handlerSearchParams,
} from 'configuration/pages/ConfigurationCenter/Utils/Search';
import {
  FuncHistoryCode,
} from 'configuration/pages/ConfigurationCenter/Utils/Constant';
import { listLatestHistoryByPage } from '@/services/ccDataImageControllerService';
import { listPage } from '@/services/ccBusinessDataControllerService';
import { showErrors } from 'configuration/pages/ConfigurationCenter/Utils/Common';

export default [
  function* ({ payload = {} }: PayProps, { put, call, select }: SagaProps) {
    const { params, functionCode, sortOrders } = payload;
    const { functionData } = yield select((state: any) => state.configurationCenter);
    const newParams = handlerSearchParams(payload, functionData);

    yield put({
      type: 'resetExpandedRows',
      payload: {
        searchDefault: {
          params,
          pagination: newParams.page,
          sortOrders,
        },
      },
    });

    const response = yield call(
      functionCode === FuncHistoryCode ? listLatestHistoryByPage : listPage,
      newParams
    );

    if (response && response.success) {
      yield put({
        type: 'saveResultData',
        payload: {
          resultData: response.resultData,
          searchParams: functionCode === FuncHistoryCode ? payload : newParams,
        },
      });
    } else {
      showErrors(response && response.promptMessages);
    }
  },
  { type: 'takeLatest' },
];
