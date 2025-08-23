import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import {v4 as uuidv4 } from 'uuid';
import CardOfClaim from 'basic/components/Form/FormCard';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { CLAIMPAYABLEITEM } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';
import Section, { AddFields as Fields } from '../Section';

const Add = ({ form, hasTreatment }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const layoutName = hasTreatment ? 'x-layout' : 'no-treatment-layout';

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <CardOfClaim className="incidentPayableItem" style={{ paddingTop: 16 }}>
      <Section
        form={form}
        editable={editable}
        section="Incident.Payable.Add"
        layoutName={layoutName}
      >
        <Fields.PolicyNoAdd />
      </Section>
    </CardOfClaim>
  );
};

export default connect(({ formCommonController, JPCLMOfClaimAssessment }: any) => ({
  validating: formCommonController.validating,
  insuredId: JPCLMOfClaimAssessment.claimProcessData.insured.insuredId
}))(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, claimNo, incidentId, insuredId }: any = props;
      const addClaimPayableItem = {
        ...CLAIMPAYABLEITEM,
        claimNo,
        id: uuidv4(),
        incidentId,
        manualAdd: SwitchEnum.YES,
        insuredId,
      };

      dispatch({
        type: 'JPCLMOfClaimAssessment/addClaimPayableItem',
        payload: { addClaimPayableItem },
      });

      dispatch({
        type: 'JPCLMOfClaimAssessment/saveClaimPayableItem',
        payload: {
          incidentPayableId: addClaimPayableItem.id,
          changedFields: {
            policyNo: {
              dirty: false,
              name: "policyNo",
              value: changedValues?.policyNo,
            }
          },
        },
      });
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
