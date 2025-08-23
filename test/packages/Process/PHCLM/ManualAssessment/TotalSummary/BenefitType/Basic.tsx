import React from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import Section, { BenefitTypeFields } from '../Section';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';
import getOriginData from '../../_models/functions/adjustmentMapUtils';

import styles from './index.less';

const Basic = ({ form, basicItem, existBenefitType, isLabel, isPayableEditable }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && isPayableEditable;

  return (
    // <div></div>
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

      if(!props.isPayableEditable)
        return;

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
      let { basicItem } = props;
      if(basicItem.isPayableAdjusted) {
        basicItem = getOriginData(basicItem)
      }

      return formUtils.mapObjectToFields({ ...basicItem, item: basicItem });
    },
  })(Basic)
);
