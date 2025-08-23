import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import useGetCurrentLevelAddress from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentLevelAddress';
import useLoadSubAddress from 'process/NB/ManualUnderwriting/_hooks/useLoadSubAddress';
import AddressLevel from 'process/NB/ManualUnderwriting/Enum/AddressLevel';
import AddressType from 'process/NB/ManualUnderwriting/Enum/AddressType';
import { fieldConfig } from './Policyaddress5.config';

export { fieldConfig } from './Policyaddress5.config';
import useGetCurrentRegion from 'process/NB/ManualUnderwriting/_hooks/useGetCurrentRegion';
import useGetPolicyCountry from 'process/NB/ManualUnderwriting/_hooks/useGetPolicyCountry';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const regionCode = tenant.region();
  const dicts = useGetCurrentLevelAddress({
    id,
    addressType: AddressType.Policy,
    addressLevel: AddressLevel.City,
  });
  const currentCountry = useGetPolicyCountry();
  const isCurrentRegion = useGetCurrentRegion({
    currentCountry,
  });
  const handleLoadSubAddress = useLoadSubAddress({
    addressLevel: AddressLevel.City,
  });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {regionCode !== Region.ID && isCurrentRegion ? (
          <FormItemSelect
            dicts={dicts}
            dictCode="subCode"
            dictName="subName"
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
            required={
              config?.['field-props']?.required === Required.Conditions
                ? requiredConditions
                : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
            }
            hiddenPrefix
            precision={0}
            onChange={handleLoadSubAddress}
          />
        ) : (
          <FormItemInput
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
            required={
              config?.['field-props']?.required === Required.Conditions
                ? requiredConditions
                : (config?.['field-props']?.required || fieldProps.required) === Required.Yes
            }
            hiddenPrefix
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Policyaddress5 = ({
  form,
  editable,
  layout,
  isShow,
  id,
  addressInfoList,

  config,
}: any) => {
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
        addressInfoList={addressInfoList}
      />
    </Authority>
  );
};

Policyaddress5.displayName = 'PolicyAddress5';

export default Policyaddress5;
