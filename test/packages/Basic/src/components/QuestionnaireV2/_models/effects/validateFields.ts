import lodash from 'lodash';

import { QuestionCode } from '../../Enum';
import { NAMESPACE } from '../../activity.config';

export default function* validateFields(_: any, { select, put }: any) {
  const Validating = {
    [QuestionCode.SINGLE_OPTION]: (
      key: string,
      question: any,
      maping: any,
      sectionQuestionListMap: any
    ) => {
      if (lodash.isEmpty(question)) {
        return;
      }

      if (question.answerVOList?.length !== 1) {
        lodash.set(maping, `${key.split('-')[0]}.${key}.error`, 'Required!');
        return;
      }

      const questionItem = question.questionOptionList.find(
        (item: { optionCode: string; referAnswer: any }) =>
          item.optionCode === question.answerVOList[0].optionCode &&
          item.referAnswer === question.answerVOList[0].optionText
      );

      if (
        !questionItem ||
        lodash.isEmpty(questionItem.triggerSectionCode) ||
        lodash.isEmpty(questionItem.triggerQuestionCode)
      ) {
        return;
      }

      const fillingMap = Object.keys(sectionQuestionListMap).find(
        (item) =>
          item.split('--')[0] ===
          `${key.split('-')[0]}-${questionItem.triggerSectionCode}${
            questionItem.triggerQuestionCode
          }`
      );

      Validating[sectionQuestionListMap[fillingMap]?.question?.questionType](
        key,
        sectionQuestionListMap[fillingMap]?.question,
        maping
      );
    },
    [QuestionCode.MULTI_OPTION]: (key: string, question: any, maping: any) => {
      if (lodash.isEmpty(question)) {
        return;
      }

      if (question.answerVOList?.length < 1) {
        lodash.set(maping, `${key.split('-')[0]}.${key}.error`, 'Required!');
      }
    },
    [QuestionCode.MULTI_OPTION_GROUP]: (key: string, question: any, maping: any) => {
      if (lodash.isEmpty(question)) {
        return;
      }

      if (question.answerVOList?.length < 1) {
        lodash.set(maping, `${key.split('-')[0]}.${key}.error`, 'Required!');
      }
    },
    [QuestionCode.TEXT]: (key: string, question: any, maping: any) => {
      if (lodash.isEmpty(question)) {
        return;
      }

      if (
        lodash.isEmpty(question.answerVOList?.[0]?.optionText) ||
        lodash.isEmpty(question.answerVOList)
      ) {
        lodash.set(maping, `${key.split('-')[0]}.${key}.error`, 'Required!');
      }
    },
    [QuestionCode.FILLING]: (key: string, question: any, maping: any) => {
      if (lodash.isEmpty(question)) {
        return;
      }

      lodash.forEach(question.answerVOList, (item) => {
        if (lodash.isEmpty(item.optionText)) {
          lodash.set(maping, `${key.split('-')[0]}.${key}.error`, 'Required!');
          lodash.set(
            maping,
            `${key.split('-')[0]}.${key}.optionError.${item.optionCode}`,
            'Required!'
          );
        }
      });
    },
  };

  const sectionQuestionListMap = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities.sectionQuestionListMap
  );

  // TODO 对应角色选择需要校验的问卷
  const selectQuestionnaire = ['3663100000845kyc001'];
  const errorMap = {};

  // 过滤出需要校验的问卷
  Object.entries(sectionQuestionListMap).forEach(([key, value]) => {
    if (
      selectQuestionnaire.includes(key.split('-')[0]) &&
      value.isMandatory !== 0 &&
      value.isDisplay !== 0
    ) {
      const { question } = value;
      Validating[question.questionType](key, question, errorMap, sectionQuestionListMap);
    }
  });

  yield put({
    type: 'saveError',
    payload: { errorMap },
  });

  return errorMap;
}
