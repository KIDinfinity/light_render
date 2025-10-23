import { produce } from 'immer';
import lodash from 'lodash';

const claimEstimateTreatmentUpdate = (state: any, { payload }: any) => {
  const { item: newItem, id } = payload;

  const nextState = produce(state, (draftState: any) => {
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
    draftState.businessData.nonSupportClaimEstimation.nonSupportIncident.nonSupportProcedureList =
      lodash.map(
        draftState.businessData.nonSupportClaimEstimation.nonSupportIncident
          .nonSupportProcedureList,
        (item: any) => {
          return item.id === id
            ? {
                ...item,
                ...(!!newItem
                  ? {
                      ...lodash.pick(newItem, pickMap),
                      kjCode: `${newItem?.kjCode || ''}${newItem?.branchNo || ''}${newItem?.kjCode || ''}`,
                    }
                  : lodash.omit(item, [...pickMap, 'kjCode'])),
              }
            : item;
        }
      );
  });

  return { ...nextState };
};

export default claimEstimateTreatmentUpdate;
