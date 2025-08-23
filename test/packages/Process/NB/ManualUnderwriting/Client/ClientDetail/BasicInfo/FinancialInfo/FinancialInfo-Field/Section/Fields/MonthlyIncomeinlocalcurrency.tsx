import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col, Icon } from 'antd';
import lodash from 'lodash';
import { Authority, Visible, Editable, FormItemNumber, RuleByForm } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import styles from 'process/NB/ManualUnderwriting/_components/EditableSection/fieldsLayout.less';
import useGetIncomeTypeVisible from 'process/NB/ManualUnderwriting/_hooks/useGetIncomeTypeVisible';
import { fieldConfig } from './MonthlyIncomeinlocalcurrency.config';

export { fieldConfig } from './MonthlyIncomeinlocalcurrency.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const incomeTypeVisible = useGetIncomeTypeVisible();

  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList[0]?.clientInfoList,
    shallowEqual
  );
  const LocalCurrency = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.currencyCode,
    shallowEqual
  );
  const contractCurrency = lodash.find(clientInfoList, (item: any) => item?.id === id)
    ?.annualIncomeCurrency;

  const visibleConditions =
    lodash.includes(incomeTypeVisible, 'monthlyIncome') &&
    !lodash.isEmpty(contractCurrency) &&
    contractCurrency !== LocalCurrency;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });

  return (
    isShow &&
    (config?.['field-props']?.visible || fieldProps.visible) !== Visible.No &&
    visibleConditions && (
      <Col {...layout}>
        <div className={styles.Annualincomeinlocalcurrency}>
          <FormItemNumber
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
            pattern={/^\d{1,30}(\.99|\.9[0-8]*|\.[0-8]\d*)?$/g}
            hiddenPrefix
            precision={2}
            suffix={
              <>
                <Icon type="swap" className={styles.suffixIcon} />
                <span className={styles.suffix}>{LocalCurrency}</span>
              </>
            }
          />
        </div>
      </Col>
    )
  );
};

const Monthlyincomeinlocalcurrency = ({ form, editable, layout, isShow, id, config }: any) => {
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

Monthlyincomeinlocalcurrency.displayName = 'monthlyIncomeInLocalCurrency';

export default Monthlyincomeinlocalcurrency;
