import lodash from 'lodash';
import { schema, normalize, denormalize } from 'normalizr';
import { formUtils } from 'basic/components/Form';

const valueIsEmpty = (value) => value === undefined || value === '' || value === null;

// 从颜色池选一个颜色作为背景色
const selsctColor = (policybgc, colors) => {
  let selectedResult = '';
  lodash.map(colors, (item) => {
    let selectedFlag = false;
    const selectedColor = Object.entries(policybgc);
    lodash.map(selectedColor, (selectedItem) => {
      if (selectedItem[1] === item) {
        selectedFlag = true;
      }
    });
    if (!selectedFlag) {
      selectedResult = item;
    }
  });

  return selectedResult;
};
// 生成范式化模式
const createClaimProcessSchema = () => {
  // 事故
  const feeItem = new schema.Entity('feeItemListMap');
  const serviceItem = new schema.Entity('serviceItemListMap', {
    feeItemList: [feeItem],
  });
  const invoice = new schema.Entity('invoiceListMap', {
    serviceItemList: [serviceItem],
  });
  const procedure = new schema.Entity('procedureListMap');
  const procedurePayable = new schema.Entity('procedurePayableListMap');
  const accidentBenefitPayable = new schema.Entity('accidentBenefitPayableListMap');
  const otherProcedure = new schema.Entity('otherProcedureListMap');
  const otherProcedurePayable = new schema.Entity('otherProcedurePayableListMap');
  const opTreatmentPayable = new schema.Entity('opTreatmentPayableListMap');
  const relationTreamentPayable = new schema.Entity('relationTreamentPayableListMap');
  const jpTreatmentDate = new schema.Entity('jpTreatmentDateListMap');
  const jpMedicineTreatment = new schema.Entity('jpMedicineTreatmentListMap', {
    jpTreatmentDateList: [jpTreatmentDate],
  });
  const mainBenefit = new schema.Entity('mainBenefitListMap');
  const treatment = new schema.Entity('treatmentListMap', {
    invoiceList: [invoice],
    procedureList: [procedure],
    mainBenefitList: [mainBenefit],
    otherProcedureList: [otherProcedure],
    jpMedicineTreatmentList: [jpMedicineTreatment],
  });
  const diagnosis = new schema.Entity('diagnosisListMap');
  const incident = new schema.Entity('incidentListMap', {
    treatmentList: [treatment],
    diagnosisList: [diagnosis],
  });

  // AP流程特有的
  const incidentDecision = new schema.Entity('incidentDecisionListMap');

  // 赔付
  const claimIncidentPayable = new schema.Entity('claimIncidentPayableListMap');
  const serviceItemPayable = new schema.Entity('serviceItemPayableListMap');
  const benefitItemPayable = new schema.Entity('benefitItemPayableListMap');
  const invoicePayable = new schema.Entity('invoicePayableListMap', {
    serviceItemPayableList: [serviceItemPayable],
    benefitItemPayableList: [benefitItemPayable],
  });
  const treatmentPayable = new schema.Entity('treatmentPayableListMap', {
    invoicePayableList: [invoicePayable],
    accidentBenefitPayableList: [accidentBenefitPayable],
    procedurePayableList: [procedurePayable],
    otherProcedurePayableList: [otherProcedurePayable],
    opTreatmentPayableList: [opTreatmentPayable],
    relationTreamentPayableList: [relationTreamentPayable],
  });
  const claimPayable = new schema.Entity('claimPayableListMap', {
    treatmentPayableList: [treatmentPayable],
    claimIncidentPayableList: [claimIncidentPayable],
  });

  // 保单受益人分配
  const beneficiary = new schema.Entity('beneficiaryListMap');
  const policyBenefit = new schema.Entity('policyBenefitListMap', {
    beneficiaryList: [beneficiary],
  });

  // 领款人
  const payee = new schema.Entity('payeeListMap');

  // policyOwner
  const policyOwnerBO = new schema.Entity('policyOwnerBOListMap');
  const policyPayorBO = new schema.Entity('policyPayorBOListMap');

  return {
    incidentList: new schema.Array(incident),
    apIncidentDecisionList: new schema.Array(incidentDecision),
    claimPayableList: new schema.Array(claimPayable),
    policyBenefitList: new schema.Array(policyBenefit),
    payeeList: new schema.Array(payee),
    policyOwnerBOList: new schema.Array(policyOwnerBO),
    policyPayorBOList: new schema.Array(policyPayorBO),
  };
};

const claimProcessSchema = createClaimProcessSchema();
// 根据理赔数据和完整的entry生成扁平化后的数据
const createNormalizeData = (claimData, wholeEntities) => {
  const data = Object.freeze(claimData);
  const outputClaim = normalize(data, claimProcessSchema);
  const { entities } = outputClaim;
  const finalEntities = {
    ...wholeEntities,
    ...entities,
  };
  return {
    claimProcessData: outputClaim.result,
    claimEntities: finalEntities,
  };
};

const denormalizeClaimData = (claimProcessData, claimEntities) => {
  if (!claimProcessData || !claimEntities) return {};
  return denormalize(claimProcessData, claimProcessSchema, claimEntities);
};

// 生成范式化模式
const createClaimProcessSchemaForSplitCase = () => {
  const treatment = new schema.Entity('treatmentListMap');
  const incident = new schema.Entity('incidentListMap', {
    treatmentList: [treatment],
  });

  const lifePayable = new schema.Entity('lifePayableMap');
  const treatmentPayable = new schema.Entity('treatmentPayableListMap');
  const claimPayable = new schema.Entity('claimPayableListMap', {
    lifePayable,
    treatmentPayableList: [treatmentPayable],
  });

  return {
    incidentList: new schema.Array(incident),
    claimPayableList: new schema.Array(claimPayable),
  };
};

const claimProcessSchemaForSplitCase = createClaimProcessSchemaForSplitCase();
// 根据理赔数据和完整的entry生成扁平化后的数据
const createNormalizeDataForSplitCase = (claimData, wholeEntities) => {
  const data = Object.freeze(claimData);
  const outputClaim = normalize(data, claimProcessSchemaForSplitCase);
  const { entities } = outputClaim;
  const finalEntities = {
    ...wholeEntities,
    ...entities,
  };
  return {
    claimProcessData: outputClaim.result,
    claimEntities: finalEntities,
  };
};

const denormalizeClaimDataForSplitCase = (claimProcessData, claimEntities) => {
  if (!claimProcessData || !claimEntities) return {};
  return denormalize(claimProcessData, claimProcessSchemaForSplitCase, claimEntities);
};

// 删除incident时，根据incidentId删除相关的数据
const deteteDataByIncidentId = (claimProcessData, claimEntities, incidentId, wholeEntities) => {
  const claimData = denormalizeClaimData(claimProcessData, claimEntities);

  const newIncidentList = lodash.filter(claimData.incidentList, (item) => item.id !== incidentId);
  const newClaimPayableList = lodash.filter(
    claimData.claimPayableList,
    (item) => item.incidentId !== incidentId
  );
  lodash.forEach(newIncidentList, (item, index) => {
    // eslint-disable-next-line no-param-reassign
    item.incidentNo = index + 1;
  });

  claimData.incidentList = newIncidentList;
  claimData.claimPayableList = newClaimPayableList;

  const result = createNormalizeData(claimData, wholeEntities);
  return result;
};

// 删除treatment时，根据incidentId和treatmentId删除相关的数据
const deteteDataByIncidentAndTreatmentId = (
  claimProcessData,
  claimEntities,
  incidentId,
  treatmentId,
  wholeEntities
) => {
  const claimData = denormalizeClaimData(claimProcessData, claimEntities);

  const newIncidentList = lodash.map(claimData.incidentList, (incidentItem) => {
    const newIncidentItem = { ...incidentItem };
    if (incidentItem.id === incidentId) {
      newIncidentItem.treatmentList = lodash.filter(
        incidentItem.treatmentList,
        (treatmentItem) => treatmentItem.id !== treatmentId
      );
      lodash.forEach(newIncidentItem.treatmentList, (item, index) => {
        // eslint-disable-next-line no-param-reassign
        item.treatmentNo = index + 1;
      });
    }
    return newIncidentItem;
  });

  const newClaimPayableList = lodash.map(claimData.claimPayableList, (incidentPayableItem) => {
    const newIncidentPayableItem = { ...incidentPayableItem };

    if (incidentPayableItem.incidentId === incidentId) {
      newIncidentPayableItem.treatmentPayableList = lodash.filter(
        newIncidentPayableItem.treatmentPayableList,
        (treatmentPayableItem) => treatmentPayableItem.treatmentId !== treatmentId
      );
    }
    return newIncidentPayableItem;
  });

  claimData.incidentList = newIncidentList;
  claimData.claimPayableList = newClaimPayableList;

  const result = createNormalizeData(claimData, wholeEntities);
  return result;
};

// 删除incidentPayable时，根据incidentPayableId删除相关的数据
const deteteDataByIncidentPayableId = (
  claimProcessData,
  claimEntities,
  incidentPayableId,
  wholeEntities
) => {
  const claimData = denormalizeClaimData(claimProcessData, claimEntities);

  const newClaimPayableList = lodash.filter(
    claimData.claimPayableList,
    (item) => item.id !== incidentPayableId
  );
  const newClaimPolicyBenefitList = lodash.filter(
    claimData.policyBenefitList,
    (item) => item.id !== incidentPayableId
    //  !!item.policyNo
  );

  claimData.claimPayableList = newClaimPayableList;
  claimData.policyBenefitList = newClaimPolicyBenefitList;

  const result = createNormalizeData(claimData, wholeEntities);
  return result;
};

// 删除treatmentPayable时，根据incidentPayableId和treatmentPayableId删除相关的数据
const deteteDataByIncidentPayableIdAndTreatmentPayableId = (
  claimProcessData,
  claimEntities,
  claimPayableItemId,
  treatmentPayableItemId,
  wholeEntities
) => {
  const claimData = denormalizeClaimData(claimProcessData, claimEntities);

  const newClaimPayableList = lodash.map(claimData.claimPayableList, (incidentPayableItem) => {
    const newIncidentPayableItem = { ...incidentPayableItem };
    if (incidentPayableItem.id === claimPayableItemId) {
      newIncidentPayableItem.treatmentPayableList = lodash.filter(
        newIncidentPayableItem.treatmentPayableList,
        (treatmentPayableItem) => treatmentPayableItem.id !== treatmentPayableItemId
      );
    }
    return newIncidentPayableItem;
  });

  claimData.claimPayableList = newClaimPayableList;

  const result = createNormalizeData(claimData, wholeEntities);
  return result;
};

const getDisaste = (incidentList = []) => {
  let disaster = false;
  incidentList.forEach((item) => {
    const claimType = lodash.get(item, 'claimType', '');
    const value = formUtils.queryValue(claimType);
    let list = [];
    if (lodash.isString(value)) {
      list = value.split(' ');
    }
    if (list.includes('入院') && item.causeOfIncident === '災害') {
      disaster = true;
    }
  });
  return disaster;
};

// 生成SimplifiedDigitalProcess范式化模式
const createSimplifiedDigitalSchema = (): any => {
  const incidentList = new schema.Entity('incidentListMap');
  return {
    incidentList: new schema.Array(incidentList),
  };
};
// 根据理赔数据和完整的entry生成扁平化后的数据
const createSimplifiedDigitalData = (data) => {
  // const data = Object.freeze(data);
  const outputData = normalize(data, createSimplifiedDigitalSchema());

  return {
    pageData: outputData.result,
    dataEntities: outputData.entities,
  };
};

export {
  selsctColor,
  claimProcessSchema,
  createNormalizeData,
  denormalizeClaimData,
  createNormalizeDataForSplitCase,
  denormalizeClaimDataForSplitCase,
  deteteDataByIncidentId,
  deteteDataByIncidentAndTreatmentId,
  deteteDataByIncidentPayableId,
  deteteDataByIncidentPayableIdAndTreatmentPayableId,
  valueIsEmpty,
  getDisaste,
  createSimplifiedDigitalData,
};
export default selsctColor;
