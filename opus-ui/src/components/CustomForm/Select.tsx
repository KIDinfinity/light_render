import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import PopverTips from './Complex/PopverTips';
import transfer from './utils';
import type { ComponentProps, ConnectProps, UpdateProps } from './type';
import SelectComplex from './Complex/SelectItem';

interface IProps extends ComponentProps {
  isShowAll: boolean;
  mode?: string;
}

class Select extends Component<IProps> {
  shouldComponentUpdate(nextProps: UpdateProps): boolean {
    const { value: nextValue, error: nextError, params: nextParams } = nextProps;
    const { value, error, params } = this.props;

    return (
      !lodash.isEqual(nextValue, value) ||
      !lodash.isEqual(nextError, error) ||
      !lodash.isEqual(nextParams, params)
    );
  }

  get isShowAll() {
    const { params } = this.props;
    return params?.isShowAll && params?.mode === 'multiple' && params?.dicts?.length > 1;
  }

  render() {
    const { form, params } = this.props;
    const { decorator, formItem, layout, options } = transfer(params);

    return (
      <Form.Item label={<PopverTips form={form} params={layout} />} {...formItem}>
        {form.getFieldDecorator(params.key, {
          ...decorator,
        })(
          <SelectComplex
            showSearch
            filterOption={(input: any, option: any) =>
              String(option.props.children).toLowerCase().indexOf(String(input).toLowerCase()) >= 0
            }
            {...options}
            isShowAll={this.isShowAll}
          />
        )}
      </Form.Item>
    );
  }
}

export default connect((_: any, { form, params }: ConnectProps) => ({
  value: form.getFieldValue(params.key),
  error: form.getFieldError(params.key),
}))(Select);
