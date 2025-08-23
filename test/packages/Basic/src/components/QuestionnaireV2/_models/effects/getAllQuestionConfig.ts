import {
  query,
  findQuestionnaireKey,
} from '@/services/owbQuestionnaireCaseQuestionnaireControllerService';
import { QuestionnaireKey } from 'basic/components/QuestionnaireV2/Enum';
// import result from './mockData';

export default function* getAllQuestionConfig({ payload }: any, { select, put, call }: any) {
  const isNB = yield select((state) => state.questionnaireController.isNB);
  const otherPayload = yield select((state) => state.questionnaireController.otherPayload);
  const resultKey = yield call(findQuestionnaireKey, { businessCode: isNB ? 'BIZ003' : 'BIZ002' });
  const questionnaireKey =
    QuestionnaireKey[
      (isNB && resultKey.success && resultKey?.resultData) || 'identity_type,identity_no'
    ];

  yield put({
    type: 'saveQuestionnaireKey',
    payload: { questionnaireKey: questionnaireKey },
  });

  const result = yield call(query, { ...payload, ...otherPayload });

  if (result.success && result?.resultData) {
    yield put({
      type: 'saveAllQuestionConfig',
      payload: { customerQuestionnaireList: result?.resultData },
    });

    yield put({
      type: 'saveMaps',
    });

    yield put({
      type: 'initSelect',
      payload: {
        selectClient: result?.resultData?.[0]?.clientInfo[questionnaireKey],
        selectQuestionnaire: result?.resultData?.[0]?.questionnaireList?.[0]?.questionnaireCode,
      },
    });
  }
}
