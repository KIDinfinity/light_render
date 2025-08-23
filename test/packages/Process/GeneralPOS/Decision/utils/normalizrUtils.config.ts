import { schema } from 'normalizr';

const createSchemaConfig = () => {
  const policyInfoBOListMap = new schema.Entity(
    'policyInfoBOListMap',
    {},
    {
      idAttribute: (value: any, parent: any) => {
        return `${parent.id}____${value.policyId}`;
      },
    }
  );
  const transactionType = new schema.Entity('transactionTypesMap', {
    applyToPolicyBOList: new schema.Array(policyInfoBOListMap),
  });

  return {
    transactionTypes: new schema.Array(transactionType),
  };
};
const schemaConfig = createSchemaConfig();

const entitiesConfig = {
  policyInfoBOListMap: {},
  transactionTypesMap: {},
};

export { schemaConfig, entitiesConfig };
