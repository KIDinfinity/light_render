import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './EditSection';

const LoadTable = ({ form }: any) => {

  return (
    <Section section="Load-Table" form={form} localConfig={localConfig}>
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
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'changeLoanDetailList',
              payload: {
                changedFields,
                id: data.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'changeLoanDetailList',
            payload: {
              changedFields,
              id: data.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { data } = props;

      return formUtils.mapObjectToFields(data);
    },
  })(LoadTable)
);
