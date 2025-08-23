import React, { useMemo } from 'react';
import classnames from 'classnames';
import { Row, Icon } from 'antd';
import lodash from 'lodash';
import findFieldConfig from 'basic/utils/findFieldConfig';
import styles from './fieldsLayout.less';

export default ({
  children,
  config,
  form,
  disabled,
  className = '',
  icon,
  gateway,
  editable,
  layoutName = 'x-layout',
  placeholder = false,
  readOnly = true,
}: any) => {
  const finnalConfig = lodash.isFunction(gateway) ? gateway({ config }) : config;
  const isShow = useMemo(() => {
    const result = lodash.find(finnalConfig, (item: any) => {
      const visible = lodash.get(item, 'field-props.visible');
      return visible === 'Y' || visible === 'C';
    });
    if (result) {
      return true;
    }
    return false;
  }, [finnalConfig]);
  return (
    <>
      {isShow ? (
        <div className={classnames(styles.container, { [styles.flex]: icon || placeholder })}>
          {placeholder && <span className={styles.placeholder} />}
          {icon && (
            <span className={styles.icon}>
              {typeof icon === 'string' && <Icon type={icon} />}
              {React.isValidElement(icon) && icon}
            </span>
          )}
          <Row className={classnames(styles.layout, className)} type="flex" gutter={16}>
            {React.Children.map(children, (child) => {
              const name = (child?.type as any)?.displayName;
              const fieldConfig = findFieldConfig({
                configs: finnalConfig,
                field: name,
              });
              const layout = fieldConfig?.['field-props']?.[layoutName] || {};
              const order = layout?.lg?.order;
              return {
                order,
                layout,
                fieldConfig,
                child,
                name,
              };
            })
              .filter((field: any) => {
                const visible = lodash.get(field, 'fieldConfig.field-props.visible', 'Y');
                return visible === 'Y' || visible === 'C';
              })
              .map(({ child, layout, fieldConfig, order, name }: any) => {
                if (!lodash.isEmpty(fieldConfig)) {
                  const lg = lodash.get(layout, 'lg.span');
                  return React.cloneElement(child, {
                    isShow: true,
                    config: fieldConfig,
                    form,
                    layout: { span: lg, style: { order } },
                    editable,
                    disabled,
                    field: fieldConfig?.field,
                    fieldType: fieldConfig?.fieldType,
                    // 不加一直用本地配置
                    section: fieldConfig?.section,
                    key: name,
                    readOnly,
                    ...child.props,
                  });
                }
                return null;
              })}
          </Row>
        </div>
      ) : null}
    </>
  );
};
