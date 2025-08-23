import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section/index';
import { useSelector } from 'dva';
import styles from './index.less';

const getClientName = (client) =>
  lodash
    .compact(
      [client.firstName, client.middleName, client.surname].map((data) =>
        formUtils.queryValue(data)
      )
    )
    .join(' ');
// payeeId -> id

export default connect(({ claimEditable, formCommonController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
}))(
  Form.create({
    mapPropsToFields(props) {
      const { beneficiary = {} } = props;

      const payeeNameValue = getClientName(beneficiary);
      return formUtils.mapObjectToFields({
        ...beneficiary,
        payeeName: beneficiary?.companyName || beneficiary.payeeName || payeeNameValue,
      });
    },
    onFieldsChange(props, changedFields) {
      const { dispatch, beneficiary, validating, benefitItemId, NAMESPACE }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'paymentPayeeAllocationUpdate',
          payload: {
            changedFields,
            id: beneficiary?.id,
            benefitItemId,
          },
        });
      }
    },
  })(({ benefitItemId, form, taskNotEditable, beneficiary, NAMESPACE }) => {
    const beneficiaryList =
      useSelector(
        ({ [NAMESPACE]: modelnamespace }: any) =>
          modelnamespace?.paymentModal?.datas?.policyBenefitList
      ) || [];
    const benefitItem = lodash.find(beneficiaryList, (item) => item?.id === benefitItemId) || {};
    const dispatch = useDispatch();

    return (
      <div className={styles.payeeDataRow}>
        <div style={{ flex: 1 }}>
          <Section
            form={form}
            editable={!taskNotEditable}
            section="payeePayment"
            formId={`payeePaymentAllocation${beneficiary?.id}`}
            NAMESPACE={NAMESPACE}
          >
            <Fields.PayeeName benefitItem={benefitItem} id={beneficiary?.id} />
            <Fields.PayeeType benefitItem={benefitItem} />
            <Fields.PayoutAmount />
            <Fields.SharedPercentage benefitItem={benefitItem} />
            <Fields.AdvancedPayoutAmount NAMESPACE={NAMESPACE} beneficiary={beneficiary} />
            <Fields.AdvancePayoutDate />
            <Fields.OutstandingPayoutAmount />
          </Section>
        </div>
        <Icon
          type="close"
          style={{ marginLeft: 8 }}
          onClick={() => {
            dispatch({
              type: `${NAMESPACE}/paymentPayeeAllocationDelete`,
              payload: {
                benefitItemId: benefitItem.id,
                id: beneficiary?.id,
              },
            });
          }}
        />
      </div>
    );
  })
);
