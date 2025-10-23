import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './AddressLine3.config';
import { AddressLevelEnum } from 'process/GeneralPOS/common/Enum';
import useGetCurrentLevelAddress from 'process/GeneralPOS/BaseProduct/_hooks/useGetCurrentLevelAddress';

export { localFieldConfig } from './AddressLine3.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  recoverObj,
  OnRecover,
  transactionId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const dicts = useGetCurrentLevelAddress({
    addressLevel: AddressLevelEnum.City,
    transactionId,
  });

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          // dictCode="subCode"
          // dictName="subName"
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config?.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          allowClear={false}
          getPopupContainer={() =>
            document.querySelector('.CommonNominee') ||
            document.body
          }
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
