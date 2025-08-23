import { Col } from 'antd';
import {
  Editable,
  FormItemSelect,
  formUtils,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { useEffect } from 'react';
import { localFieldConfig } from './AddressType.config';

export { localFieldConfig } from './AddressType.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isAdd,
  transactionId,
  clientIndex,
  addHandle,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const value = form.getFieldValue(field);

  useEffect(() => {
    if (isAdd && !lodash.isEmpty(value)) {
      form.setFieldsValue({ [field]: '' });
    }
  }, [value]);

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode || localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const addressList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.clientInfoList?.[clientIndex]
        ?.addressList
  );

  const existCodes = lodash.map(addressList, (item) => formUtils.queryValue(item?.addressType));

  const changeHandle = (value) => {
    if (isAdd) {
      addHandle(value, field);
      form.setFieldsValue({ [field]: '' });
    }
  };

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
          existCodes={existCodes}
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
            isAdd
              ? lodash.isEmpty(addressList)
              : (config?.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          onChange={changeHandle}
          getPopupContainer={() => document.querySelector('.CommonNominee') || document.body}
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
