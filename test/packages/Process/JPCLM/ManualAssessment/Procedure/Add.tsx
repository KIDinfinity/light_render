import React, { useEffect } from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils, FormCard } from 'basic/components/Form';
import changeProcedureType from 'process/JPCLM/ManualAssessment/_models/functions/changeProcedureType';
import Section, { AddFields } from './Section';

const Add = ({ form, incidentId, treatmentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const layoutName = 'treatment-no-invoice-layout';

  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <FormCard style={{ paddingTop: 16 }}>
      <Section
        form={form}
        editable={editable}
        section="procedure.Add"
        layoutName={layoutName}
        register={false}
      >
        <AddFields.TherapyTypeAdd treatmentId={treatmentId} />
      </Section>
    </FormCard>
  );
};

export default connect(({ JPCLMOfClaimAssessment }: any, { treatmentId }: any) => ({
  procedureList:
    JPCLMOfClaimAssessment.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList,
  claimNo: JPCLMOfClaimAssessment.claimProcessData?.claimNo,
}))(
  Form.create<any>({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, procedureList, claimNo, treatmentId }: any = props;
      changeProcedureType({
        dispatch,
        procedureType: changedValues?.procedureType,
        treatmentId,
        claimNo,
        procedureList,
      });
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
