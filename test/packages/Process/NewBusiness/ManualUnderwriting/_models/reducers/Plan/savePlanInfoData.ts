import { Region, tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';

export default (state: any, action: any) => {
  const { planInfoData, type, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    switch (type) {
      case 'init':
        draftState.processData.planInfoData = planInfoData;

        break;
      case 'change':
        {
          if (formUtils.queryValue(changedFields.privateFundFlag) == 'N') {
            draftState.modalData.processData.planInfoData = {
              ...draftState.modalData.processData.planInfoData,
              ...changedFields,
              rebalancingType: '',
            };
          } else {
            if (lodash.size(changedFields) === 1) {
              if (lodash.has(changedFields, 'effectiveDate')) {
                changedFields.rcdChanged = !moment(formUtils.queryValue(changedFields.effectiveDate))
                  .isSame(moment(draftState.businessData.policyList?.[0]?.effectiveDate), 'day');
              }
              if (lodash.has(changedFields, 'PolicyAddress7') && tenant.region() === Region.VN) {
                const pathNeedToBeCleared = [
                  'PolicyAddress5',
                  'PolicyAddress4',
                  'PolicyAddress3',
                  'PolicyAddress2',
                  'PolicyAddress1',
                  'PolicyZipCode',
                ];
                lodash.forEach(pathNeedToBeCleared, (value) => {
                  changedFields[value] = '';
                });
              }
              if (lodash.has(changedFields, 'renewalPayType') && tenant.region() === Region.KH) {
                draftState.modalData.processData.paymentList = lodash.map(
                  draftState.modalData.processData.paymentList,
                  (item) => {
                    return {
                      ...item,
                      ...changedFields,
                    };
                  }
                );
              }
            }
            draftState.modalData.processData.planInfoData = {
              ...draftState.modalData.processData.planInfoData,
              ...changedFields,
            };
          }
        }

        break;
    }
  });
  return {
    ...nextState,
  };
};
