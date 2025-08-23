import type { ComponentType} from 'react';
import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { v4 as uuid } from 'uuid';
import type { Dispatch } from 'redux';
import type { FormComponentProps, WrappedFormUtils } from 'antd/es/form/Form';
import { registForm, unRegistForm } from './formDispatchs';

export { registForm, unRegistForm };

export interface IFormRegistProps extends FormComponentProps {
  dispatch?: Dispatch<any>;
  formId?: string;
}

interface IParams {
  nameSpace?: string;
  formId?: string;
  formIdPrefix?: string;
  unRegist?: boolean; // 不注销form
}

/**
 * 表单注册组件，并可以选择state的数据返回
 * @param selecter redux state 选择器函数，返回全部或部分state数据，禁止传入组件（函数和类组件）
 * @param WrappedComponent 被包装组件
 */
// selecter?: (state: any) => any
const FormRegistComponent = (params: IParams = {}) => (WrappedComponent: ComponentType<any>) => {
  const FunctionComponent = (props: IFormRegistProps) => {
    const dispatch = useDispatch();
    let formIdTemp = uuid();

    useEffect(() => {
      const { nameSpace, formId, unRegist, formIdPrefix } = params;
      const { form, formId: formIdProps } = props;
      formIdTemp = formId || formIdProps || formIdTemp;
      formIdTemp = formIdPrefix ? `${formIdPrefix}-${formIdTemp}` : formIdTemp;

      registForm(form as WrappedFormUtils, formIdTemp, dispatch, nameSpace);

      return () => {
        if (!unRegist) {
          unRegistForm(form as WrappedFormUtils, formIdTemp, dispatch, nameSpace);
        }
      };
    }, []);

    return <WrappedComponent {...props} formId={formIdTemp} />;
  };

  return FunctionComponent;
};

export default FormRegistComponent;
