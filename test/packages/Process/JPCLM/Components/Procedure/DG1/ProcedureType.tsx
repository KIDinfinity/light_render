import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import changeProcedureType from 'process/JPCLM/DataCapture/_models/functions/changeProcedureType';
import { formUtils } from 'basic/components/Form';
import { EProcedureType } from 'process/Enum';
import Section, { Fields } from './Section';

const ProcedureType = ({ form }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  return (
    <Section form={form} section="AntiCancerProcedure" editable={editable}>
      <Fields.TherapyType />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    mapPropsToFields(props) {
      const { procedureType } = props;
      return formUtils.mapObjectToFields({ procedureType });
    },
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, otherProducerId, treatmentId, validating, claimNo } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'saveOtherProcedureItem',
              payload: {
                changedFields,
                treatmentId,
                otherProcedureId: otherProducerId,
              },
            });
          }, 0);
        } else {
          const procedureType = formUtils.queryValue(changedFields?.procedureType);
          if (!lodash.isNil(procedureType)) {
            changeProcedureType({ dispatch, procedureType, treatmentId, claimNo });
            changedFields.procedureType = EProcedureType.Radiotherapy;
          }
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
            target: 'saveOtherProcedureItem',
            payload: {
              changedFields,
              treatmentId,
              otherProcedureId: otherProducerId,
            },
          });
        }
      }
    },
  })(ProcedureType)
);
