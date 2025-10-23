import React from 'react';
import Detail from './Detail';
import { tenant, Region } from '@/components/Tenant';

const PolicyReplacement = () => {
  return (tenant.region() !== Region.TH && <Detail />) || <></>;
};

PolicyReplacement.displayName = 'policyReplacement';

export default PolicyReplacement;
