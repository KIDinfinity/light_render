import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { Authority, Visible, Editable, FormItemCurrency, RuleByForm } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useDefaultValue';
import styles from 'process/NB/ManualUnderwriting/_components/EditableSection/fieldsLayout.less';
import useAutoSetContractCurrency from 'process/NB/ManualUnderwriting/_hooks/useAutoSetContractCurrency';
import { fnPrecisionParser } from '@/utils/precisionUtils';
import { fieldConfig } from './MonthlyIncome.config';
import useHandleIncomeChange from 'process/NB/ManualUnderwriting/_hooks/useHandleIncomeChange';

export { fieldConfig } from './MonthlyIncome.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList[0]?.clientInfoList
  );
  const contractCurrency = lodash.find(clientInfoList, (item: any) => item?.id === id)
    ?.annualIncomeCurrency;

  useDefaultValue({
    id,
    monitorValue: form.getFieldValue('monthlyIncome'),
    currentField: field,
    defaultValue: 0,
  });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  const handleChange = useHandleIncomeChange(id, 1, config?.magnification ?? 1);

  useAutoSetContractCurrency({ id, contractCurrency });
  const onCurrencyCodeChange = (selectCurrency: any) => {
    const { currencyCode } = selectCurrency;
    dispatch({
      type: `${NAMESPACE}/saveFormData`,
      target: 'changeBasicInfoFields',
      payload: {
        changedFields: {
          annualIncomeCurrency: currencyCode,
        },
        id,
      },
    });
  };
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.annualIncome}>
          <FormItemCurrency
            disabled={
              !editable ||
              ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={
              config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
            }
            required={requiredByRole}
            currencyCode={contractCurrency}
            // suffix={<span className={styles.suffix}>{contractCurrency}</span>}
            className={styles.annualIncome}
            parser={fnPrecisionParser}
            hiddenPrefix
            precision={2}
            onSuffixChange={onCurrencyCodeChange}
            onChange={handleChange}
            pattern={/^\d{1,30}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
            objectName="nb.policyList.clientInfo"
            objectFieldName="monthlyIncome"
          />
        </div>
      </Col>
    )
  );
};

const Monthlyincome = ({ form, editable, layout, isShow, id, config }: any) => {
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
      />
    </Authority>
  );
};

Monthlyincome.displayName = 'monthlyIncome';

export default Monthlyincome;
