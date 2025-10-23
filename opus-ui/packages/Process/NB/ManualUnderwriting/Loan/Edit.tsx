import React, { useMemo } from 'react';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import EditDetail from './EditDetail';
import { localConfig } from './Load-Table/EditSection';

export default () => {
  const config = useGetSectionAtomConfig({
    section: 'Load-Table',
    localConfig,
  });
  const newConfig = useMemo(() => {
    return lodash
      .chain(config)
      .filter(
        (item) =>
          item?.['field-props']?.visible === 'Y' && lodash.get(item, 'field') !== 'clientName'
      )
      .value();
  }, [config]);
  return tenant.region() === Region.KH ? <EditDetail config={newConfig} /> : <></>;
};
