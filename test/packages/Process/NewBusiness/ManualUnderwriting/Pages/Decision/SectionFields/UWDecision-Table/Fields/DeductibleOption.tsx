import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible } from 'basic/components/Form';
import useGetDeductibleOptionByProductCode from 'decision/components/Benefit/_hooks/useGetDeductibleOptionByProductCode';
import useJudgeIsDisplayDeductibleOption from 'decision/components/Benefit/_hooks/useJudgeIsDisplayDeductibleOption';
import useSetDeductitbleOptionDisable from 'decision/components/Benefit/Edit/_hooks/useSetDeductitbleOptionDisable';
import useHandleChangeNumberOfUnitsCallback from 'decision/components/Benefit/Edit/_hooks/useHandleChangeNumberOfUnitsCallback';
import { fieldConfig } from './Numberofunits.config';
import useGetcfgPlanHospitalBenefitTarget from 'decision/components/Benefit/components/CoverageList/_hooks/useGetcfgPlanHospitalBenefitTarget';
import { usePrevious } from 'ahooks';
import lodash from 'lodash';

export { fieldConfig } from './DeductibleOption.config';

const FormItem = ({ isShow, layout, form, editable, config, id, disabled, field }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetDeductibleOptionByProductCode({ id, field });
  const deductibleOptionDisable = useSetDeductitbleOptionDisable({ id });
  const visibleConditions = useJudgeIsDisplayDeductibleOption();
  let visibility = true;
  if (!lodash.isArray(dicts?.dictData) || dicts?.dictData?.length <= 0) {
    visibility = false;
  }
  const benefitTarget = useGetcfgPlanHospitalBenefitTarget({
    productCode: form.getFieldValue('coreCode'),
  });
  const requiredConditions = !!benefitTarget;
  const fieldName = dicts.dictCode ?? config.name ?? field;
  //联动逻辑同planOption(main产品联动rider产品)
  const handleChange = useHandleChangeNumberOfUnitsCallback({
    id,
    field: fieldName,
  });

  const [defaultValue, setDefaultValue] = useState('');
  const previousFieldName = usePrevious(fieldName);

  useEffect(() => {
    if (fieldName) {
      const initialValue = form.getFieldValue(fieldName);

      if (initialValue && !defaultValue) {
        setDefaultValue(initialValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldName]);

  useEffect(() => {
    // 修复由选项加载引起的formName变更后form对应取值丢失的问题
    if (defaultValue && fieldName !== previousFieldName && !form.getFieldValue(fieldName)) {
      form.setFieldsValue({ [fieldName]: defaultValue });
      setDefaultValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue, fieldName]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {visibility && (
          <FormItemSelect
            dicts={dicts.dictData}
            dictCode={dicts.dictCode}
            dictName={dicts.dictName}
            allowClear={true}
            disabled={
              !editable ||
              disabled ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? deductibleOptionDisable
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={fieldName}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={requiredConditions}
            labelType="inline"
            hiddenPrefix
            precision={0}
            placeholder=" "
            getPopupContainer={() => document.body}
            onChange={handleChange}
          />
        )}
      </Col>
    )
  );
};

const DeductibleOption = ({ field, config, form, editable, layout, isShow, id, disabled }: any) => (
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

DeductibleOption.displayName = 'deductibleOption';

export default DeductibleOption;
