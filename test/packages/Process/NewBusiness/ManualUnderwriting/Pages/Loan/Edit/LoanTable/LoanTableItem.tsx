import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';

import { Fields } from './Fields';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { localConfig } from '../../_config/LoanTableField';
import { v4 as uuid } from 'uuid';
import { Region, tenant } from '@/components/Tenant';

const LoadTable = ({ form }: any) => {
  const labelType =
    tenant.region({
      [Region.KH]: 'inline',
      [Region.MY]: '',
    }) || '';
  const formId = `Load-Table_${uuid()}`;
  return (
    <Section formId={formId} section="Load-Table" form={form} localConfig={localConfig}>
      <Fields.Currency labelType={labelType} />
      <Fields.IsNew labelType={labelType} />
      <Fields.LoanContractNumber labelType={labelType} />
      <Fields.NewLoanAmount labelType={labelType} />
      <Fields.NumberOfPeriod labelType={labelType} />
      <Fields.Period labelType={labelType} />
      <Fields.InterestRate labelType={labelType} />
      <Fields.InterimPeriod labelType={labelType} />
      <Fields.FinancingOption labelType={labelType} />
      <Fields.PremiumValidityDate labelType={labelType} />
      <Fields.LoanDisbursementDate labelType={labelType} />
      <Fields.FreeCoverLimitFlag labelType={labelType} />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, data } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        const loanData = {
          id: data.id,
          ...changedFields,
        };
        const isLast = data?.isLast;
        if (isLast && formUtils.queryValue(changedFields?.loanContractNumber)) {
          loanData.isLast = false;
          dispatch({
            type: `${NAMESPACE}/addLoanItem`,
          });
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'setLoanItem',
          payload: {
            loanData,
            id: data.id,
            changedFields,
            errorId: data.id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { data, index } = props;
      return formUtils.mapObjectToFields({
        ...data,
        index,
      });
    },
  })(LoadTable)
);
