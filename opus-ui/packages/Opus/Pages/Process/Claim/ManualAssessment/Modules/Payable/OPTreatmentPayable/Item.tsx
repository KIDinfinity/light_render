import React from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Buttons from 'opus/Components/Buttons';
import Section, { PayableFields as Fields } from './Section';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import CardOfClaim from 'basic/components/Form/FormCard';
import AdjustmentWrap, { InnerWrap } from '../AdjustmentWrap';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import styles from './index.less';

const OutpatientItem = ({ form, item, treatmentId }: any) => {
  const { treatmentPayableId, id: opTreatmentPayableId, originPayable, isAdjustment } = item || {};
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const list =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.serialClaimMap?.[opTreatmentPayableId]
    ) || [];

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
                id: opTreatmentPayableId,
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
          type: `${NAMESPACE}/removeOPTreatmentPayableItem`,
          payload: {
            opTreatmentPayableId,
            treatmentPayableId,
          },
        });
      }}
      className={className}
    >
      <InnerWrap title={title}>
        <Section form={renderForm} editable={renderEditable} section="Payable.OPTreatmentPayable">
          <Fields.BenefitItemCode />
          <Fields.PayableAmount />
          <Fields.PayableDays />
          <Fields.ReimbursementMultiple />

          <Fields.BenefitTypeCode />
          <Fields.HospitalizationFlg />
          <Fields.HospitalizationSequentialNo />

          <Fields.OutpatientDate
            treatmentId={treatmentId}
            treatmentPayableId={treatmentPayableId}
          />
          <Fields.DiagnosisCode treatmentId={treatmentId} isAdjustment={isAdjustment} />
          <Fields.Remark />
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

export default connect(({ formCommonController, [NAMESPACE]: modelnamespace }: any, {}: any) => ({
  validating: formCommonController.validating,
  // opTreatmentPayable: modelnamespace.claimEntities.opTreatmentPayableListMap[opTreatmentPayableId]
}))(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const { dispatch, item, validating, treatmentId } = props;
      const { id: opTreatmentPayableId, treatmentPayableId } = item || {};

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveOPTreatmentPayableItem',
              payload: {
                changedFields,
                opTreatmentPayableId,
                treatmentPayableId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveOPTreatmentPayableItem',
            payload: {
              changedFields,
              opTreatmentPayableId,
              treatmentPayableId,
              treatmentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      const remark = transRemarkCodeToMsg(item?.remark, true);

      return formUtils.mapObjectToFields({
        ...item,
        remark,
      });
    },
  })(OutpatientItem)
);
