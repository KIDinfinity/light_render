import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import { SectionTitle } from '../Procedure/Section';
import classnames from 'classnames';
import Section, { ProcedureFields as Fields } from './Section';
import styles from './index.less';

const Procedure = ({ form, incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.procedure}>
      <div className={classnames(styles.title, styles.point)}>
        <SectionTitle />
      </div>
      <Section form={form} editable={editable} section="PopUp.Procedure">
        <Fields.CountOfSurgery />
        <Fields.ProcedureDateEntry incidentId={incidentId} />
        <Fields.ProcedureDateOCR incidentId={incidentId} />
        <Fields.ProcedureNameEntry />
        <Fields.ProcedureNameOCR />
      </Section>
    </div>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfDataCapture }: any, { procedureId }: any) => ({
    validating: formCommonController.validating,
    procedureItem: JPCLMOfDataCapture.claimEntities.procedureListMap[procedureId],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, procedureItem } = props;
      const { id, treatmentId } = procedureItem;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'procedureUpdate',
              payload: {
                changedFields,
                procedureId: id,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
            target: 'procedureUpdate',
            payload: {
              changedFields,
              procedureId: id,
              treatmentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { procedureItem } = props;
      return formUtils.mapObjectToFields(procedureItem);
    },
  })(Procedure)
);
