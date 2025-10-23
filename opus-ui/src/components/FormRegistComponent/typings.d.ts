import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';

export interface IFormRegistProps extends FormComponentProps {
  dispatch?: Dispatch<any>;
}
