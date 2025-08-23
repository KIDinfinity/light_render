import { useEffect } from 'react';
import { useDispatch } from 'dva';

export default () => {
  const dispatch = useDispatch();
  const atomGroupCode = 'BP_NB_CTG001_BP_NB_ACT002';
  useEffect(() => {
    if (atomGroupCode) {
      dispatch({
        type: 'atomConfig/loadAtomGroup',
        payload: {
          atomGroupCode,
        },
      });
    }
  }, [atomGroupCode]);
};
