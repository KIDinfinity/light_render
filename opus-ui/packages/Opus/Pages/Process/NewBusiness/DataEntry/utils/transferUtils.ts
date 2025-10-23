import { formUtils } from 'basic/components/Form';

const transferLinkFieldUtils = (params: {
  sourceKey: string;
  targetKey: string;
  sourceObject: object;
  targetObject: object;
}) => {
  const { sourceKey, targetKey, sourceObject, targetObject } = params;
  if (sourceObject?.[sourceKey] && sourceObject?.[sourceKey].value) {
    targetObject[targetKey] = formUtils.queryValue(sourceObject?.[sourceKey]);
  }
};
const transferFormFieldToValueString = (formField) => {
  const value = formUtils.queryValue(formField);
  return value === null ? '' : value;
};
export { transferLinkFieldUtils, transferFormFieldToValueString };
