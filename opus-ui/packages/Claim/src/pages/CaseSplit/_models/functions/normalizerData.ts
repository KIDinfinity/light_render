import { schema, normalize, denormalize } from 'normalizr';

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
export const createNormalizeDataForSplitCase = (claimData: any, wholeEntities: any) => {
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

export const denormalizeClaimDataForSplitCase = (claimProcessData: any, claimEntities: any) => {
  if (!claimProcessData || !claimEntities) return {};
  return denormalize(claimProcessData, claimProcessSchemaForSplitCase, claimEntities);
};

export default { createNormalizeDataForSplitCase, denormalizeClaimDataForSplitCase };
