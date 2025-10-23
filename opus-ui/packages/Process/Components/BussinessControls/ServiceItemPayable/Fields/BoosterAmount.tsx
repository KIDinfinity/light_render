import React from 'react';

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
import HandleRecoverHook from '../Hook/HandleRecoverHook';
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
  booster,
  NAMESPACE,
  id,
}: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const payableId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap?.[id]?.payableId
  );

  const handleRecover = HandleRecoverHook({ NAMESPACE, id: booster?.id });

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '') && !boosterEditable;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const benefitCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.benefitCategory
  );
  const coverageKey = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.coverageKey
  );
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
      id: booster?.id,
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
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
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
          recoverValue={booster?.systemCalculationAmount || 0}
          OnRecover={() => handleRecover(field, booster?.id)}
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
  booster,
  NAMESPACE,
  id,
}: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      boosterEditable={boosterEditable}
      booster={booster}
      NAMESPACE={NAMESPACE}
      id={id}
    />
  </Authority>
);

BoosterAmount.displayName = 'boosterAmount';

export default BoosterAmount;
