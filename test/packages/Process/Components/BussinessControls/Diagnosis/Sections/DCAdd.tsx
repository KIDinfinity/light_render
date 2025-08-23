import React, { useEffect } from 'react';

import { connect } from 'dva';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import { formUtils } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';
import { Form } from 'antd';
import Diagnosis, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Diagnosis';

interface Iprops {
  editable: any;
  incidentId: string;
  NAMESPACE: string;
  form: any;
}

const Add = ({ editable, incidentId, NAMESPACE, form }: Iprops) => {
  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <Diagnosis.Section
      form={form}
      editable={editable}
      section="Add.Diagnosis"
      NAMESPACE={NAMESPACE}
      register={false}
    >
      <Fields.DiagnosisCodeAdd incidentId={incidentId} />
    </Diagnosis.Section>
  );
};

export default connect((state: any, { NAMESPACE }: any) => ({
  claimNo: state?.[NAMESPACE]?.claimProcessData?.claimNo,
}))(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, NAMESPACE, claimNo, incidentId } = props;
      const addDiagnosisItem = {
        ...DIAGNOSISITEM,
        claimNo,
        id: uuidv4(),
        incidentId,
        isManualAdd: true,
        ...changedValues,
      };
      dispatch({
        type: `${NAMESPACE}/addDiagnosisItem`,
        payload: {
          incidentId,
          addDiagnosisItem,
        },
      });
    },
    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
