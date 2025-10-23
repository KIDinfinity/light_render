import { produce } from 'immer';
import lodash from 'lodash';

const delDiagnosisItem = (state: any, { payload: { idx, itemIdx } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const diagnosisList = lodash.get(
      draftState.claimProcessData,
      `invoiceInforData[${idx}].registration.incidentList[0].diagnosisList`,
      []
    );
    lodash.remove(diagnosisList, (_, selfIdx) => selfIdx === itemIdx);
    lodash.set(
      draftState.claimProcessData,
      `invoiceInforData[${idx}].registration.incidentList[0].diagnosisList`,
      diagnosisList
    );
  });
  return { ...nextState };
};

export default delDiagnosisItem;
