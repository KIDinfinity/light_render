import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';
import { localFieldConfig } from './Surname.config';

export { localFieldConfig } from './Surname.config';
import { VLD_000332 } from '../../../../Validators/VLD_000332.ts';
import { useSelector } from 'dva';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;
  const payeeList =
    useSelector(({ paymentAllocation }: any) => paymentAllocation?.claimData?.payeeList) || [];
  const id = useSelector(({ paymentAllocation }: any) => paymentAllocation?.activePayeeId) || '';

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
          labelType="inline"
          rules={[
            {
              validator: VLD_000332({ payeeList, id, formName: field }),
            },
          ]}
        />
      </Col>
    )
  );
};

const Surname = ({ field, config, isShow, layout, form, editable }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

Surname.displayName = localFieldConfig.field;

export default Surname;
