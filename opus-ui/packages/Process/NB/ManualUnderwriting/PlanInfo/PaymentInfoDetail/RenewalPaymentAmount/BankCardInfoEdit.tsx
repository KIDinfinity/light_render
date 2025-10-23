import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from '../../../activity.config';
import { Fields, localConfig } from './Section';
import styles from './index.less';

const RenewalPaymentBankCardInfoTable = ({ form }: any) => {
  return (
    <div className={styles.editWrap}>
      <div className={styles.title}>Card Info</div>

      <Section section="RenewalPaymentInfo-Table" form={form} localConfig={localConfig}>
        <Fields.NameOnCard />

        <Fields.Cardtype />

        <Fields.Creditcardno />

        <Fields.Maskedcreditcardno />

        <Fields.Sbcaca />

        <Fields.ExpiryDate />

        <Fields.Factoringhouse />
      </Section>
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  bankCardInfo: lodash.get(modelnamepsace, 'businessData.policyList[0].bankCardInfoList[0]', {}),
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setRenewalPaymentBankCardInfoFieldData',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setRenewalPaymentBankCardInfoFieldData',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { bankCardInfo } = props;
      return formUtils.mapObjectToFields({
        ...bankCardInfo,
      });
    },
  })(RenewalPaymentBankCardInfoTable)
);
