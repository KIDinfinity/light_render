import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { AdjustPayableFields } from './Section';
import styles from './Payable.less';
import { VLD_000343 } from '../validators';
import handleMessageModal from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const TreatmentPayable = ({ form, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  const claimPayableListItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[item?.payableId]
  );

  const benefitCategory = item?.benefitCategory;

  const handleDelete = () => {
    const error = VLD_000343(item);
    if (error) {
      handleMessageModal([
        {
          content: error,
        },
      ]);
      return;
    }
    dispatch({
      type: `${NAMESPACE}/removeTreatmentPayableItem`,
      payload: {
        id: item?.id,
        benefitCategory: item?.benefitCategory,
      },
    });
  };

  const handleRecover = (fieldName: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory,
        payableId: item?.id,
        fieldName,
      },
    });
  };


  return (
    <>
      <Section form={form} editable={editable} section="AdjustTreatmentPayable">
        <AdjustPayableFields.PayableAmount
          benefitCategory={item?.benefitCategory}
          id={item?.id}
          coverageKey={item?.coverageKey}
          OnRecover={() => handleRecover('payableAmount')}
        />
        <AdjustPayableFields.PayableDays OnRecover={() => handleRecover('payableDays')} />
        <AdjustPayableFields.Remark />
      </Section>
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
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, item } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveSummaryTreatmentPayable',
              payload: {
                changedFields,
                id: item?.id,
                benefitCategory: item?.benefitCategory,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveSummaryTreatmentPayable',
            payload: {
              changedFields,
              id: item?.id,
              benefitCategory: item?.benefitCategory,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields({ ...item, benefitAmountPerDay: item.calculationAmount });
    },
  })(TreatmentPayable)
);
