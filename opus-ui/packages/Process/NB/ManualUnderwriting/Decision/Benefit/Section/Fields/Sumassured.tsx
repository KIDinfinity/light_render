import React, { useMemo, useEffect } from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { Authority, FormItemNumber, FormItemInputText, Visible } from 'basic/components/Form';
import useGetFieldDisabledByData from 'process/NB/ManualUnderwriting/_hooks/useGetFieldDisabledByData';
import useHandleSumAssuredChangeCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleSumAssuredChangeCallback';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';
import useGetcfgPlanHospitalBenefitTarget from 'process/NB/ManualUnderwriting/_hooks/useGetcfgPlanHospitalBenefitTarget';
import { getFieldDisplayAmount } from '@/utils/accuracy';
import { fieldConfig } from './Sumassured.config';

export { fieldConfig } from './Sumassured.config';

const FormItem = (props) => {
  const {
    isShow,
    layout,
    form,
    editable,
    field,
    config,
    isMain,
    id,
    coreCode,
    disabled: disabledProp,
  } = props;
  useEffect(() => {
    if (!!coreCode) {
      form.validateFields([config.name || field], { force: true });
    }
  }, [coreCode]);
  const fieldProps: any = fieldConfig['field-props'];
  const disabled = useGetFieldDisabledByData({
    editable: editable && !disabledProp,
    isMain,
    id,
    config,
    dataBasicField: 'saEditInd',
    dataBasicFieldValue: 'N',
  });
  const required = useGetFieldRequiredByConditions({
    editable,
    config,
    localConfig: fieldConfig,
    disabled,
    form,
  });
  const handleSumAssuredChange = useHandleSumAssuredChangeCallback({ id, coreCode });
  const visibleConditions = true;
  const canShow = useMemo(() => {
    return (
      isShow &&
      ((config?.visible || fieldProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || fieldProps.visible) === Visible.Yes)
    );
  }, [config?.visible, fieldProps.visible, isShow, visibleConditions]);
  const productCode = form.getFieldValue('coreCode');
  const benefitPlan = form.getFieldValue('hospitalPlanCode');
  const cfgPlanHospitalBenefitTarget = useGetcfgPlanHospitalBenefitTarget({
    benefitPlan,
    productCode,
  });
  const showAnnualLimit = (() => {
    if (!lodash.isEmpty(cfgPlanHospitalBenefitTarget)) {
      return getFieldDisplayAmount(
        cfgPlanHospitalBenefitTarget.annualLimit || cfgPlanHospitalBenefitTarget.sumAssured,
        `nb.policyList.coverageList.sumAssured`
      );
    }
    return null;
  })();

  return canShow ? (
    <Col {...layout}>
      {showAnnualLimit ? (
        <FormItemInputText text={showAnnualLimit} />
      ) : (
        <FormItemNumber
          disabled={disabled}
          form={form}
          formName={config?.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          labelType="inline"
          precision={2}
          placeholder=" "
          pattern={/^\d{0,18}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
          objectName="nb.policyList.coverageList"
          objectFieldName="sumAssured"
          onChange={handleSumAssuredChange}
        />
      )}
    </Col>
  ) : null;
};

const SumAssured = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  id,
  coreCode,
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
      disabled={disabled}
    />
  </Authority>
);

SumAssured.displayName = 'sumAssured';

export default SumAssured;
