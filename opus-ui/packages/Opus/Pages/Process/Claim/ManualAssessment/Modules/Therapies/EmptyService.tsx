import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import changeProcedureType from '../../_models/functions/changeProcedureType';
import Section, { AddFields } from './Section';

const ServiceListItem = ({ form, treatmentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="Procedure.Add">
      <AddFields.TherapyTypeAdd treatmentId={treatmentId} />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, item, NAMESPACE, treatmentId, claimNo, incidentId } = props;
      const { id, invoiceId } = item;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          dispatch({
            type: `${NAMESPACE}/saveEntry`,
            target: 'serviceUpdate',
            payload: {
              changedFields,
              serviceItemId: id,
              invoiceId,
            },
          });
        } else {
          const procedureType = formUtils.queryValue(changedFields?.procedureType);
          if (!lodash.isNil(procedureType)) {
            dispatch({
              type: 'opusClaimAssessment/saveFormData',
              target: 'opusClaimAssessment/removeServiceItem',
              payload: {
                invoiceId: item.invoiceId,
                serviceItemId: item.id,
                treatmentId,
                changedFields,
              },
            });
            changeProcedureType({ dispatch, procedureType, treatmentId, claimNo, incidentId });
            return;
          }
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'serviceUpdate',
            payload: {
              changedFields,
              serviceItemId: id,
              invoiceId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item, NAMESPACE } = props;
      return formUtils.mapObjectToFields({ ...item, NAMESPACE, procedureType: item?.serviceItem });
    },
  })(ServiceListItem)
);
