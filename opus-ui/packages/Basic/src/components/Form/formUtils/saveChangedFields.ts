import lodash from 'lodash';
type changedField = {
  dirty: false,
  errors?: any,
  format: string,
  label: string,
  locale_new?: string,
  locale_old?: string,
  name: string,
  touched: boolean,
  validating: boolean,
  value: any,
}
type changedFields = Record<string, changedField>

function saveChangedFields({ baseObject, path, changedFields, compare = false }: { baseObject: any, path?: string, changedFields: changedFields, compare?: boolean }): boolean {
  let changed = false;
  if(path && !lodash.get(baseObject, path)) {
    lodash.set(baseObject, path, {});
  }
  const draftObject = path? lodash.get(baseObject, path) : baseObject;
  Object.keys(changedFields).map(key => {
    if(!compare || !lodash.isEqual(draftObject[key], changedFields[key])) {
      changed = true;
      draftObject[key] = changedFields[key];
    }
  })
  return changed;
}

export type { changedFields };
export default saveChangedFields;