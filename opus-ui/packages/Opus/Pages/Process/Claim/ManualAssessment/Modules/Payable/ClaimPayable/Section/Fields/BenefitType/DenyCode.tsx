import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { localFieldConfig } from './DenyCode.config';

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const visibleConditions = true;
  const editableConditions = form.getFieldValue('claimDecision') === ClaimDecision.deny; //Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;


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
              ? !editableConditions
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
          optionShowType="both"
        />
      </Col>
    )
  );
};

const DenyCode = ({ field, config, isShow, layout, form, editable, isDeclined }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentPayableItem={isDeclined}
    />
  </Authority>
);

DenyCode.displayName = localFieldConfig.field;

export default DenyCode;
