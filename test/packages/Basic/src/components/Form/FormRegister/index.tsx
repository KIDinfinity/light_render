import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { v4 as uuid } from 'uuid';

const NAMESPACE = 'formCommonController';

export default ({
  form,
  formId,
  register = true,
  children,
  namespace = NAMESPACE,
  section = '',
}: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!register) return () => {};

    const id = formId || uuid();
    dispatch({
      type: `${namespace}/registerForm`,
      payload: {
        form,
        formId: id,
        section,
      },
    });

    return () => {
      dispatch({
        type: `${namespace}/unRegisterForm`,
        payload: {
          form,
          formId: id,
        },
      });
    };
  }, []);

  return <>{children}</>;
};
