import React from 'react';
import { tenant, Region } from '@/components/Tenant';
import EditFields from './FinancialInfo-Field/Edit';
import EditTable from './FinancialInfo-Table/Edit';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from './FinancialInfo-Field/Section';
import useJudgeDisplayFinancialInfoTable from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayFinancialInfoTable';
export default (props: any) => {
  const config = useGetSectionAtomConfig({
    section: 'FinancialInfo-Field',
    localConfig,
  });

  const display = useJudgeDisplayFinancialInfoTable({
    clientId: props?.id,
  });
  return (
    <>
      <EditFields {...props} config={config} />
      {display &&
        tenant.region({
          [Region.ID]: <EditTable {...props} />,
          [Region.MY]: <EditTable {...props} />,
          notMatch: null,
        })}
    </>
  );
};
