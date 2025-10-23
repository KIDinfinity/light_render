import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Rule,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './AddressLine1.config';

export { localFieldConfig } from './AddressLine1.config';
import { tenant, Region } from '@/components/Tenant';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { useSelector } from 'dva';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  recoverObj,
  OnRecover,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};

  const isDataCaptureCase = isDataCapture({ caseCategory });
  const value = form.getFieldValue(field);

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const blurHandle = (e) => {
    if (tenant.isTH()) {
      try {
        form.setFieldsValue({
          [field]: `${e.target.value}`
            .trimStart()
            .replace(/  /gi, ' ')
            .replace(/ '/gi, "'")
            .replace(/(, )|(,)/gi, ', '),
        });
        form.validateFields([field], {
          force: true,
        });
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  const Rules = {
    VLD_000967: Validator.VLD_000967(),
    VLD_000968: Validator.VLD_000968(),
    VLD_000972: Validator.VLD_000972(),
  };

  const rules = lodash.compact(
    (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
  );

  const otherParams = tenant.region({
    [Region.PH]: {
      recoverValue: recoverObj[localFieldConfig.field],
      OnRecover,
      maxLength: 30,
      warningMessage: isDataCaptureCase
        ? rules
          .map((item: any) => {
            let result = undefined;
            const callback = (e) => (result = e || result);
            item(undefined, value, callback);
            return {
              message: result,
              messageType: MessageType.Information,
            };
          })
          .filter((item) => item.message)
        : [],
      rules: isDataCaptureCase ? [] : rules
    },
    [Region.MY]: {},
    notMatch: {},
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          allowClear
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
          rules={rules}
          onBlur={blurHandle}
          {...otherParams}
        />
      </Col>
    )
  );
};

const AddressLine1 = ({
  isShow,
  layout,
  form,
  editable,
  recoverObj,
  OnRecover,
  transactionId,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      recoverObj={recoverObj}
      OnRecover={OnRecover}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
    />
  </Authority>
);

AddressLine1.displayName = localFieldConfig.field;

export default AddressLine1;
