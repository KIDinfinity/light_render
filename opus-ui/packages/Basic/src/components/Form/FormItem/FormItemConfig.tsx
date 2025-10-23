import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { Visible } from 'basic/components/Form';
import getConfigProps, { getRuleValue } from './utils/getConfigProps';
import type { CommonFormItemConfigProps } from './typing';

const FormItemConfig = (FormItem: any) => {
  const EnhancedComponent = (props: CommonFormItemConfigProps) => {
    if (!lodash.has(props, 'config')) {
      return <FormItem {...props} />;
    }

    const formItemProps = getConfigProps(props);
    const { isShow, layout, config } = props;

    const show =
      isShow &&
      (config?.visible === Visible.Conditions
        ? getRuleValue(props, 'visible-condition')
        : config?.visible === Visible.Yes);

    return (
      show && (
        <Col {...layout}>
          <FormItem {...formItemProps} />
        </Col>
      )
    );
  };

  return EnhancedComponent;
};

export default FormItemConfig;
