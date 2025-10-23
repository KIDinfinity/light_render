import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { transferDate } from 'basic/utils/transferDate';

export default (state, action) => {
  const { changedFields } = action?.payload || {};
  return produce(state, (draftState) => {
    if (lodash.size(changedFields) === 1) {
      if (changedFields.nationality) {
        changedFields.idType =
          formUtils.queryValue(changedFields.nationality) === 'TH' ? 'ID_CARD' : 'PASSPORT';
      }
      if (changedFields.expiryDate && changedFields?.expiryDate?.value) {
        changedFields.expiryDate = transferDate(formUtils.queryValue(changedFields.expiryDate));
      }
      if (changedFields.dateOfBirth && changedFields?.dateOfBirth?.value) {
        changedFields.dateOfBirth = transferDate(formUtils.queryValue(changedFields.dateOfBirth));
      }
      if (
        changedFields.relationshipOfInsured &&
        (changedFields?.relationshipOfInsured?.value === '027' ||
          changedFields?.relationshipOfInsured?.value === '')
      ) {
        draftState.processData.payorHomeAddr = { country: 'TH', houseRegAddr: 'C' };
        draftState.processData.payorOccupation = {};
        draftState.processData.payorCurrentAddr = { country: 'TH' };
        draftState.processData.payorContact = {};
        draftState.processData.payorBizAddr = { country: 'TH', bizAddr: 'C' };
        draftState.processData.payorDispatchAddr = { dispatchAddress: 'C' };
      }
    }
    formUtils.saveChangedFields({
      baseObject: draftState.processData,
      path: 'payorInfo',
      changedFields,
    });
  });
};
