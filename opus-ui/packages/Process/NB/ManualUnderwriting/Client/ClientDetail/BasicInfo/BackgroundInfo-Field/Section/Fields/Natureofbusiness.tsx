import React from 'react';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  Rule,
} from 'basic/components/Form';
import { fieldConfig } from './Natureofbusiness.config';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
export { fieldConfig } from './Natureofbusiness.config';

const FormItem = ({ isShow, layout, form, editable, field, config, visible }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = Rule(config['field-props']['required-condition'], form, '');
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  const required = requiredByRole;

  return (
    isShow &&
    visible &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
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
          required={required}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Natureofbusiness = ({ form, editable, layout, isShow, id, config, visible = true }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        visible={visible}
      />
    </Authority>
  );
};

Natureofbusiness.displayName = 'natureOfBusiness';

export default Natureofbusiness;
