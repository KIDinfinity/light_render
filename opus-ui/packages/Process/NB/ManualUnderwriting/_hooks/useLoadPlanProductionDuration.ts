import { useEffect, useMemo } from 'react';
import useLoadPlanProductDurationCallback from 'process/NB/ManualUnderwriting/_hooks/useLoadPlanProductDurationCallback';
import { formUtils } from 'basic/components/Form';

export default ({ coverageItem }: any) => {
  const handleLoadPlanProductDuration = useLoadPlanProductDurationCallback({ coverageItem });
  const coreCode = useMemo(() => {
    return formUtils.queryValue(coverageItem?.coreCode);
  }, [coverageItem]);
  useEffect(() => {
    handleLoadPlanProductDuration({ coreCode });
  }, [coreCode]);
};
