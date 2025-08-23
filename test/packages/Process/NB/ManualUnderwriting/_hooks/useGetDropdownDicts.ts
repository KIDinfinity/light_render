import { useMemo } from 'react';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export default (typeCodes: Record<string, string> = {}) => {
  return useMemo(() => {
    return lodash
      .chain(typeCodes)
      .entries()
      .reduce((dicts, [key, typeCode]) => {
        dicts[key] = getDrowDownList(typeCode);
        return dicts;
      }, {})
      .value();
  }, [typeCodes]);
};
