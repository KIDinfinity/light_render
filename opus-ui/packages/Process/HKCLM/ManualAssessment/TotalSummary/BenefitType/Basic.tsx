import React from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import Section, { BenefitTypeFields } from '../Section';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';

import styles from './index.less';

const Basic = ({ form, basicItem, existBenefitType, isLabel }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <div className={styles.basicItem}>
      <Section
        form={form}
        editable={editable}
        section="SummaryPayable"
        layoutName={isLabel ? 'x-layout-isLabel' : 'x-layout'}
      >
        <BenefitTypeFields.ClaimDecision
          incidentId={basicItem?.incidentId}
          policyNo={basicItem?.policyNo}
          payableId={basicItem?.id}
        />
        <BenefitTypeFields.BenefitTypeCode
          incidentId={basicItem?.incidentId}
          policyNo={basicItem?.policyNo}
          existBenefitType={existBenefitType}
        />
        <BenefitTypeFields.ProductCode />
        <BenefitTypeFields.PayableAmount originAmount={basicItem?.systemCalculationAmount} />
        <BenefitTypeFields.PayableDays originDays={basicItem?.systemPayableDays} />
      </Section>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, basicItem } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'totalBenefitTypeBasicUpdate',
              payload: {
                changedFields,
                id: basicItem?.id,
                boosterId: basicItem?.boosterId,
                validating,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'totalBenefitTypeBasicUpdate',
            payload: {
              changedFields,
              id: basicItem?.id,
              boosterId: basicItem?.boosterId,
              validating,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { basicItem } = props;

      return formUtils.mapObjectToFields({ ...basicItem, item: basicItem });
    },
  })(Basic)
);
