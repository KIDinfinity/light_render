import { schema, normalize, denormalize } from 'normalizr';

// 生成范式化模式
const createClaimProcessSchema = () => {
  // 事故
  const procedure = new schema.Entity('procedureListMap');
  const otherProcedure = new schema.Entity('otherProcedureListMap');
  const jpTreatmentDate = new schema.Entity('jpTreatmentDateListMap');
  const jpMedicineTreatment = new schema.Entity('jpMedicineTreatmentListMap', {
    jpTreatmentDateList: [jpTreatmentDate],
  });
  const treatment = new schema.Entity('treatmentListMap', {
    procedureList: [procedure],
    otherProcedureList: [otherProcedure],
    jpMedicineTreatmentList: [jpMedicineTreatment],
  });
  const diagnosis = new schema.Entity('diagnosisListMap');
  const incident = new schema.Entity('incidentListMap', {
    treatmentList: [treatment],
    diagnosisList: [diagnosis],
  });

  // 赔付
  const treatmentPayable = new schema.Entity('treatmentPayableListMap');
  const claimPayable = new schema.Entity('claimPayableListMap', {
    treatmentPayableList: [treatmentPayable],
  });

  // 保单受益人分配
  const beneficiary = new schema.Entity('beneficiaryListMap');
  const policyBenefit = new schema.Entity('policyBenefitListMap', {
    beneficiaryList: [beneficiary],
  });

  // 领款人
  const payee = new schema.Entity('payeeListMap');

  return {
    incidentList: new schema.Array(incident),
    claimPayableList: new schema.Array(claimPayable),
    policyBenefitList: new schema.Array(policyBenefit),
    payeeList: new schema.Array(payee),
  };
};

const claimProcessSchema = createClaimProcessSchema();
// 根据理赔数据和完整的entry生成扁平化后的数据
export const createNormalizeData = (claimData, wholeEntities) => {
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

export const denormalizeClaimData = (claimProcessData, claimEntities) => {
  if (!claimProcessData || !claimEntities) return false;
  return denormalize(claimProcessData, claimProcessSchema, claimEntities);
};
