import { useMemo } from 'react';
import lodash from 'lodash';
import useGetRelateJointLifeCoverageInsured from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useGetRelateJointLifeCoverageInsured';
export default ({ coreCode }: any) => {
  const relateJointLifeCoverageInsured = useGetRelateJointLifeCoverageInsured({ coreCode });
  return useMemo(() => {
    return lodash.map(relateJointLifeCoverageInsured, (insured: any) => insured?.insuredId);
  }, [relateJointLifeCoverageInsured]);
};
