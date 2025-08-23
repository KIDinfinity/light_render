import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

const saveFillingAnswer = (state: any, action: any) => {
  const { maping, changedFields } = action.payload;

  const clearChangedFields = formUtils.cleanValidateData(changedFields);
  const key = Object.keys(clearChangedFields)[0];

  const nextState = produce(state, (draftState) => {
    draftState.entities.sectionQuestionListMap[
      maping
    ].question.answerVOList = draftState.entities.sectionQuestionListMap[
      maping
    ].question.answerVOList.map((item) =>
      key === item.optionCode
        ? {
            ...item,
            optionText: clearChangedFields[key],
          }
        : item
    );
  });

  return { ...nextState };
};

export default saveFillingAnswer;
