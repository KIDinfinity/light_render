import { setCredentials } from '@/services/ccGitControllerService';
import { formUtils } from 'basic/components/Form';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* ({ payload }: any, { call, put }: any) {
  const { username, password } = formUtils.cleanValidateData(payload);

  const response: any = yield call(setCredentials, objectToFormData({ username, password }));

  if (response && response.success) {
    yield put({ type: 'saveCredentials', payload: { username, password } });
  }
}
