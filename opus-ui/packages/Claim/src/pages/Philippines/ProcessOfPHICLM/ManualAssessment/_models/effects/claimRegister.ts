import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { denormalizeClaimData } from '@/utils/claimUtils';

import { submitRegisterDeathClaimValidate } from '@/services/claimSubmitValidationOperationControllerService';
import { EPolicySource } from 'claim/enum/EPolicySource';

export default function* claimRegister(_, { call, select, put }: any) {
  const {
    claimPayableListMap,
    incidentListMap,
    diagnosisListMap,
    submissionDate,
    listPolicy,
    processInstanceId,
    taskId,
  } = yield select((state: any) => ({
    claimPayableListMap:
      state?.PHCLMOfClaimAssessmentController?.claimEntities?.claimPayableListMap,
    incidentListMap: state?.PHCLMOfClaimAssessmentController?.claimEntities?.incidentListMap,
    diagnosisListMap: state?.PHCLMOfClaimAssessmentController?.claimEntities?.diagnosisListMap,
    submissionDate: state?.processTask?.getTask?.submissionDate,
    listPolicy: state?.PHCLMOfClaimAssessmentController?.listPolicy,
    processInstanceId: state?.processTask?.getTask?.processInstanceId,
    taskId: state?.processTask?.getTask?.taskId,
  }));

  const policys = lodash
    .chain(listPolicy)
    .map((item) => {
      const existPolicyNo = lodash.some(
        claimPayableListMap,
        (some) => formUtils.queryValue(some?.policyNo) === item?.policyNo
      );
      const existProduct = lodash.some(
        claimPayableListMap,
        (some) => formUtils.queryValue(some?.productCode) === item?.coreProductCode
      );
      const individual = item?.policySource === EPolicySource.Individual;
      if (existPolicyNo && existProduct && individual) {
        return {
          policyNo: item?.policyNo,
          productCode: item?.coreProductCode,
          productType: item?.productType,
          selectIndicator: 'Y',
        };
      }
      if (existPolicyNo && !existProduct && individual) {
        return {
          policyNo: item?.policyNo,
          productCode: item?.coreProductCode,
          productType: item?.productType,
          selectIndicator: '',
        };
      }
      return '';
    })
    .compact()
    .value();

  const dateOfDeaths = lodash
    .chain(incidentListMap)
    .map((item) => formUtils.queryValue(item?.dateTimeOfDeath))
    .first()
    .value();
  const claimTypeList = lodash
    .chain(incidentListMap)
    .map((item) => formUtils.queryValue(item?.claimTypeArray))
    .first()
    .value();
  const diagnosisCodes = lodash.map(diagnosisListMap, (item) =>
    formUtils.queryValue(item?.diagnosisCode)
  );
  const businessData = lodash
    .chain(policys)
    .compact()
    .map((item) => ({
      policyNo: item?.policyNo,
      claimTypeList: claimTypeList,
      submissionDate: submissionDate,
      diagnosisCodeList: diagnosisCodes,
      deathDate: dateOfDeaths,
      productCode: item?.productCode,
      productType: item?.productType,
      selectIndicator: item?.selectIndicator,
    }))
    .value();

  const params = {
    deathClaimRegisterList: businessData,
  };

  const response = yield call(submitRegisterDeathClaimValidate, params);

  if (response?.success) {
    yield put.resolve({
      type: 'getClaimPayableSelected',
    });
    const { claimProcessData, claimEntities } = yield select((state: any) => ({
      claimProcessData: state?.PHCLMOfClaimAssessmentController?.claimProcessData,
      claimEntities: state?.PHCLMOfClaimAssessmentController?.claimEntities,
    }));
    const denormalizedData = denormalizeClaimData(claimProcessData, claimEntities);
    const content = formUtils.formatFlattenValue(formUtils.cleanValidateData(denormalizedData));
    const submitData = {
      ...content,
      processInstanceId,
      taskId,
    };
    yield put({
      type: 'claimCaseController/saveSnapshot',
      payload: {
        postData: submitData,
      },
    });
  }
}
