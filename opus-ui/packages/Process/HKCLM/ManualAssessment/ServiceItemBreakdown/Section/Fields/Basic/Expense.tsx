import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from 'process/HKCLM/ManualAssessment/activity.config';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
} from 'basic/components/Form';
import BreakDown from 'basic/enum/Breakdown';
import { localFieldConfig } from './Expense.config';

export { localFieldConfig } from './Expense.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, breakDownId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const claimServiceItemBreakDownList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimServiceItemBreakDownList
  );

  const serviceItemBreakdownItem = lodash.find(claimServiceItemBreakDownList, ['id', breakDownId]);

  const visibleConditions = true;
  const editableConditions = serviceItemBreakdownItem.editable !== BreakDown.NO;
  const requiredConditions = serviceItemBreakdownItem.editable !== BreakDown.NO;

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
          labelType={config.label?.type || fieldProps.label.type}
        />
      </Col>
    )
  );
};

const Expense = ({ field, config, isShow, layout, form, editable, breakDownId }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} breakDownId={breakDownId} />
  </Authority>
);

Expense.displayName = 'Expense';

export default Expense;
