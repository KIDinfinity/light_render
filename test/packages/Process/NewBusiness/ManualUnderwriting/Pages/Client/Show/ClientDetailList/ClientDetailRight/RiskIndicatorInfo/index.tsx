import React from 'react';
import Section from './Section';
import { tenant, Region } from '@/components/Tenant';
import useShowNSS from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useShowNSS';
import useShowCRR from 'process/NewBusiness/ManualUnderwriting/Pages/Client/_hooks/useShowCRR';

export default (props: any) => {
  const { clientId } = props;
  const isShowNSS = useShowNSS(clientId);
  const isShowCRR = useShowCRR(clientId);
  const isShow = tenant.region({
    [Region.VN]: true,
    [Region.KH]: true,
    [Region.ID]: isShowNSS || isShowCRR,
    notMatch: false,
  });
  return <>{isShow && <Section {...props} />}</>;
};
