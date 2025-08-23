import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
  Validator,
} from 'basic/components/Form';

import { useSelector } from 'dva';
import { BenefitCategoryMapSection } from 'claim/enum/BenefitCategoryMapSection';
import HandleRecoverHook from '../Hook/HandleRecoverHook';
import { localFieldConfig } from './DeductibleAmount.config';

export { localFieldConfig } from './DeductibleAmount.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, NAMESPACE, id }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const handleRecover = HandleRecoverHook({ NAMESPACE, id });

  const payableId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap?.[id]?.payableId
  );
  const coverageKey = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.coverageKey
  );
  const listMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.[BenefitCategoryMapSection?.R]
  );
  const claimBenefitBalanceList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimProcessData?.claimBenefitBalanceList
  );
  const Rules = {
    VLD_000617: Validator.VLD_000617({
      id: id,
      coverageKey,
      listMap,
      claimBenefitBalanceList,
      limitDefinitionType: 'deductibles',
      fieldName: 'deductibleAmount',
    }),
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          recoverValue={form.getFieldValue('systemDeductibleAmount')}
          OnRecover={() => handleRecover(field, id)}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const DeductibleAmount = ({ field, config, isShow, layout, form, editable, NAMESPACE, id }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
      id={id}
    />
  </Authority>
);

DeductibleAmount.displayName = 'DeductibleAmount';

export default DeductibleAmount;
