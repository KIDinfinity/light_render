import React, { useMemo, useCallback } from 'react';
import { Row, Icon } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';

import BooleanEnum from 'basic/enum/BooleanEnum';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from './index.less';

const SectionIcon = ({ icon }: any) => {
  if (lodash.isEmpty(icon)) {
    return null;
  }

  let Content: any = <></>;
  if (lodash.isString(icon)) {
    Content = () => <Icon type={icon} />;
  }
  if (React.isValidElement(icon)) {
    Content = () => icon;
  }
  return (
    <div className={styles.icon}>
      <Content />
    </div>
  );
};

const FixedFieldLayout = ({
  config,
  children,
  layoutName,
  readOnly = true,
  spanMode,
  icon,
}: any) => {
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );

  const getLayout = useCallback(
    ({ fieldConfig }: any) => {
      const defaultLayout = fieldConfig?.[layoutName || 'x-layout'] || {};
      if (!lodash.isEmpty(layoutName)) {
        return lodash.find(fieldConfig?.layouts, { layoutName })?.layout || defaultLayout;
      }
      if (spanMode === 'dobule' && !expandedClientId) {
        return Object.keys(defaultLayout).reduce((result, key) => {
          return (result = {
            ...result,
            [key]: {
              ...defaultLayout[key],
              span: defaultLayout[key].span * 2,
            },
          });
        }, {});
      }

      return defaultLayout;
    },
    [expandedClientId]
  );

  const childrenProps = useMemo(() => {
    return lodash
      .map(config, (item: any) => {
        const child = lodash.find(children, (child: any) => {
          return child?.type?.displayName === item?.field;
        });
        if (!child) {
          return null;
        }
        const fieldType = item?.fieldType;
        const fieldConfig = item?.['field-props'];
        const layout = getLayout({ fieldConfig });
        const isShow = !readOnly || fieldConfig?.expand !== BooleanEnum.No || expandedClientId;
        const order = layout?.xs?.order;
        if (
          (fieldConfig?.['field-props']?.editable === 'N' &&
            fieldConfig?.['field-props']?.mandatory) ||
          (!fieldConfig?.['field-props']?.editable && fieldConfig?.['field-props']?.mandatory)
        ) {
          fieldConfig['field-props'].mandatory = 'N';
        }
        return { child, fieldConfig, layout, isShow, order, fieldType, field: item?.field };
      })
      .filter((item) => React.isValidElement(item?.child))
      .sort((a: any, b: any) => {
        return parseInt(a.order) - parseInt(b.order);
      });
  }, [children, config, expandedClientId]);
  return lodash.some(childrenProps, (childProps: any) => childProps.isShow) ? (
    <div className={styles.fixFieldLayout}>
      <SectionIcon icon={icon} childrenProps={childrenProps} />
      <Row type="flex" className={styles.infoWrap} gutter={16} justify={'start'}>
        {childrenProps.map((itemProps: any) =>
          React.cloneElement<any>(itemProps.child, {
            config: itemProps.fieldConfig,
            field: itemProps.field,
            layout: {
              ...itemProps.layout,
              className: `___${itemProps.field}`,
              style: { order: itemProps.order },
            },
            isShow: itemProps.isShow,
            fieldType: itemProps.fieldType,
          })
        )}
      </Row>
    </div>
  ) : null;
};

export default FixedFieldLayout;
