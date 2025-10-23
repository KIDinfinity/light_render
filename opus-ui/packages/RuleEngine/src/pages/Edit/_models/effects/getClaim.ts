import lodash from 'lodash';
import { queryData } from '@/services/dcSnapshotService';
import { safeParseUtil } from '@/utils/utils';
import { initSubmitData } from '../functions';
import { EOptionType } from 'basic/enum/EOptionType';

export default function* (action: any, { call, put, select }: any) {
  const { taskId, businessNo } = yield select((state: any) => state.processTask.getTask);
  const snapShot = yield call(queryData, {
    dataType: 'mainPage',
    taskId,
  });

  const snapShotData = safeParseUtil(lodash.get(snapShot, 'resultData.dataValue', '{}'));
  const optionType = lodash.get(snapShot, 'resultData.optionType');
  let autoSaveCheck = true;
  try {
    autoSaveCheck =
      EOptionType.AutoSave === optionType
        ? Object.values(snapShotData).some((item) => !lodash.isEmpty(item))
        : true;
  } catch (error) {}

  if (!lodash.isEmpty(snapShotData) && autoSaveCheck) {
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        submitRuleSet: snapShotData,
      },
    });
    yield put({
      type: 'queryInternationalisedLibrary',
    });
    yield put({
      type: 'getAtomConfig',
    });
  } else if (!businessNo || businessNo?.indexOf('-') < 0) {
    // 创建
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        submitRuleSet: initSubmitData,
      },
    });
  } else {
    yield put({
      type: 'asyncQueryRuleSetByVersionId',
      payload: {
        asyncVersionId: businessNo,
      },
    });
  }

  yield put({
    type: 'saveSearchModel',
  });
}
