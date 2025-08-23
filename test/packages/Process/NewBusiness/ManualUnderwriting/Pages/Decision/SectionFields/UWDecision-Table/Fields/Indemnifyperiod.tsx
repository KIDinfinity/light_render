import React from 'react';
import { Col } from 'antd';
import { Authority, FormItemInput, Visible, FormItemSelect } from 'basic/components/Form';
import useGetFieldDisabledByData from 'decision/_hooks/useGetFieldDisabledByData';
import useHandlePolicyPeriodChangeCallback from 'decision/components/Benefit/Edit/_hooks/useHandlePolicyPeriodChangeCallback';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';
import useGetPolicyBenefitPeriodDisabled from 'decision/components/Benefit/Edit/_hooks/useGetPolicyBenefitPeriodDisabled';
import useGetPolicyBenefitPeriodInputType from 'decision/components/Benefit/Edit/_hooks/useGetPolicyBenefitPeriodInputType';
import useGetPolicyBenefitPeriodDropdown from 'decision/components/Benefit/Edit/_hooks/useGetPolicyBenefitPeriodDropdown';
import FieldType from 'enum/FieldType';
import { fieldConfig } from './Indemnifyperiod.config';

export { fieldConfig } from './Indemnifyperiod.config';

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
  disabledForMain,
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
  const required = useGetFieldRequiredByConditions({
    config,
    localConfig: fieldConfig,
    disabled,
    form,
  });
  const indemnifyPeriodDisabled = useGetPolicyBenefitPeriodDisabled({
    coverageItem,
  });
  const dicts = useGetPolicyBenefitPeriodDropdown({ coverageItem });
  const fieldType = useGetPolicyBenefitPeriodInputType({ coverageItem });
  const FieldInput = React.useMemo(() => {
    switch (fieldType) {
      case FieldType.Dropdown:
        return FormItemSelect;
      case FieldType.Text:
      default:
        return FormItemInput;
    }
  }, [fieldType]);
  const handlePolicyPeriodChange = useHandlePolicyPeriodChangeCallback({ id, coreCode });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FieldInput
          disabled={disabled || indemnifyPeriodDisabled || disabledProp || disabledForMain}
          dicts={dicts}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          labelType="inline"
          hiddenPrefix
          precision={0}
          placeholder=" "
          onChange={handlePolicyPeriodChange}
        />
      </Col>
    )
  );
};

const Policyterm = ({
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
  disabledForMain,
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
      disabledForMain={disabledForMain}
    />
  </Authority>
);

Policyterm.displayName = 'indemnifyPeriod';

export default Policyterm;
