import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { getDefaultUnit, isServiceItemRequired } from 'claim/pages/utils/isServiceItemRequired';

import Section, { Fields } from './Section';

const ServiceListItem = ({
  form,
  serviceItemId,
  invoiceId,
  incidentItem,
  treatmentId,
  incidentId,
}: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeServiceItem`,
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };
  return (
    <FormBorderCard
      type="weight"
      marginBottom
      button={{ visiable: editable, callback: handleDelete }}
      backgroundColorName={'card4BgColor'}
    >
      <Section form={form} editable={editable} section="ServiceItem">
        <Fields.Expense invoiceId={invoiceId} serviceItemId={serviceItemId} />
        <Fields.OtherInsurerPaidAmount />
        <Fields.ServiceItem
          incidentId={incidentId}
          serviceItemId={serviceItemId}
          treatmentId={treatmentId}
          invoiceId={invoiceId}
          claimTypeList={formUtils.queryValue(incidentItem?.claimTypeArray) || []}
        />
        <Fields.ServiceItemDescription />
        <Fields.SurgeryClass />
        <Fields.Unit treatmentId={treatmentId} />
        <Fields.NetExpense />
        <Fields.VatExpense invoiceId={invoiceId} />
        <Fields.ProcedureCode treatmentId={treatmentId} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { serviceItemId, incidentId, treatmentId }: any
  ) => ({
    serviceItem: modelnamepsace.claimEntities.serviceItemListMap[serviceItemId],
    incidentItem: modelnamepsace.claimEntities.incidentListMap[incidentId] || {},
    procedureItem: modelnamepsace.claimEntities.procedureListMap[treatmentId],
    validating: formCommonController.validating,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, serviceItemId, invoiceId, validating, treatmentId } = props;

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
                treatmentId,
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
              treatmentId,
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
