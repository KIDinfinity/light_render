import React from 'react'
import { Form, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section/index'
import { useSelector } from 'dva';
import styles from './index.less';

const getClientName = client => lodash.compact([client.firstName, client.middleName, client.surname].map(data => formUtils.queryValue(data))).join(' ')
// payeeId -> id

export default connect(({ claimEditable, formCommonController }) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
}))(Form.create({
  mapPropsToFields(props) {
    const { beneficiary = {} } = props;
    // const formPayeeName = beneficiary.payeeName;
    const payeeNameValue = getClientName(beneficiary);
    // const payeeName = typeof formPayeeName === 'object'? {
    //   ...formPayeeName,
    //   value: payeeNameValue,
    // } : payeeNameValue;

    return formUtils.mapObjectToFields({
      ...beneficiary,
      payeeName: beneficiary.payeeName || payeeNameValue
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, beneficiary, validating, benefitItemId }: any = props;
    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'paymentAllocation/saveEntry',
            target: 'payeeAllocationUpdate',
            payload: {
              changedFields,
              id: beneficiary?.id,
              benefitItemId,
            },
          });
        });
      } else {
        dispatch({
          type: 'paymentAllocation/saveFormData',
          target: 'payeeAllocationUpdate',
          payload: {
            changedFields,
            id: beneficiary?.id,
            benefitItemId,
          },
        });
      }
    }
  },
})(({ benefitItemId, form, taskNotEditable, beneficiary }) => {
  const benefitItem = useSelector(({ paymentAllocation }) => paymentAllocation.claimData?.policyBenefitList?.find(item => item.id === benefitItemId))
  const dispatch = useDispatch()

  return (
    <div className={styles.payeeDataRow}>
      <div style={{ flex: 1 }}>
        <Section form={form} editable={!taskNotEditable} section="payeePayment" formId={`payeePaymentAllocation${beneficiary?.id}`}>
          <Fields.PayeeName benefitItem={benefitItem} id={beneficiary?.id} />
          <Fields.PayeeType benefitItem={benefitItem} />
          <Fields.PayoutAmount />
          <Fields.SharedPercentage benefitItem={benefitItem} />
        </Section>
      </div>
      <Icon type="close"
        style={{marginLeft: 8}}
        onClick={() => {
          dispatch({
            type: 'paymentAllocation/payeeAllocationDelete',
            payload: {
              benefitItemId: benefitItem.id,
              id: beneficiary?.id
            }
          })
      }}/>
    </div>);
}
))
