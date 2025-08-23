import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { getDefaultUnit, isServiceItemRequired } from 'claim/pages/utils/isServiceItemRequired';
import ServiceItem, {
  FieldsBasic as Fields,
} from 'process/Components/BussinessControls/ServiceItem';

const ServiceListItem = ({
  form,
  NAMESPACE,
  serviceItemId,
  invoiceId,
  incidentItem,
  treatmentId,
  incidentId,
  editable,
}: any) => {
  return (
    <ServiceItem.Section
      form={form}
      editable={editable}
      section="ServiceItem"
      NAMESPACE={NAMESPACE}
      id={serviceItemId}
    >
      <Fields.Expense invoiceId={invoiceId} serviceItemId={serviceItemId} />
      <Fields.OtherInsurerPaidAmount />
      <Fields.ServiceItem
        incidentId={incidentId}
        serviceItemId={serviceItemId}
        invoiceId={invoiceId}
        claimTypeList={formUtils.queryValue(incidentItem?.claimTypeArray) || []}
      />
      <Fields.ServiceItemDescription />
      <Fields.SurgeryClass />
      <Fields.Unit treatmentId={treatmentId} />
      <Fields.NetExpense />
      <Fields.VatExpense invoiceId={invoiceId} />
    </ServiceItem.Section>
  );
};

export default connect((state: any, { NAMESPACE, serviceItemId, incidentId }: any) => ({
  validating: state?.formCommonController.validating,
  serviceItem: state?.[NAMESPACE]?.claimEntities?.serviceItemListMap?.[serviceItemId],
  incidentItem: state?.[NAMESPACE]?.claimEntities?.incidentListMap?.[incidentId] || {},
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { NAMESPACE, dispatch, serviceItemId, invoiceId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveServiceItem',
              payload: {
                changedFields,
                serviceItemId,
                invoiceId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveServiceItem',
            payload: {
              changedFields,
              serviceItemId,
              invoiceId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { serviceItem }: any = props;

      return formUtils.mapObjectToFields(serviceItem, {
        unit: (value: any) =>
          isServiceItemRequired(formUtils.queryValue(serviceItem?.serviceItem))
            ? value || getDefaultUnit(serviceItem?.unit, serviceItem?.serviceItem)
            : '',
      });
    },
  })(ServiceListItem)
);
