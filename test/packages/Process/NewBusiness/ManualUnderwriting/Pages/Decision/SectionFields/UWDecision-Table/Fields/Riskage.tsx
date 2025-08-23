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
import useGetFieldDisabledByData from 'decision/_hooks/useGetFieldDisabledByData';
import useHandleRiskAgeChangeCallback from 'decision/components/Benefit/_hooks/useHandleRiskAgeChangeCallback';
import useGetRiskAgeInputType from 'decision/components/Benefit/Edit/_hooks/useGetRiskAgeInputType';
import useGetRiskAgeDisabled from 'decision/components/Benefit/Edit/_hooks/useGetRiskAgeDisabled';
import useGetRiskAgeDropdown from 'decision/components/Benefit/Edit/_hooks/useGetRiskAgeDropdown';
import { Region, tenant } from '@/components/Tenant';
import FieldType from 'enum/FieldType';
import { fieldConfig } from './Riskage.config';

export { fieldConfig } from './Riskage.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  coreCode,
  coverageItem,
  disabled: disabledProp,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const disabled = useGetFieldDisabledByData({
    config,
    editable,
    id,
    dataBasicField: 'policyTermEditInd',
    dataBasicFieldValue: 'N',
  });
  const riskDisabled = useGetRiskAgeDisabled({
    coverageItem,
  });
  const dicts = useGetRiskAgeDropdown({ coverageItem });
  const handleRiskAgeChange = useHandleRiskAgeChangeCallback({ id, coreCode });
  const requiredConditions = RuleByForm(fieldProps['required-condition'], form);
  const regionCode = tenant.region();
  const fieldType = useGetRiskAgeInputType({
    coverageItem,
  });
  const InputComponent = React.useMemo(() => {
    switch (fieldType) {
      case FieldType.Dropdown:
        return FormItemSelect;
      case FieldType.Text:
      default:
        return FormItemInput;
    }
  }, [fieldType]);
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <InputComponent
          disabled={disabled || riskDisabled || disabledProp || regionCode === Region.VN}
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
          onChange={handleRiskAgeChange}
        />
      </Col>
    )
  );
};

const Riskage = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  id,
  coreCode,
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
      coreCode={coreCode}
      coverageItem={coverageItem}
      disabled={disabled}
    />
  </Authority>
);

Riskage.displayName = 'indemnifyAgePeriod';

export default Riskage;
