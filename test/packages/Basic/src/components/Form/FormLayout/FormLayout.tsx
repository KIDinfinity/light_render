import React from 'react';
import { Row, Col } from 'antd';
import getLayout from '../getLayout';

export default ({ children, json = {}, layConf }: any) => {
  const newLayout = layConf ? getLayout(layConf) : json;
  const rowLayout = newLayout?.layout || { gutter: 16 };
  return (
    <Row {...rowLayout}>
      {React.Children.map(children, (child) => {
        if (child === null || !React.isValidElement(child)) {
          return null;
        }
        const { layout, name } = child.props;

        const colLayout = layout ||
          newLayout[name]?.layout ||
          newLayout?.fieldLayout || {
            xs: { span: 24 },
            sm: { span: 8 },
            md: { span: 8 },
            lg: { span: 8 },
          };

        return <Col {...colLayout}>{child}</Col>;
      })}
    </Row>
  );
};
