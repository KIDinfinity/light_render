import React from 'react';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';

import Section, { PayableFields as Fields } from './Section';

const OtherProcedurePayableListItem = ({
  dispatch,
  form,
  item: { id, treatmentPayableId, otherProcedureId },
}: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  return (
    <CardOfClaim
      showButton={!!editable}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
      handleClick={() => {
        dispatch({
          type: `${NAMESPACE}/removeOtherProcedurePayableItem`,
          payload: {
            treatmentPayableId,
            id,
          },
        });
      }}
    >
      <Section form={form} editable={editable} section="OtherProcedure.Payable">
        <Fields.BenefitItemCode />
        <Fields.PayableAmount />
        <Fields.ReimbursementMultiple />
        <Fields.BenefitTypeCode />
        <Fields.RadioTherapyReasonDate1 />
        <Fields.RadioTherapyReasonDate2 />
        <Fields.ConsultationDate otherProcedurePayableId={id} />
        <Fields.AssessorOverrideTimes otherProcedureId={otherProcedureId} />
        {/* <Fields.RadioDateList otherProcedureId={otherProcedureId} /> */}
        <Fields.Remark />
        <Fields.PayableDays />
        <Fields.ReferenceDate />
        <Fields.NumberOfReasonMonths />
        <Fields.MultiReasonDates otherProcedurePayableId={id} />
      </Section>
    </CardOfClaim>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  claimPayableListMap: modelnamepsace.claimEntities.claimPayableListMap,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const {
        dispatch,
        item: { id },
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveOtherProcedurePayableItem',
          payload: {
            changedFields,
            id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item, claimPayableListMap } = props;

      const benefitCategory = claimPayableListMap?.[item?.payableId]?.benefitCategory || '';
      // const radioDateList = lodash.map(formUtils.queryValue(item.radioDateList), (item) =>
      //   moment(item).format('YYYY/MM/DD')
      // );

      const { multiReasonDates } = item;

      const multiReasonDateList = multiReasonDates // 待优化
        ? lodash.isArray(multiReasonDates)
          ? multiReasonDates
          : `${multiReasonDates}`.includes('[')
            ? JSON.parse(multiReasonDates)
            : [multiReasonDates]
        : [];
      const numberOfReasonMonths = multiReasonDateList?.length;

      return formUtils.mapObjectToFields({
        ...item,

        remark: transRemarkCodeToMsg(item?.remark, true),
        benefitCategory,
        numberOfReasonMonths,
        multiReasonDates: multiReasonDateList,
        multiReasonDate: '',
      });
    },
  })(OtherProcedurePayableListItem)
);
