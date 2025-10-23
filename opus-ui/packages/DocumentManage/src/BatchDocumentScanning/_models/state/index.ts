import { tenant, Region } from '@/components/Tenant';

export default {
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
