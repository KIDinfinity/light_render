import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import classnames from 'classnames';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import Section, { ProcedureFields as Fields } from './Section';
import { SectionTitle } from './Section';
import styles from './index.less';

const Procedure = ({ form, incidentId, procedureItem }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <div className={styles.procedure}>
      <div className={classnames(styles.title, styles.point)}>
        <SectionTitle />
      </div>
      <Section form={form} editable={editable} section="PopUp.Procedure" id={procedureItem.id}>
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
  ({ formCommonController }: any) => ({
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, procedureItem } = props;
      const { id, treatmentId } = procedureItem;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveProcedureItem',
          payload: {
            changedFields,
            treatmentId,
            procedureId: id,
            isPopupData: true,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { procedureItem } = props;
      return formUtils.mapObjectToFields(procedureItem);
    },
  })(Procedure)
);
