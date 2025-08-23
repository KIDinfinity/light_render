import { useEffect, useMemo } from 'react';
import useLoadPlanProductDurationCallback from 'decision/components/Benefit/Edit/_hooks/useLoadPlanProductDurationCallback';
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
