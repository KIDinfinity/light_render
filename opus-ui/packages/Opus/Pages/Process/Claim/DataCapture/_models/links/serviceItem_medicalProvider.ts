import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { TreatmentListitemOfBasicInfoArray } from 'claim/pages/Enum';

export default ({ draftState, changedFields, serviceItemId }: any) => {
  if (!lodash.has(changedFields, 'medicalProvider')) return;
  const isOtherMedicalProvider = lodash.some(
    TreatmentListitemOfBasicInfoArray,
    (item) => item === changedFields.medicalProvider.value
  );

  const item = draftState.claimEntities.serviceItemListMap[serviceItemId];
  const treatmentProviderList = draftState.dropdownMap?.treatmentProviderMap?.[serviceItemId] || [];

  const dateItem =
    lodash.find(
      treatmentProviderList,
      ({ treatmentProvider }: any) =>
        treatmentProvider === formUtils.queryValue(changedFields.medicalProvider)
    ) || {};

  draftState.claimEntities.serviceItemListMap[serviceItemId] = {
    ...item,
    medicalProviderDescription: !isOtherMedicalProvider ? null : item.medicalProviderDescription,
    ...(lodash.isEmpty(dateItem)
      ? {
          medicalProviderExpireDate: null,
          medicalProviderEffectiveDate: null,
        }
      : {
          ...lodash.pick(dateItem, ['medicalProviderExpireDate', 'medicalProviderEffectiveDate']),
        }),
  };
};
