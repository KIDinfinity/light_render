import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, Visible } from 'basic/components/Form';
import { fieldConfig } from './Basepremium.config';
import useProductTypeIsHospitalPlan from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useProductTypeIsHospitalPlan';
import useJugeDisplayIntialIvestment from 'decision/components/Benefit/_hooks/useJugeDisplayIntialIvestment.ts';
export { fieldConfig } from './Basepremium.config';

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  disabled,
  disabledForRiders,
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const currentProductTypeIsIlpRtAt = useProductTypeIsHospitalPlan({ id });
  const visibleConditions = true;
  const showInitialInvestment = useJugeDisplayIntialIvestment();
  const editableConditions = !currentProductTypeIsIlpRtAt;
  const requiredConditions = currentProductTypeIsIlpRtAt;
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            disabled ||
            disabledForRiders ||
            showInitialInvestment ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredConditions}
          labelType="inline"
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

const Premium = ({ field, config, form, editable, layout, isShow, id, disabledForRiders }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config?.['field-props']}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      disabledForRiders={disabledForRiders}
    />
  </Authority>
);

Premium.displayName = 'basePremium';

export default Premium;
