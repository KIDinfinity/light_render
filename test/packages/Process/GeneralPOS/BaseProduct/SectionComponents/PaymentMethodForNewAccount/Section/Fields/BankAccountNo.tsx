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
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { tenant } from '@/components/Tenant';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { useSelector } from 'dva';
import { localFieldConfig } from './BankAccountNo.config';

export { localFieldConfig } from './BankAccountNo.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

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
  const value = form.getFieldValue(field);
  const maxLength = 20;
  const valueToString = lodash.toString(value);
  const Rules = {
    VLD_000002: Validator.VLD_000002(undefined, maxLength),
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
  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};
  const isDataCaptureCase = isDataCapture({ caseCategory });

  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);

  const warningMessage = () => {
    const warns = [];
    if (isHistory) {
      return warns;
    }
    if (tenant.isPH() && isDataCaptureCase && valueToString?.length > maxLength) {
      warns.push({
        messageType: MessageType.Information,
        message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000003' }, maxLength),
      });
    }
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
          onChange={onChangeHandler}
          warningMessage={warningMessage()}
          isInline={isInline}
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
