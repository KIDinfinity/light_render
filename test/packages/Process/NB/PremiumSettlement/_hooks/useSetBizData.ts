import { useEffect } from 'react';
import { useDispatch } from 'dva';
import usePatchSelectionAndSource from 'process/NB/PremiumSettlement/_hooks/usePatchSelectionAndSource';
import usePatchTypeAndSelectionWhenSingleBankInfo from 'process/NB/PremiumSettlement/_hooks/usePatchTypeAndSelectionWhenSingleBankInfo';
import { NAMESPACE } from '../activity.config';

export default ({ businessData }: any) => {
  const dispatch = useDispatch();
  const patchBankInfo = usePatchSelectionAndSource({ businessData });
  const patchTypeData = usePatchTypeAndSelectionWhenSingleBankInfo({
    businessData: patchBankInfo,
  });
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/saveBizData`,
      payload: {
        businessData: patchTypeData,
      },
    });
    return () => {
      dispatch({
        type: `${NAMESPACE}/saveBizData`,
        payload: {
          businessData: {},
        },
      });
    };
  }, [patchTypeData]);
};
