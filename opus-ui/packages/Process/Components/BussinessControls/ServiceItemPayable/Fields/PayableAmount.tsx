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
import PayableAmountHook from '../Hook/PayableAmountHook';
import HandleRecoverHook from '../Hook/HandleRecoverHook';
import { localFieldConfig } from './PayableAmount.config';

export { localFieldConfig } from './PayableAmount.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, NAMESPACE, id }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];

  const payableId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap?.[id]?.payableId
  );

  const handleRecover = HandleRecoverHook({ NAMESPACE, id });

  const extra: any = PayableAmountHook({ NAMESPACE, payableId });
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = extra?.editable;
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const benefitCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.benefitCategory
  );
  const coverageKey = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.coverageKey
  );
  const claimBenefitBalanceList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimProcessData?.claimBenefitBalanceList
  );
  const listMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.[BenefitCategoryMapSection?.[benefitCategory]]
  );
  const Rules = {
    VLD_000617: Validator.VLD_000617({
      id: id,
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
          recoverValue={form.getFieldValue('systemCalculationAmount') || 0}
          OnRecover={() => handleRecover(field, id)}
          min={-Number.MAX_VALUE}
          pattern={
            /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
          }
          formatter={fnPrecisionFormatNegative}
          onHover={true}
        />
      </Col>
    )
  );
};

const PayableAmount = ({ field, config, isShow, layout, form, editable, NAMESPACE, id }: any) => (
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

PayableAmount.displayName = 'payableAmount';

export default PayableAmount;
