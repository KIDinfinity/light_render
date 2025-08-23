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
import { tenant, Region } from '@/components/Tenant';
import { localFieldConfig } from './Email.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

export { localFieldConfig } from './Email.config';
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
  recoverObj = {},
  OnRecover,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const { caseCategory } = useSelector(({ processTask }: any) => processTask.getTask) || {};

  const isDataCaptureCase = isDataCapture({ caseCategory });
  const value = form.getFieldValue(field);
  const rcsApplicable = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.rcsApplicable
  );
  const preDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.preDecision
  );
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');

  const requiredConditions = tenant.region({
    [Region.ID]: form.getFieldValue(config.name || field)?.length > 0 ? true : false,
    notMatch: Rule(fieldProps['required-condition'], form, ''),
  });

  const Rules = {
    VLD_000618: Validator.VLD_000618(),
    VLD_000961: rcsApplicable === '01' && preDecision !== 'AP' && Validator.VLD_000961(),
  };
  const rules = lodash.compact(
    (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
  );

  const isHistory = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isHistory);

  const warningMessage = () => {
    let warns = [];
    if (isHistory) {
      return warns;
    }
    if (isDataCaptureCase) {
      warns =
        rules
          ?.map((item: any) => {
            let result = undefined;
            const callback = (e) => (result = e || result);
            item(undefined, value, callback);
            return {
              message: result,
              messageType: MessageType.Information,
            };
          })
          ?.filter((item) => item.message) || [];
    }
    return warns;
  };

  const otherParams = tenant.region({
    [Region.PH]: {
      recoverValue: recoverObj[localFieldConfig.field],
      OnRecover,
      warningMessage: warningMessage(),
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
          {...otherParams}
        />
      </Col>
    )
  );
};

const Email = ({ isShow, layout, form, editable, recoverObj, OnRecover, config }: any) => (
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

Email.displayName = localFieldConfig.field;

export default Email;
