import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  formUtils,
  Validator,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { DecisionEnum } from 'process/GeneralPOS/common/Enum';
import { tenant, Language, Region } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { localFieldConfig } from './MaritalStatus.config';

export { localFieldConfig } from './MaritalStatus.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  transactionId,
  isAdd,
  recoverObj,
  OnRecover,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '') || isAdd;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const dictTypeCode = config['x-dict']?.dictTypeCode || fieldProps['x-dict'].dictTypeCode;

  const originDicts = useSelector(
    ({ dictionaryController }: any) => dictionaryController[dictTypeCode]
  );

  const dicts = tenant.region({
    [Region.TH]: lodash
      .entries(window?.dictionary?.[dictTypeCode] || {})
      .filter(([key, value]) => value?.[Language.TH])
      .map(([key, value]) => ({ dictCode: key, dictName: value?.[Language.TH] }))
      .concat([{ dictCode: 'P', dictName: 'แยกกันอยู่' }]),
    notMatch: originDicts,
  });

  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.decision
  );

  const cleanDecision = formUtils.queryValue(decision);

  const validating = useSelector(
    ({ formCommonController }: any) => formCommonController?.validating
  );
  const Rules =
    validating && cleanDecision !== DecisionEnum.D
      ? {
          VLD_001015: Validator.VLD_001015(
            dicts,
            formatMessageApi({
              [config.label?.dictTypeCode || fieldProps.label.dictTypeCode]:
                config.label?.dictCode || fieldProps.label.dictCode,
            })
          ),
        }
      : {};

  const otherParams = {
    recoverValue: recoverObj[localFieldConfig.field],
    OnRecover,
  };
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          isInline
          allowClear={false}
          {...otherParams}
        />
      </Col>
    )
  );
};

const MaritalStatus = ({
  isShow,
  layout,
  form,
  editable,
  transactionId,
  config,
  isAdd,
  recoverObj,
  OnRecover,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      transactionId={transactionId}
      field={localFieldConfig.field}
      config={config}
      isAdd={isAdd}
      recoverObj={recoverObj}
      OnRecover={OnRecover}
    />
  </Authority>
);

MaritalStatus.displayName = localFieldConfig.field;

export default MaritalStatus;
