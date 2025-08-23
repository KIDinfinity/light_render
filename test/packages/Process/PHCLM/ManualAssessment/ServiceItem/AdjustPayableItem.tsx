import React from 'react';
import { NAMESPACE } from '../activity.config';
import styles from './ServiceList.less';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import Section, { AdjustPayableFields } from './Section';


const ServicePayableItem = ({ form, serviceItemPayableId, item }: any) => {
  const payableId = item?.payableId;

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const benefitCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.benefitCategory
  );
  const coverageKey = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.coverageKey
  );

  const handleRecover = (fieldName: string, id: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory,
        payableId: id,
        fieldName,
      },
    });
  };

  return (
    <>
      <Section form={form} editable={editable} section="AdjustService">
        <AdjustPayableFields.PayableAmount
          id={serviceItemPayableId}
          coverageKey={coverageKey}
          benefitCategory={benefitCategory}
          OnRecover={() => handleRecover('payableAmount', serviceItemPayableId)}
        />
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

export default connect(
  ({ formCommonController }: any) => ({
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, serviceItemPayableId, validating, booster, policyBooster } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveServicePayableItem',
              payload: {
                changedFields,
                serviceItemPayableId,
                hasBooster: policyBooster,
                boosterId: booster?.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveServicePayableItem',
            payload: {
              changedFields,
              serviceItemPayableId,
              hasBooster: policyBooster,
              boosterId: booster?.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item, booster } = props;
      const extra = item?.booster === 'Y' ? { payableAmountBooster: null } : {};
      return formUtils.mapObjectToFields({
        ...item,
        ...extra,
        boosterAmount: booster?.payableAmount,
        boosterDays: booster?.payableDays,
      });
    },
  })(ServicePayableItem)
);
