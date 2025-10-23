import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import lodash from 'lodash';
import { shouldUpdateState } from 'claim/pages/utils/formUtils';
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
      // const formPayeeName = beneficiary.payeeName;
      const payeeNameValue = getClientName(beneficiary);
      // const payeeName = typeof formPayeeName === 'object'? {
      //   ...formPayeeName,
      //   value: payeeNameValue,
      // } : payeeNameValue;

      return formUtils.mapObjectToFields({
        ...beneficiary,
        payeeName: beneficiary.payeeName || payeeNameValue,
      });
    },
    onFieldsChange(props, changedFields) {
      const { dispatch, beneficiary, validating, benefitItemId, NAMESPACE }: any = props;
      if (lodash.isFunction(dispatch) && shouldUpdateState(validating, changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'paymentPayeeAllocationUpdate',
              payload: {
                changedFields,
                id: beneficiary?.id,
                benefitItemId,
              },
            });
          });
        } else {
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
      }
    },
  })(({ benefitItemId, form, taskNotEditable, beneficiary, NAMESPACE }) => {
    const benefitItem = useSelector(({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace?.paymentModal?.datas?.policyBenefitList?.find(
        (item) => item.id === benefitItemId
      )
    );
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
