import { useEffect } from 'react';
import { useDispatch } from 'dva';
import AtomCode from 'enum/AtomCode';
import AtomGroupCode from 'enum/AtomGroupCode';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'atomConfig/loadSingleAtom',
      payload: {
        atomGroupCode: AtomGroupCode.InformationAdd,
        atomCode: AtomCode.InformationAddConfig,
      },
    });
    dispatch({
      type: 'atomConfig/loadGroup',
      payload: {
        atomGroupCode: AtomGroupCode.InformationAdd,
      },
    });
  }, []);
};
