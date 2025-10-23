import { produce } from 'immer';
import lodash from 'lodash';
import { EFollowUp } from 'claim/pages/HongKong/FurtherClaim/enum';

const saveSerialTreatment = (state: any, { payload }: any) => {
  const { selectionTreatments, treatmentId } = payload;

  return produce(state, (draftState: any) => {
    const list =
      draftState.claimProcessData?.claimRelation?.treatmentRelationshipSelectionList || [];

    // eslint-disable-next-line no-param-reassign
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
};

export default saveSerialTreatment;
