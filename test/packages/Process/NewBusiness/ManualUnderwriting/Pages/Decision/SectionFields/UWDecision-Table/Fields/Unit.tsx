import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemNumber } from 'basic/components/Form';
import useJudgeCurrentProductPremiumInUnitBasis from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useJudgeCurrentProductPremiumInUnitBasis';
import { fieldConfig } from './Unit.config';
import useJudgePremiumInUnitBasis from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/components/Benefit/_hooks/useJudgePremiumInUnitBasis';
import Mode from 'process/NewBusiness/ManualUnderwriting/_enum/Mode';

export { fieldConfig } from './Unit.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const isPremiumInUnitBasis = useJudgeCurrentProductPremiumInUnitBasis({
    coverageId: id,
  });
  const isDisplayUnit = useJudgePremiumInUnitBasis(Mode.Edit);
  const visibleConditions = isDisplayUnit;
  const disabled = !isPremiumInUnitBasis;
  const requiredConditions = true;

  return (
    (isShow &&
      ((config?.visible || fieldProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || fieldProps.visible) === Visible.Yes) && (
        <Col {...layout}>
          <FormItemNumber
            disabled={
              !editable ||
              ((config?.visible || fieldProps.editable) === Editable.Conditions
                ? disabled
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config?.required || fieldProps.required) === Required.Yes
            }
            hiddenPrefix
            precision={0}
            placeholder=" "
            labelType="inline"
          />
        </Col>
      )) ||
    null
  );
};

const Unit = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  id,
  clientId,
  disabled,
  disabledForMain,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={field}
        config={config?.['field-props']}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        clientId={clientId}
        disabled={disabled}
        disabledForMain={disabledForMain}
      />
    </Authority>
  );
};

Unit.displayName = 'unit';

export default Unit;
