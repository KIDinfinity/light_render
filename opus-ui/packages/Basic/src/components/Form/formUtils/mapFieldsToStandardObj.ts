import mapFieldsToObj from './mapFieldsToObj';

const mapFieldsToStandardObj = (
  changedFields: any,
  parentKey: any,
  pathKey: any,
  pathValue: any
) => {
  const result = mapFieldsToObj(changedFields);
  return {
    parentKey,
    key: pathKey,
    value: pathValue,
    obj: result,
  };
};

export default mapFieldsToStandardObj;
