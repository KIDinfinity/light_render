import { useEffect } from 'react';
import { useDispatch } from 'dva';

export default (form: any, formId: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: 'userManagement/registerForm',
      payload: {
        form,
        formId,
      },
    });
  }, []);
};
