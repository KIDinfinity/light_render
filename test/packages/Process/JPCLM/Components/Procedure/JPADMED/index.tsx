import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { formUtils, FormCard } from 'basic/components/Form';
import Section, { Fields } from './Section';

const ServiceListItem = ({ form, item, treatmentId, NAMESPACE }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const invoiceId = item?.invoiceId;
  const incidentId = item?.incidentId;

  const handleDelete = () => {
    let type;
    switch (NAMESPACE) {
      case 'JPCLMOfDataCapture':
        type = 'JPCLMOfDataCapture/invoiceDelete';
        break;
      default:
        type = `${NAMESPACE}/removeServiceItem`;
        break;
    }

    dispatch({
      type,
      payload: {
        invoiceId,
        serviceItemId: item.id,
        treatmentId,
      },
    });
  };

  return (
    <FormCard
      showButton={editable}
      handleClick={handleDelete}
      className="serviceItemCard"
      cardStyle={{ width: 0 }}
      style={{ borderRadius: '6px', width: '100%' }}
    >
      <Section form={form} editable={editable} section="service">
        <Fields.ServiceItem invoiceId={invoiceId} />
        <Fields.ProcedureType />
        <Fields.Expense />
        <Fields.FromDate />
        <Fields.ToDate />
        <Fields.AdvancedMedicalCn />
        <Fields.MedicalProvider incidentId={incidentId} treatmentId={treatmentId} />
        <Fields.MedicalProviderDescription />
        <Fields.MedicalProviderEffectiveDate />
        <Fields.MedicalProviderExpireDate />
      </Section>
    </FormCard>
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
      return formUtils.mapObjectToFields({ ...item, NAMESPACE, procedureType: item?.serviceItem });
    },
  })(ServiceListItem)
);
