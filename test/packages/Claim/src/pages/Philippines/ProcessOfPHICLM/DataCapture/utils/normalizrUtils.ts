import { schema, normalize, denormalize } from 'normalizr';

const createClaimProcessSchema = () => {
  // 事故
  const serviceItem = new schema.Entity('serviceItemListMap');
  const invoice = new schema.Entity('invoiceListMap', {
    serviceItemList: [serviceItem],
  });
  const procedure = new schema.Entity('procedureListMap');
  const treatment = new schema.Entity('treatmentListMap', {
    invoiceList: [invoice],
    procedureList: [procedure],
  });
  const diagnosis = new schema.Entity('diagnosisListMap');
  const incident = new schema.Entity('incidentListMap', {
    treatmentList: [treatment],
    diagnosisList: [diagnosis],
  });

  const payee = new schema.Entity('payeeListMap');

  return {
    incidentList: new schema.Array(incident),
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
  if (!claimProcessData || !claimEntities) return {};
  return denormalize(claimProcessData, claimProcessSchema, claimEntities);
};
