import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { Fields } from './Fields';
import { localConfig } from '../../_config/PolicyReplacementTableField';
import { v4 as uuid } from 'uuid';

const PolicyReplacementTableItem = ({ form }: any) => {
  const formId = `PolicyReplacement-Table_${uuid()}`;
  return (
    <Section
      formId={formId}
      section="PolicyReplacement-Table"
      form={form}
      localConfig={localConfig}
    >
      <Fields.Clientname />
      <Fields.Policytype />
      <Fields.Otherpolicytype />
      <Fields.Sumassured />
      <Fields.Insurancecompanyname />
      <Fields.Reasonforpolicyreplacement />
      <Fields.Otherreason />
      <Fields.Insurername />
      <Fields.Planname />
      <Fields.Policyno />
    </Section>
  );
};
export default connect(({ formCommonController, [NAMESPACE]: namespaceModel }: any) => ({
  validating: formCommonController.validating,
  replaceInforce: lodash.get(
    namespaceModel,
    'modalData.policyReplacement.replacementFirstInfo.replaceInforce'
  ),
  paidByPolicyLoan: lodash.get(
    namespaceModel,
    'modalData.policyReplacement.replacementFirstInfo.paidByPolicyLoan'
  ),
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, data } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        const isLast = data?.isLast;
        if (isLast) {
          // 改变本列，增加新列在store上。
          if (
            formUtils.queryValue(changedFields?.planName) ||
            formUtils.queryValue(changedFields?.insuredSeqNo) ||
            formUtils.queryValue(changedFields?.policyType)
          ) {
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
              target: 'setPolicyReplInfoItem',
              payload: {
                id: data.id,
                errorId: data.id,
                changedFields,
                isLast: false,
              },
            });
            dispatch({
              type: `${NAMESPACE}/setPolicyReplInfoItem`,
              payload: {
                id: uuid(),
                isLast: true,
              },
            });
          }
        } else {
          // 正常修改，
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setPolicyReplInfoItem',
            payload: {
              id: data.id,
              changedFields,
              errorId: data.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { data, replaceInforce, paidByPolicyLoan, index } = props;
      return formUtils.mapObjectToFields({
        ...data,
        replaceInforce,
        paidByPolicyLoan,
        index,
      });
    },
  })(PolicyReplacementTableItem)
);
