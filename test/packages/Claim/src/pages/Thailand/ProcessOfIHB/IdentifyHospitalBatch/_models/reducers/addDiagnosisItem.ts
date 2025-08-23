import { produce } from 'immer';
import lodash from 'lodash';
import { DiagnosisType } from '../../Enum';

const addDiagnosisItem = (state: any, { payload: { idx } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    let diagnosisList = lodash.get(
      draftState.claimProcessData,
      `invoiceInforData[${idx}].registration.incidentList[0].diagnosisList`,
      []
    );
    if (!lodash.isArray(diagnosisList)) {
      diagnosisList = [];
    }
    if (lodash.isEmpty(diagnosisList)) {
      draftState.claimProcessData.diagnosisItem.diagnosisType = DiagnosisType.Primary;
    } else {
      draftState.claimProcessData.diagnosisItem.diagnosisType = '';
    }
    diagnosisList.push(draftState.claimProcessData.diagnosisItem);
    lodash.set(
      draftState.claimProcessData,
      `invoiceInforData[${idx}].registration.incidentList[0].diagnosisList`,
      diagnosisList
    );
  });
  return { ...nextState };
};

export default addDiagnosisItem;
