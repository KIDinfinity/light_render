import React from 'react';
import { Col } from 'antd';
import { Editable, FormItemSelect, Required, Visible, Rule } from 'basic/components/Form';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { localFieldConfig } from './AddressLine5.config';
import { AddressLevelEnum } from 'process/GeneralPOS/common/Enum';
import useLoadSubAddress from 'process/GeneralPOS/BaseProduct/_hooks/useLoadSubAddress';
import useGetCommonNomineeCurrentLevelAddress from 'process/GeneralPOS/BaseProduct/_hooks/useGetCommonNomineeCurrentLevelAddress';

export { localFieldConfig } from './AddressLine5.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const addressLevel = tenant.region({
    [Region.MY]: AddressLevelEnum.Province,
    notMatch: AddressLevelEnum.Province,
  });

  useLoadSubAddress({
    addressLevel,
    parentCode: form.getFieldValue(field),
  });

  const dicts = useGetCommonNomineeCurrentLevelAddress({
    addressLevel,
    formData: form.getFieldsValue(),
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
          dictCode="subCode"
          dictName="subName"
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
