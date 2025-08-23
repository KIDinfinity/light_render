import React, { useCallback} from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import lodash from 'lodash';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Authority, Editable, FormItemSelect, Visible, Rule } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './Incomerange.config';
export { fieldConfig } from './Incomerange.config';

const useHandleChangeIncomeRange = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  return useCallback(
    (key: string) => {
      const annualIncomeRangeMapping = {
        '01': 25000,
        '02': 35999,
        '03': 50999,
        '04': 75999,
        '05': 99999,
        '06': 149999,
        '07': 200000,
        '08': 200000 + 1,
      };

      const annualIncome = lodash.get(annualIncomeRangeMapping, key);
      const monthlyIncome = annualIncome / 12;

      dispatch({
        type: `${NAMESPACE}/saveFinancialInfo`,
        payload: {
          changedFields: {
            annualIncome,
            monthlyIncome,
          },
          id,
        },
      });
    },
    [id]
  );
};

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(config['required-condition'], form, '');
  const handleChange = useHandleChangeIncomeRange({ id });
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id
    });
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
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          hiddenPrefix
          precision={0}
          onSelect={handleChange}
        />
      </Col>
    )
  );
};

const Incomerange = ({ form, editable, layout, isShow, config, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
      id={id}
    />
  </Authority>
);

Incomerange.displayName = 'incomeRange';

export default Incomerange;
