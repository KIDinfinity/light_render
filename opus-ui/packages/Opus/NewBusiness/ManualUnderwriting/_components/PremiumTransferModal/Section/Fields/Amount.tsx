import { Col } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemNumber,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import React from 'react';
import styles from '../../index.less';
import { localConfig } from '../index';
import { localFieldConfig } from './Amount.config';

export { localFieldConfig } from './Amount.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, onBlur }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          className={styles.comment}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onBlur={onBlur}
        />
      </Col>
    )
  );
};

const Comp = ({ isShow, layout, form, editable, section, onBlur }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} onBlur={onBlur} />
    </ElementConfig.Field>
  </Authority>
);

Comp.displayName = localFieldConfig.field;

export default Comp;
