import React, { PureComponent } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import InputNumber from './InputNumber';
import type { ComponentProps } from './type';
import './index.less';

const Arrows = styled.div`
  width: 30px;
  text-align: center;
  position: relative;
  display: inline-block;
`;
class InputNumberRange extends PureComponent<ComponentProps> {
  render() {
    const { form, params } = this.props;
    const { options1 = {}, options2 = {} } = params;
    return (
      <div className="customFormRangeBox">
        <Input.Group compact size="small">
          <InputNumber
            {...this.props}
            form={form}
            params={{
              ...options1,
            }}
          />
          <Arrows>~</Arrows>
          <InputNumber
            {...this.props}
            form={form}
            params={{
              ...options2,
              title: '',
            }}
          />
        </Input.Group>
      </div>
    );
  }
}

export default InputNumberRange;
