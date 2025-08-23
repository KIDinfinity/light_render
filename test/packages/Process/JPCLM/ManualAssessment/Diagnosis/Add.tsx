import React, { useEffect } from 'react';
import { connect, useSelector, } from 'dva';
import {v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import { formUtils, FormCard } from 'basic/components/Form';
import Section, { AddFields } from './Section';


const Add = ({ form, incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <FormCard style={{ paddingTop: 16 }}>
      <Section form={form} editable={editable} layoutName='x-layout' section="diagnosis.Add" register={false} >
        <AddFields.DiagnosisTypeAdd incidentId={incidentId} />
      </Section>
    </FormCard>
  );
};

export default connect(
  ({ JPCLMOfClaimAssessment }: any) => ({
    claimNo: JPCLMOfClaimAssessment.claimProcessData?.claimNo,
  })
)(
  Form.create<any>({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, claimNo, incidentId }: any = props;
      const addDiagnosisItem = {
        ...DIAGNOSISITEM,
        claimNo,
        id: uuidv4(),
        incidentId,
        isManualAdd: true,
        ...changedValues,
      };

      dispatch({
        type: 'JPCLMOfClaimAssessment/addDiagnosisItem',
        payload: {
          incidentId,
          addDiagnosisItem,
        },
      });

      dispatch({
        type: 'JPCLMOfClaimAssessment/savePartyListInfo',
        payload: {
          isClickClaimRegister: false,
        },
      });
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
