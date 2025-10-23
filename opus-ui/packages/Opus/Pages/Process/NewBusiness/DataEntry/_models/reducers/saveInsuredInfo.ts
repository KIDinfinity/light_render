import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { transferDate } from 'basic/utils/transferDate';

export default (state, action) => {
  const { changedFields } = action?.payload || {};
  return produce(state, (draftState) => {
    if (lodash.size(changedFields) === 1) {
      if (
        changedFields.age &&
        changedFields.age < 20 &&
        formUtils.queryValue(draftState.processData.payorInfo.relationshipOfInsured) === '027'
      ) {
        draftState.processData.payorInfo.relationshipOfInsured = void 0;
      }

      if (changedFields.age > 20) {
        draftState.processData.payorCrs = {
          nonThCrsList: [],
          countryOfTaxResidency: 'TH',
        };
        draftState.processData.payorFatca = {};
      }

      if (changedFields.nationality) {
        changedFields.idType =
          formUtils.queryValue(changedFields.nationality) === 'TH' ? 'ID_CARD' : 'PASSPORT';
      }
      //expiryDate传给后端需要转成公历
      if (changedFields.expiryDate && changedFields?.expiryDate?.value) {
        changedFields.expiryDate = transferDate(formUtils.queryValue(changedFields.expiryDate));
      }
      //dateOfBirth传给后端需要转成公历
      if (changedFields.dateOfBirth && changedFields?.dateOfBirth?.value) {
        changedFields.dateOfBirth = transferDate(formUtils.queryValue(changedFields.dateOfBirth));
      }
      if (lodash.has(changedFields, 'nationality')) {
        if (changedFields.nationality.value === 'TH') {
          const temp: any = { tin: undefined };
          formUtils.saveChangedFields({
            baseObject: draftState.processData,
            path: 'taxConsent',
            changedFields: temp,
          });
        }
      }
    }
    formUtils.saveChangedFields({
      baseObject: draftState.processData,
      path: 'insuredInfo',
      changedFields,
    });
  });
};
