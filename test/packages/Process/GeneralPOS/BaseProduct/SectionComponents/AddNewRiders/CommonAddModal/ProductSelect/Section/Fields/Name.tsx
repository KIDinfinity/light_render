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
import { localFieldConfig } from './Name.config';
export { localFieldConfig } from './Name.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { BenefitLevelDecisionEnum } from 'process/GeneralPOS/common/Enum';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const uwCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList
  );
  const clientNameByclientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.clientNameByclientId
  );
  const dicts = lodash.uniqBy(
    (uwCoverageList || [])
      .filter(
        (item) =>
          formUtils.queryValue(item.uwCoverageDecision?.decision) ===
            BenefitLevelDecisionEnum.NonStandard && item?.newAddFlag === 'Y'
      )
      .map((item) => {
        const dictCode = formUtils.queryValue(item?.clientId);
        return {
          dictCode,
          dictName:
            clientNameByclientId.find((clientItem) => clientItem?.dictCode === dictCode)
              ?.dictName || dictCode,
        };
      }),
    'dictCode'
  );

  const visibleConditions = true;
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
