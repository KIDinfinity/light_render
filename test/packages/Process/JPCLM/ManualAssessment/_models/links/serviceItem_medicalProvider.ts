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

  const medicalProvider = formUtils.queryValue(changedFields.medicalProvider);

  draftState.claimEntities.serviceItemListMap[serviceItemId] = {
    ...item,
    medicalProviderDescription: !isOtherMedicalProvider ? null : item.medicalProviderDescription,
    ...(lodash
      .chain(item.treatmentProviders || [])
      .find((el: any) => el.treatmentProvider === medicalProvider)
      .pick(['medicalProviderExpireDate', 'medicalProviderEffectiveDate'])
      .value() || {}),
  };
};
