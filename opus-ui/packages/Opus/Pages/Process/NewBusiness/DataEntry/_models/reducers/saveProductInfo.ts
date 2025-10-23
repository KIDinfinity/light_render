import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default (state, action) => {
  const { changedFields } = action?.payload || {};
  const validating = action?.validating;
  return produce(state, (draftState) => {
    if (!validating) {
      if (lodash.has(changedFields, 'productCategory')) {
        if (changedFields.productCategory.value !== 'PB') {
          draftState.processData.payorHQ = {};
        }
        if (changedFields.productCategory.value !== 'PA') {
          draftState.processData.healthQuestionPA = {};
        }
        if (changedFields.productCategory.value === 'PA') {
          draftState.processData.payorFatca = {};
          draftState.processData.insuredHQ = {};
          draftState.processData.insuredFatca = {};
        }
      }
    }
    formUtils.saveChangedFields({
      baseObject: draftState.processData,
      path: 'productInfo',
      changedFields,
    });
  });
};
