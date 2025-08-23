import { list } from '@/services/ccPatchControllerService';

export default function* (_: any, { call, put }: any) {
  const response: any = yield call(list);

  if (response && response.success) {
    yield put({ type: 'savePatchList', payload: { patchList: response?.resultData } });
  }
}
