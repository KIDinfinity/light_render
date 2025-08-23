import { tenant, Region } from '@/components/Tenant';

const clearClaimProcessData = (state: any) => {
  return {
    type: tenant.region({
      [Region.MY]: 'PendingDocument',
      notMatch: 'NewRequest',
    }),
    claimProcessData: [],
    searchInsuredObj: {
      policySource: 'Individual',
      firstName: '',
      middleName: '',
      surname: '',
      dateOfBirth: '',
      gender: '',
      clientId: '',
      policyId: '',
    },
  };
};

export default clearClaimProcessData;
