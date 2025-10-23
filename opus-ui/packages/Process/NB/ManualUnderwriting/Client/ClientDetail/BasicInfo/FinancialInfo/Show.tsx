import React from 'react';
import { tenant, Region } from '@/components/Tenant';
import Fields from './FinancialInfo-Field/ReadOnly';
import Table from './FinancialInfo-Table/ReadOnly';
import useJudgeDisplayFinancialInfoTable from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayFinancialInfoTable';

export default (props: any) => {
  const display = useJudgeDisplayFinancialInfoTable({
    clientId: props?.id,
  });
  const isShow = tenant.region({
    [Region.PH]: false,
    [Region.TH]: false,
    [Region.KH]: false,
    [Region.MY]: true,
    [Region.ID]: true,
    notMatch: display,
  });
  return (
    <>
      <Fields {...props} />
      {isShow && <Table {...props} />}
    </>
  );
};
