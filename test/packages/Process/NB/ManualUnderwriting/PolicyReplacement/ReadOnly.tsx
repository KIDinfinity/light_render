import React from 'react';
import Detail from './Detail';
import { tenant, Region } from '@/components/Tenant';

const PolicyReplacement = () => {
  const region = tenant.region();
  return (region !== Region.TH && region !== Region.ID && <Detail />) || <></>;
};

PolicyReplacement.displayName = 'policyReplacement';

export default PolicyReplacement;
