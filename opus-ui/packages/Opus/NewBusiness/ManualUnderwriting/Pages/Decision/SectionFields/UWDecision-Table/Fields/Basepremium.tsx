import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, Visible } from 'basic/components/Form';
import { fieldConfig } from './Basepremium.config';
import useProductTypeIsHospitalPlan from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useProductTypeIsHospitalPlan';
import useJudgeCoverageAppliedChange from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useJudgeCoverageAppliedChange';
import useJugeDisplayIntialIvestment from 'decision/components/Benefit/_hooks/useJugeDisplayIntialIvestment.ts';
import useGetFieldConfig from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetFieldConfig';
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
  const showInitialInvestment = useJugeDisplayIntialIvestment();
  const coverageAppliedChange = useJudgeCoverageAppliedChange({
    coverageId: id,
  });

  const propsConfig = {
    field,
    editable: editable && !disabledForRiders && !coverageAppliedChange && !showInitialInvestment,
    isShow,
    form,
    propsEditableCondition: !currentProductTypeIsIlpRtAt, // 仅在Condition时生效
    propsVisibleCondition: true,
    propsRequiredCondition: currentProductTypeIsIlpRtAt,
  };
  const { calculatedEditable, calculatedVisible, label, name } =
    useGetFieldConfig(propsConfig, config, fieldProps);

  return calculatedVisible ? (
    <Col {...layout}>
      <FormItemNumber
        disabled={!calculatedEditable}
        form={form}
        formName={name}
        labelId={label.dictCode}
        labelTypeCode={label.dictTypeCode}
        required={currentProductTypeIsIlpRtAt}
        labelType="inline"
        hiddenPrefix
        pattern={/^[\d]{0,20}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
        precision={2}
        placeholder=" "
        objectName="nb.policyList.coverageList"
        objectFieldName="basePremium"
      />
    </Col>
  ) : null;
};

const Premium = ({ field, config, form, editable, layout, isShow, id, disabledForRiders }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
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
