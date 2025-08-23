import lodash from 'lodash';

export default (changedFields: any) => {
  const changedFieldsEntries = lodash.values(changedFields || {});
  if (lodash.isEmpty(changedFieldsEntries)) return true;
  return lodash.findIndex(changedFieldsEntries, (item: any) => !item.dirty) !== -1;
};
