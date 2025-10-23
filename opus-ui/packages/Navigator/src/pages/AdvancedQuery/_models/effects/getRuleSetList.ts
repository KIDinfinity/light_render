// @ts-ignore
import { saga } from 'dva';
import lodash from 'lodash';
import { resRevert } from '@/utils/transform';
import { advancedQuery } from '@/services/ruleEngineRuleInquiryControllerService';

const { delay } = saga;

export default [
  function* getRuleSetList(action: any, effects: any) {
    yield delay(0);

    const { call, put } = effects;
    const response = yield call(advancedQuery, action.payload);
    if (response.success) {
      const list = lodash.get(response, 'resultData.rows', []);
      const result = lodash.set(response, 'resultData.rows', list);
      yield put({
        type: 'saveRuleSetList',
        payload: {
          list: resRevert(result),
        },
      });
    }
  },
  { type: 'takeLatest' },
];
