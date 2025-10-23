import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { VLD_001181 } from 'claim/pages/validators/fieldValidators';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = config;

  const visibleConditions = RuleByForm(
    config['visible-condition'] || fieldProps['visible-condition'],
    form
  );
  const editableConditions = !RuleByForm(
    config['editable-condition'] || fieldProps['editable-condition'],
    form
  );
  const requiredConditions = RuleByForm(
    config['required-condition'] || fieldProps['required-condition'],
    form
  );
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          maxLength={config?.maxLength}
          rules={[
            {
              validator: VLD_001181(),
            },
          ]}
        />
      </Col>
    )
  );
};
const field = 'idCard';

const IdCard = ({ config, form, editable, layout, isShow }: any) => (
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

IdCard.displayName = field;

export default IdCard;
