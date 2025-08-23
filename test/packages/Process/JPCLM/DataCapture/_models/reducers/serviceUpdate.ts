import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import links from '../links';

const serviceUpdate = (state: any, action: any) => {
  const { serviceItemId, changedFields, invoiceId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      links.service_expense({ draftState, changedFields, serviceItemId, invoiceId });
      links.service_medicalProvider({ draftState, changedFields, serviceItemId });
      links.service_fromDate({ draftState, changedFields, serviceItemId });
    }

    const item = draftState.claimEntities?.serviceItemListMap[serviceItemId];

    let extra: any = {};
    if (lodash.has(changedFields, 'medicalProvider')) {
      const medicalProvider = formUtils.queryValue(changedFields.medicalProvider);

      extra = {
        ...extra,
        ...(lodash
          .chain(item.treatmentProviders || [])
          .find((el: any) => el.treatmentProvider === medicalProvider)
          .pick(['medicalProviderExpireDate', 'medicalProviderEffectiveDate'])
          .value() || {}),
      };
    }
    if (!draftState.claimEntities) return;
    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...item,
      ...extra,
      ...changedFields,
    };
  });
  return { ...nextState };
};

export default serviceUpdate;
