import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  formUtils,
} from 'basic/components/Form';
import { localFieldConfig } from './FirstName.config';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
export { localFieldConfig } from './FirstName.config';
import lodash from 'lodash';
import { VLD_000332 } from '../../../../../../../Claim/src/pages/PaymentAllocation/PH/Validators/VLD_000332.ts';
export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = !form.getFieldValue('organization');
  const editableConditions = true;
  const requiredConditions = true;
  const payeeList = useSelector(
    ({ MYCLMOfCTG008DataCaptureController: modelnamespace }: any) =>
      lodash.compact(
        modelnamespace?.claimProcessData?.payeeList?.map(
          (id: any) => modelnamespace?.claimEntities?.payeeListMap?.[id] || {}
        ) || []
      ),
    shallowEqual
  );
  const id = useSelector(({ MYCLMOfCTG008DataCaptureController: modelnamespace }: any) =>
    formUtils.queryValue(
      modelnamespace?.selectedPayeeId || modelnamespace?.claimProcessData?.payeeList?.[0]
    )
  );

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

const FirstName = ({ field, config, isShow, layout, form, editable }: any) => (
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

FirstName.displayName = localFieldConfig.field;

export default FirstName;
