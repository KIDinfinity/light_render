import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form, InputNumber } from 'antd';
import PopverTips from './Complex/PopverTips';
import type { ComponentProps, ConnectProps, UpdateProps } from './type';
import transfer from './utils';

interface CompProps {
  value: string;
  error: string;
}
class InputNumberItem extends Component<ComponentProps, CompProps> {
  shouldComponentUpdate(nextProps: UpdateProps): boolean {
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

    return (
      <Form.Item label={<PopverTips form={form} params={layout} />} {...formItem}>
        {form.getFieldDecorator(decorator.key, {
          ...decorator,
          initialValue: decorator.initialValue,
        })(<InputNumber {...options} autoComplete="disable-chrome-autofill-mark" />)}
      </Form.Item>
    );
  }
}

export default connect((_: any, { form, params }: ConnectProps) => ({
  value: form.getFieldValue(params.key),
  error: form.getFieldError(params.key),
}))(InputNumberItem);
