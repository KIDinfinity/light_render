import React from 'react';
import { useSelector, connect } from 'dva';

import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import Section, { Fields } from '../Secitons/UsText';
import styles from '../index.less';

const Basic = ({ form, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <div className={styles.section}>
      <div className={styles.title}>
        {formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.phowb.dataCapture.label.uSTaxDeclarations.title',
        })}
      </div>
      <div className={styles.item}>
        <Section
          form={form}
          editable={editable}
          section="payee.UsText"
          formId={`payeeUsText${item.id}`}
        >
          <Fields.UsCitizen />
          <Fields.UsCitizenPassportNo item={item} />
          <Fields.UsCitizenResidenceAddress item={item} />
          <Fields.UsCitizenTaxIdentityNo item={item} />
        </Section>
      </div>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        item: { id },
        validating,
        NAMESPACE,
      } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'paymentPayeeItemUpdate',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'paymentPayeeItemUpdate',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(Basic)
);
