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
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './PremiumType.config';

export { localFieldConfig } from './PremiumType.config';
import { NAMESPACE } from '../../../../activity.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const allFundConfigList = (
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.processData?.policyInfo?.policyFundDOList
    ) || []
  )?.map((item) => item?.fundCode);

  const fundCode =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[
        transactionId
      ]?.partialWithdrawal?.partialWithdrawalFundList?.map((item) =>
        formUtils.queryValue(item.fundCode)
      )
    ) || [];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={allFundConfigList}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          existCodes={fundCode}
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
        />
      </Col>
    )
  );
};

const PremiumType = ({
  isShow,
  layout,
  form,
  editable,
  transactionId,
  config,
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
    />
  </Authority>
);

PremiumType.displayName = localFieldConfig.field;

export default PremiumType;
