import { useMemo } from 'react';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import useJudgeIsEntityPolicyOwner from 'process/NB/ManualUnderwriting/_hooks/useJudgeIsEntityPolicyOwner';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

export default ({ id, contactId }: any) => {
  const regionCode = tenant.region();
  const list = useGetClientDetailList();
  const isEntityPolicyOwner = useJudgeIsEntityPolicyOwner({ id });
  const contactInfoList = lodash
    .chain(list)
    .find((client: any) => client.id === id)
    .get('contactInfoList')
    .sortBy((contact: any) => contact?.contactSeqNum)
    .value();
  return useMemo(() => {
    const currentContactIndex = lodash
      .chain(contactInfoList)
      .findIndex((contact: any) => contact.id === contactId)
      .value();
    return currentContactIndex < 2 && regionCode === Region.PH && isEntityPolicyOwner;
  }, [regionCode, contactInfoList, contactId, isEntityPolicyOwner]);
};
