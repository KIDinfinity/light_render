import React from 'react';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './CountryCode.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { AddressLevelEnum } from 'process/GeneralPOS/common/Enum';
import useLoadSubAddress from 'process/GeneralPOS/BaseProduct/_hooks/useLoadSubAddress';

export { localFieldConfig } from './CountryCode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  useLoadSubAddress({
    addressLevel: AddressLevelEnum.Country,
    parentCode: form.getFieldValue(field),
  });

  const dicts = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.address?.country
  );

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
          dictCode="subCode"
          dictName="subName"
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
