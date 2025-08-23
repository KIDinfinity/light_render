import React, { useEffect } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { NAMESPACE } from 'process/HKCLM/ManualAssessment/activity.config';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Validator,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './Expense.config';

export { localFieldConfig } from './Expense.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, serviceItemId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const serviceItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemListMap?.[serviceItemId]
  );

  const breakdownConfirmServiceItemId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.breakdownConfirmServiceItemId
  );

  const feeItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemListMap?.[serviceItemId]?.feeItemList
  );

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = lodash.isEmpty(feeItemList);
  const requiredConditions = true;

  useEffect(() => {
    if (breakdownConfirmServiceItemId === serviceItemId && editableConditions)
      form.validateFields([config.name || field], { force: true });
  }, [breakdownConfirmServiceItemId, serviceItem?.claimServiceItemBreakDownList]);

  const Rules = {
    VLD_000663: Validator.VLD_000663(serviceItem),
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
          precision={2}
          min={0}
          max={999999999.99}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const Expense = ({ field, config, isShow, layout, form, editable, serviceItemId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      serviceItemId={serviceItemId}
    />
  </Authority>
);

Expense.displayName = 'Expense';

export default Expense;
