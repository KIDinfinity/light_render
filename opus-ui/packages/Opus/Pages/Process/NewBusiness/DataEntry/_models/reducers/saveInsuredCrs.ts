import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { transferDate } from 'basic/utils/transferDate';
export default (state, action) => {
  const { changedFields } = action?.payload || {};
  const validating = action?.validating;
  return produce(state, (draftState) => {
    if (!validating) {
      if (lodash.has(changedFields, 'nonThTaxOption')) {
        if (changedFields.nonThTaxOption.value === 'Y') {
          changedFields.nonThCrsList = [];
        }
        if (
          changedFields.nonThTaxOption.value === 'N' &&
          lodash.isEmpty(draftState.processData?.insuredCrs?.nonThCrsList)
        ) {
          changedFields.nonThCrsList = [{ id: uuidv4() }];
        }
      }
      if (changedFields.crsDeclareDate && changedFields?.crsDeclareDate?.value) {
        changedFields.crsDeclareDate = transferDate(
          formUtils.queryValue(changedFields.crsDeclareDate)
        );
      }
      if (lodash.has(changedFields, 'countryOfTaxResidency')) {
        changedFields.city = '';
      }
    }
    formUtils.saveChangedFields({
      baseObject: draftState.processData,
      path: 'insuredCrs',
      changedFields,
    });
  });
};
