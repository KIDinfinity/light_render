import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
  FormItemSelect,
} from 'basic/components/Form';
import useGetFieldDisabledByData from 'process/NB/ManualUnderwriting/_hooks/useGetFieldDisabledByData';
import useGetPremCessAgeInputType from 'process/NB/ManualUnderwriting/_hooks/useGetPremCassAgeInputType';
import useGetPremCessAgeDropdown from 'process/NB/ManualUnderwriting/_hooks/useGetPremCessAgeDropdown';
import useGetPremCessAgeDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetPremCessAgeDisabled';
import { Region, tenant } from '@/components/Tenant';
import FieldType from 'enum/FieldType';
import { fieldConfig } from './Premcessage.config';

export { fieldConfig } from './Premcessage.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  coverageItem,
  disabled: disabledProp,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const fieldType = useGetPremCessAgeInputType({
    coverageItem,
  });

  const FieldInput = React.useMemo(() => {
    switch (fieldType) {
      case FieldType.Dropdown:
        return FormItemSelect;
      case FieldType.Text:
      default:
        return FormItemInput;
    }
  }, [fieldType]);
  const premCessAageDisabled = useGetPremCessAgeDisabled({
    coverageItem,
  });
  const dicts = useGetPremCessAgeDropdown({
    coverageItem,
  });
  const visibleConditions = true;
  const regionCode = tenant.region();
  const disabled = useGetFieldDisabledByData({
    config,
    editable,
    id,
    dataBasicField: 'policyTermEditInd',
    dataBasicFieldValue: 'N',
  });
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FieldInput
          disabled={disabled || premCessAageDisabled || disabledProp || regionCode === Region.VN}
          dicts={dicts}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          hiddenPrefix
          precision={0}
          placeholder=" "
        />
      </Col>
    )
  );
};

const Premcessage = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  id,
  coverageItem,
  disabled,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config?.['field-props']}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      coverageItem={coverageItem}
      disabled={disabled}
    />
  </Authority>
);

Premcessage.displayName = 'payAgePeriod';

export default Premcessage;
