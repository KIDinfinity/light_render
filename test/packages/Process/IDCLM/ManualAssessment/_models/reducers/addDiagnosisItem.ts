/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import { DiagnosisType } from 'basic/enum';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    const { incidentId, addDiagnosisItem: addItem } = action.payload;

    draftState.claimEntities.incidentListMap[incidentId].diagnosisList = [
      ...(draftState.claimEntities.incidentListMap[incidentId].diagnosisList || []),
      addItem.id,
    ];
    draftState.claimEntities.diagnosisListMap[addItem.id] = {
      ...addItem,
      diagnosisType: DiagnosisType.Primary,
    };
    draftState.isManualAddDiagnosisID = addItem?.id;
  });
