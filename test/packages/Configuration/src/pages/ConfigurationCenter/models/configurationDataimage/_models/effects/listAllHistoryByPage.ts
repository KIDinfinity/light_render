import lodash from 'lodash';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { FuncHistoryCode } from 'configuration/pages/ConfigurationCenter/Utils/Constant';
import {
  handlerSearchParams,
} from 'configuration/pages/ConfigurationCenter/Utils/Search';
import { listPage } from '@/services/ccBusinessDataControllerService';


export default function* ({ payload }: PayProps, { put, call, select }: SagaProps) {
  const { record, ...rest } = payload;
  yield put({
    type: 'save',
    payload: {
      currentRecord: record,
    },
  });

  const { batchNo } = record;
  const { dataHistory, menuTemp, functionData } = yield select((state: any) => ({
    ...state.configurationDataImage,
    ...state.configurationMenu,
    ...state.configurationCenter,
  }));

  const historyMenu =
    lodash.find(menuTemp, (el: any) => el.functionCode === FuncHistoryCode) || {};
  const { id: functionId, functionCode } = historyMenu;

  const newParams = handlerSearchParams(
    {
      functionId,
      functionCode,
      currentPage: 1,
      pageSize: 20,
      params: {
        batch_no: batchNo,
      },
      ...rest,
    },
    functionData,
    true
  );
  // 不超过10条，hard code 分页
  const response = yield call(listPage, newParams);
  if (response && response.success) {
    const newDataHistory = lodash.cloneDeep(dataHistory);
    const target = newDataHistory.find((el: any) => lodash.isEqual(el.record, record));
    const { rows, ...pagination } = response.resultData;
    if (!target) {
      newDataHistory.push({
        record,
        history: rows,
        pagination,
      });
    } else {
      lodash.set(target, 'history', rows);
      lodash.set(target, 'pagination', pagination);
    }
    yield put({
      type: 'save',
      payload: {
        dataHistory: newDataHistory,
      },
    });
  }
  return response;
}
