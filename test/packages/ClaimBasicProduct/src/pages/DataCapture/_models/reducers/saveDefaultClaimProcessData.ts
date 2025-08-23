import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { INCIDENTITEM, DIAGNOSISITEM } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';

const saveDefaultClaimProcessData = (state: any) => {
  const nextState = produce(state, (draftState) => {
    // 如果incidentList为空，加一条incident和diagnosis
    if (lodash.isEmpty(draftState.claimProcessData.incidentList)) {
      const incidentId = uuidv4();
      const diagnosisId = uuidv4();
      const { claimNo } = draftState.claimProcessData;
      const addIncidentItem = {
        ...INCIDENTITEM,
        claimNo,
        diagnosisList: [diagnosisId],
        id: incidentId,
        incidentNo: 1,
      };
      const addDiagnosisItem = {
        ...DIAGNOSISITEM,
        claimNo,
        id: diagnosisId,
        incidentId,
      };
      draftState.claimProcessData.incidentList = [
        ...draftState.claimProcessData.incidentList,
        incidentId,
      ];

      draftState.claimEntities.incidentListMap[incidentId] = addIncidentItem;
      draftState.claimEntities.diagnosisListMap[diagnosisId] = addDiagnosisItem;
    }
    //
    const { insured, payee } = draftState.claimProcessData;
    const newPayee = { ...payee };
    // QC节点，insured死亡，payee type设置为死亡受益人
    if (insured && formUtils.queryValue(insured.currentState) === 'D') {
      newPayee.payeeType = 'B';
    }
    draftState.claimProcessData.payee = newPayee;
    // 设置第一条incident展开
    draftState.incidentItemExpandStatus = {
      [`id_${draftState.claimProcessData.incidentList[0]}`]: true,
    };
  });

  return { ...nextState };
};

export default saveDefaultClaimProcessData;
