import { produce } from 'immer';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import moment from 'moment';
import { INCIDENTITEM, DIAGNOSISITEM } from '@/utils/claimConstant';
import { calculateDate } from '../functions';
import { formUtils } from 'basic/components/Form';

const saveDefaultClaimProcessData = (state: any, action: any) => {
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
    const { insured, payee, submissionDate } = draftState.claimProcessData;
    const newPayee = { ...payee };
    // QC节点，insured死亡，payee type设置为死亡受益人
    if (insured && formUtils.queryValue(insured.currentState) === 'D') {
      newPayee.payeeType = 'B';
    }
    if (insured?.dateOfBirth && submissionDate) {
      const presentAge = calculateDate(submissionDate, insured?.dateOfBirth);
      lodash.set(draftState, 'claimProcessData.insured.presentAge', presentAge);
    }

    draftState.claimProcessData.payee = newPayee;
    // 设置第一条incident展开
    draftState.incidentItemExpandStatus = {
      [`id_${draftState.claimProcessData.incidentList[0]}`]: true,
    };

    const defaultDate = moment(new Date()).format();

    if (lodash.isEmpty(draftState.claimProcessData.submissionDate)) {
      draftState.claimProcessData.submissionDate = defaultDate;
    }
    if (lodash.isEmpty(draftState.claimProcessData.submissionTime)) {
      draftState.claimProcessData.submissionTime = defaultDate;
    }
    if (lodash.isEqual(draftState.claimProcessData.submissionChannel, 'M')) {
      draftState.claimProcessData.submissionChannel = null;
    }
  });

  return { ...nextState };
};

export default saveDefaultClaimProcessData;
