import { getDefaultValueByCode } from '@/services/owbNbCfgControllerService';
import { getQuestions } from '@/services/owbNbNbInquiryControllerService';

export default function* ({ payload }: any, {  call, put, select }: any) {
  const response = yield call(getDefaultValueByCode, {
    codeType: 'routeToQuestionnaire',
  });
  const result = response.success && response.resultData === '1';
  yield put({
    type: 'setQuestionnaireSwitch',
    payload: {
      questionnaireSwitch: result,
    },
  });


  if (!result) {
    const businessNo = yield select(
      (state: any) => state.processTask.getTask?.businessNo
    );
    const responseQuestion = yield call(getQuestions, {
      businessNo,
    });
    if (response?.success && Array.isArray(responseQuestion?.resultData?.businessData)) {
      yield put({
        type: 'setClientsQuestionnaire',
        payload: {
          clientsQuestionnaire: responseQuestion?.resultData?.businessData,
        },
      });
    }
  }
}
