import { useMemo } from 'react';
import lodash from 'lodash';
import useGetRelateJointLifeCoverageInsured from 'process/NB/ManualUnderwriting/_hooks/useGetRelateJointLifeCoverageInsured';

export default ({ coreCode }: any) => {
  const relateJointLifeCoverageInsured = useGetRelateJointLifeCoverageInsured({ coreCode });
  return useMemo(() => {
    return lodash.map(relateJointLifeCoverageInsured, (insured: any) => insured?.insuredId);
  }, [relateJointLifeCoverageInsured]);
};
