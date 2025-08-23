import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  RuleByForm,
} from 'basic/components/Form';
import { fieldConfig } from './Satisfiedexplanation.config';

export { fieldConfig } from './Satisfiedexplanation.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config['field-props'].name || field}
          labelId={config['field-props'].label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config['field-props'].label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config['field-props']?.required === Required.Conditions
              ? requiredConditions
              : (config['field-props'].required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Satisfiedexplanation = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);
Satisfiedexplanation.displayName = 'satisfiedExplanation';

export default Satisfiedexplanation;
