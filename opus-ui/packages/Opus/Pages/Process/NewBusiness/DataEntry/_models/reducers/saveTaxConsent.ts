import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { transferDate } from 'basic/utils/transferDate';

export default (state, action) => {
  const { changedFields } = action?.payload || {};
  const validating = action?.validating;
  return produce(state, (draftState) => {
    if (!validating) {
      if (changedFields.taxConsentDate && changedFields?.taxConsentDate?.value) {
        changedFields.taxConsentDate = transferDate(
          formUtils.queryValue(changedFields.taxConsentDate)
        );
      }
      if (lodash.has(changedFields, 'taxConsentOption')) {
        if (changedFields.taxConsentOption.value === 'No') {
          changedFields.tin = undefined;
        }
      }
    }
    formUtils.saveChangedFields({
      baseObject: draftState.processData,
      path: 'taxConsent',
      changedFields,
    });
  });
};
