import { useEffect } from 'react';
import { useDispatch } from 'dva';

export default (form: any, formId: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch({
        type: 'userManagement/unRegisterForm',
        payload: {
          form,
          formId,
        },
      });
    };
  }, []);
};
