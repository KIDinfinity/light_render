import { useEffect } from 'react';
import { useDispatch } from 'dva';
import CheckNtuType from 'process/NB/Enum/CheckNtuType';
import { NAMESPACE } from '../activity.config';

export default ({ businessData }: any) => {
  const dispatch = useDispatch();
  const initNtuDataObject = {
    extendtoDate: '',
    extendtoDays: null,
    currentNtuDate: null,
    currentRadio: CheckNtuType.ExtendtoDate,
  };
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/saveNtuDataObject`,
      payload: {
        ntuDataObject: {
          ...initNtuDataObject,
          currentNtuDate: businessData?.policyList?.[0]?.ntuDate,
        },
      },
    });
    dispatch({
      type: `${NAMESPACE}/updateNtuDate`,
      payload: {
        ntuDate: businessData?.policyList?.[0]?.ntuDate,
      },
    });
    return () => {
      dispatch({
        type: `${NAMESPACE}/saveNtuDataObject`,
        payload: {
          ntuDataObject: {},
        },
      });
    };
  }, [businessData]);
};
