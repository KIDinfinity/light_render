import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const claimEstimateSurgicalUpdateField = (state: any, { payload }: any) => {
  const { changedFields, id } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.nonSupportClaimEstimation.nonSupportIncident.nonSupportProcedureList =
      lodash.map(
        draftState.businessData.nonSupportClaimEstimation.nonSupportIncident
          .nonSupportProcedureList,
        (item: any) => {
          if (
            lodash.has(changedFields, 'procedureName') &&
            !formUtils.queryValue(changedFields?.procedureName)
          ) {
            const pickMap = [
              'procedureCode',
              'womenSurgeryFlg',
              'nnmWomenSurgeryFlg',
              'highReimbPct',
              'transplantationSurgeryFlg',
              'bornMarrowFlg',
              'newApprovalFlag',
              'presentApprovalFlag',
              'multiplier88',
            ];
            return lodash.omit(item, [...pickMap, 'kjCode', 'procedureName']);
          }
          return item.id === id ? { ...item, ...changedFields } : item;
        }
      );
  });

  return { ...nextState };
};

export default claimEstimateSurgicalUpdateField;
