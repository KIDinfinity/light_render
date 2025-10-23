import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import PopverTips from './Complex/PopverTips';
import type { ComponentProps, ConnectProps } from './type';
import transfer from './utils';
import CustomDate from './Complex/Date';

class DatePicker extends Component<ComponentProps> {
  static defaultProps: { format: string };

  shouldComponentUpdate(nextProps: ComponentProps): boolean {
    const { value: nextValue, error: nextError, params: nextParams } = nextProps;
    const { value, error, params } = this.props;

    return (
      !lodash.isEqual(nextValue, value) ||
      !lodash.isEqual(nextError, error) ||
      !lodash.isEqual(nextParams, params)
    );
  }

  render() {
    const { form, params } = this.props;
    const { decorator, formItem, layout, options } = transfer(params);
    const props = {
      ...options,
    };
    return (
      <Form.Item label={<PopverTips form={form} params={layout} />} {...formItem}>
        {form.getFieldDecorator(decorator.key, {
          ...decorator,
          initialValue: decorator.initialValue,
        })(<CustomDate {...props} />)}
      </Form.Item>
    );
  }
}

DatePicker.defaultProps = {
  format: 'L LTS',
};

export default connect((_: any, { form, params }: ConnectProps) => ({
  value: form.getFieldValue(params.key),
  error: form.getFieldError(params.key),
}))(DatePicker);
