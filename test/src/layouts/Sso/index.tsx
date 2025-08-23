import React from 'react';
import { tenant, Region } from '@/components/Tenant';
import THAuthorized from './th';
import OktaAuthorized from './Okta';

export default (props: any, Jump?: any) => {
  return tenant.region({
    [Region.TH]: () => <THAuthorized {...props} />,
    [Region.JP]: () => <OktaAuthorized {...props} />,
    [Region.ID]: () => <OktaAuthorized {...props} />,
    [Region.VN]: () => <OktaAuthorized {...props} />,
    notMatch: () => (React.isValidElement(<Jump />) ? <Jump /> : null),
  });
};
