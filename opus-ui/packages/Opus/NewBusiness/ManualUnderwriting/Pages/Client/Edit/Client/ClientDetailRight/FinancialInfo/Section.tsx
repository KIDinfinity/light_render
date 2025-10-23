import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/financialInfoField';
import { calIncomeInLocalCurrency } from 'opus/NewBusiness/ManualUnderwriting/_utils/financialInfoUtils';

const FinancialInfo = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      clientId={clientId}
      readOnly={false}
      condition="proposal"
    />
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
  financialInfoData: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.financialInfo,
  customerRole:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
  customerType:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
  exchangeRate: modelnamepsace.exchangeRate, // 后端没有返回annualIncomeInLocalCurrency，所以需要在init计算显示, 会导致reload
  loadingStatus: login.loadingStatus,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, loadingStatus } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveFinancialInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { financialInfoData, exchangeRate } = props;
      const extraFields: any = {};
      const annualIncome = formUtils.queryValue(financialInfoData?.annualIncome);
      const monthlyIncome = formUtils.queryValue(financialInfoData?.monthlyIncome);
      const annualIncomeCurrency = formUtils.queryValue(financialInfoData?.annualIncomeCurrency);
      const annualIncomeInLocalCurrency = formUtils.queryValue(
        financialInfoData?.annualIncomeInLocalCurrency
      );
      const monthlyIncomeInLocalCurrency = formUtils.queryValue(
        financialInfoData?.monthlyIncomeInLocalCurrency
      );
      if (!annualIncomeInLocalCurrency) {
        extraFields.annualIncomeInLocalCurrency = calIncomeInLocalCurrency(
          annualIncome,
          exchangeRate,
          annualIncomeCurrency
        );
      }
      if (!monthlyIncomeInLocalCurrency) {
        extraFields.monthlyIncomeInLocalCurrency = calIncomeInLocalCurrency(
          monthlyIncome,
          exchangeRate,
          annualIncomeCurrency
        );
      }
      return formUtils.mapObjectToFields({ ...financialInfoData, ...extraFields });
    },
  })(FinancialInfo)
);
