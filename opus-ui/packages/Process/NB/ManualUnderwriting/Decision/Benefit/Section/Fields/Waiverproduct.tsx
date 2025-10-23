import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Required, Visible } from 'basic/components/Form';
import { fieldConfig } from './Waiverproduct.config';
import useJudgeWaiveProductDisplay from 'process/NB/ManualUnderwriting/_hooks/useJudgeWaiveProductDisplay';
import useJudgeWaiveProductEditable from 'process/NB/ManualUnderwriting/_hooks/useJudgeWaiveProductEditable';
import useGenerateWaiveOptionDict from 'process/NB/ManualUnderwriting/_hooks/useGenerateWaiveOptionDict';

export { fieldConfig } from './Waiverproduct.config';

const FormItem = ({ isShow, layout, form, editable, field, config, coreCode, disabled }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGenerateWaiveOptionDict({ coreCode });
  const visibleConditions = useJudgeWaiveProductDisplay();
  const editableConditions = useJudgeWaiveProductEditable({ coreCode });
  const requiredConditions = editableConditions;
  const isHasVal = form?.getFieldValue('waiveProductList') ?? false;
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          mode={!isHasVal && editableConditions ? 'single' : 'multiple'}
          dicts={dicts}
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
          labelType="inline"
          hiddenPrefix
          precision={0}
          optionShowType="both"
          placeholder=" "
          dictCode={'waiveProduct'}
          dictName={'productName'}
        />
      </Col>
    )
  );
};

const WaiverProduct = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
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
      coreCode={coreCode}
      editable={editable}
      disabled={disabled}
    />
  </Authority>
);

WaiverProduct.displayName = 'waiveProductList';

export default WaiverProduct;
