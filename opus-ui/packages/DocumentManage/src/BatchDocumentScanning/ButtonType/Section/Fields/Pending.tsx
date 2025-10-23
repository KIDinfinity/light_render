import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemRadioGroup,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localConfig } from '../index';
import { localFieldConfig } from './Pending.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
export { localFieldConfig } from './Pending.config';
import styles from './button.less';
export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  handleChange,
  manualHide,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = [
    {
      dictCode: 'PendingDocument',
      dictName: formatMessageApi({
        Dropdown_CFG_DocumentIndexType: 'Pending',
      }),
    },
  ];
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const Rules = {};
  return (
    isShow &&
    !manualHide &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemRadioGroup
          dicts={dicts}
          className={styles.formRadio}
          type="button"
          onChange={handleChange}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const Pending = ({
  isShow,
  layout,
  form,
  editable,
  section,
  id,
  handleChange,
  manualHide,
}: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        handleChange={handleChange}
        manualHide={manualHide}
      />
    </ElementConfig.Field>
  </Authority>
);

Pending.displayName = localFieldConfig.field;

export default Pending;
