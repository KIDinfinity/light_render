import { Region, tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const { planInfoData, type } = action.payload;
  let { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    switch (type) {
      case 'init':
        draftState.processData.planInfoData = planInfoData;

        break;
      case 'change':
        {
          // 针对renewalPayType、refundPayType取原始value，埋点取validate value
          if (
            changedFields?.renewalPayType &&
            lodash.isPlainObject(changedFields?.renewalPayType)
          ) {
            changedFields = { renewalPayType: formUtils.queryValue(changedFields.renewalPayType) };
          }
          if (changedFields?.refundPayType && lodash.isPlainObject(changedFields?.refundPayType)) {
            changedFields = { refundPayType: formUtils.queryValue(changedFields.refundPayType) };
          }

          if (
            changedFields?.icpDividendPayType &&
            lodash.isPlainObject(changedFields?.icpDividendPayType)
          ) {
            const payType = formUtils.queryValue(changedFields.icpDividendPayType);

            changedFields = {
              icpDividendPayType: payType,
              icpPayType: payType,
              dividendPayType: payType,
            };
          }

          const rebalancingTypeValue = formUtils.queryValue(changedFields.rebalancingType);
          if (lodash.has(changedFields, 'rebalancingType') && rebalancingTypeValue === 'N') {
            draftState.modalData.processData.planInfoData = {
              ...draftState.modalData.processData.planInfoData,
              ...changedFields,
              rebalancingType: '',
            };
          } else {
            if (lodash.size(changedFields) === 1) {
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
              if (lodash.has(changedFields, 'effectiveDate')) {
                changedFields.rcdChanged = !moment(
                  formUtils.queryValue(changedFields.effectiveDate)
                ).isSame(moment(draftState.businessData.policyList?.[0]?.effectiveDate), 'day');
              }
              if (lodash.has(changedFields, 'privateFundFlag')) {
                changedFields.rebalancingType = null;
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
