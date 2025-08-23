import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useHandleSelectSustainabilityCheckingOption from 'process/NB/ManualUnderwriting/_hooks/useHandleSelectSustainabilityCheckingOption';

export default () => {
  const dispatch = useDispatch();
  const confirmedSustainabilityCheckingSelected = useSelector(
    ({ [NAMESPACE]: modelnameSpace }: any) =>
      modelnameSpace?.confirmedSustainabilityCheckingSelected,
    shallowEqual
  );

  const handleSelect = useHandleSelectSustainabilityCheckingOption({
    optionName: confirmedSustainabilityCheckingSelected,
  });

  return useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/setSustainabilityCaseModalVisible`,
      payload: {
        sustainabilityCaseModalVisible: false,
      },
    });
    handleSelect();
  }, [handleSelect]);
};
