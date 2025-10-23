import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { getDefaultUnit } from 'claim/pages/utils/isServiceItemRequired';
import Section, { Fields } from './Section';

const ServiceListItem = ({ form, serviceItemId, invoiceId, treatmentId }: any) => {
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
      marginBottom
      type="weight"
      button={{ visiable: editable, callback: handleDelete }}
      backgroundColorName={'card4BgColor'}
    >
      <Section form={form} editable={editable} section="ServiceItem">
        <Fields.Expense invoiceId={invoiceId} />
        <Fields.OtherInsurerPaidAmount />
        <Fields.ServiceItem invoiceId={invoiceId} />
        <Fields.ServiceItemDescription />
        <Fields.SurgeryClass />
        <Fields.Unit treatmentId={treatmentId} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { serviceItemId }: any) => ({
    serviceItem: modelnamepsace.claimEntities.serviceItemListMap[serviceItemId],
    validating: formCommonController.validating,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, serviceItemId, invoiceId, validating } = props;

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
        unit: (value: any) => value || getDefaultUnit(serviceItem?.unit, serviceItem?.serviceItem),
      });
    },
  })(ServiceListItem)
);
