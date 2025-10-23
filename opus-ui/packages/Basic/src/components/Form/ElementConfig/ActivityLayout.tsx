import React from 'react';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import GetConfig from './GetConfig';

const Layout = ({ config, children }: any) => {
  return (
    <Row type="flex" gutter={16}>
      {React.Children.map(children, (child: any) => {
        const name = child?.props?.section;
        const fieldConfig = lodash
          .chain(config)
          .find(
            (item: any) =>
              name &&
              item?.section?.match(new RegExp(name, 'i')) &&
              lodash.has(item, 'section-props')
          )
          // @ts-ignore
          .get('[section-props][x-layout]', {})
          .value();
        const colLayout = fieldConfig;

        return !lodash.isEmpty(colLayout) ? <Col {...colLayout}>{child}</Col> : null;
      })}
    </Row>
  );
};

export default ({ config, children }: any) => {
  return (
    <GetConfig config={config}>
      <Layout config={config?.configs}>{children}</Layout>
    </GetConfig>
  );
};
