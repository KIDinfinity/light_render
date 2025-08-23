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
import { localFieldConfig } from './WorkNo.config';

export { localFieldConfig } from './WorkNo.config';
import { tenant, Region } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { isDataCapture } from 'process/GeneralPOS/common/utils';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

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
  const otherParams = tenant.region({
    [Region.PH]: {
      recoverValue: recoverObj[localFieldConfig.field],
      OnRecover,
    },
    [Region.MY]: {},
    notMatch: {},
  });
  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const value = form.getFieldValue(field);
  const maxLength = 16;
  const valueToString = lodash.toString(value);

  const isDataCaptureCase = isDataCapture({ caseCategory });
  const Rules = {
    VLD_000002: Validator.VLD_000002(undefined, maxLength),
  };

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
          onChange={(e: any) => {
            const hasLetter = new RegExp(/[a-zA-Z]+/);
            if (hasLetter.test(e)) {
              form.setFieldsValue({ [localFieldConfig.field]: e.replace(/[a-zA-Z]+/g, '') });
            }
          }}
          warningMessage={warningMessage()}
          {...otherParams}
        />
      </Col>
    )
  );
};

const WorkNo = ({ isShow, layout, form, editable, recoverObj, OnRecover, config }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      recoverObj={recoverObj}
      OnRecover={OnRecover}
      field={localFieldConfig.field}
      config={config}
    />
  </Authority>
);

WorkNo.displayName = localFieldConfig.field;

export default WorkNo;
