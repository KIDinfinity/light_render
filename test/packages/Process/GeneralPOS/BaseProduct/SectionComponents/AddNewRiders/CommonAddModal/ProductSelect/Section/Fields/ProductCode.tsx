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
import { shallowEqual } from 'react-redux';
import { localFieldConfig } from './ProductCode.config';
export { localFieldConfig } from './ProductCode.config';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { BenefitLevelDecisionEnum } from 'process/GeneralPOS/common/Enum';

export const FormItem = ({ isShow, layout, form, editable, field, config, transactionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const name = form.getFieldValue('name');

  const uwCoverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList
  );
  const planProductConfig = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig,
    shallowEqual
  );
  const { otherPlanProductFeatureList, basicPlanProductFeatureList } = lodash
    .chain(planProductConfig)
    .pick(['otherPlanProductFeatureList', 'basicPlanProductFeatureList'])
    .value();
  const dicts = lodash.uniqBy(
    (uwCoverageList || [])
      .filter(
        (item: any) =>
          formUtils.queryValue(item.uwCoverageDecision?.decision) ===
            BenefitLevelDecisionEnum.NonStandard &&
          item?.clientId === name &&
          item?.newAddFlag === 'Y'
      )
      .map((item: any) => {
        const dictCode = formUtils.queryValue(item?.productCode);
        return {
          dictCode,
          dictName:
            lodash
              .chain(otherPlanProductFeatureList)
              .concat(basicPlanProductFeatureList)
              .find((configItem) => configItem?.productCode === dictCode)
              .get('productName')
              .value() || dictCode,
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
          optionShowType="both"
        />
      </Col>
    )
  );
};

FormItem.displayName = localFieldConfig.field;

export default FormItem;
