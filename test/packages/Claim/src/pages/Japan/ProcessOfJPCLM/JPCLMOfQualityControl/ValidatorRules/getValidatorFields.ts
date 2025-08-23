import checkValidator from './checkValidator';
import { reduce, keys, get, isEqual } from 'lodash';
import { formUtils } from 'basic/components/Form';

export default ({ mappingKeys, checkValue, data }: any) =>
  reduce(
    keys(mappingKeys),
    (valueMap, field) => {
      const value = formUtils.queryValue(data[field]);
      const oldErrors = get(data[field], 'errors');
      const validator = mappingKeys[field];

      let newErrors = checkValidator({
        field,
        validator,
        checkValue,
        value,
      });

      // 多条规则命中时，如果新的错误空，旧的错误存在，那么保留旧的错误
      if (oldErrors && !newErrors) {
        const ErrorMessage = checkValidator({ field, validator, isShowErrors: true });
        if (!isEqual(ErrorMessage, oldErrors)) {
          newErrors = oldErrors;
        }
      }

      return {
        ...valueMap,
        [field]: {
          name: field,
          value,
          touched: true,
          dirty: false,
          errors: newErrors,
          validating: false,
        },
      };
    },
    {}
  );
