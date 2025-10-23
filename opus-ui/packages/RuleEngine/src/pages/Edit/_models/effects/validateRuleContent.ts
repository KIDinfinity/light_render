import { validateBasicRule } from '@/services/ruleEngineRuleSetControllerService';
import lodash from 'lodash';

export default function* ({ payload }, { call, put }: any) {
  const { ruleContent } = payload;

  if (lodash.size(ruleContent) === 0) {
    yield put({ type: 'saveState', payload: { advanceModeError: 'Required' } });
    return false;
  }

  const response = yield call(validateBasicRule, ruleContent);

  if (lodash.isPlainObject(response) && response.success) {
    return true;
  }

  yield put({
    type: 'saveState',
    payload: { advanceModeError: response.promptMessages?.[0]?.content },
  });

  return false;
}
