import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { VLD_000051 } from '@/utils/validations';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';
import { BenefitCategory } from 'claim/pages/utils/claim';
import { getCurrentServiceItemNo } from 'claim/pages/utils/getCurrentServiceItemNo';
import { filterDuplicatePayable } from 'claim/pages/utils/filterDuplicatePayable';
import { AgentStatus, ServiceCode } from 'claim/pages/Enum';
import { tenant } from '@/components/Tenant';

// Date Of Incident should't be later than death date
export function incidentDateEarlierDeathDate(
  rule: any,
  value: any,
  callback: Function,
  dateTimeOfDeathValue: any
) {
  if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
    callback("Date Of Incident should't be later than death date");
  }
  callback();
}

// Identification Date should't be earlier than Date Of Incident
export function IdentificationDateLaterIncidentDate(
  rule: any,
  value: any,
  callback: Function,
  incidentDateValue: any
) {
  if (compareCurrentTimeTargetTime(value, incidentDateValue)) {
    callback("Identification Date should't be earlier than Date Of Incident");
  }
  callback();
}

// Date Of Operation should't be earlier than Date Of Incident
export function operationDateLaterIncidentDate(
  rule: any,
  value: any,
  callback: Function,
  incidentDateValue: any
) {
  if (compareCurrentTimeTargetTime(value, incidentDateValue)) {
    callback("Date Of Operation should't be earlier than Date Of Incident");
  }
  callback();
}

// Date Of Operation should't be later than Datetime Of Death
export function operationDateEarlierDeathDate(
  rule: any,
  value: any,
  callback: Function,
  dateTimeOfDeathValue: any
) {
  if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
    callback("Date Of Operation should't be later than Datetime Of Death");
  }
  callback();
}

// 会诊时间要在事故时间之后
export function consultationDateLaterIncidentDate(
  rule: any,
  value: any,
  callback: Function,
  incidentDateValue: any
) {
  if (compareCurrentTimeTargetTime(value, incidentDateValue)) {
    callback("Consultation date shouldn't be earlier than Date Of Incident");
  }
  callback();
}

// 会诊时间要在死亡时间之前
export function consultationDateEarlierDeathDate(
  rule: any,
  value: any,
  callback: Function,
  dateTimeOfDeathValue: any
) {
  if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
    callback("Consultation date should't be later than Datetime Of Death");
  }
  callback();
}

// 入院时间要晚于事故时间
export function admissionDateLaterIncidentDate(
  rule: any,
  value: any,
  callback: Function,
  incidentDateValue: any
) {
  if (compareCurrentTimeTargetTime(value, incidentDateValue)) {
    callback("Admission date should't be earlier than Date Of Incident");
  }
  callback();
}

// 入院时间要早于死亡时间
export function admissionDateEarlierDeathDate(
  rule: any,
  value: any,
  callback: Function,
  dateTimeOfDeathValue: any
) {
  if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
    callback("Date Of Admission should't be later than Datetime Of Death");
  }
  callback();
}

// 出院时间要早于或等于死亡时间
export function dischargeDateEarlierDeathDate(
  rule: any,
  value: any,
  callback: Function,
  dateTimeOfDeathValue: any
) {
  if (compareCurrentTimeTargetTime(dateTimeOfDeathValue, value)) {
    callback("From Date should't be later than Date Of Discharge");
  }
  callback();
}

// 出院时间要晚于入院时间
export function dischargeDateLaterAdmissionDate(
  rule: any,
  value: any,
  callback: Function,
  dateOfAdmissionValue: any
) {
  if (compareCurrentTimeTargetTime(value, dateOfAdmissionValue)) {
    callback("Discharge date should't be earlier than Date Of Admission");
  }
  callback();
}

// 入住ICU时间要早于出院时间
export function fromIcuDateEarlierDischargeDate(
  rule: any,
  value: any,
  callback: Function,
  dateOfDischargeValue: any
) {
  if (compareCurrentTimeTargetTime(dateOfDischargeValue, value)) {
    callback("From Date should't be later than Date Of Discharge");
  }
  callback();
}

// 入住ICU时间要晚于入院时间
export function fromIcuDateLaterAdmissionDate(
  rule: any,
  value: any,
  callback: Function,
  dateOfAdmissionValue: any
) {
  if (compareCurrentTimeTargetTime(value, dateOfAdmissionValue)) {
    callback("From Date should't be earlier than Date Of Admission");
  }
  callback();
}

// 出离ICU时间要早于出院时间
export function toIcuDateEarlierDischargeDate(
  rule: any,
  value: any,
  callback: Function,
  dateOfDischargeValue: any
) {
  if (compareCurrentTimeTargetTime(dateOfDischargeValue, value)) {
    callback("To Date should't be later than Date Of Discharge");
  }
  callback();
}

// 出离ICU时间要晚于入住ICU时间
export function toIcuDateLaterFromIcuDate(
  rule: any,
  value: any,
  callback: Function,
  icuFromDateValue: any
) {
  if (compareCurrentTimeTargetTime(value, icuFromDateValue)) {
    callback("To Date should't be earlier than From Date");
  }
  callback();
}

// 验证invoiceNo重复
export function checkInvoiceNoIsExist(rule: any, value: any, callback: Function, invoiceList: any) {
  const invoiceNoArray = lodash
    .values(invoiceList)
    .filter((item: any) => formUtils.queryValue(item.invoiceNo) === value);

  if (invoiceNoArray && invoiceNoArray.length > 1) {
    callback('Duplicated with existing Invoice.');
  }
  callback();
}

// claimType 包含重疾，诊断必须有一条重疾
export function checkCriticalIllnessByEntities(claimTypeArray, existCriticalIllness) {
  if (!claimTypeArray || !existCriticalIllness) return;
  const isCriticalIllnessRequest = lodash.isArray(claimTypeArray) && claimTypeArray.includes('CI');
  let hasCriticalIllness = false;
  lodash.map(existCriticalIllness, (item) => {
    if (item === 1) {
      hasCriticalIllness = true;
    }
  });

  return isCriticalIllnessRequest ? hasCriticalIllness : true;
}

// claimType 包含重疾，诊断必须有一条重疾
export function checkCriticalIllness(incidentItem) {
  if (!incidentItem) return;
  const claimTypeList = formUtils.queryValue(incidentItem.claimTypeArray);
  const isCriticalIllnessRequest = lodash.isArray(claimTypeList) && claimTypeList.includes('CI');
  let hasCriticalIllness = false;
  lodash.map(incidentItem.diagnosisList, (item) => {
    if (item.criticalIllness === 1) {
      hasCriticalIllness = true;
    }
  });

  return isCriticalIllnessRequest ? hasCriticalIllness : true;
}
// 统计section错误
export function collectSectionErrors(claimProcessData: any, submited: boolean) {
  if (!claimProcessData) {
    return [];
  }

  const errors: string[] = [];
  if (VLD_000051(claimProcessData.incidentList, submited)) {
    if (!errors.includes("SPECIAL ERROR: [incident] shouldn't be empty")) {
      errors.push("SPECIAL ERROR: [incident] shouldn't be empty");
    }
  }

  lodash.map(claimProcessData.incidentList, (incidentItem) => {
    const extraArray = ['HK', 'TH'];
    if (
      submited &&
      !checkCriticalIllness(incidentItem) &&
      !lodash.includes(extraArray, tenant.region())
    ) {
      errors.push(
        'Require at least one critical diagnosis when claim type contains Critical Illness.'
      );
    }

    lodash.map(incidentItem.treatmentList, (treatmentItem) => {
      lodash.map(treatmentItem.invoiceList, (invoiceItem) => {
        if (submited && lodash.isEmpty(invoiceItem.serviceItemList)) {
          errors.push('Service item should not be empty.');
        }
      });
    });

  });

  return errors;
}

// 验证treatment 匹配的treatmentPayableList是否有重复项
export function checkTretmentPayableList(
  rule: any,
  value: any,
  callback: Function,
  curTreatmentPayableList: any,
  treatmentPayableListItem: any
) {
  const editPayable = formUtils.cleanValidateData(treatmentPayableListItem);
  // 剔除当前treatmentPayable
  const treatmentPayableList = lodash.filter(
    curTreatmentPayableList,
    (item) => item.id !== editPayable.id
  );
  const payable = lodash.filter(
    treatmentPayableList,
    (payableItem) =>
      payableItem.incidentId === editPayable.incidentId &&
      payableItem.treatmentId === editPayable.treatmentId &&
      filterDuplicatePayable(payableItem, editPayable, value)
  );
  if (payable.length > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
}

// claim 匹配的claimPayableList是否有重复项
export function checkClaimPayableListByTypeCode(
  rule: any,
  value: any,
  callback: Function,
  listPolicy: any,
  curClaimPayableList: any,
  claimPayableListItem: any
) {
  const editPayable = formUtils.cleanValidateData(claimPayableListItem);
  // 剔除当前treatmentPayable
  const claimPayableList = lodash.filter(curClaimPayableList, (item) => item.id !== editPayable.id);
  const cleanClaimPayableList = formUtils.cleanValidateData(claimPayableList);
  const mappingPolicy = lodash.find(
    listPolicy,
    (item) =>
      item.policyNo === editPayable.policyNo &&
      item.coreProductCode === editPayable.productCode &&
      item.benefitTypeCode === value
  );
  editPayable.benefitCategory = lodash.get(mappingPolicy, 'benefitCategory');
  const payable = lodash.filter(
    cleanClaimPayableList,
    (payableItem) =>
      payableItem.incidentId === editPayable.incidentId &&
      filterDuplicatePayable(payableItem, { ...editPayable, benefitTypeCode: value })
  );
  if (payable.length > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
}

// 验证treatment 匹配的treatmentPayableList是否有重复项
export function checkTretmentPayableListByItemCode(
  rule: any,
  value: any,
  callback: Function,
  curTreatmentPayableList: any,
  treatmentPayableListItem: any
) {
  const editPayable = formUtils.cleanValidateData(treatmentPayableListItem);
  // 剔除当前treatmentPayable
  const treatmentPayableList = lodash.filter(
    curTreatmentPayableList,
    (item) => item.id !== editPayable.id
  );
  const cleanTreatmentPayableList = formUtils.cleanValidateData(treatmentPayableList);

  const payable = lodash.filter(
    cleanTreatmentPayableList,
    (payableItem) =>
      payableItem.treatmentId === editPayable.treatmentId &&
      filterDuplicatePayable(payableItem, editPayable, value)
  );
  if (payable.length > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
}

// 验证treatment 匹配的treatmentPayableList是否有重复项
export function checkTretmentPayableListByTypeCode(
  rule: any,
  value: any,
  callback: Function,
  listPolicy: any,
  curTreatmentPayableList: any,
  treatmentPayableListItem: any
) {
  const editPayable = formUtils.cleanValidateData(treatmentPayableListItem);
  // 剔除当前treatmentPayable
  const treatmentPayableList = lodash.filter(
    curTreatmentPayableList,
    (item) => item.id !== editPayable.id
  );
  const cleanTreatmentPayableList = formUtils.cleanValidateData(treatmentPayableList);

  const mappingPolicy = lodash.find(
    listPolicy,
    (item) =>
      item.policyNo === editPayable.policyNo &&
      item.coreProductCode === editPayable.productCode &&
      item.benefitTypeCode === value
  );
  editPayable.benefitCategory = lodash.get(mappingPolicy, 'benefitCategory');

  if (editPayable.benefitCategory === BenefitCategory.reimbursement) {
    const payable = lodash.filter(
      cleanTreatmentPayableList,
      (payableItem) =>
        payableItem.treatmentId === editPayable.treatmentId &&
        filterDuplicatePayable(payableItem, { ...editPayable, benefitTypeCode: value })
    );
    if (payable.length > 0) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
    }
  }
  callback();
}

// 验证invoice 匹配的invoicePayableList是否有重复项
export function checkInvoicePayableList(
  rule: any,
  value: any,
  callback: Function,
  curInvoicePayableList: any,
  InvoicePayableListItem: any
) {
  const editPayable = formUtils.cleanValidateData(InvoicePayableListItem);
  // 剔除当前servicePayable
  const invvoicePayableList = lodash.filter(
    curInvoicePayableList,
    (item) => item.id !== editPayable.id
  );
  const cleanInvoicePayableList = formUtils.cleanValidateData(invvoicePayableList);

  const payable = lodash.filter(
    cleanInvoicePayableList,
    (payableItem) =>
      payableItem.invoiceId === editPayable.invoiceId &&
      filterDuplicatePayable(payableItem, { ...editPayable, benefitTypeCode: value })
  );

  if (payable.length > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
}

// 验证service 匹配的servicePayableList是否有重复项
export function checkServicePayableList(
  rule: any,
  value: any,
  callback: Function,
  curServicePayableList: any,
  servicePayableListItem: any
) {
  const editPayable = formUtils.cleanValidateData(servicePayableListItem);
  // 剔除当前servicePayable
  const servicePayableList = lodash.filter(
    curServicePayableList,
    (item) => item.id !== editPayable.id
  );
  const cleanServicePayableList = formUtils.cleanValidateData(servicePayableList);

  const payable = lodash.filter(
    cleanServicePayableList,
    (payableItem) =>
      payableItem.serviceItemId === editPayable.serviceItemId &&
      filterDuplicatePayable(payableItem, editPayable, value)
  );
  if (payable.length > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
}

// TODO 待重构 将之前校验payable的Fn进行整合。
// 验证payable 匹配的payableList是否有重复项
export function checkPayableList(
  rule: any,
  value: any,
  callback: Function,
  payableList: any,
  payableListItem: any,
  mapId: string
) {
  const editPayable = formUtils.cleanValidateData(payableListItem);
  const filterPayableList = lodash.filter(payableList, (item) => item.id !== editPayable.id);
  const cleanPayableList = formUtils.cleanValidateData(filterPayableList);

  const payable = lodash.filter(
    cleanPayableList,
    (payableItem: any) =>
      payableItem[mapId] === editPayable[mapId] &&
      payableItem?.incidentId === editPayable.incidentId &&
      filterDuplicatePayable(payableItem, editPayable, value)
  );
  if (payable.length > 0) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
  }
  callback();
}

export const VLD_000392 = (agentStatus: any) => {
  const isTerminated = agentStatus === AgentStatus.Terminated;
  if (isTerminated) {
    return formatMessageApi({ Label_COM_WarningMessage: 'MSG_000414' });
  }
  return null;
};

export function validatePolicyAgent(claimProcessData: any) {
  if (!claimProcessData) {
    return [];
  }
  const { agentStatus } = lodash.pick(claimProcessData.policyAgent, ['agentStatus']);
  const errorMessage = VLD_000392(agentStatus);
  const errors: string[] = [];
  if (errorMessage && agentStatus) {
    errors.push(errorMessage);
  }
  return errors;
}

// export const validateKlipClaimNo = (claimRelationshipKlipClaimNoList: any, claimNo: string) => (
//   rule: any,
//   value: any,
//   callback: Function
// ) => {
//   if (!lodash.isArray(claimRelationshipKlipClaimNoList)) {
//     return callback();
//   }

//   const klipClaimNoList = lodash.values(
//     formUtils.cleanValidateData(claimRelationshipKlipClaimNoList)
//   );

//   const isDuplicate =
//     lodash
//       .chain(klipClaimNoList)
//       .filter((KlipClaimNoObj: any) => KlipClaimNoObj.klipClaimNo === value)
//       .size()
//       .value() > 1;

//   if (klipClaimNoList.length > 0 && isDuplicate) {
//     callback(
//       formatMessageApi({ Label_COM_WarningMessage: 'MSG_000465' }, value, claimNo ? claimNo : '')
//     );
//   }
//   callback();
// };

export const validateServiceItem = ({
  treatmentId,
  serviceItemListMap,
  invoiceListMap,
  procedureList,
}: any) => {
  const procedureLength = lodash.size(procedureList);

  return getCurrentServiceItemNo({
    treatmentId,
    serviceItemListMap,
    invoiceListMap,
    procedureLength,
  });
};

export const VLD_000551 = (claimData, submited) => {
  if (!claimData) {
    return [];
  }
  const errors: string[] = [];
  lodash.map(claimData.incidentList, (incidentItem) => {
    lodash.map(incidentItem.treatmentList, (treatmentItem) => {
      const procedureSize = lodash.size(treatmentItem?.procedureList);
      const serviceItemList = lodash.map(
        treatmentItem.invoiceList,
        (invoiceItem) => invoiceItem.serviceItemList
      );
      const serviceItemSize = lodash
        .chain(serviceItemList)
        .flatten()
        .filter(
          (item: any) =>
            (item?.serviceItem === ServiceCode.code || item?.serviceItem === ServiceCode.code2) &&
            item?.isAdjustment !== 'Y'
        )
        .size()
        .value();
      if (
        submited &&
        lodash.size(serviceItemList) !== 0 &&
        !lodash.isEqual(procedureSize, serviceItemSize)
      ) {
        errors.push(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000475' }));
      }
    });
  });

  return errors;
};

export const checkDiagnosisDuplicate = (
  diagnosisList: any,
  diagnosisListMap: any,
  diagnosisId: string
) => (rule: any, value: any, callback: Function) => {
  if (value === 'P') {
    const isExistPrimary = lodash
      .chain(diagnosisList)
      .filter((id: any) => id !== diagnosisId)
      .map((id: any) => formUtils.queryValue(diagnosisListMap[id]?.diagnosisType))
      .includes(value)
      .value();

    if (isExistPrimary) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000112' }));
    }
  }
  callback();
};
