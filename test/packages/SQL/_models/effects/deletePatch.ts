import { remove } from '@/services/ccPatchControllerService';

export default function* ({ payload }: any, { call }: any): any {
  const { values } = payload;
  const response = yield call(remove, values);

  return response && response.success;
}
