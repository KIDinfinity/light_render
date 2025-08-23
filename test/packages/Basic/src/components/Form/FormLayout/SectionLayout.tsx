import React from 'react';
import { Row, Col } from 'antd';
import lodash from 'lodash';

const defaultWrapperCol = 24;

export default ({ config, children }: any) => {
  return (
    <Row gutter={[16, 16]}>
      {React.Children.map(children, (child: any) => {
        // if (child === null || !React.isValidElement(child)) {
        //   return null;
        // }

        const name = child?.type?.displayName;

        const fieldConfig = lodash.find(
          config,
          (item: any) => name && item.name?.match(new RegExp(name, 'i'))
        );
        //   .chain(config)
        //   .find((item: any) => name && item.name?.match(new RegExp(name, 'i')))
        //   .get('[field-props]')
        //   .value();

        const { wrapperCol }: any = child.props;

        const colLayout = {
          xs: { span: fieldConfig?.wrapperCol || wrapperCol || defaultWrapperCol },
          sm: { span: fieldConfig?.wrapperCol || wrapperCol || defaultWrapperCol },
          md: { span: fieldConfig?.wrapperCol || wrapperCol || defaultWrapperCol },
          lg: { span: fieldConfig?.wrapperCol || wrapperCol || defaultWrapperCol },
        };

        return (
          // [Visible.Yes, Visible.Conditional].includes(fieldConfig?.visible) && (
          <Col {...colLayout}>{child}</Col>
          // )
        );
      })}
    </Row>
  );
};
