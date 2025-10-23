import { itemsql } from '@/services/ccPatchControllerService';

export default function* ({ payload }: any, { call }: any): any {
  const response: any = yield call(itemsql, payload);

  return response && response.success && response.resultData;
}
