import { getAsyncQueryRuleSetByBusinessIdResult } from '@/services/ruleEngineRuleSetControllerService';
import { AsyncStatus } from '../../Enum';
import { notification } from 'antd';

export default function* retryUpload({ payload }: any, { call, put }: any) {
  const { asyncBusinesssId } = payload;
  const response = yield call(getAsyncQueryRuleSetByBusinessIdResult, asyncBusinesssId);
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
      type: 'saveAsyncBusinessId',
      payload: {
        asyncBusinesssId: '',
      },
    });
  }

  if (response?.resultData?.status === AsyncStatus.Error) {
    yield put({
      type: 'saveAsyncBusinessId',
      payload: {
        asyncBusinesssId: '',
      },
    });
    notification.error('error');
  }
}
