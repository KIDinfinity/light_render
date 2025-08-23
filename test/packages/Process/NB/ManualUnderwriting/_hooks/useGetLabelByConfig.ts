import { useMemo } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ tableConfig }: any) => {

  return useMemo(() => {
    return lodash
      .chain(tableConfig)
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
        };
      })
      .value();
  }, [tableConfig]);
};
