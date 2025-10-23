import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Visible,
} from 'basic/components/Form';
import { localFieldConfig } from './ServiceItem.config';

export { localFieldConfig } from './ServiceItem.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  invoiceId,
  onSelect,
  notRepeatableCodeList,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
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
          onSelectCallback={onSelect}
          searchName="serviceItem"
          dropdownCode="claim_dict001"
          optionShowType="both"
          disabledDictCodes={notRepeatableCodeList}
          labelType="inline"
          placeholder=" "
          hideRequired
        />
      </Col>
    )
  );
};

const ServiceItem = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  invoiceId,
  notRepeatableCodeList,
  onSelect,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      invoiceId={invoiceId}
      notRepeatableCodeList={notRepeatableCodeList}
      onSelect={onSelect}
    />
  </Authority>
);

ServiceItem.displayName = localFieldConfig.field;

export default ServiceItem;
