import { useMemo } from 'react';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';
import useExistIndividualPolicyOwner from 'process/NB/ManualUnderwriting/_hooks/useExistIndividualPolicyOwner';
import { formUtils } from 'basic/components/Form';

const relationOfInsuredTargetList = ['CHIN', 'CHRH', 'ES'];

export default ({ id }: any) => {
  const regionCode = tenant.region();
  const list = useGetClientDetailList();
  const existEntityPolicyOwner = useExistIndividualPolicyOwner();
  const currentClientInfo = useMemo(() => {
    return lodash.find(list, (client: any) => client.id === id);
  }, [id, list]);
  return useMemo(() => {
    const isTargetRelationOfInsured = lodash.includes(
      relationOfInsuredTargetList,
      formUtils.queryValue(lodash.get(currentClientInfo, 'relationOfInsured'))
    );
    return isTargetRelationOfInsured && existEntityPolicyOwner && regionCode === Region.PH;
  }, [currentClientInfo, regionCode, existEntityPolicyOwner]);
};
