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
import { NAMESPACE } from '../../../../activity.config';
import { useSelector } from 'dva';
import { BenefitCategoryMapSection } from 'claim/enum/BenefitCategoryMapSection';
import { localFieldConfig } from './DeductibleAmount.config';

export { localFieldConfig } from './DeductibleAmount.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  onRecover,
  id,
  coverageKey,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = true;

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
      id,
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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          recoverValue={form.getFieldValue('systemDeductibleAmount')}
          OnRecover={onRecover}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          onHover
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

const DeductibleAmount = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  onRecover,
  id,
  coverageKey,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      onRecover={onRecover}
      id={id}
      coverageKey={coverageKey}
    />
  </Authority>
);

DeductibleAmount.displayName = 'DeductibleAmount';

export default DeductibleAmount;
