import React from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  FormItemCurrency,
  RuleByForm,
  Rule,
  formUtils,
} from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import useDefaultValue from '../../../_hooks/useDefaultValue';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fnPrecisionParser } from '@/utils/precisionUtils';

import styles from './Annualincome.less';
import { fieldConfig } from './SecondaryAnnualIncome.config';
export { fieldConfig } from './SecondaryAnnualIncome.config';

const useGetAnnualIncomeMinLimit = ({ form }: any) => {
  const value = form.getFieldValue('incomeRange');
  const annualIncomeMinMapping = {
    '01': 0,
    '02': 25000,
    '03': 36000,
    '04': 51000,
    '05': 76000,
    '06': 100000,
    '07': 150000,
    '08': 200000,
  };
  const min = annualIncomeMinMapping[value] || 0;
  return min;
};

export const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const contractCurrency = form.getFieldValue('annualIncomeCurrency');
  useDefaultValue({
    id,
    monitorValue: form.getFieldValue('secondaryAnnualIncome'),
    currentField: field,
    defaultValue: 0,
    readOnly,
  });

  const visibleConditions = RuleByForm(config?.['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = Rule(config?.['required-condition'], form, '');
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

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
      },
    });
  };
  const min = useGetAnnualIncomeMinLimit({ form });

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
            currencyCode={formUtils.queryValue(contractCurrency)}
            // suffix={<span className={styles.suffix}>{contractCurrency}</span>}
            className={styles.annualIncome}
            parser={fnPrecisionParser}
            hiddenPrefix
            precision={2}
            onSuffixChange={onCurrencyCodeChange}
            pattern={/^\d{1,30}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
            objectName="nb.policyList.clientInfo"
            objectFieldName="secondaryAnnualIncome"
            min={min}
          />
        </div>
      </Col>
    )
  );
};

const SecondaryAnnualIncome = ({ form, editable, layout, isShow, id, config, readOnly }: any) => {
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
      />
    </Authority>
  );
};

SecondaryAnnualIncome.displayName = 'secondaryAnnualIncome';

export default SecondaryAnnualIncome;
