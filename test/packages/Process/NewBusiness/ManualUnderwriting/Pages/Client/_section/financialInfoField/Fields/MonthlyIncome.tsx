import React, { useMemo } from 'react';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Visible,
  Editable,
  FormItemCurrency,
  RuleByForm,
  Validator,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useDefaultValue from '../../../_hooks/useDefaultValue';
import useAutoSetContractCurrency from '../../../_hooks/useAutoSetContractCurrency';
import useGetRequiredByAgeAndOccupation from '../../../_hooks/useGetRequiredByAgeAndOccupation';
import useHandleIncomeChange from '../../../_hooks/useHandleIncomeChange';

import { fieldConfig } from './MonthlyIncome.config';
import styles from './Annualincome.less';
export { fieldConfig } from './MonthlyIncome.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  id,
  readOnly,
  itemConfig,
}: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const contractCurrencyEdit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[id]?.annualIncomeCurrency
  );
  const contractCurrencyReadonly = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[id]?.annualIncomeCurrency
  );

  const contractCurrency = readOnly ? contractCurrencyReadonly : contractCurrencyEdit;

  useDefaultValue({
    id,
    monitorValue: form.getFieldValue('monthlyIncome'),
    currentField: field,
    defaultValue: 0,
    readOnly,
  });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByAgeAndOccupation({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  const handleChange = useHandleIncomeChange(id, 1);
  useAutoSetContractCurrency({ id, contractCurrency });
  const onCurrencyCodeChange = (selectCurrency: any) => {
    const { currencyCode } = selectCurrency;
    dispatch({
      type: `${NAMESPACE}/saveFormData`,
      target: 'saveFinancialInfo',
      payload: {
        changedFields: {
          annualIncomeCurrency: currencyCode,
        },
        id,
        errorId: id,
      },
    });
  };
  const Rules = {
    VLD_001095: Validator.VLD_001095(0),
  };
  const curRules = useMemo(() => {
    if (requiredByRole && lodash.isArray(config?.['x-rules'])) {
      return lodash.compact(config?.['x-rules'].map((rule: string) => Rules[rule]));
    }
    return [];
  }, [requiredByRole]);
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.annualIncome}>
          <FormItemCurrency
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={requiredByRole}
            currencyCode={contractCurrency}
            // suffix={<span className={styles.suffix}>{contractCurrency}</span>}
            className={styles.annualIncome}
            hiddenPrefix
            precision={2}
            rules={curRules}
            onChange={handleChange}
            onSuffixChange={onCurrencyCodeChange}
            pattern={/^\d{1,30}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
            objectName="nb.policyList.clientInfo"
            objectFieldName="monthlyIncome"
          />
        </div>
      </Col>
    )
  );
};

const Monthlyincome = ({
  form,
  editable,
  layout,
  isShow,
  id,
  config,
  readOnly,
  itemConfig,
}: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        readOnly={readOnly}
        itemConfig={itemConfig}
      />
    </Authority>
  );
};

Monthlyincome.displayName = 'monthlyIncome';

export default Monthlyincome;
