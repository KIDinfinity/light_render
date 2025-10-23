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
import { localFieldConfig } from './ClientName.config';

export { localFieldConfig } from './ClientName.config';
import { NAMESPACE } from '../../../../activity.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  transactionId,
  isAdd,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const clientInfoList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.processData?.policyInfo?.clientInfoList
    ) || [];
  const changeCustomerInfoList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.changeCustomerInfoList
    ) || [];
  const existClientNameList = lodash.map(changeCustomerInfoList, (item) =>
    formUtils.queryValue(item.clientId)
  );
  const customerClientNameListMisc = lodash.map(clientInfoList, (item) => {
    return { dictCode: item?.clientId, dictName: item?.wholeName };
  });
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '') || isAdd;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={customerClientNameListMisc}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          existCodes={existClientNameList}
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
          labelType="inline"
          allowClear={false}
        />
      </Col>
    )
  );
};

const ClientName = ({
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

ClientName.displayName = localFieldConfig.field;

export default ClientName;
