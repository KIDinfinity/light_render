import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, Required, Visible, FormItemSelectPlus } from 'basic/components/Form';
import { localFieldConfig } from './BranchCode.config';

export { localFieldConfig } from './BranchCode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  seachCustom,
  labelType,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const bankCode = form.getFieldValue('bankCode');

  const { handleBankBranch } = seachCustom || {};

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          optionShowType="both"
          searchName="bankBranch"
          extraData={bankCode}
          searchCustom={(postData: any) => handleBankBranch(postData, bankCode)}
          labelType={labelType || ''}
        />
      </Col>
    )
  );
};

const BranchCode = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  seachCustom,
  labelType,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      seachCustom={seachCustom}
      labelType={labelType}
    />
  </Authority>
);

BranchCode.displayName = localFieldConfig.field;

export default BranchCode;
