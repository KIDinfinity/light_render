import React from 'react';
import { useSelector, connect } from 'dva';
import lodash from 'lodash';
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

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, basicItem } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'totalBenefitTypeBasicUpdate',
          payload: {
            changedFields,
            id: basicItem?.id,
            boosterId: basicItem?.boosterId,
            validating: lodash.size(changedFields) > 1,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { basicItem } = props;

      return formUtils.mapObjectToFields({ ...basicItem, item: basicItem });
    },
  })(Basic)
);
