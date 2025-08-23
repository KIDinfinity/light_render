import React, { useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, FormItemNumber, FormItemInputText, Visible } from 'basic/components/Form';
import useGetFieldDisabledByData from 'decision/_hooks/useGetFieldDisabledByData';
import useHandleSumAssuredChangeCallback from 'decision/components/Benefit/Edit/_hooks/useHandleSumAssuredChangeCallback';
import useGetFieldRequiredByConditions from 'basic/hooks/useGetFieldRequiredByConditions';
import useGetcfgPlanHospitalBenefitTarget from '../../../components/Benefit/components/CoverageList/_hooks/useGetcfgPlanHospitalBenefitTarget';
import { getFieldDisplayAmount } from '@/utils/accuracy';

import { fieldConfig } from './Sumassured.config';
export { fieldConfig } from './Sumassured.config';

const FormItem = ({
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
}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const disabled = useGetFieldDisabledByData({
    editable: editable && !disabledProp,
    isMain,
    id,
    config,
    dataBasicField: 'saEditInd',
    dataBasicFieldValue: 'N',
    returnOfPremium: form.getFieldValue('returnOfPremium'),
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
  const showAnnualLimit = useMemo(() => {
    if (
      !lodash.isEmpty(cfgPlanHospitalBenefitTarget) &&
      (cfgPlanHospitalBenefitTarget.annualLimit || cfgPlanHospitalBenefitTarget.sumAssured)
    ) {
      return getFieldDisplayAmount(
        cfgPlanHospitalBenefitTarget.annualLimit || cfgPlanHospitalBenefitTarget.sumAssured,
        `nb.policyList.coverageList.sumAssured`
      );
    }
    return null;
  }, [cfgPlanHospitalBenefitTarget]);

  const isShowAnnualLimit = useMemo(() => {
    return Boolean(
      Number(cfgPlanHospitalBenefitTarget?.annualLimit || cfgPlanHospitalBenefitTarget?.sumAssured)
    );
  }, [cfgPlanHospitalBenefitTarget]);

  const required = useGetFieldRequiredByConditions({
    config,
    localConfig: fieldConfig,
    disabled,
    form,
  });
  return canShow ? (
    <Col {...layout}>
      {isShowAnnualLimit ? (
        <FormItemInputText text={showAnnualLimit} />
      ) : (
        <FormItemNumber
          disabled={disabled}
          form={form}
          formName={config?.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={!isShowAnnualLimit && required}
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
