import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';

import { Fields } from './Fields';
import Section from 'opus/NewBusiness/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import { localConfig } from '../../_config/LoanTableField';
import { v4 as uuid } from 'uuid';

const LoadTable = ({ form }: any) => {
  const formId = `Load-Table_${uuid()}`;
  return (
    <Section formId={formId} section="Load-Table" form={form} localConfig={localConfig}>
      <Fields.Currency />
      <Fields.IsNew />
      <Fields.LoanContractNumber />
      <Fields.NewLoanAmount />
      <Fields.NumberOfPeriod />
      <Fields.Period />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, data } = props;
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
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntryData`,
              target: 'setLoanItem',
              payload: {
                loanData,
                id: data.id,
                changedFields,
                errorId: data.id,
              },
            });
          }, 0);
        } else {
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
