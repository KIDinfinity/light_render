import useFamilyGroupIndInclude from './useFamilyGroupIndInclude';
import { tenant, Region } from '@/components/Tenant';
import { useMemo } from 'react';
import useJudgeIsGBSN from 'basic/components/CaseContainer/hooks/useJudgeIsGBSN';

export default (params: {groupInd: string[]}) => {
  const {groupInd} = params
  const showEPF = useFamilyGroupIndInclude({groupInd})
  const isGBSN = useJudgeIsGBSN();
  return useMemo(() => {
    return (
      tenant.region() === Region.MY &&
      showEPF && !isGBSN
    );
  }, [showEPF,isGBSN]);
}
