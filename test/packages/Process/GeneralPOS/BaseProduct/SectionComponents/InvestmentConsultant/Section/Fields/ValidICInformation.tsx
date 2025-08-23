import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemCheckbox,
  Required,
  Visible,
  RuleByForm,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './ValidICInformation.config';

export { localFieldConfig } from './ValidICInformation.config';
import styles from '../../index.less';

const FormItem = ({ isShow, layout, form, editable, field, config, isSubCard }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} style={{ paddingLeft: '14px' }}>
        <FormItemCheckbox
          className={styles.flex}
          disabled={
            isSubCard ||
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={
            config?.['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const ValidICInformation = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  roleDicts,
  isSubCard,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      roleDicts={roleDicts}
      isSubCard={isSubCard}
    />
  </Authority>
);

ValidICInformation.displayName = localFieldConfig.field;

export default ValidICInformation;
