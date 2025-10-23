import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const ServiceListItem = ({ form, item, treatmentId, NAMESPACE }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const incidentId = item?.incidentId;

  return (
    <Section form={form} editable={editable} section="JPADMED">
      <Fields.ProcedureType />
      <Fields.Expense />
      <Fields.FromDate />
      <Fields.ToDate />
      <Fields.AdvancedMedicalCn NAMESPACE={NAMESPACE} />
      <Fields.MedicalProvider
        incidentId={incidentId}
        treatmentId={treatmentId}
        NAMESPACE={NAMESPACE}
      />
      <Fields.MedicalProviderDescription />
      <Fields.MedicalProviderEffectiveDate />
      <Fields.MedicalProviderExpireDate />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, item, NAMESPACE } = props;
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
      return formUtils.mapObjectToFields({
        ...item,
        NAMESPACE,
        procedureType: item?.serviceItem,
        advancedMedicalCNKey: item?.advancedMedicalCNKey
          ? item?.advancedMedicalCNKey
          : item?.advancedMedicalCN,
      });
    },
  })(ServiceListItem)
);
