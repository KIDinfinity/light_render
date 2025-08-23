import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import useJudgeDisplayRop from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayRop';
import { fieldConfig } from './ReturnOfPremium.config';
import useGetRopListByCoreCode from 'process/NB/ManualUnderwriting/_hooks/useGetRopListByCoreCode';
export { fieldConfig } from './ReturnOfPremium.config';

const FormItem = ({ isShow, layout, form, field, config, disabled }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const coreCode = form.getFieldValue('coreCode');

  const dicts = useGetRopListByCoreCode({ coreCode });
  const visibleConditions = useJudgeDisplayRop();
  const editableConditions = !useJudgeDisplayRop(coreCode);
  const requiredConditions = useJudgeDisplayRop(coreCode);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
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
          labelType="inline"
          hiddenPrefix
          precision={0}
          // optionShowType="both"
          placeholder=""
        />
      </Col>
    )
  );
};

const ReturnOfPremium = ({
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

ReturnOfPremium.displayName = 'returnOfPremium';

export default ReturnOfPremium;
