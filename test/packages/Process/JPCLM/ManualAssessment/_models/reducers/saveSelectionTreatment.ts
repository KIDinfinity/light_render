import { produce }  from 'immer';
import lodash from 'lodash';
import { EFollowUp } from 'claim/pages/HongKong/FurtherClaim/enum';

const saveSerialTreatment = (state: any, { payload }: any) => {
  const { selectionTreatments, treatmentId, records } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.saveFurtherClaimRelationshipId.records = records;
    const list =
      draftState.claimProcessData?.claimRelation?.treatmentRelationshipSelectionList || [];

    draftState.claimProcessData.claimRelation.treatmentRelationshipSelectionList =
      lodash
        .chain(list)
        .map((item: any) => {
          const { relaTreatmentId } = item;
          return {
            ...item,
            followUp: lodash.find(selectionTreatments, { treatmentId, relaTreatmentId })
              ? EFollowUp.Yes
              : EFollowUp.No,
          };
        })
        .value() || [];
  });

  return { ...nextState };
};

export default saveSerialTreatment;
