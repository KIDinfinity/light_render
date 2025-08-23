import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';
import { localFieldConfig } from './BankAccountNo.config';
import lodash from 'lodash';
export { localFieldConfig } from './BankAccountNo.config';
import { VLD_000333 } from '../../../../../../../Claim/src/pages/PaymentAllocation/PH/Validators/VLD_000333.ts';
import { useSelector } from 'dva';

export const FormItem = ({ isShow, layout, form, editable, field, config, labelType }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const payeeList = useSelector(({ MYCLMOfCTG008DataCaptureController: modelnamespace }: any) =>
    lodash.compact(
      modelnamespace?.claimProcessData?.payeeList?.map(
        (id: any) => modelnamespace?.claimEntities?.payeeListMap?.[id] || {}
      ) || []
    )
  );

  const CurrentId = useSelector(
    ({ MYCLMOfCTG008DataCaptureController }) => MYCLMOfCTG008DataCaptureController.selectedPayeeId
  );
  const CurrentPayee = lodash.filter(payeeList, (item) => item.id == CurrentId);

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const validators = editable ? { validator: VLD_000333(payeeList, CurrentPayee) } : {};
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
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
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType={labelType || ''}
          rules={[validators]}
        />
      </Col>
    )
  );
};

const BankAccountNo = ({ field, config, isShow, layout, form, editable, labelType }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      labelType={labelType}
    />
  </Authority>
);

BankAccountNo.displayName = localFieldConfig.field;

export default BankAccountNo;
