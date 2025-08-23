import { useEffect } from 'react';
import { useDispatch } from 'dva';

export default ({ atomGroupCode }: any) => {
  const dispatch = useDispatch();
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
