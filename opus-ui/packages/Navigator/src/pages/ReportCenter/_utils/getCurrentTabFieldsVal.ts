import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const getCurrentTabFieldsVal = (form: any, reportId: string): any => {
  const regExp = new RegExp(`^${reportId}_`, 'g');
  return formUtils.rangeDateTransferParams(
    lodash.reduce(
      form.getFieldsValue(),
      (result: any, value: any, key: string) => {
        if (regExp.test(key)) {
          const newKey = key.replace(regExp, '');
          result[newKey] = value;
        }
        return result;
      },
      {}
    )
  );
};

export default getCurrentTabFieldsVal;
