import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { messageModal } from '@/utils/commonMessage';
import { searchNameByRegionCode as searchName } from '@/services/claimDiagnosisInformationControllerService';
import {
  VLD_000351,
  VLD_000352,
  VLD_000353,
  VLD_000354,
  VLD_000363,
  VLD_000364,
  VLD_000365,
} from 'claim/pages/validators/sectionValidators';
import { tenant } from '@/components/Tenant';
import { EPolicySource } from 'claim/enum/EPolicySource';

export default function* validateRegister(_: any, { select, call }: any) {
  const {
    claimPayableListMap,
    incidentListMap,
    diagnosisListMap,
    submissionDate,
    listPolicy,
  } = yield select((state: any) => ({
    claimPayableListMap:
      state?.PHCLMOfClaimAssessmentController?.claimEntities?.claimPayableListMap,
    incidentListMap: state?.PHCLMOfClaimAssessmentController?.claimEntities?.incidentListMap,
    diagnosisListMap: state?.PHCLMOfClaimAssessmentController?.claimEntities?.diagnosisListMap,
    submissionDate: state?.processTask?.getTask?.submissionDate,
    listPolicy: state?.PHCLMOfClaimAssessmentController?.listPolicy,
  }));

  const validators = lodash.compact([
    VLD_000351(incidentListMap),
    VLD_000352(submissionDate),
    VLD_000353(diagnosisListMap),
    VLD_000354(incidentListMap),
    VLD_000363(claimPayableListMap),
    VLD_000364(claimPayableListMap),
    VLD_000365(claimPayableListMap, listPolicy),
  ]);
  if (lodash.size(validators) > 0) {
    messageModal(validators);
    return false;
  }
  const targetListPolicy = lodash.uniqBy(
    listPolicy,
    (item: any) => `${item?.policyNo}${item?.coreProductCode}`
  );
  const policys = lodash
    .chain(targetListPolicy)
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
          product: item?.productName,
          selectIndicator: 'Y',
        };
      }
      if (existPolicyNo && !existProduct && individual) {
        return {
          policyNo: item?.policyNo,
          product: item?.productName,
          selectIndicator: '',
        };
      }
      return '';
    })
    .compact()
    .value();

  const dateOfDeaths = lodash.map(incidentListMap, (item) =>
    formUtils.queryValue(item?.dateTimeOfDeath)
  );
  const diagnosisCodes = lodash.map(diagnosisListMap, (item) =>
    formUtils.queryValue(item?.diagnosisCode)
  );
  const response = yield call(searchName, { diagnosisCodes, regionCode: tenant.region() });
  const formatDiagnosis = response?.success
    ? lodash.map(
        response?.resultData,
        (diagnosis) => `${diagnosis?.dictCode}-${diagnosis?.dictName}`
      )
    : diagnosisCodes;
  const individualPolicys = lodash
    .chain(policys)
    .compact()
    .map((item: any) => ({
      id: uuidv4(),
      policyNo: item?.policyNo,
      selectIndicator: item?.selectIndicator,
      product: item?.product,
      submissionDate,
      diagnosisCode: formatDiagnosis,
      dateTimeOfDeath: dateOfDeaths,
    }))
    .value();
  return individualPolicys;
}
