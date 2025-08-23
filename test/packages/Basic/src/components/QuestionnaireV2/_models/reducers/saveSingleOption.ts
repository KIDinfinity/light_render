import { produce } from 'immer';
import { QuestionCode } from '../../Enum';

const saveSingleOption = (state: any, action: any) => {
  const { maping, changedFields, type } = action.payload;

  const nextState = produce(state, (draftState) => {
    if (type === QuestionCode.SINGLE_OPTION) {
      draftState.entities.sectionQuestionListMap[maping].question.answerVOList = [
        {
          optionCode: changedFields.optioncode,
          optionText: changedFields.optiontext,
        },
      ];
    }

    // TODO:因为页面是不可编辑的，所以这里没有用到
    if (type === QuestionCode.MULTI_OPTION || type === QuestionCode.MULTI_OPTION_GROUP) {
      const answerIndex = draftState.entities.sectionQuestionListMap[
        maping
      ].question.answerVOList?.findIndex((item) => item.optionCode === changedFields.optioncode);
      if (answerIndex > -1) {
        draftState.entities.sectionQuestionListMap[maping].question.answerVOList.splice(
          answerIndex,
          1
        );
      } else {
        draftState.entities.sectionQuestionListMap[maping].question.answerVOList.push({
          optionCode: changedFields.optioncode,
          optionText: changedFields.optiontext,
        });
      }
    }
  });

  return { ...nextState };
};

export default saveSingleOption;
