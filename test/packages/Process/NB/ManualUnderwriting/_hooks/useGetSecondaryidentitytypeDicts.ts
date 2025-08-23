import { useMemo } from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';

export default ({ config, fieldConfig, nationality }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const defaultDicts = getDrowDownList({ config, fieldProps });

  return useMemo(() => {
    return tenant.region({
      [Region.ID]:
        nationality !== 'RI'
          ? lodash.filter(defaultDicts, (item) => ['KIMS', 'KITAS'].includes(item.dictCode))
          : defaultDicts,
      notMatch: defaultDicts,
    });
  }, [nationality, defaultDicts]);
};
