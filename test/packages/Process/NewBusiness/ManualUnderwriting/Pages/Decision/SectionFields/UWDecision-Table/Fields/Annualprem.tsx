import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, Visible } from 'basic/components/Form';
import { fieldConfig } from './Annualprem.config';
import useJudgeDisplayAnnualPrem from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useJudgeDisplayAnnualPrem.ts';
import useProductTypeIsHospitalPlan from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useProductTypeIsHospitalPlan';
import useJugeDisplayIntialIvestment from 'decision/components/Benefit/_hooks/useJugeDisplayIntialIvestment.ts';

export { fieldConfig } from './Annualprem.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, disabled }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const currentProductTypeIsIlpRtAt = useProductTypeIsHospitalPlan({ id });
  const showInitialInvestment = useJugeDisplayIntialIvestment();
  const visibleConditions = useJudgeDisplayAnnualPrem();
  const editableConditions = !currentProductTypeIsIlpRtAt || showInitialInvestment;
  const requiredConditions = currentProductTypeIsIlpRtAt;
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            disabled ||
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
          labelType="inline"
          pattern={/^\d{0,20}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
          hiddenPrefix
          precision={2}
          placeholder=" "
          objectName="nb.policyList.coverageList"
          objectFieldName="annualPrem"
        />
      </Col>
    )
  );
};

const Annualprem = ({ field, config, form, editable, layout, isShow, id, disabled }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config?.['field-props']}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      disabled={disabled}
    />
  </Authority>
);

Annualprem.displayName = 'annualPrem';

export default Annualprem;
