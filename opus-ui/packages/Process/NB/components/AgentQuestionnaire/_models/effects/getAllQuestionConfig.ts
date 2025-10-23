import { queryQuestionnaireByClientId } from '@/services/owbQuestionnaireCaseQuestionnaireControllerService';

export default function* getAllQuestionConfig({ payload }: any, { select, put, call }: any) {
  const { businessNo, agentData } = payload;
  yield put({
    type: 'saveQuestionnaireKey',
    payload: { questionnaireKey: 'clientId' },
  });

  const result = yield call(queryQuestionnaireByClientId, {
    clientId: agentData?.agentNo || '',
    businessNo,
  });

  if (result.success && result?.resultData) {
    yield put({
      type: 'saveAllQuestionConfig',
      payload: {
        customerQuestionnaireList: result?.resultData.map((item) => ({
          ...item,
          clientInfo: {
            clientId: agentData?.agentNo || '',
            firstName: agentData?.agentGivenName || '',
            surname: '',
          },
        })),
      },
    });

    yield put({
      type: 'saveMaps',
    });

    yield put({
      type: 'initSelect',
      payload: {
        selectClient: agentData?.agentNo,
        selectQuestionnaire: result?.resultData?.[0]?.questionnaireList?.[0]?.questionnaireCode,
      },
    });
  }
}
