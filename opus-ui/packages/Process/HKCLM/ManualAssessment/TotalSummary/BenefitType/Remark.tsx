import React from 'react';
import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import Section, { BenefitTypeFields } from '../Section';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';

import styles from './index.less';

const Remark = ({ form, basicItem, isLabel, payableId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    (!isLabel && (
      <div className={styles.extraField}>
        <Section form={form} editable={editable} section="SummaryPayable">
          <BenefitTypeFields.Remark />
          <BenefitTypeFields.DenyCode />
          <BenefitTypeFields.DenyReason payableId={payableId} />
          <BenefitTypeFields.ExGratiaCode />
          <BenefitTypeFields.ExGratiaReason />
          <BenefitTypeFields.DeductibleAmount />
          <BenefitTypeFields.DeductibleWaived />
          <BenefitTypeFields.DeductibleOtherInsurerDeduction />
        </Section>
      </div>
    )) || <></>
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
  })(Remark)
);
