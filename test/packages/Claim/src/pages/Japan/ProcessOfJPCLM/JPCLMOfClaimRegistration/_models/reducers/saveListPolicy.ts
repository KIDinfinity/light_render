import lodash from 'lodash';

const saveListPolicy = (state: any, action: any) => ({
  ...state,
  listPolicy: lodash.map(action.payload, (item) => ({ dictCode: item, dictName: item })),
});

export default saveListPolicy;
