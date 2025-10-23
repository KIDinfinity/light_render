import React from 'react';
import { Col } from 'antd';
import {
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { localFieldConfig } from './Decision.config';
import useGetPolicyLevelDecisionDropdown from 'process/GeneralPOS/BaseProduct/_hooks/useGetPolicyLevelDecisionDropdown';

import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
export { localFieldConfig } from './Decision.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const uwCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList
  );
  const coverageListString = (uwCoverageList || [])
    .map(
      (item) =>
        `${item.mainFlag ? '[' : ''}${formUtils.queryValue(item.uwCoverageDecision?.decision)}`
    )
    .join('-');
  const dicts = useGetPolicyLevelDecisionDropdown(coverageListString);

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = true;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};
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
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          allowClear={false}
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
