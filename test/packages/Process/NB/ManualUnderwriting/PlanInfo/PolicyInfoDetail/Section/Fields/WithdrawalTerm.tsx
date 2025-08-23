import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, Visible, Required } from 'basic/components/Form';
import useJudgeTargetBaseProductDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeTargetBaseProductDisplay';
import { fieldConfig } from './WithdrawalTerm.config';

export { fieldConfig } from './WithdrawalTerm.config';

const FormItem = ({ isShow, layout, form, editable, field, config, disabled }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const targetBaseProductIsUL07 = useJudgeTargetBaseProductDisplay({ targetProduct: 'UL07' });
  const visibleConditions = targetBaseProductIsUL07;
  const editableConditions = false;
  const requiredConditions = true;

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
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          pattern={/^\d{0,20}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
          hiddenPrefix
          precision={0}
          placeholder=" "
          objectName="nb.policyList.coverageList"
          objectFieldName="withdrawalTerm"
        />
      </Col>
    )
  );
};

const WithdrawalTerm = ({ field, config, form, editable, layout, isShow, disabled }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config?.['field-props']}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      disabled={disabled}
    />
  </Authority>
);

WithdrawalTerm.displayName = 'withdrawalTerm';

export default WithdrawalTerm;
