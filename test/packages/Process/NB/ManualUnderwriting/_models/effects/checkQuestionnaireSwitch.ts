import { getDefaultValueByCode } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { select, call, put }: any) {
  const response = yield call(getDefaultValueByCode, {
    codeType: 'routeToQuestionnaire',
  });

  if (response.success && response.resultData === '1') {
    yield put({
      type: 'setQuestionnaireSwitch',
      payload: {
        questionnaireSwitch: true,
      },
    });
    yield put({
      type: 'saveState',
      payload,
    });
    return false;
  }

  yield put({
    type: 'setQuestionnaireSwitch',
    payload: {
      questionnaireSwitch: false,
    },
  });
  return true;
}
