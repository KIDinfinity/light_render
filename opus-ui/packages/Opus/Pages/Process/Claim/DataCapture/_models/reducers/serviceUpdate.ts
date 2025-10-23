import { produce } from 'immer';
import lodash from 'lodash';
import links from '../links';

const serviceUpdate = (state: any, action: any) => {
  const { serviceItemId, changedFields, invoiceId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!draftState.claimEntities) return;
    draftState.claimEntities.serviceItemListMap[serviceItemId] = {
      ...(draftState.claimEntities?.serviceItemListMap[serviceItemId] || {}),
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1) {
      links.serviceItem_AdvancedMedicalCNKey({ draftState, changedFields, serviceItemId });
      links.serviceItem_medicalProvider({ draftState, changedFields, serviceItemId });
      links.service_expense({ draftState, changedFields, serviceItemId, invoiceId });
      links.service_fromDate({ draftState, changedFields, serviceItemId });
    }
  });
  return { ...nextState };
};

export default serviceUpdate;
