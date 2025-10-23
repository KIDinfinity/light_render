import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Row, Col, Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { getDefaultUnit, isServiceItemRequired } from 'claim/pages/utils/isServiceItemRequired';
import Fees from '../Fees/List';
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

  const layoutName = 'serviceItemfees-layout';

  return (
    <FormBorderCard
      backgroundColorName={'card4BgColor'}
      type="weight"
      marginBottom
      button={{ visiable: editable, callback: handleDelete }}
    >
      <Row type="flex">
        <Col span={16}>
          <Section form={form} editable={editable} section="ServiceItem" layoutName={layoutName}>
            <Fields.Expense invoiceId={invoiceId} serviceItemId={serviceItemId} />
            <Fields.ServiceItem
              incidentId={incidentId}
              serviceItemId={serviceItemId}
              invoiceId={invoiceId}
              claimTypeList={formUtils.queryValue(incidentItem?.claimTypeArray) || []}
            />
            <Fields.Unit treatmentId={treatmentId} />
          </Section>
          <Fees
            incidentId={incidentId}
            serviceItemId={serviceItemId}
            treatmentId={treatmentId}
            invoiceId={invoiceId}
          />
        </Col>
        <Col span={8} style={{ paddingLeft: '12px' }}>
          <Section form={form} editable={editable} section="ServiceItem" layoutName={layoutName}>
            <Fields.OtherInsurerPaidAmount />
            <Fields.ServiceItemDescription />
            <Fields.SurgeryClass />
            <Fields.NetExpense />
            <Fields.VatExpense invoiceId={invoiceId} />
          </Section>
        </Col>
      </Row>
    </FormBorderCard>
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { serviceItemId, incidentId }: any
  ) => ({
    serviceItem: modelnamepsace.claimEntities.serviceItemListMap[serviceItemId],
    incidentItem: modelnamepsace.claimEntities.incidentListMap[incidentId] || {},
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
        unit: (value: any) =>
          isServiceItemRequired(formUtils.queryValue(serviceItem?.serviceItem))
            ? value || getDefaultUnit(serviceItem?.unit, serviceItem?.serviceItem)
            : '',
      });
    },
  })(ServiceListItem)
);
