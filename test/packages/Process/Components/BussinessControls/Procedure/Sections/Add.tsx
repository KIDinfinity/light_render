import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';

import Procedure, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Procedure';

const Add = ({ form, editable, NAMESPACE, treatmentId }: any) => {
  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <Procedure.Section
      form={form}
      editable={editable}
      section="Add.Procedure"
      NAMESPACE={NAMESPACE}
      register={false}
    >
      <Fields.TherapiesTypeAdd treatmentId={treatmentId} />
    </Procedure.Section>
  );
};

export default connect()(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, treatmentId, NAMESPACE } = props;
      const therapiesType = formUtils.queryValue(changedValues?.therapiesType);
      if (therapiesType === TherapiesTypeEnum.ICU) {
        dispatch({
          type: `${NAMESPACE}/saveTreatmentItem`,
          payload: {
            changedFields:changedValues,
            treatmentId,
          },
        });
      }
      if (therapiesType === TherapiesTypeEnum.Surgery) {
        const procedureId = uuidv4();
        dispatch({
          type: `${NAMESPACE}/addProcedureItem`,
          payload: {
            treatmentId,
            procedureId,
            changedValues,
          },
        });
      }
      if (therapiesType === TherapiesTypeEnum.MainBenefit) {
        dispatch({
          type: `${NAMESPACE}/addMainBenefitItem`,
          payload: {
            treatmentId,
          },
        });
      }
    },
  })(Add)
);
