import lodash from 'lodash';
import * as FlattenJS from 'flattenjs';

const formatFlattenValue = (obj: any, preserveEmpty?: boolean) => {
  let result = {};

  if (lodash.isObject(obj)) {
    const flattened = FlattenJS.convert(obj, preserveEmpty);

    Object.keys(flattened).forEach((path) => {
      const value = flattened[path];
      if (lodash.isBoolean(value)) {
        flattened[path] = value ? 1 : 0;
      }
    });

    result = FlattenJS.undo(flattened);
  }

  return result;

};

export default formatFlattenValue;
