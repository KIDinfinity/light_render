import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import PolicyAccountItem from './PolicyAccountItem';
import json from '../layout/FormLayout.json';

import styles from './PolicyItem.less';

const PolicyBoItem = ({ form, id, policyBOItem, type }: any) => {
  return (
    <div className={styles.PolicyItemWrap}>
      <Form layout="vertical" className="policyBenefitListItemOfBasicInfo">
        <div className="baseInfo">
          <FormLayout json={json}>
            <FormItemInput
              cusTitle
              form={form}
              disabled
              formName="policyId"
              labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no"
            />
            <FormItemInput
              form={form}
              disabled
              formName="firstName"
              labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.first-name"
            />
            <FormItemInput
              form={form}
              disabled
              formName="surname"
              labelId="app.navigator.task-detail-of-data-capture.label.surname"
            />
          </FormLayout>
        </div>
        <div className={styles.PolicyAccountItemWrap}>
          {!lodash.isEmpty(policyBOItem) &&
            lodash.map(policyBOItem?.claimBankAccounts, (childItem: any) => (
              <div>
                <PolicyAccountItem
                  item={childItem}
                  fatherId={id}
                  key={childItem.id}
                  policyNos={policyBOItem?.policyNos}
                  type={type}
                />
              </div>
            ))}
        </div>
      </Form>
    </div>
  );
};
export default connect(({ daOfClaimAssessmentController }: any, { id, type }: any) => ({
  policyBOItem:
    daOfClaimAssessmentController.claimEntities?.[
      type === 'policyOwner' ? 'policyOwnerBOListMap' : 'policyPayorBOListMap'
    ]?.[id],
}))(
  Form.create({
    mapPropsToFields(props) {
      const { policyBOItem }: any = props;
      return formUtils.mapObjectToFields(policyBOItem);
    },
  })(PolicyBoItem)
);
