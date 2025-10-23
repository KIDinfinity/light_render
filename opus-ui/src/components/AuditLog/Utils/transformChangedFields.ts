import lodash from 'lodash';
import AuditConfig from 'claim/pages/auditLog.config';
/**
 * //存在一些字段在存储到数据源时，变更了fieldName以及value导致匹配不上(如manualAssessment的oldBenefitTypeCode)
 */
export default ({ changedFields, currentController, simplifyPath }) => {
  let curChangedFields = lodash.cloneDeep(changedFields);
  if (
    !lodash.isArray(curChangedFields) ||
    !lodash.isString(currentController) ||
    curChangedFields?.length < 1
  ) {
    return curChangedFields;
  }
  //获取配置
  const needTransformChangedFieldList = lodash
    .chain(AuditConfig)
    .find({ namespace: currentController })
    .get('needTransformChangedFieldList')
    .value();
  if (!lodash.isArray(needTransformChangedFieldList) || needTransformChangedFieldList?.length < 1) {
    return curChangedFields;
  }
  //changedField.name
  curChangedFields = curChangedFields?.map((item) => {
    const targetConfig = needTransformChangedFieldList?.find((ele) => {
      return ele?.path === simplifyPath && ele?.fieldName === item?.__change?.name;
    });
    if (targetConfig) {
      const tempName = targetConfig?.realFieldName
        ? targetConfig?.realFieldName
        : item?.__change?.name;
      const tempValue = lodash.isFunction(targetConfig?.realValueCalFunc)
        ? targetConfig?.realValueCalFunc(item?.__change?.value)
        : item?.__change?.value;
      const __change = {
        ...item,
        __change: {
          ...item?.__change,
          name: tempName,
          value: tempValue,
        },
      };
      return {
        ...item,
        ...__change,
      };
    } else {
      return item;
    }
  });
  return curChangedFields;
};
