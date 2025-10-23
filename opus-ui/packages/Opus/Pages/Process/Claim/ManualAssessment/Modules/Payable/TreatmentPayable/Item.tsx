import React from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import { formUtils } from 'basic/components/Form';
import Buttons from 'opus/Components/Buttons';
import CardOfClaim from 'basic/components/Form/FormCard';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import AdjustmentWrap, { InnerWrap } from '../AdjustmentWrap';

import Section, { PayableFields as Fields } from './Section';

import styles from './index.less';

const TreatmentPayableListItem = ({
  dispatch,
  form,
  calculateByPolicyYear,
  item: { id, benefitCategory, originPayable, isAdjustment },
}: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const list =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.serialClaimMap?.[id]) ||
    [];

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const handleButton = () => {
    return !lodash.isEmpty(list) ? (
      <div className={styles.buttonWrap}>
        <Buttons.Default
          handleClick={() => {
            dispatch({
              type: `${NAMESPACE}/saveSerialClaimFlag`,
            });
            dispatch({
              type: `${NAMESPACE}/saveSerialClaimTreatmentId`,
              payload: {
                id,
              },
            });
          }}
          title={formatMessageApi({ Label_BIZ_Claim: 'SerialClaimSelection' })}
        />
      </div>
    ) : null;
  };

  const render = ({
    editable: renderEditable,
    form: renderForm,
    title,
    className,
    adjustmentDelete,
  }: {
    editable: boolean;
    adjustmentDelete?: boolean;
    form: any;
    title?: string;
    className?: string;
  }) => (
    <CardOfClaim
      showButton={!!renderEditable || adjustmentDelete}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
      handleClick={() => {
        dispatch({
          type: `${NAMESPACE}/removeTreatmentPayableItem`,
          payload: {
            id,
            benefitCategory,
          },
        });
      }}
      className={className}
    >
      <InnerWrap title={title}>
        <Section form={renderForm} editable={renderEditable} section="Payable.TreatmentPayable">
          <Fields.BenefitItemCode />
          <Fields.PayableAmount />
          <Fields.PayableDays />
          <Fields.ReimbursementMultiple />
          <Fields.PolicyYear calculateByPolicyYear={calculateByPolicyYear} />
          <Fields.Remark />

          {/* <Fields.PolicyNo />
          <Fields.ProductCode /> */}
          <Fields.BenefitTypeCode />

          <Fields.HospitalizationFlg />
          <Fields.HospitalizationSequentialNo />
          <Fields.DiagnosisCode />
          <Fields.ReversalFlag />
        </Section>
        {handleButton()}
      </InnerWrap>
    </CardOfClaim>
  );

  return (
    <AdjustmentWrap
      originItem={originPayable}
      isAdjustment={isAdjustment}
      form={form}
      render={render}
      editable={editable}
    />
  );
};

export default connect(({ [NAMESPACE]: modelnamespace }: any, { item }: any) => ({
  calculateByPolicyYear:
    modelnamespace.claimEntities.claimPayableListMap[item.payableId]?.calculateByPolicyYear,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const {
        dispatch,
        item: { id: treatmentPayableItemId },
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveTreatmentPayableItem',
          payload: {
            changedFields,
            treatmentPayableItemId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(TreatmentPayableListItem)
);
