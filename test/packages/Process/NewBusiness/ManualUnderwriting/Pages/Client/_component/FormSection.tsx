import React, { useCallback, useMemo } from 'react';
import lodash from 'lodash';
import { Form, Row, Icon } from 'antd';
import { useSelector } from 'dva';
import classnames from 'classnames';

import { FormRegister } from 'basic/components/Form';
import BooleanEnum from 'basic/enum/BooleanEnum';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from './index.less';
import useJudgeEvevryFieldsDisplay from 'process/NewBusiness/ManualUnderwriting/_hooks/useJudgeEvevryFieldsDisplay';

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

const FormItem = ({ form, childrenProps, readOnly, formId, register }: any) => {
  return (
    <div className={classnames({ [styles.readOnly]: readOnly })}>
      <FormRegister
        form={form}
        register={lodash.isBoolean(register) ? register : !readOnly}
        formId={formId}
      >
        <Form layout="vertical">
          <Row type="flex" gutter={16} justify={'start'}>
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
                itemConfig: itemProps?.itemConfig,
              })
            )}
          </Row>
        </Form>
      </FormRegister>
    </div>
  );
};

const Section = ({
  form,
  config,
  children,
  readOnly,
  icon,
  layoutName,
  spanMode,
  formId,
  clientId,
  itemTable,
  actionComponent,
}: any) => {
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const isDisplayAll = useJudgeEvevryFieldsDisplay({ id: clientId });
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
      if (spanMode === 'abridged') {
        return Object.keys(defaultLayout).reduce((result, key) => {
          return (result = {
            ...result,
            [key]: {
              ...defaultLayout[key],
              span: 24,
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
      .chain(config)
      .map((item: any) => {
        const child = lodash.find(children, (child: any) => {
          return child?.type?.displayName === item?.field;
        });
        if (!child) {
          return null;
        }
        const fieldType = item?.fieldType;
        const fieldConfig = item?.['field-props'];
        const layout = getLayout({ fieldConfig });
        const isShow =
          !readOnly || fieldConfig?.expand !== BooleanEnum.No || expandedClientId || isDisplayAll;
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
          fieldConfig,
          layout,
          isShow,
          order,
          fieldType,
          field: item?.field,
          itemConfig: lodash.omit(item, ['field-props']),
        };
      })
      .uniqBy('field')
      .filter((item) => React.isValidElement(item?.child))
      .value()
      .sort((a: any, b: any) => {
        return parseInt(a.order) - parseInt(b.order);
      });
  }, [children, config, expandedClientId]);

  return lodash.some(childrenProps, (childProps: any) => childProps.isShow) ? (
    <div className={classnames(styles.formContainer)}>
      <SectionIcon icon={icon} />
      <div className={classnames({ [styles.itemTable]: itemTable }, styles.infoWrap)}>
        <FormItem form={form} childrenProps={childrenProps} readOnly={readOnly} formId={formId} />
        {actionComponent}
      </div>
    </div>
  ) : null;
};

export default Section;
