import { schema, normalize, denormalize } from 'normalizr';

const createClaimProcessSchema = () => {
  const addressInfo = new schema.Entity('addressInfoMap');
  const contactInfo = new schema.Entity('contactInfoMap');
  const crtInfo = new schema.Entity('crtInfoMap');
  const client = new schema.Entity('clientMap', {
    addressInfoList: [addressInfo],
    contactInfoList: [contactInfo],
    crtInfoList: [crtInfo]
  });

  return {
    clientInfoList: new schema.Array(client),
  };
};
const processSchema = createClaimProcessSchema();

export const wholeEntities = {
  clientMap: {},
  addressInfoMap: {},
  contactInfoMap: {},
  crtInfoMap: {},
};
export const createNormalizeData = (normalizeData: any) => {
  const data = Object.freeze(normalizeData);

  const outputData = normalize(data, processSchema);
  const { entities } = outputData;
  const finalEntities = {
    ...wholeEntities,
    ...entities,
  };
  return {
    processData: outputData.result,
    entities: finalEntities,
  };
};

export const denormalizeClaimData = (processData: any, entities: any) => {
  if (!processData || !entities) return {};
  return denormalize(processData, processSchema, entities);
};
