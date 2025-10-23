import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default (state, action) => {
  const { changedFields } = action?.payload || {};
  const validating = action?.validating;
  return produce(state, (draftState) => {
    if (!validating) {
      if (lodash.has(changedFields, 'healthPaQ1')) {
        if (changedFields.healthPaQ1.value === 'No') {
          changedFields.healthPaQ1TotalSa = undefined;
        }
      }
    }

    formUtils.saveChangedFields({
      baseObject: draftState.processData,
      path: 'healthQuestionPA',
      changedFields,
    });
  });
};
