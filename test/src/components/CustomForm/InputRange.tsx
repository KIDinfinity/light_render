import React, { Component } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import type { FormComponentProps } from 'antd/es/form/Form';
import InputItem from './Input';
import './index.less';

const Arrows = styled.div`
  width: 2.1429rem;
  text-align: center;
  position: relative;
  display: inline-block;
`;

interface Iprops {
  form: FormComponentProps;
  params: any;
}

class InputRange extends Component<Iprops> {
  render() {
    const { form, params } = this.props;
    const { options1 = {}, options2 = {} } = params;
    return (
      <div className="customFormRangeBox">
        <Input.Group compact size="small">
          <InputItem
            {...this.props}
            form={form}
            params={{
              ...options1,
            }}
          />
          <Arrows>~</Arrows>
          <InputItem
            {...this.props}
            form={form}
            params={{
              ...options2,
            }}
          />
        </Input.Group>
      </div>
    );
  }
}

export default InputRange;
