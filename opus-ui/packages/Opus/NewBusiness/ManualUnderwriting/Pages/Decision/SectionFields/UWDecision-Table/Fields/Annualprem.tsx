import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, Visible } from 'basic/components/Form';
import { fieldConfig } from './Annualprem.config';
import useJudgeDisplayAnnualPrem from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useJudgeDisplayAnnualPrem.ts';
import useProductTypeIsHospitalPlan from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useProductTypeIsHospitalPlan';
import useJugeDisplayIntialIvestment from 'decision/components/Benefit/_hooks/useJugeDisplayIntialIvestment.ts';
import useGetFieldConfig from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';

export { fieldConfig } from './Annualprem.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, disabled }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const currentProductTypeIsIlpRtAt = useProductTypeIsHospitalPlan({ id });
  const showInitialInvestment = useJugeDisplayIntialIvestment();

  const propsConfig = {
    field,
    editable,
    isShow,
    form,
    propsVisibleCondition: useJudgeDisplayAnnualPrem(),
    propsEditableCondition: !currentProductTypeIsIlpRtAt || showInitialInvestment,
    propsRequiredCondition: currentProductTypeIsIlpRtAt,
  };
  const { calculatedEditable, calculatedVisible, calculatedRequired, label, name } =
    useGetFieldConfig(propsConfig, config, fieldProps);


  return calculatedVisible? (
    <Col {...layout}>
      <FormItemNumber
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={calculatedRequired}
        labelType="inline"
        pattern={/^\d{0,20}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
        hiddenPrefix
        precision={2}
        placeholder=" "
        objectName="nb.policyList.coverageList"
        objectFieldName="annualPrem"
      />
    </Col>
  ) : null
};

const Annualprem = ({ field, config, form, editable, layout, isShow, id, disabled }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
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
