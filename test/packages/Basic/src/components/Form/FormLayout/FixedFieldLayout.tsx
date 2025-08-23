import React, { useLayoutEffect, useState, useRef, useContext, useEffect } from 'react';
import { Row } from 'antd';
import lodash from 'lodash';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import ShowHideButton from './ShowHideButton';
import { Visible, Show } from '../constants';
import { FormLayoutContext } from '../';
import styles from './FixedFieldLayout.less';

export default ({ config, showOnly, layoutName, justify, children, form }: any) => {
  const { hasParentExpand, parentExpand, setParentHasHidden, activeChild } = useContext(
    FormLayoutContext.Context
  );
  const currentId = form?.getFieldValue('id');

  const [show, setShow] = useState<boolean>(lodash.includes(activeChild, currentId));
  const [hasHidden, setHasHidden] = useState<boolean>(false);
  const [initHidden, setInitHidden] = useState<boolean>(false);
  const RowRef = useRef(null);

  useLayoutEffect(() => {
    if (initHidden) return;
    // eslint-disable-next-line react/no-find-dom-node
    const childDOM = (ReactDOM.findDOMNode(RowRef.current) as HTMLElement).children;
    const allfields = Array.from(childDOM).map((child: Element) =>
      Array.from(child.classList)
        .find((classname: string) => classname.includes('___'))
        ?.replace('___', '')
    );

    const isHideen = config?.some(
      (fieldConfig: any) =>
        allfields.includes(fieldConfig?.field) && fieldConfig?.['field-props']?.expand === Show.No
    );
    if (isHideen) {
      setHasHidden(isHideen);
      setInitHidden(true);
      if (lodash.isFunction(setParentHasHidden)) {
        setParentHasHidden(isHideen);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  useEffect(() => {
    if (lodash.includes(activeChild, currentId)) return;
    setShow(parentExpand);
    if (form && form.setPropsToFields) {
      form.setPropsToFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentExpand]);

  const onShowChange = (flag: boolean) => {
    setShow(flag);
    if (form && form.setPropsToFields) {
      form.setPropsToFields();
    }
  };

  const getLayout = ({ fieldConfig, layoutName: LayoutName }: any) => {
    const defaultLayout = fieldConfig?.[LayoutName || 'x-layout'] || {};
    if (!lodash.isEmpty(LayoutName)) {
      return lodash.find(fieldConfig?.layouts, { layoutName: LayoutName })?.layout || defaultLayout;
    }
    return defaultLayout;
  };

  return (
    <div
      className={classnames({
        [styles.flexRow]: true,
        [styles.padding]: hasHidden,
        [styles.showOnly]: showOnly,

        hasHidden: hasHidden,
      })}
    >
      <Row type="flex" gutter={16} ref={RowRef} justify={justify || 'start'}>
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
          const fieldType = fieldConf?.fieldType;
          const fieldConfig = fieldConf?.['field-props'];
          const layout = getLayout({ fieldConfig, layoutName });
          const isShow = hasHidden ? show || fieldConfig?.expand !== Show.No : true;
          const order = layout?.xs?.order;
          if (
            (fieldConfig?.['field-props']?.editable === 'N' &&
              fieldConfig?.['field-props']?.mandatory) ||
            (!fieldConfig?.['field-props']?.editable && fieldConfig?.['field-props']?.mandatory)
          ) {
            fieldConfig['field-props'].mandatory = 'N';
          }
          return {
            child,
            field,
            fieldConfig,
            layout,
            isShow,
            order,
            name,
            fieldType,
          };
        })
          ?.sort((a: any, b: any) => {
            if (!a.name) {
              return 0;
            }
            return a.order - b.order;
          })
          .map(({ name, child, layout, isShow, fieldConfig, field, order, fieldType }: any) => {
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
                field,
                layout: { ...layout, className: `___${field}`, style: { order } },
                isShow,
                fieldType,
                showOnly,
              })
            );
          })}
      </Row>
      {!hasParentExpand && hasHidden && <ShowHideButton show={show} onChange={onShowChange} />}
    </div>
  );
};
