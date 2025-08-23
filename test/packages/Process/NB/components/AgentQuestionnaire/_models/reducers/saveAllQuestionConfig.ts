/* eslint-disable no-param-reassign */
import { normalizeData } from '../../utils/normalizrUtils';

export default (state: any, { payload }: any) => {
  const questionnaireKey = state.questionnaireKey;
  return {
    ...state,
    ...normalizeData(payload.customerQuestionnaireList, questionnaireKey),
  };
};
