import { getCredentials } from '@/services/ccGitControllerService';

export default function* (_: any, { call, put }: any) {
  const response: any = yield call(getCredentials);

  if (response && response.success) {
    yield put({ type: 'saveCredentials', payload: response?.resultData });
  }

  return response.resultData;
}
