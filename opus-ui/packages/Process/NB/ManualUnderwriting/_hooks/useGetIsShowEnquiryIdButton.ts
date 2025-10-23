import { useMemo } from 'react';
import lodash from 'lodash';
import useGetEnquiryId from 'process/NB/ManualUnderwriting/_hooks/useGetEnquiryId';
import useGetRoleListById from 'process/NB/ManualUnderwriting/_hooks/useGetRoleListById';
import useGetUWMELinkRule from 'process/NB/ManualUnderwriting/_hooks/useGetUWMELinkRule';
import { tenant, Region } from '@/components/Tenant';

export default ({ clientId }: any) => {
  const regionCode = tenant.region();
  const enquiryId = useGetEnquiryId({ clientId });
  const roleList = useGetRoleListById({ id: clientId });
  const displayUWMELink = useGetUWMELinkRule();
  const customerRoleList = lodash.map(roleList, (role) => role.customerRole);
  return useMemo(() => {
    if (regionCode === Region.TH) {
      return false;
    }
    if (lodash.isEmpty(enquiryId)) {
      return false;
    }
    if (!displayUWMELink) {
      return false;
    }
    // Amber new requirement: only insurer and owner display UWMe link
    if (
      !lodash.includes(customerRoleList, 'CUS001') &&
      !lodash.includes(customerRoleList, 'CUS002')
    ) {
      return false;
    } else {
      return true;
    }
  }, [customerRoleList, displayUWMELink, enquiryId, regionCode]);
};
