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
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

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
  const rcsApplicable = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.rcsApplicable
  );
  const preDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.preDecision
  );
  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);
  const isDataCaptureCase = isDataCapture({ caseCategory });
  const value = form.getFieldValue(field);

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const maxLength = 30;
  const valueToString = lodash.toString(value);
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
    VLD_000967: rcsApplicable === '01' && preDecision !== 'AP' && Validator.VLD_000967(),
    VLD_000968: Validator.VLD_000968(preDecision),
    VLD_000972: Validator.VLD_000972(),
  };

  const rules = lodash.compact(
    (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
  );

  const warningMessage = () => {
    const warns = [];
    if (isHistory) {
      return warns;
    }
    if (!(tenant.isPH() && isDataCaptureCase)) {
      return warns;
    }
    const warnCallback = (e) => {
      if (e) {
        warns.push({
          messageType: MessageType.Information,
          message: e,
        });
      }
    };
    Validator.VLD_000968(preDecision)([], form.getFieldValue(field), warnCallback);
    Validator.VLD_000972()([], form.getFieldValue(field), warnCallback);
    return warns;
  };

  const otherParams = tenant.region({
    [Region.PH]: {
      recoverValue: recoverObj[localFieldConfig.field],
      OnRecover,
      rules: isDataCaptureCase ? [] : rules,
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
          warningMessage={warningMessage()}
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
