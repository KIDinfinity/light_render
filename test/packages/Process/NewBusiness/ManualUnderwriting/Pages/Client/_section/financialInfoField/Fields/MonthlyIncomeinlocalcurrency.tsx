import React from 'react';

import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col, Icon } from 'antd';
import lodash from 'lodash';

import { Authority, Visible, Editable, FormItemNumber, RuleByForm } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useGetIncomeTypeVisible from '../../../_hooks/useGetIncomeTypeVisible';

import { fieldConfig } from './MonthlyIncomeinlocalcurrency.config';
import styles from './Annualincome.less';
export { fieldConfig } from './MonthlyIncomeinlocalcurrency.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const incomeTypeVisible = useGetIncomeTypeVisible();

  const contractCurrencyReadonly = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities.clientMap?.[id]?.annualIncomeCurrency
  );

  const contractCurrencyEdit = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[id]?.annualIncomeCurrency
  );

  const contractCurrency = readOnly ? contractCurrencyReadonly : contractCurrencyEdit;

  const LocalCurrency = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.currencyCode,
    shallowEqual
  );
  const visibleConditions =
    lodash.includes(incomeTypeVisible, 'monthlyIncome') &&
    !lodash.isEmpty(contractCurrency) &&
    contractCurrency !== LocalCurrency;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  return (
    isShow &&
    (config?.visible || fieldProps.visible) !== Visible.No &&
    visibleConditions && (
      <Col {...layout}>
        <div className={styles.Annualincomeinlocalcurrency}>
          <FormItemNumber
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

const Monthlyincomeinlocalcurrency = ({
  form,
  editable,
  layout,
  isShow,
  id,
  config,
  readOnly,
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
      />
    </Authority>
  );
};

Monthlyincomeinlocalcurrency.displayName = 'monthlyIncomeInLocalCurrency';

export default Monthlyincomeinlocalcurrency;
