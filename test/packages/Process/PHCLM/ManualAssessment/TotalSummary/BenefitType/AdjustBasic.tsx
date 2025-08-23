import React from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import Section, { AdjustBenefitTypeFields } from '../Section';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import lodash from 'lodash';

import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const Basic = ({ form, basicItem, isLabel }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isLifePayable = basicItem.benefitCategory === eBenefitCategory.Life

  return (
    <>
      <div className={styles.basicItem} style={{paddingTop: 15}}>
        <Section
          form={form}
          editable={editable}
          section="SummaryPayable.Adjust"
          layoutName={isLabel ? 'x-layout-isLabel' : 'x-layout'}
        >
          <AdjustBenefitTypeFields.ClaimDecision
            incidentId={basicItem?.incidentId}
            policyNo={basicItem?.policyNo}
            payableId={basicItem?.id}
          />
          <AdjustBenefitTypeFields.PayableAmount originAmount={basicItem?.systemCalculationAmount} isLifePayable={isLifePayable} />
          <AdjustBenefitTypeFields.PayableDays originDays={basicItem?.systemPayableDays} />
          <AdjustBenefitTypeFields.Remark />
        </Section>
      </div>
      <div className={styles.originalClaim}>
        {
          formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.label.originalClaim'
          })
        }
      </div>
    </>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, basicItem } = props;
      const isLifePayable = basicItem.benefitCategory === eBenefitCategory.Life

      if (formUtils.shouldUpdateState(changedFields)) {
        if(isLifePayable && lodash.has(changedFields, 'payableAmount') && lodash.size(changedFields) === 1) {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveLifePayable',
            payload: {
              changedFields,
              claimPayableId: basicItem?.id,
            },
          })
        } else {
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
      }
    },
    mapPropsToFields(props: any) {
      const { basicItem } = props;

      return formUtils.mapObjectToFields({ ...basicItem, item: basicItem });
    },
  })(Basic)
);
