import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
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
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import { BenefitCategoryMapSection } from 'claim/enum/BenefitCategoryMapSection';
import { localFieldConfig } from './BoosterAmount.config';

export { localFieldConfig } from './BoosterAmount.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  boosterEditable,
  originAmount,
  OnRecover,
  id,
  coverageKey,
  benefitCategory,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !boosterEditable;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const listMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.[BenefitCategoryMapSection?.[benefitCategory]]
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
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          labelType="inline"
          placeholder
          recoverValue={originAmount || 0}
          OnRecover={OnRecover}
          onHover={true}
          pattern={
            /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
          }
          formatter={fnPrecisionFormatNegative}
          precision={config?.precision || fieldProps.precision}
          max={config?.max || fieldProps.max}
          min={config?.min || fieldProps.min}
        />
      </Col>
    )
  );
};

const BoosterAmount = ({ field, config,
  isShow,
  layout,
  form,
  editable,
  boosterEditable,
  recoverValue,
  OnRecover,
  originAmount,
  id,
  coverageKey,
  benefitCategory,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      boosterEditable={boosterEditable}
      OnRecover={OnRecover}
      recoverValue={recoverValue}
      originAmount={originAmount}
      id={id}
      coverageKey={coverageKey}
      benefitCategory={benefitCategory}
    />
  </Authority>
);

BoosterAmount.displayName = 'boosterAmount';

export default BoosterAmount;
