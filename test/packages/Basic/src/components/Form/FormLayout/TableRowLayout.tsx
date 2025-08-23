import React, { useLayoutEffect, useState, useRef } from 'react';
import { Row } from 'antd';
import lodash from 'lodash';
import ReactDOM from 'react-dom';
import { Visible } from 'basic/components/Form';

export default ({ config, layoutName, tableCollect, children }: any) => {
  const [init, setInit] = useState<boolean>(false);
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (init) return;
    // eslint-disable-next-line react/no-find-dom-node
    const childDOM = (ReactDOM.findDOMNode(ref.current) as HTMLElement).children;
    const allfields = Array.from(childDOM).map((child: Element) =>
      Array.from(child.classList)
        .find((classname: string) => classname.includes('___'))
        ?.replace('___', '')
    );
    if (lodash.size(allfields)) {
      tableCollect(allfields);
      setInit(true);
    }
  }, [config]);

  return (
    <div>
      <Row type="flex" gutter={16} ref={ref} style={{ flexWrap: 'nowrap' }}>
        {React.Children.map(children, (child: any) => {
          if (child === null || !React.isValidElement(child)) {
            return null;
          }

          const name = (child?.type as any)?.displayName;
          const fieldConf = lodash
            .chain(config)
            .find((item: any) => new RegExp(`^${name}$`, 'i').test(item.field))
            .value();
          const field = fieldConf?.field;
          const fieldConfig = fieldConf?.['field-props'];
          const layout = fieldConfig?.[layoutName || 'x-layout'] || {};
          const isShow = true;
          const order = layout?.xs?.order;

          return {
            child,
            field,
            fieldConfig,
            layout,
            isShow,
            order,
            name,
          };
        })
          .sort((a: any, b: any) => {
            if (!a.name) {
              return 0;
            }
            return a.order - b.order;
          })
          .map(({ name, child, layout, isShow, fieldConfig, field }: any) => {
            if (lodash.isEmpty(config)) {
              return null;
            }

            if (!name) {
              return React.cloneElement<any>(child, {});
            }

            return (
              [Visible.Yes, Visible.Conditions].includes(fieldConfig?.visible) &&
              React.cloneElement<any>(child, {
                config: fieldConfig,
                layout: { ...layout, className: `___${field}` },
                isShow,
                field,
              })
            );
          })}
      </Row>
    </div>
  );
};
