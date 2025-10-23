import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import changeProcedureType from '../_models/functions/changeProcedureType';
import Section, { AddFields } from './Section';

const ServiceListItem = ({ form, treatmentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="Procedure.Add">
      <AddFields.TherapyTypeAdd treatmentId={treatmentId} />
    </Section>
  );
};

export default connect(({ opusClaimDataCapture }: any) => ({
  claimNo: opusClaimDataCapture.claimProcessData?.claimNo,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, item, NAMESPACE, treatmentId, claimNo, incidentId } = props;
      const { id: serviceItemId, invoiceId } = item;
      if (formUtils.shouldUpdateState(changedFields)) {
        const procedureType = formUtils.queryValue(changedFields?.procedureType);
        if (!lodash.isNil(procedureType) && !!procedureType) {
          changeProcedureType({ dispatch, procedureType, treatmentId, claimNo, incidentId });

          dispatch({
            type: `${NAMESPACE}/invoiceDelete`,
            payload: {
              invoiceId,
              serviceItemId,
              treatmentId,
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
