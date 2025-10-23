interface DecoratorProps {
  key?: string;
  getValueFromEvent?: Function;
  initialValue?: string;
  normalize?: Function;
  preserve?: boolean;
  rules?: any[];
  trigger?: string;
  validateFirst?: boolean;
  validateTrigger?: string | string[];
  valuePropName?: string;
}

export interface FormProps {
  getFieldValue: Function;
  getFieldError: Function;
  getFieldDecorator: Function;
  getFieldsValue: Function;
  isFieldsTouched: (names?: string[]) => boolean;
}

export interface LayoutProps {
  key?: string;
  title?: string;
  labelId?: string;
  description?: string;
}

export interface ParamsProps {
  key?: string;
  getValueFromEvent?: Function;
  initialValue?: string | string[];
  normalize?: Function;
  preserve?: boolean;
  rules?: any[];
  trigger?: string;
  validateFirst?: boolean;
  validateTrigger?: string | string[];
  valuePropName?: string;
  itemStyle?: Object;
  itemClassName?: string;
  labelId?: string;
  title?: string;
  description?: string;
  style?: Object;
  options1?: ParamsProps;
  options2?: ParamsProps;
  colon?: boolean;
  layout?: any;
  isShowAll?: any;
}

export interface OptionsProps {
  dicts?: any[];
  dictsKey?: string;
  dictsValue?: string;
  isShowAll?: boolean;
}

export interface ParamsOutputProps {
  layout?: LayoutProps;
  decorator: DecoratorProps;
  formItem?: Object;
  options: OptionsProps;
}

export interface ComponentProps {
  // params: ParamsProps;
  form: FormProps;
  value: string;
  error: string;
  key: string;
  params: any;
  dicts?: any;
}

export interface ConnectProps {
  form: FormProps;
  params: ParamsProps;
}

export interface UpdateProps {
  value: string;
  error: string;
  params: ParamsProps;
}
