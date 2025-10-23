import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';

export default (state, action) => {
  const { changedFields } = action?.payload || {};
  return produce(state, (draftState) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'nonThTaxOption')) {
        if (changedFields.nonThTaxOption.value === 'Y') {
          changedFields.nonThCrsList = [];
        }
        if (
          changedFields.nonThTaxOption.value === 'N' &&
          lodash.isEmpty(draftState.processData?.payorCrs?.nonThCrsList)
        ) {
          changedFields.nonThCrsList = [{ id: uuidv4() }];
        }
        if (lodash.has(changedFields, 'countryOfTaxResidency')) {
          changedFields.city = '';
        }
      }
    }
    formUtils.saveChangedFields({
      baseObject: draftState.processData,
      path: 'payorCrs',
      changedFields,
    });
  });
};
