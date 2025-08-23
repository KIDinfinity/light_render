import { createNormalizeData } from '@/utils/claimUtils';
import { wholeEntities } from '../dto/EntriesModel';
import { sortClaimPayableList } from 'claim/pages/utils/taskUtils';

const saveClaimProcessData = (state: any, action: any) => {
  const {
    claimHospitalBillAdjustVO: claimHospitalBillAdjust,
    claimHospitalBillingDetailVO: claimHospitalBillingDetail,
    daClaimAssessmentVO,
    daClaimCaseVO,
    ...rest
  } = action.payload;
  let claimData;
  if (daClaimAssessmentVO) {
    claimData = { ...daClaimAssessmentVO };
  } else if (daClaimCaseVO) {
    claimData = { ...daClaimCaseVO };
  } else {
    claimData = { ...action.payload };
  }
  // const claimData = daClaimAssessmentVO ? { ...daClaimAssessmentVO } : daClaimCaseVO ? { ...daClaimCaseVO } : { ...action.payload };


  if (!claimData.incidentList) {
    claimData.incidentList = [];
  }
  if (!claimData.claimPayableList) {
    claimData.claimPayableList = [];
  }

  const result = createNormalizeData(claimData, wholeEntities);
  const newClaimPayableList = sortClaimPayableList(result);
  if (result && result.claimProcessData) {
    result.claimProcessData.claimPayableList = newClaimPayableList;
  }
  delete result.claimProcessData.payee;

  result.claimProcessData.claimDecision = {
    assessmentRemark: 'Approve',
    assessmentDecision: 'A',
    ...result.claimProcessData.claimDecision,
  };

  return {
    ...state,
    ...result,
    claimHospitalBillAdjust: claimHospitalBillAdjust || {
      adjustAmount: null,
      adjustReason: '',
    },
    claimHospitalBillingDetail: claimHospitalBillingDetail || {},
    rest,
  };
};

export default saveClaimProcessData;
