import { isArray } from 'lodash';
import { ESplitTypes } from 'claim/pages/CaseSplit/_models/dto/splitTypes';
import delTempIncidentDataField from './delTempIncidentDataField';
import { tenant } from '@/components/Tenant';

export default (postData: any) => {
  const { newCase, originalCase, initialCase, splitType } = postData;
  if (isArray(newCase.incidentList) && newCase.incidentList.length > 0) {
    newCase.incidentList = delTempIncidentDataField(newCase.incidentList, ['claimTypeTemp']);
  }
  if (isArray(originalCase.incidentList) && originalCase.incidentList.length > 0) {
    originalCase.incidentList = delTempIncidentDataField(originalCase.incidentList, [
      'claimTypeTemp',
    ]);
  }
  if (initialCase && isArray(initialCase.incidentList) && initialCase.incidentList.length > 0) {
    initialCase.incidentList = delTempIncidentDataField(initialCase.incidentList, [
      'claimTypeTemp',
    ]);
  }
  // 按incident拆分的时候清除一些无用数据
  if (ESplitTypes.Incident === splitType) {
    // 清除无效数据部分
    // newCase.policyBenefitList = [];
    if(!tenant.isPH())
      newCase.claimPayableList = [];
    newCase.claimDecision = null;

    // originalCase.policyBenefitList = [];
    // PH 没有auto assessment，需要给后端数据让后端去分
    if(!tenant.isPH())
      originalCase.claimPayableList = [];
    originalCase.claimDecision = null;

    // initialCase.policyBenefitList = [];
    initialCase.claimPayableList = [];
    initialCase.claimDecision = null;
  }

  return { ...postData, newCase, originalCase, initialCase };
};
