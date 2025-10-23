import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { transferDate } from 'basic/utils/transferDate';
import lodash from 'lodash';

export default (state, action) => {
  const { changedFields } = action?.payload || {};
  return produce(state, (draftState) => {
    if (lodash.size(changedFields) === 1) {
      if (changedFields.pdpaConsentDate && changedFields?.pdpaConsentDate?.value) {
        changedFields.pdpaConsentDate = transferDate(
          formUtils.queryValue(changedFields.pdpaConsentDate)
        );
      }
    }
    formUtils.saveChangedFields({
      baseObject: draftState.processData,
      path: 'payorPDPA',
      changedFields,
    });
  });
};
