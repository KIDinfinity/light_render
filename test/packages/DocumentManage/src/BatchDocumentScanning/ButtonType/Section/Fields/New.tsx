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
import { localFieldConfig } from './New.config';
import styles from './button.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
export { localFieldConfig } from './New.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, handleChange }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = [
    {
      dictName: formatMessageApi({
        Dropdown_CFG_DocumentIndexType: 'New',
      }),
      dictCode: 'NewRequest',
    },
  ];
  const visibleConditions = !Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemRadioGroup
          dicts={dicts}
          type="button"
          className={styles.formRadio}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          onChange={handleChange}
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

const New = ({ isShow, layout, form, editable, section, id, handleChange }: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field={localFieldConfig.field}>
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        handleChange={handleChange}
      />
    </ElementConfig.Field>
  </Authority>
);

New.displayName = localFieldConfig.field;

export default New;
