import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  FormItemCurrency,
  RuleByForm,
  Rule,
} from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useDefaultValue';
import styles from 'process/NB/ManualUnderwriting/_components/EditableSection/fieldsLayout.less';
import useAutoSetContractCurrency from 'process/NB/ManualUnderwriting/_hooks/useAutoSetContractCurrency';
import useHandleIncomeChange from 'process/NB/ManualUnderwriting/_hooks/useHandleIncomeChange';
import useGetAnnualIncomeMinLimit from 'process/NB/ManualUnderwriting/_hooks/useGetAnnualIncomeMinLimit';
import { fnPrecisionParser } from '@/utils/precisionUtils';
import { fieldConfig } from './Annualincome.config';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
export { fieldConfig } from './Annualincome.config';

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
    monitorValue: form.getFieldValue('annualIncome'),
    currentField: field,
    defaultValue: 0,
  });

  const visibleConditions = RuleByForm(config?.['field-props']?.['visible-condition'], form);
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = Rule(config['field-props']['required-condition'], form, '');
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
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
  const handleChange = useHandleIncomeChange(id, 0, config?.magnification ?? 1);
  const min = useGetAnnualIncomeMinLimit({ clientId: id });

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
            objectFieldName="annualIncome"
            min={min}
          />
        </div>
      </Col>
    )
  );
};

const Annualincome = ({ form, editable, layout, isShow, id, config }: any) => {
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

Annualincome.displayName = 'annualIncome';

export default Annualincome;
