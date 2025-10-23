import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { useGetDeleteClaimPaybleCallback } from '../../../_hooks';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { InnerWrap } from '../AdjustmentWrap';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { useGetCurIncidentPayableList } from './useGetPolicyList';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import adjustmentStyles from '../AdjustmentWrap.less';

import Section, { BenefitTypeFields as Fields } from './Section';

const TreatmentPayableListItem = ({ form, item, incidentId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const curIncidentPayableList = useGetCurIncidentPayableList({ incidentId });
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );
  const deleteClaimPayble = useGetDeleteClaimPaybleCallback();

  return (
    <CardOfClaim
      showButton={!!editable}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
      className={item.isAdjustment === IsAdjustment.Yes ? adjustmentStyles.adjustmentWrap : void 0}
      handleClick={() => deleteClaimPayble(item)}
    >
      <InnerWrap title={item.isAdjustment === IsAdjustment.Yes && 'Adjustment Result'}>
        <Section form={form} editable={editable} section="Payable_ClaimPayable_BenefitType">
          <Fields.ClaimDecision />
          <Fields.BenefitTypeCode />
          <Fields.PayableAmount />
          <Fields.PolicyYear
            curIncidentPayableList={curIncidentPayableList}
            incidentPayableItem={item}
          />
          <Fields.Remark />
          <Fields.DenyReason />
          <Fields.ExGratiaReason />
          <Fields.DenyCode />
          <Fields.ExGratiaCode />
        </Section>
      </InnerWrap>
    </CardOfClaim>
  );
};

export default connect()(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const {
        dispatch,
        item: { id },
        mapIndex,
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveClaimPayableItem',
          payload: {
            changedFields,
            incidentPayableId: id,
            mapIndex, // 解决audit log覆盖问题
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;

      return formUtils.mapObjectToFields({
        ...item,
        remark: transRemarkCodeToMsg(item?.remark, true),
      });
    },
  })(TreatmentPayableListItem)
);
