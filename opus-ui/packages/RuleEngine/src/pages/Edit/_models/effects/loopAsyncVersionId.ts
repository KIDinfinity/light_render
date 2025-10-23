import { getAsyncQueryRuleSetByVersionIdResult } from '@/services/ruleEngineRuleSetControllerService';
import { AsyncStatus } from '../../Enum';
import { notification } from 'antd';

export default function* loopAsyncVersionId({ payload }: any, { call, put }: any) {
  const { asyncVersionId } = payload;
  const response = yield call(getAsyncQueryRuleSetByVersionIdResult, asyncVersionId);
  if (response?.resultData?.status === AsyncStatus.Finish) {
    const ruleSetVO = response.resultData.ruleSetVO || {};
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        submitRuleSet: {
          ruleSetInfo: ruleSetVO.ruleSetInfo || {},
          groups: ruleSetVO.groups || [],
          flowNodeVOs: ruleSetVO.flowNodeVOs || [],
          branchVOs: ruleSetVO.branchVOs || [],
        },
      },
    });
    yield put({
      type: 'queryInternationalisedLibrary',
    });
    yield put({
      type: 'getAtomConfig',
    });
    yield put({
      type: 'saveSnapshot',
    });
    yield put({
      type: 'saveAsyncVersionId',
      payload: {
        asyncVersionId: '',
      },
    });
  }

  if (response?.resultData?.status === AsyncStatus.Error) {
    yield put({
      type: 'saveAsyncVersionId',
      payload: {
        asyncVersionId: '',
      },
    });
    notification.error('error');
  }
}
