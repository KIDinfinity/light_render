import type { Dispatch } from 'redux';
import type { WrappedFormUtils } from 'antd/es/form/Form';

const defNameSpace = 'formCommonController';

export const registForm = (
  form: WrappedFormUtils<any>,
  formId: string,
  dispatch: Dispatch<any>,
  nameSpace?: string
) => {
  setTimeout(() => {
    dispatch({
      type: `${nameSpace || defNameSpace}/registerForm`,
      payload: {
        form,
        formId,
      },
    });
  });
};

export const unRegistForm = (
  form: WrappedFormUtils<any>,
  formId: string,
  dispatch: Dispatch<any>,
  nameSpace?: string
) => {
  setTimeout(() => {
    dispatch({
      type: `${nameSpace || defNameSpace}/unRegisterForm`,
      payload: {
        form,
        formId,
      },
    });
  });
};
