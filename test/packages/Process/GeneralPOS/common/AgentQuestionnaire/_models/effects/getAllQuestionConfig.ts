import { queryQuestionnaireByClientId } from '@/services/owbQuestionnaireCaseQuestionnaireControllerService';

export default function* getAllQuestionConfig({ payload }: any, { select, put, call }: any) {
  const { inquiryBusinessNo, agentInfo } = payload;
  yield put({
    type: 'saveQuestionnaireKey',
    payload: { questionnaireKey: 'agentNumber' },
  });

  const result = yield call(queryQuestionnaireByClientId, {
    clientId: agentInfo?.agentNumber || '',
    inquiryBusinessNo,
  });

  if (result.success && result?.resultData) {
    yield put({
      type: 'saveAllQuestionConfig',
      payload: {
        customerQuestionnaireList: result?.resultData.map((item) => {
          return {
            questionnaireList: item?.questionnaireList?.map((questionnaireItem) => ({
              ...questionnaireItem,
              clientType: 'SA',
            })),
            clientInfo: {
              ...item?.clientInfo,
              ...agentInfo,
              clientId: agentInfo?.agentNo,
              clientName: [agentInfo.firstName, agentInfo.middleName, agentInfo.surname]
                .filter((item) => item)
                .join(' '),
            },
          };
        }),
      },
    });

    yield put({
      type: 'saveMaps',
    });

    yield put({
      type: 'initSelect',
      payload: {
        selectClient: agentInfo?.agentNumber,
        selectQuestionnaire: result?.resultData?.[0]?.questionnaireList?.[0]?.questionnaireCode,
      },
    });
  }
}
