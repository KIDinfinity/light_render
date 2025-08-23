import lodash from 'lodash';
import { listAutoExpandConfig } from '@/services/bpmSideBarDisplayConfigService';
import { LS, LSKey } from '@/utils/cache';

export default function* (action: any, { call, put }: any) {
  let autoTriggerConfig = LS.getWithExpiry(LSKey.AUTO_TRIGGER_SIDERBAE_CONFIG);

  if (!autoTriggerConfig) {
    const response = yield call(listAutoExpandConfig);
    if (lodash.isPlainObject(response) && response.success) {
      autoTriggerConfig = response.resultData;

      if (!lodash.isEmpty(autoTriggerConfig)) {
        LS.setWithExpiry(
          LSKey.AUTO_TRIGGER_SIDERBAE_CONFIG,
          autoTriggerConfig,
          7 * 24 * 60 * 60 * 1000
        );
      }
    }
  }

  yield put({
    type: 'saveAutoTriggerConfig',
    payload: {
      autoTriggerConfig,
    },
  });

  yield put({
    type: 'saveTriggerDependencies',
    payload: {
      autoTriggerConfig,
    },
  });
}
