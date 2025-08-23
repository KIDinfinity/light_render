import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, Visible, RuleByForm } from 'basic/components/Form';
import { fieldConfig } from './Basepremium.config';
export { fieldConfig } from './Basepremium.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = !RuleByForm(fieldProps['editable-condition'], form);

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
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredConditions}
          hiddenPrefix
          pattern={/^\d{0,20}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
          precision={2}
          placeholder=" "
          objectName="nb.policyList.coverageList"
          objectFieldName="basePremium"
        />
      </Col>
    )
  );
};

const Basepremium = ({ field, config, form, editable, layout, isShow, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config?.['field-props']}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
    />
  </Authority>
);

Basepremium.displayName = 'basePremium';

export default Basepremium;
