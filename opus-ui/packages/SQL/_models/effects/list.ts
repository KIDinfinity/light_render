import { list } from '@/services/ccSqlExecutorControllerService';
import handleMessageModal from '@/utils/commonMessage';

// eslint-disable-next-line func-names
export default function* (_: any, { call }: any): any {
  const response: any = yield call(list);
  if (!response || !response?.success) {
    handleMessageModal(response?.promptMessages);
    return {}
  }
  return {
    total: response?.resultData?.length,
    list: response?.resultData?.map((el: string) => ({ fileName: el }))
  }
}
