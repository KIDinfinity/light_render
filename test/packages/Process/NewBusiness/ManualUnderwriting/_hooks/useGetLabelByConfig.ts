import { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default (sectionConfig: any) => {
  return useMemo(() => {
    return lodash
      .chain(sectionConfig)
      .map((item) => item?.['field-props'])
      .filter((item) => item?.visible === 'Y' || item?.visible === 'C')
      .orderBy([(item) => item?.['x-layout']?.lg?.order, 'asc'])
      .map((item) => {
        const dictCode = lodash.get(item, 'label.dictCode');
        const dictTypeCode = lodash.get(item, 'label.dictTypeCode');
        const span = lodash.get(item, '[x-layout].lg.span');
        return {
          label: formatMessageApi({ [dictTypeCode]: dictCode }),
          span,
          code: dictCode,
        };
      })
      .value();
  }, [sectionConfig]);
};
