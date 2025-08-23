import React, { PureComponent } from 'react';
import { Input } from 'antd';
import { Form } from 'antd';
import transfer from './utils';
import PopverTips from './Complex/PopverTips';
import InputNumber from './InputNumber';
import type { ComponentProps } from './type';
import styles from './index.less';

class InputNumberRange extends PureComponent<ComponentProps> {
  render() {
    const { form, params } = this.props;
    const { options1 = {}, options2 = {} } = params;
    const { formItem, layout } = transfer(params);

    return (
      //
      <Form.Item label={<PopverTips form={form} params={layout} />} {...formItem}>
        <Input.Group compact size="small">
          <div className={styles.numberRangeWrap}>
            <InputNumber
              {...this.props}
              form={form}
              params={{
                ...options1,
                title: '',
              }}
            />
            ~ &nbsp;
            <InputNumber
              {...this.props}
              form={form}
              params={{
                ...options2,
                title: '',
              }}
            />
          </div>
        </Input.Group>
      </Form.Item>
    );
  }
}

export default InputNumberRange;
