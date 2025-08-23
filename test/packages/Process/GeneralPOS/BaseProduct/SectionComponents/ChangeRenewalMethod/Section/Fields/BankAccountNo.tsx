import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Visible,
  Validator,
  Rule,
} from 'basic/components/Form';
import lodash from 'lodash';
import { localFieldConfig } from './BankAccountNo.config';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { tenant } from '@/components/Tenant';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
export { localFieldConfig } from './BankAccountNo.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  isInline = true,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};
  const isDataCaptureCase = isDataCapture({ caseCategory });
  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);

  const Rules = {
    VLD_000999: Validator.VLD_000999(13),
  };
  const onChangeHandler = async (e: any) => {
    if (!/^[0-9]*$/g.test(e)) {
      let errors = {};
      try {
        await form.validateFields([field]);
      } catch (error) {
        errors = error;
      }
      form.setFields({
        [field]: {
          value: e.replace(/[^0-9]/g, ''),
          errors: errors?.errors?.[field]?.errors || [],
        },
      });
    }
  };
  const warningMessage = () => {
    const warns: { messageType: MessageType; message: any }[] = [];
    if (isHistory || !tenant.isPH() || !isDataCaptureCase) {
      return warns;
    }
    const warnCallback = (e: any) => {
      if (e) {
        warns.push({
          messageType: MessageType.Information,
          message: e,
        });
      }
    };
    Validator.VLD_000999(13)([], form.getFieldValue(field), warnCallback);
    return warns;
  };

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
          formName={config?.name || field}
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
          labelType={config.label?.type || fieldProps.label.type}
          warningMessage={warningMessage()}
          onChange={onChangeHandler}
          autoComplete="off"
        />
      </Col>
    )
  );
};

const BankAccountNo = ({ isShow, layout, form, editable, isInline, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      isInline={isInline}
      config={config}
      field={localFieldConfig.field}
    />
  </Authority>
);

BankAccountNo.displayName = localFieldConfig.field;

export default BankAccountNo;
