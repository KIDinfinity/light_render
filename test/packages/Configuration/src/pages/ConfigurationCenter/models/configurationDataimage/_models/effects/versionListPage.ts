import lodash from 'lodash';
import { listPage as versionListPage } from '@/services/ccDataImageControllerService';
import type { SagaProps, PayProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';


export default function* ({ payload }: PayProps, { call, put, select }: SagaProps) {
  const { currentPage, pageSize, record } = payload;
  yield put({
    type: 'save',
    payload: {
      currentRecord: record,
    },
  });
  const { batch_no: batchNo } = record;
  const { versionPagination, dataVersion } = yield select(
    (state: any) => state.configurationDataImage
  );

  const response = yield call(versionListPage, {
    ...versionPagination,
    params: {
      batchNo,
    },
    currentPage: currentPage || versionPagination.currentPage,
    pageSize: pageSize || versionPagination.pageSize,
  });
  if (response && response.success) {
    const newDataVersion = lodash.cloneDeep(dataVersion);
    const target = newDataVersion.find((el: any) => lodash.isEqual(el.record, record));
    const { rows, ...pagination } = response.resultData;
    if (!target) {
      newDataVersion.push({
        record,
        version: rows,
        pagination,
      });
    } else {
      lodash.set(target, 'version', rows);
      lodash.set(target, 'pagination', pagination);
    }
    yield put({
      type: 'save',
      payload: {
        dataVersion: newDataVersion,
      },
    });
  }
  return response;
}
