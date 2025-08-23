import React, { useMemo } from 'react';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import EditDetail from './EditDetail';
import { localConfig } from './PolicyReplacement-Table/EditSection';

export default () => {
  const config = useGetSectionAtomConfig({
    section: 'PolicyReplacement-Table',
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
  return tenant.region() === Region.ID || tenant.region() === Region.TH  ? <></> : <EditDetail config={newConfig} />;
};
