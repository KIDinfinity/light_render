import lodash from 'lodash';
import * as FlattenJS from 'flattenjs';

const formatFlattenWithoutTransferBooleanValue = (obj: any) => {
  let result = {};

  if (lodash.isObject(obj)) {
    //cleanValidateData里面经过了convert，这里直接undo，如果再convert一下，部分空list会被删除
    result = FlattenJS.undo(obj);
  }

  return result;
};

export default formatFlattenWithoutTransferBooleanValue;
