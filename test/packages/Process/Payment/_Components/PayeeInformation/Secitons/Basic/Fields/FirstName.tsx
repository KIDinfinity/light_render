import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemInput, Required, Visible } from 'basic/components/Form';
import { localFieldConfig } from './FirstName.config';
export { localFieldConfig } from './FirstName.config';
import { VLD_000332 } from '../../../../Validators/VLD_000332';
import { useSelector } from 'dva';

export const FormItem = ({ isShow, layout, form, editable, field, config, NAMESPACE }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = !form.getFieldValue('organization');
  const editableConditions = true;
  const requiredConditions = true;
  const payeeList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas?.payeeList
    ) || [];
  const id =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.activePayeeId
    ) || '';

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

const FirstName = ({ field, config, isShow, layout, form, editable, NAMESPACE }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

FirstName.displayName = localFieldConfig.field;

export default FirstName;
