import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { ReactComponent as WalletIcon } from 'process/assets/wallet.svg';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import { multiply } from '@/utils/precisionUtils';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';
import { scaleByNumber } from '@/utils/utils';

import styles from './index.less';
const Financialinfofield = ({ form, id, isSubCard }: any) => {
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  return (
    <Section
      section="FinancialInfo-Field"
      localConfig={localConfig}
      gateway={gateway}
      form={form}
      icon={
        <div className={styles.iconStyle}>
          <WalletIcon />
        </div>
      }
    >
      <Fields.Annualincome id={id} />

      <Fields.Incomerange id={id} />

      <Fields.Annualincomeinlocalcurrency id={id} />

      <Fields.Sourceoffund id={id} />

      <Fields.Reasonforpaying />

      <Fields.Othersource />

      <Fields.Annulpremequivalent />

      <Fields.IndisiaReason id={id} />

      <Fields.usTaxFlag />

      <Fields.MonthlyIncome id={id} />

      <Fields.MonthlyIncomeRange id={id} />

      <Fields.Monthlyincomeinlocalcurrency id={id} />

      <Fields.Ctfid id={id} />

      <Fields.taxDeductionConsent />
    </Section>
  );
};

export default connect(({ formCommonController, manualUnderwriting, config }: any) => ({
  validating: formCommonController.validating,
  exchangeRate: manualUnderwriting.exchangeRate,
  configs: config,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id } = props;
      if (lodash.has(changedFields, 'monthlyIncome')) {
        const mag = lodash
          .chain(props.config)
          .find((element) => element.field === 'monthlyIncome')
          .get('magnification')
          .value();
        changedFields.monthlyIncome = scaleByNumber(
          mag,
          formUtils.queryValue(changedFields.monthlyIncome)
        );
      }
      if (lodash.has(changedFields, 'annualIncome')) {
        const mag = lodash
          .chain(props.config)
          .find((element) => element.field === 'annualIncome')
          .get('magnification')
          .value();
        changedFields.annualIncome = scaleByNumber(
          mag,
          formUtils.queryValue(changedFields.annualIncome)
        );
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'changeBasicInfoFields',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'changeBasicInfoFields',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item, exchangeRate } = props;
      const rate = lodash.get(exchangeRate, `${item?.annualIncomeCurrency}`, 1);
      return formUtils.mapObjectToFields(
        { ...item, annualIncomeInLocalCurrency: '', monthlyIncomeInLocalCurrency: '' },
        {
          annualIncomeInLocalCurrency: () => {
            return multiply(formUtils.queryValue(item?.annualIncome), rate);
          },
          monthlyIncomeInLocalCurrency: () => {
            return multiply(formUtils.queryValue(item?.monthlyIncome), rate);
          },
          monthlyIncome: () => {
            const mag = lodash
              .chain(props.config)
              .find((element) => element.field === 'monthlyIncome')
              .get('magnification')
              .value();

            return scaleByNumber(mag ?? 1, formUtils.queryValue(item?.monthlyIncome), true);
          },
          annualIncome: () => {
            const mag = lodash
              .chain(props.config)
              .find((element) => element.field === 'annualIncome')
              .get('magnification')
              .value();
            return scaleByNumber(mag ?? 1, formUtils.queryValue(item?.annualIncome), true);
          },
        }
      );
    },
  })(Financialinfofield)
);
