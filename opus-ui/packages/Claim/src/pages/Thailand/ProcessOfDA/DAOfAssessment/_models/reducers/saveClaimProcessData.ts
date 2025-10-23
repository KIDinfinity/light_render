/* eslint-disable import/no-unresolved */
import lodash from 'lodash';
import { createNormalizeData } from '@/utils/claimUtils';
import { sortClaimPayableList } from 'claim/pages/utils/taskUtils';
import { wholeEntities } from '../dto/EntriesModel';
import { handleBenefitManualAdd } from '../functions/fnObject';
import { subtract } from '@/utils/precisionUtils';

const saveClaimProcessData = (state: any, action: any) => {
  const claimData = { ...action.payload };
  if (!claimData.incidentList) {
    claimData.incidentList = [];
  }
  if (!claimData.claimPayableList) {
    claimData.claimPayableList = [];
  }
  if (!claimData.payeeList) {
    claimData.payeeList = [];
  }
  const result = createNormalizeData(claimData, wholeEntities);
  const newClaimPayableList = sortClaimPayableList(result);
  if (result && result.claimProcessData) {
    result.claimProcessData.claimPayableList = newClaimPayableList;
  }

  delete result.claimProcessData.payee;

  const { benefitItemManualAddMap, benefitTypeManualAddMap } = handleBenefitManualAdd(
    result.claimEntities
  );

  const {
    claimDecision,
    claimHospitalBillingRecover,
    claimHospitalBillingDetail,
  } = result.claimProcessData;
  if (lodash.isEmpty(claimHospitalBillingRecover)) {
    result.claimProcessData.claimHospitalBillingRecover = {};
  }

  const amount = claimHospitalBillingDetail?.amount;

  result.claimProcessData.claimHospitalBillingRecover.hospitalBillAmount = amount;
  result.claimProcessData.claimHospitalBillingRecover.recoverFromCustomer = subtract(
    amount,
    lodash.isNumber(claimDecision?.payToHospital) ? claimDecision?.payToHospital : 0
  );

  return {
    ...state,
    ...result,
    benefitTypeManualAddMap,
    benefitItemManualAddMap,
  };
};

export default saveClaimProcessData;
