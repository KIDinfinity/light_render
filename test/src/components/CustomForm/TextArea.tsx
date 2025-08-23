import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form, Input as InputItem } from 'antd';
import PopverTips from './Complex/PopverTips';
import type { ComponentProps, ConnectProps, UpdateProps } from './type';
import transfer from './utils';

interface CompProsp {
  value: string;
  error: string;
}
class TextArea extends Component<ComponentProps, CompProsp> {
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
        })(
          <InputItem.TextArea
            {...options}
            autoSize={{ minRows: 2, maxRows: 5 }}
            autoComplete="disable-chrome-autofill-mark"
          />
        )}
      </Form.Item>
    );
  }
}

export default connect((_: any, { form, params }: ConnectProps) => ({
  value: form.getFieldValue(params.key),
  error: form.getFieldError(params.key),
}))(TextArea);
