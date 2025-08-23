/* eslint-disable import/no-unresolved */
import { findIndex, isArray, isPlainObject, filter } from 'lodash';
import type { ExpectDecision} from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';

interface DecisionUtilFunc {
  (expectDecisionList: ExpectDecision[], expectDecision: ExpectDecision): ExpectDecision[];
}

interface GetDecisionUtilFunc {
  (expectDecision: ExpectDecision): ExpectDecision;
}

const getDecision: GetDecisionUtilFunc = (expectDecision) => {
  const {
    // assessObject,
    // assessObjectId,
    // assessorOverrideAmount,
    // assessorOverrideDays,
    // assessorOverrideDeductible,
    // assessorOverrideMultiple,
    benefitItemCode,
    benefitTypeCode,
    // claimDecision,
    // claimNo,
    // decisionId,
    // incidentBenefitId,
    incidentId,
    // operation,
    // policyCategory,
    policyId,
    policySetupStatus,
    productCode,
    treatmentId,
  } = expectDecision;
  switch (policySetupStatus) {
    case PolicySetupStatus.NoBelong:
      return { incidentId, policyId };
    case PolicySetupStatus.NoImplement:
      return { incidentId, treatmentId, policyId, productCode, benefitTypeCode };
    case PolicySetupStatus.Standard:
    default:
      return { incidentId, treatmentId, policyId, productCode, benefitTypeCode, benefitItemCode };
  }
};

export const updateDecision: DecisionUtilFunc = (expectDecisionList, expectDecision) => {
  let newExpectDecisionList = expectDecisionList;
  if (!isArray(expectDecisionList)) {
    newExpectDecisionList = [];
  }
  const expectDecisionValue = cleanFieldsMeta(expectDecision);
  const existsIndex = findIndex(newExpectDecisionList, getDecision(expectDecisionValue));
  if (existsIndex === -1) {
    newExpectDecisionList.push(expectDecisionValue);
  } else {
    newExpectDecisionList[existsIndex] = expectDecisionValue;
  }
  return newExpectDecisionList;
};

export const deleteDecision: DecisionUtilFunc = (expectDecisionList, expectDecision) => {
  let newExpectDecisionList = expectDecisionList;
  if (!isArray(expectDecisionList)) {
    newExpectDecisionList = [];
  }
  const expectDecisionValue = cleanFieldsMeta(expectDecision);
  const existsIndex = findIndex(newExpectDecisionList, getDecision(expectDecisionValue));
  if (existsIndex !== -1) {
    newExpectDecisionList = newExpectDecisionList.filter((index) => index !== existsIndex);
  }
  return newExpectDecisionList;
};

export const filterDecision = (
  expectDecisionList: ExpectDecision[],
  expectDecision: ExpectDecision | any
) => {
  if (!isArray(expectDecisionList) || !isPlainObject(expectDecision)) return [];
  const expectDecisionClean = cleanFieldsMeta(expectDecision);
  return filter(expectDecisionList, getDecision(expectDecisionClean));
};

export const isNoBelongPolicy = (policySetupStatus: string) =>
  policySetupStatus === PolicySetupStatus.NoBelong;

export const isNoImplementPolicy = (policySetupStatus: string) =>
  policySetupStatus === PolicySetupStatus.NoImplement;

export const judgeClaimDecision = (claimDecision: string) => {
  if (!claimDecision) {
    return '';
  }
  return claimDecision === 'A' ? 'check-circle' : 'close-circle';
};
