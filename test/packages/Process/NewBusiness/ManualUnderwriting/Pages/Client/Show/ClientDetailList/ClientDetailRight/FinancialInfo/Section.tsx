import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/financialInfoField';
import { calIncomeInLocalCurrency } from 'process/NewBusiness/ManualUnderwriting/_utils/financialInfoUtils';

const FinancialInfo = ({ clientId, form }: any) => {
  return <Section form={form} editable={false} clientId={clientId} spanMode="dobule" readOnly />;
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { clientId }: any) => ({
  otherInfoData: modelnamepsace.entities.clientMap?.[clientId]?.otherInfo,
  financialInfoData: modelnamepsace.entities.clientMap?.[clientId]?.financialInfo,
  expandedClientId: modelnamepsace.expandedClientId, // 用于折叠后重新更新form的数据
  exchangeRate: modelnamepsace.exchangeRate, // 后端没有返回annualIncomeInLocalCurrency，所以需要在init计算显示, 会导致reload
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { financialInfoData, exchangeRate, otherInfoData } = props;
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
      const sourceOfFund = String(formUtils.queryValue(otherInfoData?.sourceOfFundList || ''));
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
      return formUtils.mapObjectToFields({
        ...financialInfoData,
        ...extraFields,
        sourceOfFund,
      });
    },
  })(FinancialInfo)
);
