import React from 'react';
import Section from './Section';
import useJudgeDisplayFinancialInfoTable from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useJudgeDisplayFinancialInfoTable';
// import { tenant, Region } from '@/components/Tenant';
import { useSelector } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default (props: any) => {
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const expand = !!expandedClientId;
  const display = useJudgeDisplayFinancialInfoTable({
    clientId: props?.id,
    readOnly: true,
  });
  // const isShow = tenant.region({
  //   [Region.PH]: false,
  //   [Region.TH]: false,
  //   [Region.KH]: false,
  //   [Region.MY]: true,
  //   [Region.ID]: true,
  //   notMatch: display,
  // });

  return (
    <>
      {expand && (
        <>
          <Section {...props} />
        </>
      )}
    </>
  );
};
