import { schema, normalize, denormalize } from 'normalizr';
import lodash from 'lodash';

export const wholeEntities = {
  incidentListMap: {},
  diagnosisListMap: {},
  treatmentListMap: {},
  procedureListMap: {},
  policyListMap: {},
  applicationListMap: {},
};

const createClaimProcessSchema = () => {
  // 事故
  const procedure = new schema.Entity('procedureListMap');
  const treatment = new schema.Entity('treatmentListMap', {
    procedureList: [procedure],
  });
  const diagnosis = new schema.Entity('diagnosisListMap');
  const incident = new schema.Entity('incidentListMap', {
    treatmentList: [treatment],
    diagnosisList: [diagnosis],
  });

  // 契約情報
  const policy = new schema.Entity('policyListMap');

  // 请求番号
  const application = new schema.Entity('applicationListMap');

  return {
    incidentList: new schema.Array(incident),
    policyList: new schema.Array(policy),
    applicationList: new schema.Array(application),
  };
};

const claimProcessSchema = createClaimProcessSchema();
// 根据理赔数据和完整的entry生成扁平化后的数据
export const createNormalizeData = (claimData) => {
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

export const deteteIncidentById = (claimProcessData, claimEntities, incidentId) => {
  const claimData = denormalizeClaimData(claimProcessData, claimEntities);
  claimData.incidentList = lodash
    .chain(claimData.incidentList)
    .filter((item) => item.id !== incidentId)
    .map((item, index) => ({ ...item, incidentNo: index + 1 }))
    .value();

  const result = createNormalizeData(claimData, wholeEntities);
  return result;
};

export const deteteTreatmentById = (claimProcessData, claimEntities, incidentId, treatmentId) => {
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

  claimData.incidentList = newIncidentList;

  const result = createNormalizeData(claimData, wholeEntities);
  return result;
};

export default claimProcessSchema;
