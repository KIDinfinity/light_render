import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import classnames from 'classnames';
import { NAMESPACE } from 'opus/Pages/Process/Claim/DataCapture/activity.config';
import Section, { ProcedureFields as Fields } from './Section';
import { SectionTitle } from '../Procedure/Section';
import styles from './index.less';

const Procedure = ({ form, procedureId, incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.procedure}>
      <div className={classnames(styles.title, styles.point)}>
        <SectionTitle />
      </div>
      <Section form={form} editable={editable} section="PopUp.Procedure" id={procedureId}>
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
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { procedureId, incidentId }: any
  ) => ({
    validating: formCommonController.validating,
    procedureItem: modelnamepsace.integration?.[incidentId]?.procedureListMap?.[procedureId],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, procedureItem, incidentId } = props;
      const { id, treatmentId } = procedureItem;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'popupProcedureUpdate',
              payload: {
                changedFields,
                procedureId: id,
                treatmentId,
                incidentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'popupProcedureUpdate',
            payload: {
              changedFields,
              procedureId: id,
              treatmentId,
              incidentId,
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
