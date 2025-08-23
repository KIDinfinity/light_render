import React, { useEffect } from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils, FormCard } from 'basic/components/Form';
import changeProcedureType from 'process/JPCLM/DataCapture/_models/functions/changeProcedureType';
import Section, { AddFields } from './Section';

const Add = ({ form, incidentId }: any) => {
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
        <AddFields.TherapyTypeAdd />
      </Section>
    </FormCard>
  );
};

export default connect(({ JPCLMOfDataCapture }: any, { treatmentId }: any) => ({
  procedureList: JPCLMOfDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList,
  claimNo: JPCLMOfDataCapture.claimProcessData?.claimNo,
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
