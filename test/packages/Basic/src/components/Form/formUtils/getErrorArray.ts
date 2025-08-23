import lodash from 'lodash';
import * as FlattenJS from 'flattenjs';

const getErrorArray = (claimData: any, detail?: boolean = false) => {
  const errors: any[] = [];

  lodash.entries(FlattenJS.convert(claimData)).map(([key, value]) => {

    if (value && key.match(/errors$|errors\[0\]$|errors\[0\].message/)) {
      if (!detail) {
        errors.push(key);
      } else {
        errors.push({
          key,
          message: value,
          field: key.match(/\w+(?=\.errors)/g)?.[0] || ''
        })
      }
    }

    return null;
  });

  return errors;

};

export default getErrorArray;
