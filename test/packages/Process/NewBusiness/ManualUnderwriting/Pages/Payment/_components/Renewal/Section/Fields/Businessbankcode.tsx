import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { fieldConfig } from './Businessbankcode.config';
import useUpdateFactoringHouse from 'process/NewBusiness/ManualUnderwriting/_hooks/useUpdateFactoringHouse';
export { fieldConfig } from './Businessbankcode.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const formName = config.name || field;

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = form.getFieldValue('renewalPayType') === 'D';

  const onChange = useUpdateFactoringHouse(form);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={formName}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          getPopupContainer={() => document.body}
          hiddenPrefix
          precision={0}
          onChange={(value: string) => onChange({ [formName]: value })}
        />
      </Col>
    )
  );
};

const Businessbankcode = ({ form, editable, layout, isShow, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
    />
  </Authority>
);

Businessbankcode.displayName = 'businessBankCode';

export default Businessbankcode;
