import { normalize, denormalize } from 'normalizr';
import { schemaConfig, entitiesConfig } from './normalizrUtils.config';

export const normalizeData = (
  processData: any,
  defaultEntities: any = entitiesConfig,
  schema: any = schemaConfig
) => {
  const { entities, result } = normalize(Object.freeze(processData), schema);

  return {
    processData: result,
    entities: {
      ...defaultEntities,
      ...entities,
    },
  };
};

export const denormalizeData = (
  processData: any,
  entities: any = entitiesConfig,
  schema: any = schemaConfig
) => {
  if (!processData || !entities) return {};
  return denormalize(processData, schema, entities);
};
