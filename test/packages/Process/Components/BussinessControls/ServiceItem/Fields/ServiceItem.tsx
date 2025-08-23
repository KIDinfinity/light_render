import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { ConfigServiceItem } from '../_hooks';
import { localFieldConfig } from './ServiceItem.config';

export { localFieldConfig } from './ServiceItem.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  NAMESPACE,
  invoiceId,
  claimTypeList,
  incidentId,
  serviceItemId,
  namespaceType,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { extraConfig } = ConfigServiceItem({
    NAMESPACE,
    incidentId,
    invoiceId,
    serviceItemId,
    otherParams: claimTypeList,
    namespaceType,
  });
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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          searchName="serviceItem"
          dropdownCode="claim_dict001"
          optionShowType="both"
          labelType={config.label?.type || fieldProps.label.type}
          {...extraConfig}
          hideRequired
        />
      </Col>
    )
  );
};

const ServiceItem = (props: any) => (
  <Authority>
    <FormItem {...props} />
  </Authority>
);

ServiceItem.displayName = localFieldConfig.field;

export default ServiceItem;
