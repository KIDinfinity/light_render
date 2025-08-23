import lodash, { isString, trim } from 'lodash';
import { useSelector } from 'dva';
import formUtils from 'basic/components/Form/formUtils';
import { Combine, Domain, Operator } from '../constants';

export const caclculateSingleRule = ({ left, operator, right }: any) => {
  let result: boolean = false;
  switch (operator) {
    case Operator.EQUAL:
      result = left === right;
      break;
    case Operator.NOT_EQUAL:
      result = left !== right;
      break;
    case Operator.EMPTY:
      if (lodash.isNumber(left)) {
        if (left === 0) {
          return true;
        }
        return false;
      }
      result = lodash.isEmpty(left);
      break;
    case Operator.NOT_EMPTY:
      if (lodash.isNumber(left)) {
        if (left === 0) {
          return false;
        }
        return true;
      }
      result = !lodash.isEmpty(left);
      break;
    case Operator.CONTAINS:
      result = lodash.includes(left, right);
      break;
    case Operator.NOT_CONTAINS:
      result = !lodash.includes(left, right);
      break;
    case Operator.IN:
      result = lodash.includes(right, left);
      break;
    case Operator.NOT_IN:
      result = !lodash.includes(right, left);
      break;
    case Operator.LESS:
      result = Number(left || 0) < Number(right);
      break;
    case Operator.LESS_THAN:
      result = Number(left) > Number(right);
      break;
    case Operator.MORE_THAN:
      result = Number(left) >= Number(right);
      break;
    case Operator.MORE:
      result = Number(left) > Number(right);
      break;
    case Operator.INTERSECTION:
      result = lodash.some(right, (item) => lodash.includes(left, item));
      break;
    case Operator.NOT_INTERSECTION:
      result = !lodash.some(right, (item) => lodash.includes(left, item));
      break;
    default:
      break;
  }
  return result;
};

export const cacluateComboRule = ({ combine, conditions }: any) => {
  switch (combine) {
    case Combine.AND:
      return lodash.every(conditions, (item: any) =>
        caclculateSingleRule({
          left: item?.left,
          right: item?.right,
          operator: item?.operator,
        })
      );
    case Combine.OR:
      return lodash.some(conditions, (item: any) =>
        caclculateSingleRule({
          left: item?.left,
          right: item?.right,
          operator: item?.operator,
        })
      );
    default:
      return false;
  }
};

const getValue = ({ target, state, namespace, form, data }: any) => {
  if (!lodash.isPlainObject(target)) {
    return target;
  }
  if (target.domain === Domain.ACTIVITY) {
    const targetSource = (() => {
      if (target.dataPath) {
        return lodash.get(state, `${namespace}.${target.dataPath}`);
      }
      if (target.field) {
        return lodash.get(state, `${namespace}.${target.field}`);
      }
      return null;
    })();
    return formUtils.queryValue(targetSource);
  }
  if (target.domain === Domain.FIELD) {
    return target?.field && form?.getFieldValue(target.field);
  }
  if(target.domain === Domain.CODE) {
    return formUtils.queryValue(data?.[target?.field]);
  }
  return null;
};

const RuleFun = (configs: any, form: any, namespace: string, data = {}) => {
  const getConditionsValue = (currentCondition: any) => {
    const { combine, conditions } = currentCondition || {};
    const values: any[] = lodash.map(lodash.compact(conditions), (condition: any) => {
      if (lodash.has(condition, 'conditions')) {
        return getConditionsValue(condition);
      } else {
        const operator = condition.operator;
        const leftValue = getValue({
          target: condition.left,
          state: {},
          namespace,
          form,
          data,
        });
        const rightValue = getValue({ target: condition.right, state: {}, namespace, form, data });
        return caclculateSingleRule({
          left: leftValue,
          right: rightValue,
          operator,
        });
      }
    });
    switch (combine) {
      case Combine.AND:
        return lodash.every(values);
      case Combine.OR:
        return lodash.some(values);
      default:
        return false;
    }
  };
  return getConditionsValue(configs);
};

const Rule = (configs: any, form: any, namespace: string, data: any = {}) => {
  return useSelector((state: any) => {
    const getConditionsValue = (currentCondition: any) => {
      const { combine, conditions } = currentCondition || {};
      const values: any[] = lodash.map(lodash.compact(conditions), (condition: any) => {
        if (lodash.has(condition, 'conditions')) {
          return getConditionsValue(condition);
        } else {
          const operator = condition.operator;
          const leftValue = getValue({
            target: condition.left,
            state,
            namespace,
            form,
            data,
          });
          const rightValue = getValue({ target: condition.right, state, namespace, form, data });
          return caclculateSingleRule({
            left: leftValue,
            right: rightValue,
            operator,
          });
        }
      });
      switch (combine) {
        case Combine.AND:
          return lodash.every(values);
        case Combine.OR:
          return lodash.some(values);
        default:
          return false;
      }
    };
    return getConditionsValue(configs);
  });
};

const getFormValue = ({ target, form }: any) => {
  if (!lodash.isPlainObject(target)) {
    const isKey = isString(target) && target[0] === '$';
    if (isKey) {
      const key = trim(target, '$');
      return form?.getFieldValue(key);
    }
    return target;
  }
  switch (target.domain) {
    case Domain.FIELD:

    default:
      return target?.field && form?.getFieldValue(target.field);
  }
};
const getDataValue = ({ target, data }: any) => {
  if (!lodash.isPlainObject(target)) {
    const isKey = isString(target) && target[0] === '$';
    if (isKey) {
      const key = trim(target, '$');
      return data?.[key];
    }
  }
  switch (target.domain) {
    case Domain.FIELD:
      return data?.[target?.field];
    default:
      return data?.[target?.field] || target;
  }
};

export const RuleByForm = (initCondition: any, form: any) => {
  const getConditionsValue = (currentCondition: any) => {
    const { combine, conditions } = currentCondition || {};
    const values: any[] = lodash.map(lodash.compact(conditions), (condition: any) => {
      if (lodash.has(condition, 'conditions')) {
        return getConditionsValue(condition);
      } else {
        const operator = condition.operator;
        const leftValue = getFormValue({
          target: condition.left,
          form,
        });
        const rightValue = getFormValue({ target: condition.right, form });
        return caclculateSingleRule({
          left: leftValue,
          right: rightValue,
          operator,
        });
      }
    });
    switch (combine) {
      case Combine.AND:
        return lodash.every(values);
      case Combine.OR:
        return lodash.some(values);
      default:
        return false;
    }
  };
  return getConditionsValue(initCondition);
};
export const RuleByData = (initCondition: any, data: any) => {
  const getConditionsValue = (currentCondition: any) => {
    const { combine, conditions } = currentCondition || {};
    const values: any[] = lodash.map(lodash.compact(conditions), (condition: any) => {
      if (lodash.has(condition, 'conditions')) {
        return getConditionsValue(condition);
      } else {
        const operator = condition.operator;
        const leftValue = getDataValue({
          target: condition.left,
          data,
        });
        const rightValue = getDataValue({ target: condition.right, data });
        const a = caclculateSingleRule({
          left: leftValue,
          right: rightValue,
          operator,
        });
        return a;
      }
    });
    switch (combine) {
      case Combine.AND:
        return lodash.every(values);
      case Combine.OR:
        return lodash.some(values);
      default:
        return false;
    }
  };
  return getConditionsValue(initCondition);
};
export const getConditionsValue = (
  currentCondition: any,
  state: any,
  namespace: string,
  form: any,
  data: any = {},
) => {
  const { combine, conditions } = currentCondition || {};
  const values: any[] = lodash.map(lodash.compact(conditions), (condition: any) => {
    if (lodash.has(condition, 'conditions')) {
      return getConditionsValue(condition, state, namespace, form);
    } else {
      const operator = condition.operator;
      const leftValue = getValue({
        target: condition.left,
        state,
        namespace,
        form,
        data,
      });
      const rightValue = getValue({ target: condition.right, state, namespace, form, data });
      return caclculateSingleRule({
        left: leftValue,
        right: rightValue,
        operator,
      });
    }
  });
  switch (combine) {
    case Combine.AND:
      return lodash.every(values);
    case Combine.OR:
      return lodash.some(values);
    default:
      return false;
  }
};
export { Combine, Operator, RuleFun };
export default Rule;
