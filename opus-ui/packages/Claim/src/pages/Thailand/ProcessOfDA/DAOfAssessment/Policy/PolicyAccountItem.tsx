import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemSelectPlus, formUtils } from 'basic/components/Form';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import json from '../layout/FormLayout.json';
import PoliySelection from './PoliySelection';
import styles from './PolicyItem.less';

interface ISProps {
  dispatch?: any;
  form?: any;
  item?: any;
  fatherId?: any;
  policyNos: any;
}

const seachCustom: any = new SeachCustom();
const { handleBankBranch } = seachCustom;

// @ts-ignore
@Form.create({
  mapPropsToFields(props) {
    const { item }: any = props;
    return formUtils.mapObjectToFields(item, {});
  },
})
class PolicyOwnerAccountItem extends PureComponent<ISProps> {
  render() {
    const { form, item, fatherId, policyNos, type } = this.props;
    return (
      <div className={styles.content}>
        <div className={styles.formLeft}>
          <PoliySelection fatherId={fatherId} value={item?.id} policyNos={policyNos} type={type} />
        </div>
        <div className={styles.formRight}>
          <Form layout="vertical" className={`policyBenefitListItemOfBasicInfo ${styles.formWrap}`}>
            <FormLayout json={json}>
              <FormItemSelectPlus
                form={form}
                formName="branchCode"
                name="fieldTwo"
                labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.titel.bank-branch-code"
                optionShowType="both"
                disabled
                searchName="bankBranch"
                searchCustom={(postData: any) => handleBankBranch(postData, '')}
              />
              <FormItemInput
                form={form}
                disabled
                formName="bankAccountName"
                labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.bank-account-name"
              />
              <FormItemInput
                form={form}
                disabled
                formName="bankAccountNo"
                labelId="app.navigator.task-detail-of-claim-assessment.beneficiary.label.bank-accountNo"
              />
            </FormLayout>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))(PolicyOwnerAccountItem);
