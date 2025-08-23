import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section from '../../../../_section/financialInfoField';
import { calIncomeInLocalCurrency } from 'process/NewBusiness/ManualUnderwriting/_utils/financialInfoUtils';

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
  otherInfoData: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.otherInfo,
  customerRole:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
  customerType:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
  customerAge: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerAge,
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
        const financialInfoChangedFields = lodash.cloneDeep(changedFields);
        if (financialInfoChangedFields?.sourceOfFund) {
          const otherInfoChangedField = {
            sourceOfFundList: financialInfoChangedFields?.sourceOfFund,
          };
          otherInfoChangedField.sourceOfFundList.value = new Array(
            otherInfoChangedField.sourceOfFundList.value
          );
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveOtherInfo',
            payload: {
              changedFields: otherInfoChangedField,
              id: clientId,
              errorId: clientId,
            },
          });
          delete financialInfoChangedFields.sourceOfFund;
        }
        if (!lodash.isEmpty(financialInfoChangedFields)) {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveFinancialInfo',
            payload: {
              changedFields: financialInfoChangedFields,
              id: clientId,
              errorId: clientId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { financialInfoData, exchangeRate, customerAge, otherInfoData } = props;
      const extraFields: any = { customerAge: customerAge };
      const annualIncome = formUtils.queryValue(financialInfoData?.annualIncome);
      const monthlyIncome = formUtils.queryValue(financialInfoData?.monthlyIncome);
      const annualIncomeCurrency = formUtils.queryValue(financialInfoData?.annualIncomeCurrency);
      const annualIncomeInLocalCurrency = formUtils.queryValue(
        financialInfoData?.annualIncomeInLocalCurrency
      );
      const monthlyIncomeInLocalCurrency = formUtils.queryValue(
        financialInfoData?.monthlyIncomeInLocalCurrency
      );
      const sourceOfFundList = formUtils.queryValue(otherInfoData?.sourceOfFundList) || '';
      let finalsourceOfFund = '';
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
      if (sourceOfFundList) {
        finalsourceOfFund = String(sourceOfFundList);
      }
      return formUtils.mapObjectToFields({
        ...financialInfoData,
        ...extraFields,
        ...{ sourceOfFund: finalsourceOfFund },
      });
    },
  })(FinancialInfo)
);
