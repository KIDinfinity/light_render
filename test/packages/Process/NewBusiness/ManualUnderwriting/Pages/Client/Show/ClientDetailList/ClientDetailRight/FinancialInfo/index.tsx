import React from 'react';
import Section from './Section';
import Table from './Table';
import useJudgeDisplayFinancialInfoTable from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useJudgeDisplayFinancialInfoTable';
import { tenant, Region } from '@/components/Tenant';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default (props: any) => {
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const expand = !!expandedClientId;
  const display = useJudgeDisplayFinancialInfoTable({
    clientId: props?.id,
    readOnly: true,
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
      <Section {...props} />
      {expand && isShow && <Table {...props} />}
    </>
  );
};
