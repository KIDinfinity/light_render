import React, { useEffect, useRef } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Validator,
  Rule,
  formUtils,
} from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './NextPaymentMode.config';
import { NAMESPACE } from '../../../../activity.config';

export { localFieldConfig } from './NextPaymentMode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  isNotDataCapture,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const useRefDiv = useRef();

  const policyPmMode =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.policyPmMode) || {};
  const runPaymentModeRule = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.runPaymentModeRule
  );
  const decision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id].decision
  );

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config?.['field-props']?.['x-dict']?.dictTypeCode ||
          localFieldConfig['field-props']['x-dict'].dictTypeCode
      ]
  );

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = isNotDataCapture
    ? tenant.region({
        ID: {},
        notMatch: () => ({
          VLD_000620: Validator.VLD_000620(
            formUtils.queryValue(decision),
            policyPmMode,
            runPaymentModeRule
          ),
        }),
      })
    : {};

  useEffect(() => {
    if (useRefDiv.current && formUtils.queryValue(decision) !== useRefDiv.current) {
      form.validateFields([field], {
        force: true,
      });
    }
    useRefDiv.current = formUtils.queryValue(decision);
  }, [decision]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts?.filter((dict) => dict.dictCode !== 'S')}
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
            (config?.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const NextPaymentMode = ({
  isShow,
  layout,
  form,
  editable,
  section,
  id,
  isNotDataCapture,
  config,
}: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      id={id}
      isNotDataCapture={isNotDataCapture}
      config={config}
      field={localFieldConfig.field}
    />
  </Authority>
);

NextPaymentMode.displayName = localFieldConfig.field;

export default NextPaymentMode;
