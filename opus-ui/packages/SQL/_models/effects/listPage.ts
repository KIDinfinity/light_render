import { list } from '@/services/ccFileExecutorControllerService';
import handleMessageModal from '@/utils/commonMessage';

// eslint-disable-next-line func-names
export default function* ({ payload }: any, { call }: any): any {
  const { current, pageSize, params = {} } = payload;
  const response: any = yield call(list, {
    currentPage: current,
    offset: 0,
    pageSize,
    params,
    rows: [],

  });
  if (!response || !response?.success) {
    handleMessageModal(response?.promptMessages);
    return {}
  }
  return {
    total: response?.resultData?.length,
    list: response?.resultData.rows
  }
}
