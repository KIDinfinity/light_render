import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

const saveTextAnswer = (state: any, action: any) => {
  const { maping, changedFields } = action.payload;
  const clearChangedFields = formUtils.cleanValidateData(changedFields);
  const nextState = produce(state, (draftState) => {
    const answerVOList = draftState.entities.sectionQuestionListMap[maping].question.answerVOList;
    const index = lodash.findIndex(
      answerVOList,
      (item) => item.optionCode === Object.keys(clearChangedFields)[0]
    );
    if (index > -1) {
      answerVOList[index] = Object.values(clearChangedFields)[0];
    } else if (answerVOList?.length > 0) {
      answerVOList.push({
        optionCode: Object.keys(clearChangedFields)[0],
        optionText: Object.values(clearChangedFields)[0],
      });
    } else {
      answerVOList[0] = {
        optionCode: Object.keys(clearChangedFields)[0],
        optionText: Object.values(clearChangedFields)[0],
      };
    }
  });
  return { ...nextState };
};

export default saveTextAnswer;
