import React from 'react';
import { Col } from 'antd';
import { Authority, FormItemInput, Visible, FormItemSelect } from 'basic/components/Form';
import useGetFieldDisabledByData from 'process/NB/ManualUnderwriting/_hooks/useGetFieldDisabledByData';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';
import useHandlePayPeriodChangeCallback from 'process/NB/ManualUnderwriting/_hooks/useHandlePayPeriodChangeCallback';
import useGetPremiumPaymentTermInputType from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumPaymentTermInputType';
import useGetPremiumPaymentDisabled from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumPaymentDisabled';
import useGetPremiumPaymentTermDicts from 'process/NB/ManualUnderwriting/_hooks/useGetPremiumPaymentTermDicts';
import { Region, tenant } from '@/components/Tenant';
import { fieldConfig } from './Payperiod.config';
import FieldType from 'enum/FieldType';
export { fieldConfig } from './Payperiod.config';

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

  const required = useGetFieldRequiredByConditions({
    config,
    localConfig: fieldConfig,
    disabled,
    form,
  });
  const fieldType = useGetPremiumPaymentTermInputType({
    coverageItem,
  });
  const regionCode = tenant.region();
  const dicts = useGetPremiumPaymentTermDicts({ coverageItem });
  const payPeriodDisabled = useGetPremiumPaymentDisabled({ coverageItem });
  const FieldInput = React.useMemo(() => {
    switch (fieldType) {
      case FieldType.Dropdown:
        return FormItemSelect;
      case FieldType.Text:
      default:
        return FormItemInput;
    }
  }, [fieldType]);
  const handlePayPeriodChange = useHandlePayPeriodChangeCallback({ id, coreCode });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FieldInput
          dicts={dicts}
          disabled={disabled || payPeriodDisabled || disabledProp || regionCode === Region.VN}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          labelType="inline"
          hiddenPrefix
          precision={0}
          placeholder=" "
          onChange={handlePayPeriodChange}
        />
      </Col>
    )
  );
};

const Premiumterm = ({
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

Premiumterm.displayName = 'payPeriod';

export default Premiumterm;
