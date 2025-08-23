import React from 'react';
import { Form } from 'antd';
import { connect, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './EditSection';

const PolicyReplacementTable = ({ form, index }: any) => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const replaceInforce = formUtils.queryValue(
    lodash.get(businessData, 'policyList[0].replaceInforce')
  );
  const paidByPolicyLoan = formUtils.queryValue(
    lodash.get(businessData, 'policyList[0].paidByPolicyLoan')
  );

  return (
    <Section
      section="PolicyReplacement-Table"
      form={form}
      localConfig={localConfig}
    >
      <Fields.Clientname
        index={index}
        replaceInforce={replaceInforce}
        paidByPolicyLoan={paidByPolicyLoan}
      />
      <Fields.Policytype />
      <Fields.Otherpolicytype />
      <Fields.Sumassured
        index={index}
        replaceInforce={replaceInforce}
        paidByPolicyLoan={paidByPolicyLoan}
      />
      <Fields.Insurancecompanyname
        index={index}
        replaceInforce={replaceInforce}
        paidByPolicyLoan={paidByPolicyLoan}
      />
      <Fields.Reasonforpolicyreplacement
        index={index}
        replaceInforce={replaceInforce}
        paidByPolicyLoan={paidByPolicyLoan}
      />
      <Fields.Otherreason />
      <Fields.Insurername />
      <Fields.Planname />
      <Fields.Policyno
        index={index}
        replaceInforce={replaceInforce}
        paidByPolicyLoan={paidByPolicyLoan}
      />
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
              target: 'setPolicyTableRowChange',
              payload: {
                changedFields,
                data,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setPolicyTableRowChange',
            payload: {
              changedFields,
              data,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(PolicyReplacementTable)
);
